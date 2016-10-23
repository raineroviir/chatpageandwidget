let URLS = require("json!./urls.json");

import fetch from 'isomorphic-fetch';
import Config from './config';

class ApiService {

    getUrlObj( action ) {
        if( typeof action === 'string' ) {
            let obj = {};
            let temp = action.split( '.' );
            obj.entry = temp[0];
            let urlPath = URLS;
            for( let i=0; i < temp.length ; i++ ) {
                if( !(urlPath && urlPath[ temp[ i ] ]) ) {
                    return;
                }
                urlPath = urlPath[ temp[ i ] ];
            }
            if( typeof urlPath.url != 'string' ) {
                return;
            }
            obj.url = urlPath.url;
            obj.method = urlPath.method;
            return obj;
        } 
    }
    parseUrl( url, params ) {
        return url.replace(
            /:[^\/\?\&]*/g,
            function(param) {
                return params[param.substr(1)];
            }
        );
    }

    getQueryparam( obj ) {
        let query = '';
        for( let  key in obj ) {
            if( typeof obj[key] != 'undefined' ) {
                query += '&' + key + '=' + obj[key];
            } 
        }
        return query.substr(1);

    }

    api( {
        action,
        payload = null,
        params = null,
        headers = {}
    } ) {

        return new Promise( (resolve, reject) => { 
            let obj = this.getUrlObj( action );
            if( !obj ) {
                console.log( 'Error in calling, ' + action );
                reject( 'Error in calling ' + action );
            }

            let url = Config[ obj.entry ];
            url = url + '/' + this.parseUrl( obj.url, params );
            
            let reqObj = {
                method: obj.method
            }
            if( payload ) {
                
                if( obj.method === 'get' || obj.method === 'GET' ) {
                    if( url.indexOf('?') === -1 ) {
                        url += '?' + this.getQueryparam(payload);
                    } else {
                        url += '&' + this.getQueryparam(payload);
                    }
                } else {
                    if( headers.enctype === 'multipart/form-data' ) {
                        let data = new FormData();
                        for( let key in payload ) {
                            data.append( key, payload[ key ] );
                        }
                        reqObj.body = data;
                        
                    } else if( headers.enctype === "application/x-www-form-urlencoded"){
                        reqObj.body = $.param( payload );
                        headers['Content-Type'] = 'application/json';
                    } else {
                        reqObj.body = JSON.stringify( payload );    
                        headers['Content-Type'] = 'application/json';
                    }
                    
                }
            }

            if (typeof(Storage) !== "undefined" && localStorage.getItem( "token" ) ) {
                let token = JSON.parse(localStorage.getItem("token"));
                reqObj.headers = Object.assign({
                  'Authorization': 'Bearer ' + token.access_token
                }, headers);
            }
            let status;
            fetch( url, reqObj )
            .then(
              ( response ) => {
                status = response.status;
                if ( status == 401 ) {
                    return {
                        ok : false,
                        error: 'unauthorized'
                    };
                } 
                if( status === 204 ) {
                  return {
                        ok : true
                    };  
                }
                return response.json();
              }
            ).then( json => {

                if( json && !json.error && (json.ok  || typeof json.ok === 'undefined' )  ) {
                    resolve( json );    
                } else {
                    console.log( 'status is not 200' );
                    reject( json );
                }
            });
        } );
    }
} 

export default new ApiService;
