import fetch from 'isomorphic-fetch';

export function postLoginRequest(){
	  return fetch('https://id.chat.center/oauth/token',
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify({
					  "username": "chat.center/sergey",
					  "password": "12345678",
					  "grant_type": "password"
					})
	  })
}