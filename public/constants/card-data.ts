export const Cards: Card[] = [
    { type: 'spade', img: '/assets/cards/ace_of_spades.png', no: 1, },
    { type: 'spade', img: '/assets/cards/2_of_spades.png', no: 2, },
    { type: 'spade', img: '/assets/cards/3_of_spades.png', no: 3, },
    { type: 'spade', img: '/assets/cards/4_of_spades.png', no: 4, },
    { type: 'spade', img: '/assets/cards/5_of_spades.png', no: 5, },
    { type: 'spade', img: '/assets/cards/6_of_spades.png', no: 6, },
    { type: 'spade', img: '/assets/cards/7_of_spades.png', no: 7, },
    { type: 'spade', img: '/assets/cards/8_of_spades.png', no: 8, },
    { type: 'spade', img: '/assets/cards/9_of_spades.png', no: 9, },
    { type: 'spade', img: '/assets/cards/10_of_spades.png', no: 10, },
    { type: 'spade', img: '/assets/cards/jack_of_spades.png', no: 11, },
    { type: 'spade', img: '/assets/cards/queen_of_spades.png', no: 12, },
    { type: 'spade', img: '/assets/cards/king_of_spades.png', no: 13, },

    { type: 'diamond', img: '/assets/cards/ace_of_diamonds.png', no: 1, },
    { type: 'diamond', img: '/assets/cards/2_of_diamonds.png', no: 2, },
    { type: 'diamond', img: '/assets/cards/3_of_diamonds.png', no: 3, },
    { type: 'diamond', img: '/assets/cards/4_of_diamonds.png', no: 4, },
    { type: 'diamond', img: '/assets/cards/5_of_diamonds.png', no: 5, },
    { type: 'diamond', img: '/assets/cards/6_of_diamonds.png', no: 6, },
    { type: 'diamond', img: '/assets/cards/7_of_diamonds.png', no: 7, },
    { type: 'diamond', img: '/assets/cards/8_of_diamonds.png', no: 8, },
    { type: 'diamond', img: '/assets/cards/9_of_diamonds.png', no: 9, },
    { type: 'diamond', img: '/assets/cards/10_of_diamonds.png', no: 10, },
    { type: 'diamond', img: '/assets/cards/jack_of_diamonds.png', no: 11, },
    { type: 'diamond', img: '/assets/cards/queen_of_diamonds.png', no: 12, },
    { type: 'diamond', img: '/assets/cards/king_of_diamonds.png', no: 13, },

    { type: 'heart', img: '/assets/cards/ace_of_hearts.png', no: 1, },
    { type: 'heart', img: '/assets/cards/2_of_hearts.png', no: 2, },
    { type: 'heart', img: '/assets/cards/3_of_hearts.png', no: 3, },
    { type: 'heart', img: '/assets/cards/4_of_hearts.png', no: 4, },
    { type: 'heart', img: '/assets/cards/5_of_hearts.png', no: 5, },
    { type: 'heart', img: '/assets/cards/6_of_hearts.png', no: 6, },
    { type: 'heart', img: '/assets/cards/7_of_hearts.png', no: 7, },
    { type: 'heart', img: '/assets/cards/8_of_hearts.png', no: 8, },
    { type: 'heart', img: '/assets/cards/9_of_hearts.png', no: 9, },
    { type: 'heart', img: '/assets/cards/10_of_hearts.png', no: 10, },
    { type: 'heart', img: '/assets/cards/jack_of_hearts.png', no: 11, },
    { type: 'heart', img: '/assets/cards/queen_of_hearts.png', no: 12, },
    { type: 'heart', img: '/assets/cards/king_of_hearts.png', no: 13, },

    { type: 'club', img: '/assets/cards/ace_of_clubs.png', no: 1, },
    { type: 'club', img: '/assets/cards/2_of_clubs.png', no: 2, },
    { type: 'club', img: '/assets/cards/3_of_clubs.png', no: 3, },
    { type: 'club', img: '/assets/cards/4_of_clubs.png', no: 4, },
    { type: 'club', img: '/assets/cards/5_of_clubs.png', no: 5, },
    { type: 'club', img: '/assets/cards/6_of_clubs.png', no: 6, },
    { type: 'club', img: '/assets/cards/7_of_clubs.png', no: 7, },
    { type: 'club', img: '/assets/cards/8_of_clubs.png', no: 8, },
    { type: 'club', img: '/assets/cards/9_of_clubs.png', no: 9, },
    { type: 'club', img: '/assets/cards/10_of_clubs.png', no: 10, },
    { type: 'club', img: '/assets/cards/jack_of_clubs.png', no: 11, },
    { type: 'club', img: '/assets/cards/queen_of_clubs.png', no: 12, },
    { type: 'club', img: '/assets/cards/king_of_clubs.png', no: 13, },
];

export interface Card {
    no: number;
    type: 'spade' | 'heart' | 'diamond' | 'club',
    img: string,
}

/**
 * In Unicode
 * U+2660 ♠ BLACK SPADE SUIT
 * U+2661 ♡ WHITE HEART SUIT
 * U+2662 ♢ WHITE DIAMONdD SUIT
 * U+2663 ♣ BLACK CLUB SUIT
 * U+2664 ♤ WHITE SPADE SUIT
 * U+2665 ♥ BLACK HEART SUIT
 * U+2666 ♦ BLACK DIAMONdD SUIT
 * U+2667 ♧ WHITE CLUB SUIT
 */
