import fetch from 'isomorphic-fetch';
import Config from '../../../config';

export function postLoginRequest(){
	  return fetch('https://id.'+ window.config.cc +'/oauth/token',
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify({
					  "username": window.config.cc + "/sergey",
					  "password": "12345678",
					  "grant_type": "password"
					})
	  })
}