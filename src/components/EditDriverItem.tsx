import { FC, useContext, useState } from "react";
import { IDriverItem } from "../interfaces/IDriverItem";
import { F1Context } from "../contexts/F1Context";
import { IF1Context } from "../interfaces/IF1Context";

const EditDriverItem : FC<IDriverItem> = ({id, name, age, nationality, image}) => {

    const {} = useContext(F1Context) as IF1Context;

    const {drivers, getDriversData, deleteDriverById, updateDriver} = useContext(F1Context) as IF1Context;
    const [inputName, setInputName] = useState<string>(name);
    const [inputAge, setInputAge] = useState<number>(age);
    const [inputNationality, setInputNationality] = useState<string>(nationality);
    

    const deleteDriver = async (input: number) => {

        const driver = drivers.find( (driver) => { return driver.id == input } );

        if (driver != undefined) {

            const confirmation = prompt(
                `Are you sure you want to delete driver with\n
                ID: ${driver.id}\n
                Name: ${driver.name}\n
                (enter Y or N, to confirm)
            `);

            switch (confirmation?.toLowerCase()) {
                case "y":

                    const success = await deleteDriverById(id); // returns true or false

                    if (success) {
                        
                        alert("Driver deleted!");

                        // This updates the drivers in the DriverContext, so that
                        // the webpage does not need to reload for the new driver to appear.
                        setTimeout(async () => {

                            await getDriversData();

                        }, 1500);

                    };

                break;

                case "n":

                    alert(`Delete aborted.)"`);

                break;

                default:

                    alert(`Input (´${confirmation}´) not recognized. Delete aborted."`);

                break;
            }

        } else {

            alert(`Driver with ID: ${id} not found.`);

        };
    };

    const handleInput = (value: number | string, name: string) => {

        if (typeof(value) == "string" && name == "driver-name-input") {

            setInputName(value);

        } else if(typeof(value) == "string" && name == "driver-nationality-input") {

            setInputNationality(value);

        } else if (typeof(value) == "number" && name == "driver-age-input") {

            setInputAge(value);

        };
    };

    const saveChanges = async (id: number) => {

        const driver = drivers.find( (driver) => {return driver.id == id;} );

        if (driver != undefined) {            

            const updatedDriver = {
                id: driver.id,
                name: inputName,
                age: inputAge,
                nationality: inputNationality,
                image: driver.image
            }

            const success = await updateDriver(updatedDriver);

            if (success) {
                
                alert("Driver has been updated!");

                setTimeout(async () => {

                    await getDriversData();

                }, 1500);

            };
        };
    };

    return(
        <div className="row">
            <article className="col-md-12 col-lg-9">
                <div className="driverArticle d-flex align-items-center">

                    <div className="col-3">
                        <img className="driverImage rounded w-100" src={image} alt="driver-image.jpg" />
                    </div>

                    <div className="col-7">
                        <div className="d-flex flex-column justify-content-center align-items-start">

                            <h2 className="display-4 mb-5 ms-3 driverName border-bottom border-dark border-2 text-nowrap">{name}</h2>
                            <input className="inputField editInputField m-3" type="text" onChange={(e) => {handleInput(e.currentTarget.value, e.currentTarget.name)}} placeholder={"Name: " + name + "..."} name="driver-name-input" />
                            <input className="inputField editInputField m-3" type="text" onChange={(e) => {handleInput(parseInt(e.currentTarget.value), e.currentTarget.name)}} placeholder={"Age: " + age.toString() + "..."} name="driver-age-input" />
                            <input className="inputField editInputField m-3" type="text" onChange={(e) => {handleInput(e.currentTarget.value, e.currentTarget.name)}} placeholder={"Nationality: " + nationality + "..."} name="driver-nationality-input" />
                
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="d-flex flex-column">

                            <div className="mt-5 mb-2">
                                <img 
                                        className="trashIcon rounded w-100"
                                        data-id={id} onClick={(e) => {deleteDriver(parseInt(e.currentTarget.dataset.id!))}} 
                                        src="/images/trash-bin.png" alt="trash-bin.png" 
                                />
                            </div>

                            <div className="mt-2">
                                <img 
                                        className="saveIcon rounded w-100"
                                        data-id={id} onClick={(e) => {saveChanges(parseInt(e.currentTarget.dataset.id!))}} 
                                        src="/images/saveIcon.png" alt="saveIcon.png" 
                                />
                            </div>

                        </div>
                    </div>
                </div>   
            </article>
            
            <hr />
            
        </div>
    );
}

export default EditDriverItem;