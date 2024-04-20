import { useContext, useState } from "react";
import { F1Context } from "../contexts/F1Context";
import { IF1Context } from "../interfaces/IF1Context";

const UploadDriver = () => {

    const [showcaseImage, setShowcaseImage] = useState<string>("http://localhost:5034/images/unknownCharacter.png");

    const [name, setName] = useState<string>("Not defined");
    const [age, setAge] = useState<number>(0);
    const [nationality, setNationality] = useState<string>("Neverland");
    const [image, setImage] = useState<File | null>(null);

    const {postDriver, getDriversData} = useContext(F1Context) as IF1Context;

    const handleDriverCreation = (target: HTMLInputElement, name: string) => { 

        switch(name){

            case "driver-name":

                setName(target.value);

            break;
            
            case "driver-age":

                setAge(parseInt(target.value));

            break;

            case "driver-nationality":

                setNationality(target.value);

            break;

            case "driver-image": 

                if (target.files != null) {

                    setImage(target.files[0]);

                };
                
            break;
        }
    }
    
    const saveDriver = async () => {

        const newDriver = {
            name: name,
            age: age,
            nationality: nationality,
            image: image?.name
        };
        
        // This if-statment makes it so atleast namw has to be changed about the default values
        // to be able to create a new driver.
        if (newDriver.name != "Not defined") {

            let imagePath = `http://localhost:5034/images/unknownCharacter.png`;

            if (image != null) {

                imagePath = `http://localhost:5034/images/${image.name}`;

            }

            const success = await postDriver(newDriver, image);

            if (success) {

                setShowcaseImage(imagePath);
                alert("Success! Driver was posted.");

            };

            setTimeout(() => {

                getDriversData();

            }, 1500);
            
        } else {

            alert("Driver needs atleast a name, to be created.");
            
        };
    };

    return (
        <>
            <article className="col-md-12 col-lg-9">
                <div className="driverArticle d-flex align-items-center">

                    <div className="col-3">
                        <img className="driverImage w-100 rounded shadow-lg" src={showcaseImage} alt="driver-image.jpg" />
                    </div>

                    <div className="col-4">
                        <div className="d-flex flex-column w-100 ms-5">
                            <input className="inputField" type="text" name="driver-name" onChange={(e) => {handleDriverCreation(e.currentTarget, e.currentTarget.name)}} placeholder="Driver name..." />
                            <input className="inputField" type="text" name="driver-age" onChange={(e) => {handleDriverCreation(e.currentTarget, e.currentTarget.name)}} placeholder="Driver age..." />
                            <input className="inputField" type="text" name="driver-nationality" onChange={(e) => {handleDriverCreation(e.currentTarget, e.currentTarget.name)}} placeholder="Driver nationality..." />
                            <input className="m-3" type="file" name="driver-image" onChange={(e) => {handleDriverCreation(e.currentTarget, e.currentTarget.name)}}/>

                            <button className="warningButton btn btn-warning m-3 ms-0 w-75 text-nowrap" onClick={saveDriver} >Upload Driver</button>
                        </div>
                    </div>

                    <div className="col-5">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h1 className="display-5 mb-5">{name}</h1>
                            <h3>Age: {age}</h3>
                            <h3>Nationality: {nationality}</h3>
                        </div>
                    </div>
                    
                </div>   
            </article>
        </>
    );
};

export default UploadDriver;