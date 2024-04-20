import { useContext } from "react";
import RaceItem from "./RaceItem";
import { F1Context } from "../contexts/F1Context";
import { IF1Context } from "../interfaces/IF1Context";

const RaceList = () => {

    const {races} = useContext(F1Context) as IF1Context;

    const getRacesJSX = () => {

        const racesJSX = races.map( (race, i) => {

            return (
                <RaceItem
                    key={i}
                    id={race.id}
                    playerName={race.playerName}
                    score={race.score}
                ></RaceItem>
            );
        });

        races.sort((raceA, raceB) => raceB.score - raceA.score);
        
        return racesJSX;
    };

    return (
        <>
            <header>
                <h1>THE LEADERBOARDS</h1>
            </header>


            <div className="d-flex flex-column">
                <div className="container">
                    <div className="d-flex align-items-center bg-light mb-3 p-2 rounded">
                        <div className="col-4">
                            <div className="d-flex justify-content-center">

                                <h3 className="mb-0 display-5 border-bottom border-dark border-1 w-50 text-center">ID</h3>

                            </div>
                        </div>

                        <div className="col-4">
                            <div className="d-flex justify-content-center">

                                <h3 className="mb-0 display-5 border-bottom border-dark border-1 w-50 text-center">Player</h3>

                            </div>
                        </div>

                        <div className="col-4">
                            <div className="d-flex justify-content-center">

                                <h3 className="mb-0 display-5 border-bottom border-dark border-1 w-50 text-center">Score</h3>

                            </div>
                        </div>
                    </div>
                </div>

                {getRacesJSX()}
            </div>
        </>
    );
};

export default RaceList;