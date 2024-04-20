import { FC, useContext, useEffect, useRef, useState } from "react";
import { IPlayGame } from "../interfaces/IPlayGame";
import { F1Context } from "../contexts/F1Context";
import { IF1Context } from "../interfaces/IF1Context";


const PlayGame : FC<IPlayGame> = ({id}) => {

    const {getRacesData, getDriverById, getRaceById, updateRace, postRace} = useContext(F1Context) as IF1Context;

    const [currentKey, setCurrentKey] = useState<string>();
    const [userInput, setUserInput] = useState<string>();

    const [score, setScore] = useState<number>(0);
    const [mistakes, setMistakes] = useState<number>(0);

    const [iterator, setIterator] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [barWidth, setBarWidth] = useState<number>(100);

    let [inputReactionTime, setInputReactionTime] = useState<number>(2000);
    let inputTimerRef = useRef<number>();
    let barTimerRef = useRef<number>();

    const handleKeyPress = (key: string) => {

        // The set-function of useState variables are written like this because it forces the
        // update of the state to be imidiate. If not used like this the state is not updated
        // correctly and comparison between currentkey => userInput will be wrong.
        setUserInput(prevKey => key);

        // This iterator is to reset the useEffect being used to check if input
        // was correct or incorrect.
        setIterator(prevIteration => prevIteration + 1);

    };
    
    const getNewKey = () => {
        
        // If user has < 3 mistakes, gameOver = false => get new key. Else end game.
        if (!gameOver) {

            const num = Math.floor(Math.random() * 2);
            setCurrentKey(prevKey => num > 0 ? "ArrowRight" : "ArrowLeft");
            setBarWidth(prevBarWidth => 100);

        } else {

            endRun();

        };
    };

    const endRun = async () => {

        setGameOver(true);

        clearInterval(inputTimerRef.current);
        clearInterval(barTimerRef.current);

        window.removeEventListener('keydown', (e) => {handleKeyPress(e.key)});
        await saveRun(id, score);        
        
    };

    const saveRun = async (id: number, score: number) => {

        try {

            const race = await getRaceById(id);

            // Checks if user has played before, if undefined it means first time.
            if (race != undefined) {

                // Updates leaderboard if player has beaten their highscore.
                if (race.score < score) {

                    const raceObj = {
                        id: id,
                        playerName: race.playerName,
                        score: score
                    };
    
                    const success = await updateRace(raceObj);

                    if  (success) {
                        
                        setCurrentKey(prevKey => "New Highscore!");
                        await getRacesData();
                    }

                } else {

                    setCurrentKey(prevKey => "GAMEOVER! Try again...");

                };

            } else {

                // Creates entry on leaderboard if player is new.

                const driver = await getDriverById(id);

                const raceObj = {
                    id: id,
                    playerName: driver.name,
                    score: score
                };

                await postRace(raceObj);
            };

        } catch (e) {

            console.log("Something went wrong in: SaveRun()");
            console.log(e);
            
        };
    };

    // Initiates the eventlistener as soon as the player presses start
    useEffect(() => {

        window.addEventListener('keydown', (e) => {handleKeyPress(e.key)});

    }, []);

    // This use effect handles initialization/clearing of timers aswell as comparing
    // userInput to currentKey to add points/mistakes
    useEffect(() => {

        // Clear the previous timers if they are initiated
        inputTimerRef.current ? clearInterval(inputTimerRef.current) : null;
        barTimerRef.current ? clearInterval(barTimerRef.current) : null;
        
        
        // Checks if gameOver is true/false so comparing is not run after the game has ended.
        if (!gameOver) {

            // Creates a timer that shrinks the visualized bar of inputReactionTime
            barTimerRef.current = setInterval(() => {

                setBarWidth(prevBarWidth => prevBarWidth - 1);
    
            }, (inputReactionTime / 100));


            // Sets a new timer that increments mistakes every 'inputReactionTime' seconds, unless the user gives
            // any type of input.
            inputTimerRef.current = setInterval(() => {
    
                setMistakes((prevMistakes) => {
    
                    // Checks to see if the user made 3 or more mistakes => gameOver || continue.
                    (prevMistakes + 1) >= 3 ? endRun() : null;

                    // Resets the width of the reaction time bar.
                    setBarWidth(prevBarWidth => 100);
    
                    return prevMistakes + 1;
    
                });
    
                getNewKey();
    
            }, inputReactionTime);


            // Compares the user input to what the currentKey is and adds points/mistakes.
            if (userInput === currentKey && currentKey != undefined) {
    
                setScore(prevScore => {
    
                    // This switch case hightens the difficulty as the user gets more points
                    switch (prevScore + 1) {
                        case 10:
                        case 20:
                        case 30:
                        case 40:
                        case 60:
                        case 70:
    
                            setInputReactionTime(inputReactionTime - 250); 
    
                        break;
    
                        default: 
                        break;
                    }
                        
                    // Because of rerendering components, this needs to be .5 so that the score is 
                    // incremented with by 1, and not 2 points.
                    return prevScore + .5;
                });
    
                
            } else if (userInput != currentKey && currentKey != undefined) {
    
                setMistakes(prevMistakes => {

                    // Checks if the user has made 3 or more mistakes => endRun | continue.
                    (prevMistakes + 1) >= 3 ? endRun() : null;

                    return prevMistakes + .5;

                });
            };

            getNewKey();

        };
    }, [iterator]);
    
    return (
        <div className="d-flex flex-column">

            <div className="d-flex w-100">
                <div className="d-flex flex-column align-items-left mb-5 me-5">
                    <h3 className="p-3 border border-dark border-1 text-nowrap">Score: {score}</h3>
                    <h3 className="p-3 border border-dark border-1 text-nowrap">Mistakes: {mistakes}</h3>
                </div>
                
                <div className="d-flex flex-column justify-content-center ms-5 mb-5">
                    <h3 className="mb-5 border-bottom border-dark border-1 d-flex justify-content-center">Key to press:</h3>
                    <h2><b>{currentKey}</b></h2>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center ps-5 pe-5">
                <p className="text-light ps-3 pe-3 rounded fs-3 bg-dark d-flex flex-column align-items-center">{inputReactionTime/1000}s</p>
                <div className="timerBar rounded d-flex justify-content-center" style={{ width: `${barWidth}%` }}></div>
            </div>

        </div>
    );
};

export default PlayGame;