import { useContext } from "react";
import DriverList from "../components/DriverList";
import { F1Context } from "../contexts/F1Context";
import { IF1Context } from "../interfaces/IF1Context";

const DriversPage = () => {

    const {drivers} =  useContext(F1Context) as IF1Context;

    return (
        <>
            <div className="driversPageHeader d-flex flex-column align-items-center">

                <div className="bg-dark ps-5 pe-5 pt-3 pb-2 w-50 d-flex flex-column align-items-center rounded">
                    <h1 className="display-1 text-light">F1 Drivers</h1>
                    <p className="fs-3 text-light">Number of drivers: {drivers.length}</p>
                </div>
            </div>
            
            <DriverList/>
        </>
    )
};

export default DriversPage;