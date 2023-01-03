import {regSw, subscribe} from '../../helper';
const Home = () => {
  async function registerAndSubscribe () {
    try {
      const serviceWorkerReg = await regSw ();
      await subscribe (serviceWorkerReg);
    } catch (error) {
      console.log (error);
    }
  }
  return (
    <div className='pt-40'>
      Home
      <button onClick={registerAndSubscribe}>
        subscribe for push notifications
      </button>
    </div>
  )
}

export default Home;