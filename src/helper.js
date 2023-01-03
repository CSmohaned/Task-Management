import axios from 'axios';

async function regSw () {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/sw.js';
    const reg = await navigator.serviceWorker.register (url, {scope: '/'});
    console.log ('service config is', {reg});
    return reg;
  }
  throw Error ('serviceworker not supported');
}
async function subscribe (serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription ();
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe ({
        userVisibleOnly: true,
        applicationServerKey: 'BKkC8E5P3M7n5fJaVWoBrivhHo5MgjWl_uaVM2bOr3V1U8bnF3MaqanDKU0TWn4zyYx2XXmjRHB0lW_cSPqMC8E',
      });
      axios.post ('http://localhost:8081/subscribe', subscription);
  }}
  
  
  export {regSw, subscribe};