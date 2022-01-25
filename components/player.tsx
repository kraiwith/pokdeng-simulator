import { NextPage } from 'next';
import Image from 'next/image';
import { Playing } from '../public/interfaces/Playing.interface';

type Props = {
    data?: Playing;
    self?: boolean;
    game?: string;
    onClickDealCards?: () => void,
};

const Player: NextPage<Props> = (props) => {
    let { data, self, game, onClickDealCards } = props;

    return <>
        <div className="mb-5">
            {
                !data ?
                    <div className="text-center text-white mb-3 mx-1 py-1" style={{ backgroundColor: '#002E2C' }}>
                        รอ
                    </div> : <></>
            }
            {
                data?.type === 'player' ?
                    <div className="flex mx-1 mb-3 text-white rounded-sm align-middle" style={{ backgroundColor: '#3388eb' }}>
                        <span className="flex-grow inline-block text-center p-1">
                            {data?.name}
                        </span>
                        <span className="inline-block py-1 px-2 bg-black/25 w-8 text-center">
                            {data.point}
                        </span>
                    </div> : <></>
            }
            {
                !self && data?.type === 'dealer' ?
                    <div className="flex mx-1 mb-3 text-white rounded-sm align-middle" style={{ backgroundColor: '#b93f40' }}>
                        <span className="flex-grow inline-block text-center p-1">
                            {data?.name}
                        </span>
                        <span className="inline-block py-1 px-2 bg-black/25 w-8 text-center">
                            {data?.point}
                        </span>
                    </div> : <></>
            }
            {
                self && data?.type === 'dealer' ?
                    <div className="flex mx-1 mb-3 text-white rounded-sm align-middle text-2xl" style={{ backgroundColor: '#b93f40' }}>
                        <span className="flex-grow inline-block text-center p-1">
                            {data?.name}
                        </span>
                        <span className="inline-block py-1 px-2 bg-black/25 w-11 text-center">
                            {data?.point}
                        </span>
                    </div> : <></>
            }

            <div className="flex mb-2">
                <div className="flex-1 m-1 h-10" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image src={'/assets/cards/placeholder.png'} alt="" width={100} height={150} objectFit='cover' unoptimized />
                </div>
                <div className="flex-1 m-1 h-10" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image src={'/assets/cards/placeholder.png'} alt="" width={100} height={150} objectFit='cover' unoptimized />
                </div>
                <div className="flex-1 m-1 h-10" style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image src={'/assets/cards/placeholder.png'} alt="" width={100} height={150} objectFit='cover' unoptimized />
                </div>
            </div>

            {
                data?.type === 'player' ?
                    <div className="text-center text-white text-sm">
                        {data?.status}
                    </div> : <></>
            }

            {
                data?.type === 'dealer' && self && game === 'playing' ?
                    <div className="flex mx-1 mb-3 text-white p-1 rounded align-middle" style={{ backgroundColor: '#001e1d' }}>
                        <span className="inline-block">
                            <span className="inline-block rounded text-lg font-semibold bg-white/5 w-10 text-center">
                                00
                            </span>
                        </span>
                        <span className="flex-grow inline-block text-center">
                            {data?.status}
                        </span>
                    </div> : <></>
            }

            {
                data?.type === 'dealer' && self && game === 'ready' ?
                    <div className="mx-1">
                        <button type='button' className='btn btn-primary w-full' onClick={() => onClickDealCards ? onClickDealCards() : null}>แจกไพ่</button>
                    </div> : <></>
            }
        </div>
    </>;
}

export default Player;
