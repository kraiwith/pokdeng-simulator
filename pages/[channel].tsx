import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/layout';
import Player from '../components/player';
import { Card, Cards } from '../public/constants/card-data';
import { Playing, PlayingCard } from '../public/interfaces/playing.interface';

type Props = { host: string | null };

type slotPlaying = {
    players: Playing[];
    self: Playing;
}

const slotPlayers: Playing[] = [
    { id: 1, name: '', joined: false, type: 'player', point: 0, status: '', hands: [], },
    { id: 2, name: '', joined: false, type: 'player', point: 0, status: '', hands: [], },
    { id: 3, name: '', joined: false, type: 'player', point: 0, status: '', hands: [], },
];
const selfPlayer: Playing = {
    id: 3, name: 'เจ้ามือ', joined: true, type: 'dealer', point: 0, status: '', hands: [],
}

const Channel: NextPage<Props> = ({ host }) => {
    const router = useRouter();
    const { channel } = router.query;
    const hostUrl = host + '/' + channel;

    // States
    const [slotPlaying, setSlotPlaying] = useState<slotPlaying>({
        players: slotPlayers,
        self: selfPlayer,
    });
    const [playingCard, setPlayingCard] = useState<PlayingCard>('');
    const [second, setSecond] = useState<number>(0);
    const [over, setOver] = useState<number>(0);
    let timer: any;
    let timerOver: any;

    // Functions
    function copyToClipboard() {
        navigator.clipboard.writeText(hostUrl);

        setSlotPlaying({
            players: slotPlayers,
            self: selfPlayer,
        });
        setPlayingCard('');

        joinPlayer({ id: 1, name: 'ผู้เล่น 1', joined: true, type: 'player', point: 0, status: '', hands: [] });
        joinPlayer({ id: 2, name: 'ผู้เล่น 2', joined: true, type: 'player', point: 0, status: '', hands: [] });
        setTimeout(() => {
            joinPlayer({ id: 3, name: 'ผู้เล่น 3', joined: true, type: 'player', point: 0, status: '', hands: [] });
            setPlayingCard('ready');
        }, 2000);
    }

    function joinPlayer(player: Playing) {
        setSlotPlaying(prevSlot => {
            return {
                ...prevSlot,
                players: prevSlot.players.map(thePlayer => {
                    if (thePlayer.id === player.id) { return player };
                    return thePlayer
                }),
            }
        });
    }

    async function startPlayingCardGame() {
        setPlayingCard('dealing cards');

        setSlotPlaying(prevSlot => {
            return {
                players: prevSlot.players.map(thePlayer => {
                    return { ...thePlayer, hands: [], point: 0, status: 'รอสถานะ' };
                }),
                self: { ...prevSlot.self, hands: [], point: 0, status: 'รอสถานะ' },
            }
        });

        // first card
        await dealCardPlayers(0);
        await dealCardPlayers(1);
        await dealCardPlayers(2);
        await dealCardSelf();

        // second card
        await dealCardPlayers(0);
        await dealCardPlayers(1);
        await dealCardPlayers(2);
        await dealCardSelf();

        checkingCards();
    }

    function dealCardPlayers(dIndex: number, drawMore = false) {
        setSlotPlaying(prevSlot => {
            // take all hand cards
            let allPlayerCards: Card[] = [...prevSlot.self.hands];
            prevSlot.players.forEach(thePlayer => {
                allPlayerCards = [...allPlayerCards, ...thePlayer.hands]
            });
            // filter already has cards
            const cards: Card[] = Cards.filter(card => {
                return !allPlayerCards.find(playerCard => card.id === playerCard.id);
            });
            // draw new card
            const drawCard: Card = cards[Math.floor(Math.random() * cards.length)];

            return {
                ...prevSlot,
                players: prevSlot.players.map((thePlayer, pIndex) => {
                    if (dIndex !== pIndex) { return { ...thePlayer }; }

                    let hands = [...thePlayer.hands];
                    if (!drawMore || thePlayer.status === 'จั่วไพ่' || thePlayer.status === 'บังคับจั่ว') {
                        hands = [...hands, drawCard];
                    }

                    const totalPoint: number = hands.reduce((p, v) => p + v.point, 0);
                    const point = totalPoint > 9 ? +(totalPoint.toString().charAt(1) || 0) : totalPoint;

                    return { ...thePlayer, hands, point };
                }),
            };
        });

        return new Promise<boolean>((res, rej) => setTimeout(() => {
            res(true);
        }, 500));
    }

    function dealCardSelf(drawMore = false) {
        setSlotPlaying(prevSlot => {
            // take all hand cards
            let allPlayerCards: Card[] = [...prevSlot.self.hands];
            prevSlot.players.forEach(thePlayer => {
                allPlayerCards = [...allPlayerCards, ...thePlayer.hands]
            });
            // filter already has cards
            const cards: Card[] = Cards.filter(card => {
                return !allPlayerCards.find(playerCard => card.id === playerCard.id);
            });
            // draw new card
            const drawCard: Card = cards[Math.floor(Math.random() * cards.length)];

            let hands = [...prevSlot.self.hands];
            if (!drawMore || prevSlot.self.status === 'จั่วไพ่' || prevSlot.self.status === 'บังคับจั่ว') {
                hands = [...hands, drawCard];
            }
            const totalPoint: number = hands.reduce((p, v) => p + v.point, 0);
            const point = totalPoint > 9 ? +(totalPoint.toString().charAt(1) || 0) : totalPoint;

            return {
                ...prevSlot,
                self: { ...prevSlot.self, hands, point },
            }
        });

        return new Promise<boolean>((res, rej) => setTimeout(() => {
            res(true);
        }, 500));
    }

    function checkingCards() {
        setPlayingCard('checking');

        setSlotPlaying(prevSlot => {
            let lowestNumber: number = prevSlot.players.reduce((pre, thePlayer) => {
                return Math.min(pre, thePlayer.point);
            }, 0);
            lowestNumber = Math.min(lowestNumber, prevSlot.self.point);

            return {
                players: prevSlot.players.map(thePlayer => {
                    if (thePlayer.point > 7) {
                        return { ...thePlayer, status: 'ไพ่ป๊อก' };
                    }

                    if (thePlayer.point <= lowestNumber) { return { ...thePlayer, status: 'บังคับจั่ว' }; }
                    return { ...thePlayer, status: '' };
                }),
                self: { ...prevSlot.self, status: '' },
            }
        });

        setSlotPlaying(prevSlot => {
            return {
                ...prevSlot,
                players: prevSlot.players.map(thePlayer => {
                    if (!thePlayer.status) {
                        if (thePlayer.point < 2) {
                            return { ...thePlayer, status: 'บังคับจั่ว' };
                        }
                        if (thePlayer.point < 5) {
                            return { ...thePlayer, status: 'จั่วไพ่' };
                        }
                    }
                    return { ...thePlayer };
                }),
            }
        });
        startTimer();
    }

    function startTimer() {
        setSecond(10);
        timer = setInterval(countDown, 1000);
    }

    function countDown() {
        let currentSecond = 0

        setSecond(prevSecond => {
            currentSecond = prevSecond - 1;
            return currentSecond;
        });

        if (currentSecond <= 0) {
            clearInterval(timer);

            setSlotPlaying(prevSlot => {
                const isLowPlayer = !prevSlot.self.status && prevSlot.self.point < 2;
                return {
                    ...prevSlot,
                    self: { ...prevSlot.self, status: isLowPlayer ? 'บังคับจั่ว' : prevSlot.self.status }
                };
            });

            const drawMoreCard = async () => {
                setPlayingCard('dealing more card');

                await dealCardPlayers(0, true);
                await dealCardPlayers(1, true);
                await dealCardPlayers(2, true);
                await dealCardSelf(true);

                summaryPlayingCard();
            };
            drawMoreCard();
        }
    }

    function onClickDealMoreCard() {
        setPlayingCard('dealing more card');
        setSlotPlaying(prevSlot => {
            return {
                ...prevSlot,
                self: { ...prevSlot.self, status: 'จั่วไพ่' },
            }
        });
    }

    function summaryPlayingCard() {
        setSlotPlaying(prevSlot => {
            let highestNumber: number = prevSlot.players.reduce((pre, thePlayer) => {
                return Math.max(pre, thePlayer.point);
            }, 0);
            highestNumber = Math.max(highestNumber, prevSlot.self.point);

            return {
                ...prevSlot,
                players: prevSlot.players.map(thePlayer => {
                    const status = highestNumber === thePlayer.point ? 'ชนะ' : 'แพ้';
                    return { ...thePlayer, status }
                }),
                self: { ...prevSlot.self, status: highestNumber === prevSlot.self.point ? 'ชนะ' : 'แพ้' }
            }
        });

        setPlayingCard('over');
        startTimerOver();
    }

    function startTimerOver() {
        setOver(5);
        timerOver = setInterval(overCountDown, 1000);
    }

    function overCountDown() {
        let currentSecond = 0

        setOver(prevSecond => {
            currentSecond = prevSecond - 1;
            return currentSecond;
        });

        if (currentSecond <= 0) {
            clearInterval(timerOver);
            setPlayingCard('ready');
        }
    }

    // Elements
    let actionElement = <></>;
    let slotPlayEl = <></>;

    if (playingCard === 'ready') {
        actionElement = (<>
            <div className="mx-1">
                <button type='button' className='btn btn-primary w-full' onClick={startPlayingCardGame}>แจกไพ่</button>
            </div>
        </>);
    } else if (playingCard === 'dealing cards') {
        actionElement = (<>
            <div className="flex mx-1 mb-3 text-white p-1 rounded h-11" style={{ backgroundColor: '#001e1d' }}>
                <span className="inline-block">
                    <span className="flex items-center justify-center rounded text-lg font-semibold bg-white/5 w-10 h-full">
                        00
                    </span>
                </span>
                <span className="flex-grow flex justify-center items-center">
                    {slotPlaying.self.status}
                </span>
            </div>
        </>);
    } else if (playingCard === 'checking') {
        actionElement = (<>
            <div className="flex mx-1 mb-3 text-white p-1 rounded h-11" style={{ backgroundColor: '#001e1d' }}>
                <span className="inline-block mr-1">
                    <span className="flex items-center justify-center rounded text-lg font-semibold bg-white/5 w-10 h-full">
                        {second > 9 ? second : '0' + second}
                    </span>
                </span>
                <span className="flex-grow flex justify-center items-center">
                    <button type='button' className='btn w-full' style={{ backgroundColor: '#4fac3f' }} onClick={onClickDealMoreCard}>จั่วไพ่</button>
                </span>
            </div>
        </>);
    } else if (playingCard === 'dealing more card') {
        actionElement = (<>
            <div className="flex mx-1 mb-3 text-white p-1 rounded h-11" style={{ backgroundColor: '#001e1d' }}>
                <span className="inline-block mr-1">
                    <span className="flex items-center justify-center rounded text-lg font-semibold bg-white/5 w-10 h-full">
                        {second > 9 ? second : '0' + second}
                    </span>
                </span>
                <span className="flex-grow flex justify-center items-center">
                    {slotPlaying.self?.status}
                </span>
            </div>
        </>);
    } else if (playingCard === 'over') {
        actionElement = (<>
            <div className="flex mx-1 mb-3 text-white p-1 rounded h-11" style={{ backgroundColor: '#001e1d' }}>
                <span className="inline-block">
                    <span className="flex items-center justify-center rounded text-lg font-semibold bg-white/5 w-10 h-full">
                        {over > 9 ? over : '0' + over}
                    </span>
                </span>
                <span className="flex-grow flex justify-center items-center">
                    {slotPlaying.self?.status}
                </span>
            </div>
        </>);
    }

    slotPlayEl = (<>
        <div className='flex'>
            {
                slotPlaying.players.map(thePlayer => {
                    return (<div className='w-1/3 mb-3 px-3' key={thePlayer.id}>
                        <Player play={thePlayer} ></Player>
                    </div>);
                })
            }
        </div>
        <div className='flex justify-center px-3'>
            <div className='w-2/5'>
                <Player play={slotPlaying.self} self={true}></Player>
                {actionElement}
            </div>
        </div>
    </>);

    return (<>
        <Layout>
            <div className=''>
                <div className='text-2xl text-white px-3 pt-3'>POKDENG SIMULATOR</div>

                <div className='flex p-3'>
                    <div className='flex-1 mr-2'>
                        <input type='text' className='w-full' readOnly value={hostUrl} />
                    </div>
                    <div className='flex-initial'>
                        <button type='button' className='btn btn-primary' onClick={copyToClipboard}>คัดลอก</button>
                    </div>
                </div>
                <div className='p-3'>
                    <hr className='border-gray-400' />
                </div>

                {slotPlayEl}
            </div>
        </Layout>
    </>);
};

export const getServerSideProps: GetServerSideProps<Props> =
    async context => ({ props: { host: context.req.headers.host || null } });

export default Channel;
