import axios from "axios";

const F1RaceService = (() => {

    const raceController = "http://localhost:5034/api/Race";

    const getAllRaces = async () => {

        try {

            const races = await axios.get(raceController);
            return races.data;

        } catch {

            console.log("Get all races failed.");
            return false;

        }
    };

    const getRaceById = async (id) => {

        try {

            const result = await axios.get(`${raceController}/${id}`);
            return result.data

        } catch {

            console.log("Get race by id failed.");
            return undefined;

        }
    };

    const postRace = async (newRace) => {

        try {

            await axios.post(raceController, newRace);
            return true;
            

        } catch {

            console.log("Post race failed.");
            return false;

        } 
    };

    const updateRace = async (raceToUpdate) => {

        try {
            
            await axios.put(raceController, raceToUpdate);
            return true;

        } catch {

            console.log("Updating race failed.");
            return false;

        }
    };

    const deleteRaceById = async (id) => {

        try {

            await axios.delete(`${raceController}/${id}`);
            return true;

        } catch {

            console.log("Delete race by id failed.");
            return false;

        };  
    };

    return {
        getAllRaces,
        getRaceById,
        postRace,
        updateRace,
        deleteRaceById
    }

})();

export default F1RaceService;