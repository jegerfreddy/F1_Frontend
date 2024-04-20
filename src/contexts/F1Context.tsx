import { useState, createContext, FC, ReactNode, useEffect } from 'react'
import { IF1Context } from "../interfaces/IF1Context";
import { IDriverItem } from '../interfaces/IDriverItem';
import F1DriverService from '../services/F1DriverService';
import DriverItem from '../components/DriverItem';
import F1RaceService from '../services/F1RaceService';
import { IRaceItem } from '../interfaces/IRaceItem';

export const F1Context = createContext<IF1Context | null>(null);

interface Props {children: ReactNode};

export const F1Provider : FC<Props> = ({children}) => {

  const [drivers, setDrivers] = useState<IDriverItem[]>([]);
  const [races, setRaces] = useState<IRaceItem[]>([]);
 
  const getDriverById = F1DriverService.getDriverById;
  const deleteDriverById = F1DriverService.deleteDriverById;
  const postDriver = F1DriverService.postDriver;
  const updateDriver = F1DriverService.updateDriver;

  const getRaceById = F1RaceService.getRaceById;
  const deleteRaceById = F1RaceService.deleteRaceById;
  const postRace = F1RaceService.postRace;
  const updateRace = F1RaceService.updateRace;

  const getDriversData = async () => {

    try {

      const data = await F1DriverService.getAllDrivers();
      setDrivers(data);
  
    } catch (error) {

      console.error("Error fetching data:", error);

    }
  };


  const getRacesData = async () => {

    try {

      const data = await F1RaceService.getAllRaces();
      setRaces(data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    getDriversData();
    getRacesData();

  }, []);

  
  // A method for handling both search by id, and name events
  const getDriversByFilter = async (value: string | number, name: string) => { 

    const imageHost = "http://localhost:5034/images/";

    if (typeof(value) == "number" && name == "driver-id-input"){

      const driver = drivers.filter( (driver) => { return driver.id == value }); 
      
      const driversJSX = driver.map( (driver, i) => {

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
            image={imageHost + image}
          ></DriverItem>
        );
      });
      
      return driversJSX;

    } else if (typeof(value) == "string" && name == "driver-name-input") {

      const driver = drivers.filter( (driver) => {return driver.name.toLowerCase().includes(value.toLowerCase()); });           

      const driversJSX = driver.map( (driver, i) => {

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
            image={imageHost + image}
          ></DriverItem>
        );
      });

      return driversJSX;

    };
  };

  return (
      <>
        <F1Context.Provider value={{
          drivers, getDriversData, getRacesData,
          deleteDriverById, deleteRaceById, getDriversByFilter,
          getDriverById, postDriver, updateDriver,
          postRace, updateRace, getRaceById, races}}>

          {children}
          
        </F1Context.Provider>
      </>
  );
};

export default F1Provider;