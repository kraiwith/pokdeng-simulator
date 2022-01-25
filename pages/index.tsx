import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../components/layout'

const Home: NextPage = () => {
  const route = useRouter();
  const allText = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

  const randomCode = (codeLength = 6) => {
    let code = '';
    const randomLength = allText.length;
    for (let i = 0; i < codeLength; i++) {
      const textIndex = Math.floor(Math.random() * randomLength);
      code += allText.charAt(textIndex);
    }
    return code;
  }

  const onCreateChannel = () => {
    const code = randomCode();
    route.push('/' + code);
  };

  return (<>
    <Layout>
      <div className="pt-28">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">
          POKDENG <br />
          SIMULATOR
        </h1>

        <div className="text-center">
          <button className="btn btn-primary w-40" onClick={() => onCreateChannel()}>
            สร้างห้องใหม่
          </button>
        </div>
      </div>
    </Layout>
  </>);
}

export default Home
