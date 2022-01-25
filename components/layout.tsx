import { NextPage } from 'next';
import Head from 'next/head';

const Layout: NextPage = ({ children }) => {
    return (<>
        <Head>
            <title>POKDENG SIMULATOR</title>
            <meta name="description" content="pokdeng simulator" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
            <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>

        <main className='min-h-screen overflow-auto' style={{ backgroundColor: '#014643' }}>
            <div className="mx-auto" style={{ width: '500px' }}>
                {children}
            </div>
        </main>
    </>);
}

export default Layout;
