export const Cards: Card[] = [
    { id: 's1', type: 'spade', img: '/assets/cards/ace_of_spades.png', point: 1, },
    { id: 's2', type: 'spade', img: '/assets/cards/2_of_spades.png', point: 2, },
    { id: 's3', type: 'spade', img: '/assets/cards/3_of_spades.png', point: 3, },
    { id: 's4', type: 'spade', img: '/assets/cards/4_of_spades.png', point: 4, },
    { id: 's5', type: 'spade', img: '/assets/cards/5_of_spades.png', point: 5, },
    { id: 's6', type: 'spade', img: '/assets/cards/6_of_spades.png', point: 6, },
    { id: 's7', type: 'spade', img: '/assets/cards/7_of_spades.png', point: 7, },
    { id: 's8', type: 'spade', img: '/assets/cards/8_of_spades.png', point: 8, },
    { id: 's9', type: 'spade', img: '/assets/cards/9_of_spades.png', point: 9, },
    { id: 's10', type: 'spade', img: '/assets/cards/10_of_spades.png', point: 0, },
    { id: 's11', type: 'spade', img: '/assets/cards/jack_of_spades.png', point: 0, },
    { id: 's12', type: 'spade', img: '/assets/cards/queen_of_spades.png', point: 0, },
    { id: 's13', type: 'spade', img: '/assets/cards/king_of_spades.png', point: 0, },

    { id: 'd1', type: 'diamond', img: '/assets/cards/ace_of_diamonds.png', point: 1, },
    { id: 'd2', type: 'diamond', img: '/assets/cards/2_of_diamonds.png', point: 2, },
    { id: 'd3', type: 'diamond', img: '/assets/cards/3_of_diamonds.png', point: 3, },
    { id: 'd4', type: 'diamond', img: '/assets/cards/4_of_diamonds.png', point: 4, },
    { id: 'd5', type: 'diamond', img: '/assets/cards/5_of_diamonds.png', point: 5, },
    { id: 'd6', type: 'diamond', img: '/assets/cards/6_of_diamonds.png', point: 6, },
    { id: 'd7', type: 'diamond', img: '/assets/cards/7_of_diamonds.png', point: 7, },
    { id: 'd8', type: 'diamond', img: '/assets/cards/8_of_diamonds.png', point: 8, },
    { id: 'd9', type: 'diamond', img: '/assets/cards/9_of_diamonds.png', point: 9, },
    { id: 'd10', type: 'diamond', img: '/assets/cards/10_of_diamonds.png', point: 0, },
    { id: 'd11', type: 'diamond', img: '/assets/cards/jack_of_diamonds.png', point: 0, },
    { id: 'd12', type: 'diamond', img: '/assets/cards/queen_of_diamonds.png', point: 0, },
    { id: 'd13', type: 'diamond', img: '/assets/cards/king_of_diamonds.png', point: 0, },

    { id: 'h1', type: 'heart', img: '/assets/cards/ace_of_hearts.png', point: 1, },
    { id: 'h2', type: 'heart', img: '/assets/cards/2_of_hearts.png', point: 2, },
    { id: 'h3', type: 'heart', img: '/assets/cards/3_of_hearts.png', point: 3, },
    { id: 'h4', type: 'heart', img: '/assets/cards/4_of_hearts.png', point: 4, },
    { id: 'h5', type: 'heart', img: '/assets/cards/5_of_hearts.png', point: 5, },
    { id: 'h6', type: 'heart', img: '/assets/cards/6_of_hearts.png', point: 6, },
    { id: 'h7', type: 'heart', img: '/assets/cards/7_of_hearts.png', point: 7, },
    { id: 'h8', type: 'heart', img: '/assets/cards/8_of_hearts.png', point: 8, },
    { id: 'h9', type: 'heart', img: '/assets/cards/9_of_hearts.png', point: 9, },
    { id: 'h10', type: 'heart', img: '/assets/cards/10_of_hearts.png', point: 0, },
    { id: 'h11', type: 'heart', img: '/assets/cards/jack_of_hearts.png', point: 0, },
    { id: 'h12', type: 'heart', img: '/assets/cards/queen_of_hearts.png', point: 0, },
    { id: 'h13', type: 'heart', img: '/assets/cards/king_of_hearts.png', point: 0, },

    { id: 'c1', type: 'club', img: '/assets/cards/ace_of_clubs.png', point: 1, },
    { id: 'c2', type: 'club', img: '/assets/cards/2_of_clubs.png', point: 2, },
    { id: 'c3', type: 'club', img: '/assets/cards/3_of_clubs.png', point: 3, },
    { id: 'c4', type: 'club', img: '/assets/cards/4_of_clubs.png', point: 4, },
    { id: 'c5', type: 'club', img: '/assets/cards/5_of_clubs.png', point: 5, },
    { id: 'c6', type: 'club', img: '/assets/cards/6_of_clubs.png', point: 6, },
    { id: 'c7', type: 'club', img: '/assets/cards/7_of_clubs.png', point: 7, },
    { id: 'c8', type: 'club', img: '/assets/cards/8_of_clubs.png', point: 8, },
    { id: 'c9', type: 'club', img: '/assets/cards/9_of_clubs.png', point: 9, },
    { id: 'c10', type: 'club', img: '/assets/cards/10_of_clubs.png', point: 0, },
    { id: 'c11', type: 'club', img: '/assets/cards/jack_of_clubs.png', point: 0, },
    { id: 'c12', type: 'club', img: '/assets/cards/queen_of_clubs.png', point: 0, },
    { id: 'c13', type: 'club', img: '/assets/cards/king_of_clubs.png', point: 0, },
];

export interface Card {
    id: string;
    type: 'spade' | 'heart' | 'diamond' | 'club',
    img: string,
    point: number;
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
