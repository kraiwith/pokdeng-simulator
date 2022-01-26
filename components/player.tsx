import { NextPage } from 'next';
import Image from 'next/image';
import { Playing, PlayingCard } from '../public/interfaces/playing.interface';

type Props = {
    play?: Playing;
    self?: boolean;
};

const Player: NextPage<Props> = (props) => {
    let { play, self } = props;

    // Elements
    let playerHeaderElement = <></>;
    let playerFooterElement = <></>;

    if (!play?.joined) {
        playerHeaderElement = (<>
            <div className="text-center text-white mb-3 mx-1 py-1" style={{ backgroundColor: '#002E2C' }}>
                รอ
            </div>
        </>);
    } else {

        if (play?.type === 'player') {
            playerHeaderElement = (<>
                <div className="flex mx-1 mb-3 text-white rounded-sm" style={{ backgroundColor: '#3388eb' }}>
                    <span className="flex-grow inline-block text-center p-1">
                        {play?.name}
                    </span>
                    <span className="inline-block py-1 px-2 bg-black/25 w-8 text-center">
                        {play.point}
                    </span>
                </div>
            </>);

            playerFooterElement = (<>
                <div className="text-center text-white text-sm h-4">
                    {play?.status}
                </div>
            </>);
        } else if (!self) {
            playerHeaderElement = (<>
                <div className="flex mx-1 mb-3 text-white rounded-sm" style={{ backgroundColor: '#b93f40' }}>
                    <span className="flex-grow inline-block text-center p-1">
                        {play?.name}
                    </span>
                    <span className="inline-block py-1 px-2 bg-black/25 w-8 text-center">
                        {play?.point}
                    </span>
                </div>
            </>);

            playerFooterElement = (<>
                <div className="text-center text-white text-sm h-4">
                    {play?.status}
                </div>
            </>);
        } else {
            playerHeaderElement = (<>
                <div className="flex mx-1 mb-3 text-white rounded-sm text-2xl" style={{ backgroundColor: '#b93f40' }}>
                    <span className="flex-grow inline-block text-center p-1">
                        {play?.name}
                    </span>
                    <span className="inline-block py-1 px-2 bg-black/25 w-11 text-center">
                        {play?.point}
                    </span>
                </div>
            </>);
        }
    }

    const cardElements = (<>
        <div className="flex-1 m-1 h-10" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src={play?.hands[0]?.img || '/assets/cards/placeholder.png'} alt="" width={100} height={150} objectFit='contain' />
        </div>
        <div className="flex-1 m-1 h-10" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src={play?.hands[1]?.img || '/assets/cards/placeholder.png'} alt="" width={100} height={150} objectFit='contain' />
        </div>
        <div className="flex-1 m-1 h-10" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src={play?.hands[2]?.img || '/assets/cards/placeholder.png'} alt="" width={100} height={150} objectFit='contain' />
        </div>
    </>);

    return (<>
        <div className="mb-5">
            {playerHeaderElement}

            <div className="flex mb-2">
                {cardElements}
            </div>

            {playerFooterElement}
        </div>
    </>);
}

export default Player;
