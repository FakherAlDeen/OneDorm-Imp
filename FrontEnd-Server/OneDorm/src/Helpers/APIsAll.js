import axios from 'axios';

const httpLink = "http://localhost:3000/api/";

import { UserStore } from '../stores/UserStore';

export async function GET (str){
  try {
        const response = await axios.get(httpLink + str,{
          headers: {
            "x-access-token":UserStore().UserToken
          }
        });
        return response;
      } catch (error) {
        return error.response;
      }
}

export async function POST (str,data){
    try {
        const response = await axios.post(httpLink + str, data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "x-access-token":UserStore().UserToken
            }
        });
        return response;
      } catch (error) {
        return error.response;
      }
}

export async function PUTIMAGE (str,imageFile){
  try {
      const response = await axios.post(httpLink + str, imageFile, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "x-access-token":UserStore().UserToken
          }
      });
      return response;
    } catch (error) {
      return error.response;
    }
}

