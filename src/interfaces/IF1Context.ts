import { IDriverItem } from "./IDriverItem";
import { IRaceItem } from "./IRaceItem";

export interface IF1Context {
    drivers: IDriverItem[];
    races: IRaceItem[];
    getDriverById: (id: number) => any;
    deleteDriverById: (id: number) => any;
    deleteRaceById: (id: number) => any;
    getDriversData: () => any;
    getRacesData: () => any;
    getDriversByFilter: (value: number | string, name: string) => any
    postDriver: (driver: {}, image: File | null) => any;
    updateDriver: (driver: {}) => any;
    postRace: (race: {}) => any;
    updateRace: (race: {}) => any;
    getRaceById: (id: number) => any
};