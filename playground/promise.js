// promises are a better way to handle asynchdronous prorams than callbacks.
var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve('Hey there...! It works....');
  }, 2000)
});
// resolve and reject the arguments are actually functions , which run the code.
// resolve means -> success. the code fullfilled the promise.
// reject means -> error, the code failed to fulfill the promise
// we can call either resolve or reject only once and any one of them. at a time.


somePromise.then((message) => { // the then method handles the success or error by assigning a functions
  // to each , either success case, or fail case.
  console.log(message)
}, (err) => {
  console.log(err)
})


// unlike callbacks , since promise have only one outcome, it makes them more handy and easy
// to work with. We do not need to worry if we called the same callback twice by mistake.
// also, since it has a callback funciton to handle either success or error case. it makes
// it easy for developers to write smaller and better programs.

var asyncAdd = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a + b);
      } else {
        reject('Sorry...!')
      }
    }, 2000)
  });
}

asyncAdd(5,7).then((result) => {
    console.log(result);
    return asyncAdd(result, 33)
}).then((result) => {
  console.log(result)
}).catch((errorMessage) => {
  console.log(errorMessage)
})
// we returned a new instance of the asyncAdd function.
// so that we could another then method to it.
// also, if we were to add errorMessage for each of the promise case,
// we would get the first result as sorry, and then the second success case would run but with,
// the result variable undefined, since first then method failed.
