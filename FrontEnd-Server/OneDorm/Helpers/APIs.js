import axios from 'axios';

const httpLink = "http://localhost:3000/api/";

export async function GET (str){
    try {
        const response = await axios.get(httpLink + str);
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        return error.response;
      }
}

export async function POST (str,data){
    try {
        const response = await axios.post(httpLink + str, data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        return error.response;
      }
}
