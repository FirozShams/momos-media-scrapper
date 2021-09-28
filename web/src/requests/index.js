import axios from 'axios';
import {setTokenToCookies, getTokenFromCookies} from '../utils'

export async function loginAction(reqBody) {
    try {
      const apiUrl = `http://localhost:3000/auth/login`;
      const res = await axios.post(apiUrl, reqBody);
      console.log(res.data)
      if (res.status === 201) {
        setTokenToCookies(res.data.data.access_token);
        return res.data.data.access_token;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
}

export async function getMediaList(type, search) {
    try {
      let apiUrl = `http://localhost:3000/media`;
      let queryParams = []
      if (type != "all"){
        queryParams.push(`type=${type}`)
      }

      if(search){
        queryParams.push(`search=${search}`)
      }

      if(queryParams){
        apiUrl += `?${queryParams.join('&')}`
      }

      const res = await axios.get(
          apiUrl,
          {
              headers:{
                  "Authorization":`Bearer ${getTokenFromCookies()}`
              }
          }
        );
      if (res.status === 200) {
        return res.data.data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
}