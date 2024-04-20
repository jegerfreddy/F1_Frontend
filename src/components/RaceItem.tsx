import { FC, useContext } from "react";
import { IRaceItem } from "../interfaces/IRaceItem";
import { F1Context } from "../contexts/F1Context";
import { IF1Context } from "../interfaces/IF1Context";

const RaceItem : FC<IRaceItem> = ({id, playerName, score}) => {

    const {deleteRaceById, getRacesData} = useContext(F1Context) as IF1Context;

    const handleDelete = async (id: number) => {

        const confirmation = prompt("Are you sure you want to delete this race? (y / n)");

        if (confirmation?.toLowerCase() === "y") {

            const success = await deleteRaceById(id);

            if (success) {
                
                alert("Delete Success!");
                await getRacesData();

            }

        } else if (confirmation?.toLowerCase() === "n") {

            alert("Delete aborted.");

        } else {

            alert(`Input ${confirmation?.toLowerCase()} is not valid. Delete aborted.`);

        }
    };

    return (
        <>
            <div className="row">
                <div className="d-flex align-items-center justify-content-center leaderBoardArticle pt-2 pb-2 mb-2 rounded m-1">
                    <div className="col-4">
                        <div className="d-flex justify-content-center align-items-center">
                        
                            <p className="p-1 mb-0 fs-4">{id}</p>

                        </div>
                    </div>

                    <div className="col-4">
                        <div className="d-flex justify-content-center align-items-center">
                            
                            <p className="p-1 mb-0 fs-4">{playerName}</p>

                        </div>
                    </div>

                    <div className="col-4">
                        <div className="d-flex justify-content-center align-items-center">

                            <div className="w-25">
                                <p className="p-1 mb-0 fs-4">{score}</p>
                            </div>

                            <img className="deleteRaceIcon justify-self-end" onClick={() => {handleDelete(id)}} src="/images/trash-bin.png" alt="trash-icon.jpg" />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RaceItem;