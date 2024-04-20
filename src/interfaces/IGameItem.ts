import { IDriverItem } from "./IDriverItem";


export interface IGameComponent {
    drivers: IDriverItem[];
    getDriversByFilter: (value: never, name: string) => any;
}