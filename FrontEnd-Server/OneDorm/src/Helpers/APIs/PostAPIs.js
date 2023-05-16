import {GET,POST} from '../../../Helpers/APIs'

export async function CreatePost (data){
        console.log (data);
        const res = await POST ('CreatePost',data);
        console.log (res);
        // return res;
}