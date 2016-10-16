import Config from '../config';
import fetch from 'isomorphic-fetch';

export function loadBot() {
  return (dispatch, getState) => {
    dispatch({type: "BOT_ACTIVE"})
  }
}
