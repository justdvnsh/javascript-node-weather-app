console.log('Starting the app...');
// ashyncronous code.
setTimeout(() => {
  console.log('I am a callback...')
}, 2000);

// asynchronous means the basic code will be running while the callback is registered to wait for 2000 mili-seconds.

setTimeout(() => {
  console.log('I am also a call back but a differet one....')
}, 0)

console.log('Finishing up...');
