import { useContext } from "react";
import RaceList from "../components/RaceList";
import { IF1Context } from "../interfaces/IF1Context";
import { F1Context } from "../contexts/F1Context";

const LeaderboardPage = () => {

    const {races} = useContext(F1Context) as IF1Context;

    return (
        <>
            <div className="leaderboardPageHeader d-flex flex-column align-items-center">

                <div className="bg-dark ps-5 pe-5 pt-3 pb-2 w-50 d-flex flex-column align-items-center rounded">
                    <h1 className="display-1 text-light">Leaderboards</h1>
                    <p className="fs-3 text-light">Entries on the board: {races.length}</p>
                </div>
            </div>

            <div className="container">
                <div className="">
                    
                    <RaceList/>

                </div>
            </div>
        </>
    );
};
export default LeaderboardPage;