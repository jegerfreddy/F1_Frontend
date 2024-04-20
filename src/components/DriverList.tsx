import { useContext, useState } from "react";
import DriverItem from "./DriverItem";
import { F1Context } from "../contexts/F1Context";
import { IF1Context } from "../interfaces/IF1Context";
import UploadDriver from "./UploadDriver";
import EditDriverItem from "./EditDriverItem";

const DriverList = () => {

    const {drivers, getDriversByFilter} = useContext(F1Context) as IF1Context;

    // this useState needs to be of type Element[] and Element because 
    // getDriverByFilter(...name = "driver-id-input") => returns an Element object and not an array
    const [items, setItems] = useState<JSX.Element[] | JSX.Element>();
    const imageHost = "http://localhost:5034/images/";

    // This returns the normal representation of drivers
    const getDriversJSX = () => {

        const driversJSX = drivers.map( (driver, i) => {

            // Setting image to unknownCharacter.jpg here ensures that drivers with no photo
            // has a stock image to represent them.
            let image = "unknownCharacter.png";

            if (driver.image != null) {
                image = driver.image;
            }

            return (
                <DriverItem
                    key={i}
                    id={driver.id}
                    name={driver.name}
                    age={driver.age}
                    nationality={driver.nationality}
                    image={`${imageHost + image}`}
                ></DriverItem>
            );
        } );

        setItems(driversJSX);

    };

    // This returns a version of driver cards where you can edit name, age and nationality
    const getEditDriversJSX = () => {

        const editDriversJSX = drivers.map( (driver, i) => {

            let image = "unknownCharacter.png";

            if (driver.image != null) {
                image = driver.image;
            }

            return (
                <EditDriverItem
                    key={i}
                    id={driver.id}
                    name={driver.name}
                    age={driver.age}
                    nationality={driver.nationality}
                    image={imageHost + image}
                ></EditDriverItem>
            );
        } );

        setItems(editDriversJSX);
    }

    // The filter method takes the value from the filter input (parsed to number if being filtered by ID)
    // and the name-tag from the inputfield to check what the user wants to filter by.
    const handleFilter = async (value: number | string, name: string) => {

        const result = await getDriversByFilter(value, name);
        setItems(result);
    }

    // Returns the UI needed to create a new driver item.
    const getCreateUI = () => {

        setItems(<UploadDriver/>);

    }

    return (
        <>
            <div className="bg-dark p-5">
                <section className="filterSection rounded mb-4 d-flex flex-column">
                        
                    <div>
                        <button className="darkButton btn btn-dark m-3 fs-4" onClick={getCreateUI}>+ Add Driver</button>
                        <button className="darkButton btn btn-dark m-3 fs-4" onClick={getEditDriversJSX}>Edit Drivers</button>

                        <hr className="border border-dark border-1 opacity-75 w-75 align-self-left ms-3" />

                        <h1 className="display-6 m-3">Filter Drivers</h1>
                        <button className="darkButton btn btn-dark m-3" name="get-all-drivers" onClick={getDriversJSX}>Show All</button>
                        <input className="inputField m-3" type="text" onChange={(e) => {handleFilter(parseInt(e.target.value), e.target.name)}} placeholder="Filter by Id..." name="driver-id-input" />
                        <input className="inputField m-3" type="text" onChange={(e) => {handleFilter(e.target.value, e.target.name)}} placeholder="Filter by Name..." name="driver-name-input" />
                    </div>

                </section>
            

                <section className="container-fluid">
                    {items}
                </section>
            </div>
        </>
    )
};

export default DriverList;