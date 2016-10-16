let URLS = require("./urls.json");

import fetch from 'isomorphic-fetch';
import Config from './config';

/**
 * [ApiService description]
 * @param {[String]} url           [Required]
 * @param {[Object]} requestObject [Required]
 * @param {[Object]} payload
 */
export default function apiService(url, requestObject) {
  return new Promise((resolve, reject) => {
    fetch(url, requestObject)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }
      return response.json()
    }).then(json => {
      if (json && !json.error && (json.ok  || typeof json.ok === 'undefined')) {
        resolve(json)
      } else {
        console.log( 'status is not 200' )
        reject(json)
      }
    }).catch(e => console.log(e))
  })
}
