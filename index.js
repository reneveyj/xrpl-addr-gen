const RippleAPI = require('ripple-lib').RippleAPI;

if(process.argv.length < 3 || !Number.isInteger(Number(process.argv[2]))) return console.log('Usage for 10 addresses: node . 10 [test]');

const server = process.argv.length == 4 && process.argv[3] == 'test' ? 'wss://s.altnet.rippletest.net:51233' : 'wss://s1.ripple.com';

const api = new RippleAPI({
  server 
});
api.on('error', (errorCode, errorMessage) => {
  console.log(errorCode + ': ' + errorMessage);
});
api.on('connected', () => {
  console.log('connected');
});
api.connect().then(() => {
   for(i = 0; i < process.argv[2]; i++){
      const pair = api.generateAddress();
      console.log(`${pair.address},${pair.secret}`);
   }
}).then(() => {
  return api.disconnect();
}).catch(console.error);
