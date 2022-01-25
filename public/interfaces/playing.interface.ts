import { Card } from '../constants/card-data';

export type Playing = {
    name: string;
    type: PlayerType;
    hands: Card[];
    point: number;
    status: string;
}

export type PlayerType = 'player' | 'dealer';
