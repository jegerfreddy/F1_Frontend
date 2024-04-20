import { FC } from "react";
import { IPlayerItem } from "../interfaces/IPlayerItem";


const PlayerItem : FC<IPlayerItem> = ({id, name, image, selectedPlayer}) => {

    return (
        <div className="d-flex justify-content-center">
            <article className="col-4">
                
                <div className="d-flex flex-column justify-content-center align-items-center">

                    <div className="col-10">
                        <img className="driverImage rounded w-100" src={image} alt="driver-image.jpg" />
                    </div>

                    <div className="col-8">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h2 className="display-6 driverName text-nowrap">{name}</h2>
                            <button onClick={() => {selectedPlayer(id)}} >Play</button>
                        </div>
                    </div>

                </div>   

                <hr />

            </article>
        </div>
    );
};

export default PlayerItem;