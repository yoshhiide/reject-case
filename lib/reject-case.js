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

  const errObj = parseErr(err);
  const tag = (!!errObj && !!errObj.tag) ? `:${ errObj.tag }` : '';

  switch(errObj.type) {

    case 'ERROR': {
      console.log(`[${ new Date() }] ERROR${ tag } ${ errMsg(errObj) }`);
      console.trace();
      break;
    }

    case 'BUG': {
      console.log(`[${ new Date() }] BUG${ tag } ${ errMsg(errObj) }`);
      console.trace();
      break;
    }

    case 'NOTICE': {
      console.log(`[${ new Date() }] NOTICE${ tag } ${ errMsg(errObj) }`);
      break;
    }

    case 'NORMAL': {
      if (true === errObj.log) {
        console.log(`[${ new Date() }] NORMAL${ tag } ${ errMsg(errObj) }`);
      }
      break;
    }

    case 'CALLBACK': {
      return Promise.all(errObj.callback.map(callback));
      break;
    }

    default: {
      if (!!errObj.tag) {
        console.log(`[${ new Date() }] REJECT${ tag } ${ errMsg(errObj) }`);
      } else {
        console.log(errObj);
      }
    }
  }

};

const parseErr = (err) => {
  if ('string' === typeof err) {
    return err;
  }

  if (!err.err) {
    return Object.assign({}, err, { tag: err.tag });
  }

  if ('string' === typeof err.err) {
    return Object.assign({}, { msg: err.err, tag: err.tag });
  }

  return Object.assign({}, err.err, { tag: err.tag });
};

const errMsg = (errObj) => {

  if (!errObj) {
    return '';
  }

  if ('string' === typeof errObj) {
    return errObj;
  }

  return errObj.msg;
};

const callback = (fn) => {
  if ('function' === typeof fn) {
    return fn();
  }

  return fn;
};
