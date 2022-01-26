import { Card } from '../constants/card-data';

export type Playing = {
    id?: number;
    name: string;
    joined: boolean;
    type: PlayerType;
    hands: Card[];
    point: number;
    status: PlayingType;
}

export type PlayerType = 'player' | 'dealer';

export type PlayingCard = '' | 'ready' | 'dealing cards' | 'checking' | 'dealing more card' | 'over';

export type PlayingType = '' | 'รอสถานะ' | 'บังคับจั่ว' | 'จั่วไพ่' | 'ไพ่ป๊อก' | 'ชนะ' | 'แพ้';
