import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Player from '../components/player';
import { PlayerType, Playing } from '../public/interfaces/Playing.interface';

type Props = { host: string | null };

const Channel: NextPage<Props> = ({ host }) => {
    const router = useRouter();
    const { channel } = router.query;
    const hostUrl = host + '/' + channel;

    const createPlayer = (t: PlayerType, name: string): Playing => {
        return {
            name: name,
            type: t,
            hands: [],
            point: 0,
            status: ''
        };
    }

    let [playing, setPlaying] = useState<Playing[]>([] as any);
    let [MyPlaying, setMyPlaying] = useState<Playing>(createPlayer('dealer', 'เจ้ามือ'));
    let [gameStatus, setGameStatus] = useState<string>('waiting');

    const startPlayingCard = () => {
        navigator.clipboard.writeText(hostUrl);

        let players = [createPlayer('player', 'ผู้เล่น 1'), createPlayer('player', 'ผู้เล่น 2')];
        setPlaying([...playing, ...players]);
        setTimeout(() => {
            players = [...players, createPlayer('player', 'ผู้เล่น 3')];
            setPlaying([...playing, ...players]);
        }, 3000);
    }

    const onDealCards = () => {
        console.log(`🔰 ~ onDealCards`);
    }

    useEffect(() => {
        if (playing.length === 3) {
            setGameStatus('ready');
        }
    }, [playing]);

    return (<>
        <Layout>
            <div className=''>
                <div className='text-2xl text-white px-3 pt-3'>POKDENG SIMULATOR</div>

                <div className='flex p-3'>
                    <div className='flex-1 mr-2'>
                        <input type='text' className='w-full' readOnly value={hostUrl} />
                    </div>
                    <div className='flex-initial'>
                        <button type='button' className='btn btn-primary' onClick={() => startPlayingCard()}>คัดลอก</button>
                    </div>
                </div>
                <div className='p-3'>
                    <hr className='border-gray-400' />
                </div>

                <div className='flex'>
                    <div className='w-1/3 mb-3 px-3'>
                        <Player data={playing[0]}></Player>
                    </div>
                    <div className='w-1/3 mb-3 px-3'>
                        <Player data={playing[1]}></Player>
                    </div>
                    <div className='w-1/3 mb-3 px-3'>
                        <Player data={playing[2]}></Player>
                    </div>
                </div>
                <div className='flex justify-center px-3'>
                    <div className='w-2/5'>
                        <Player data={MyPlaying} self={true} game={gameStatus} onClickDealCards={onDealCards}></Player>
                    </div>
                </div>
            </div>
        </Layout>
    </>);
};

export const getServerSideProps: GetServerSideProps<Props> =
    async context => ({ props: { host: context.req.headers.host || null } });

export default Channel;
