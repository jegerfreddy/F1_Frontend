import axios from "axios";

const F1DriverService = (() => {

    const driverController = "http://localhost:5034/api/Driver";
    const imageUploadController = 'http://localhost:5034/api/ImageUpload';

    const getAllDrivers = async () => {

        try {

            const drivers = await axios.get(driverController);
            return drivers.data;

        } catch {

            console.log("Get all drivers failed.");
            return false;

        };
    };

    const getDriverById = async (id) => {

        try {

            const result = await axios.get(`${driverController}/${id}`);
            return result.data

        } catch {

            console.log("Get driver by id failed.");
            return false;

        };
    };

    const postDriver = async (newDriver, image) => {

        try {

            await axios.post(driverController, newDriver);

            if (image != null) {

                const formData = new FormData();
                formData.append("file", image);
            
                await axios({
                    url: imageUploadController,
                    method: "POST",
                    data: formData,
                    headers: {"Content-Type": "multipart/form-data"}
                });

                formData.delete("file");
            };

            return true;
            

        } catch {

            console.log("Post driver failed.");
            return false;

        };
    };

    const updateDriver = async (driverToUpdate) => {

        try {
            
            await axios.put(driverController, driverToUpdate);
            return true;

        } catch {

            console.log("Updating driver failed.");
            return false;

        };
    };

    const deleteDriverById = async (id) => {

        try {

            await axios.delete(`${driverController}/${id}`);
            return true;

        } catch {

            console.log("Delete driver by id failed.");
            return false;

        };
    };

    return {
        getAllDrivers,
        getDriverById,
        postDriver,
        updateDriver,
        deleteDriverById
    }

})();

export default F1DriverService;