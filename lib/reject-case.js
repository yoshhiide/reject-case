'use strict';

exports.Reject = {

  error:     (msg) => Promise.reject({ type: 'ERROR', msg }),

  bug:       (msg) => Promise.reject({ type: 'BUG', msg }),

  notice:    (msg) => Promise.reject({ type: 'NOTICE', msg }),

  normal:    (msg, log) => Promise.reject({ type: 'NORMAL', msg, log }),

  callback:  (...args) => Promise.reject({ type: 'CALLBACK', callback: args }),

};

exports.RejectCase = (err) => {

  if (!err) return;

  switch(err.type) {

    case 'ERROR': {
      console.trace(`[${ new Date() }] ERROR ${ errMsg(err) }`);
      break;
    }

    case 'BUG': {
      console.trace(`[${ new Date() }] BUG ${ errMsg(err) }`);
      break;
    }

    case 'NOTICE': {
      console.log(`[${ new Date() }] NOTICE ${ errMsg(err) }`);
      break;
    }

    case 'NORMAL': {
      if (true === err.log) {
        console.log(`[${ new Date() }] NORMAL ${ errMsg(err) }`);
      }
      break;
    }

    case 'CALLBACK': {
      return Promise.all(err.callback.map(callback));
      break;
    }

    default: {
      console.log(err);
    }
  }

};

const errMsg = (err) => {

  if (!err) {
    return '';
  }

  if ('string' === typeof err) {
    return err;
  }

  return err.msg;
};

const callback = (fn) => {
  if ('function' === typeof fn) {
    return fn();
  }

  return fn;
};
