import { useContext, useState } from "react";
import { F1Context } from "../contexts/F1Context";
import { IF1Context } from "../interfaces/IF1Context";

import PlayerItem from "./PlayerItem";
import PlayGame from "./PlayGame";

const GameComponent = () => {

    const {drivers} = useContext(F1Context) as IF1Context;
    const imageHost = "http://localhost:5034/images/";

    const [userInterface, setUserInterface] = useState<JSX.Element[]>([]);
    const [infoText, setInfoText] = useState<string>("Press the key shown, within the time limit to earn points. After 3 mistakes you lose!");

    const [playerImage, setPlayerImage] = useState<string>("");
    const [hideImage, setHideImage] = useState<string>("none");

    const startGame = () => {

        setInfoText("Choose a player, the game will start instantly!");
        setHideImage("none");
        setUserInterface(getPlayerSelection());

    };

    const selectedPlayer = (id: number) => {

        const player = drivers.find( (driver) => {return driver.id === id} );
            
        setUserInterface(inititalizeGame(id));
        setInfoText(`Playing as: ${player!.name}`);
        setPlayerImage(imageHost + player!.image);
        setHideImage("");

    };

    const inititalizeGame = (id: number) => {

        return ([
            <PlayGame
                key={id}
                id={id}
            ></PlayGame>
        ]);
    }

    const getPlayerSelection = () => {

        const playerItemJSX = drivers.map( (driver, i) => {

            let image = "unknownCharacter.png";

            if (driver.image != null) {

                image = driver.image;

            };

            return (
                <PlayerItem
                    key={i}
                    id={driver.id}
                    name={driver.name}
                    image={imageHost + image}
                    selectedPlayer={selectedPlayer}
                ></PlayerItem>
            );
        } );

        return playerItemJSX;
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="bg-dark d-flex justify-content-center p-5">
                        <div className="col-sm-10 col-md-8">
                            <div className="d-flex flex-column">

                                <div className="gameContainer d-flex flex-column align-items-center">

                                    <header className="d-flex align-items-center justify-content-center bg-light w-100">
                                        <button onClick={startGame} className="warningButton btn btn-dark m-3 fs-4">START</button>
                                    </header>

                                    <p className="p-2 fs-3 border-bottom border-dark border-1 text-center">{infoText}</p>
                                    <img className="rounded mb-2" style={{display: `${hideImage}`, maxWidth: "10rem", minWidth: "10rem"}} src={playerImage} alt="player-image" />

                                    <div className="pt-2 d-flex flex-column align-items-center mainGameScreen">
                                        {userInterface}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GameComponent;