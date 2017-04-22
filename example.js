'use strict';

//const { Reject, RejectCase } = require('reject-case');
const { Reject, RejectCase } = require('./lib/reject-case');

const promiseReject = () => {
  return Promise.reject('usual reject.');
};

const promiseError = () => {
  return Reject.error('output message to log & trace.\n00000');
};

const promiseBug = () => {
  return Reject.bug('output message to log & trace.');
};

const promiseNotice = () => {
  return Reject.notice('same usual reject. output message to log.');
};

const promiseNormal1 = () => {
  return Reject.normal('if second arg is true, output message to log.', true);
};

const promiseNormal2 = () => {
  return Reject.normal('if second arg is false, do nothing.');
};

const promiseCallback1 = () => {
  return Reject.callback('output message to log.', () => console.log('execute callback.'));
};

const promiseCallback2 = () => {
  return Reject.callback(() => console.log('execute callback.'));
};

const promiseCallback3 = () => {
  const setTime1 = () => new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  const setTime2 = () => new Promise((resolve) => setTimeout(() => resolve(2), 2000));
  return Reject.callback(setTime1, setTime2);
};


promiseReject()
  .catch((err) => RejectCase(err));

promiseError()
  .catch((err) => RejectCase(err));

promiseBug()
  .catch((err) => RejectCase(err));

promiseNotice()
  .catch((err) => RejectCase(err));

promiseNormal1()
  .catch((err) => RejectCase(err));

promiseNormal2()
  .catch((err) => RejectCase(err));

promiseCallback1()
  .catch((err) => RejectCase(err));

promiseCallback2()
  .catch((err) => RejectCase(err));

promiseCallback3()
  .catch((err) => RejectCase(err))
  .then((result) => console.log(result));


// other case

let cnt = 0;
const setTime = (resolve) => setTimeout(() => resolve('setTime' + ++cnt), 500);
const setTime1 = () => new Promise((resolve) => setTime(resolve));

async function main() {
  await Reject.notice('first await');
  await setTime1();
  await setTime1();
  return setTime1();
}

main()
  .then((msg) => console.log(msg))
  .catch((err) => RejectCase(err));
