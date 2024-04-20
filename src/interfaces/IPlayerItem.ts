export interface IPlayerItem {
    id: number;
    name: string;
    image: string;
    selectedPlayer: (id: number) => any;
}