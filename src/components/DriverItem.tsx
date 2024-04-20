import { FC } from "react";
import { IDriverItem } from "../interfaces/IDriverItem";


const DriverItem : FC<IDriverItem> = ({id, name, age, nationality, image}) => {


    return (
        <div className="row">
            
            <article className="col-md-12 col-lg-9">
                <div className="driverArticle d-flex align-items-center">

                    <div className="col-3">
                        <img className="driverImage rounded w-100" src={image} alt="driver-image.jpg" />
                    </div>

                    <div className="col-9">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h2 className="display-4 mb-5 driverName border-bottom border-dark border-2 text-nowrap">{name}</h2>
                            <h3>ID: {id}</h3>
                            <h3>Age: {age}</h3>
                            <h3>Nationality: {nationality}</h3>
                        </div>
                    </div>

                </div>   
            </article>
            
        </div>
    );
}

export default DriverItem;