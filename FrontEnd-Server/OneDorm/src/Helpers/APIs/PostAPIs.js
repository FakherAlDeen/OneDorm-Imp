import {GET,POST} from '../../../Helpers/APIs'

export async function CreatePost (data){
        const res = await POST ('CreatePost',data);
        if (res.status=='201'){
                return res;
        }else {
                return res.data;
        }
        // return res;
}


export async function GetPost (Id){
        const res = await GET ('GetPost/'+Id);
        if (res.status=='200'){
                return res;
        }else {
                return res;
        }
        // return res;
}

export async function DeletePost(data){
        const res = await POST ('DeletePost',data);
        if (res.status=='201'){
                return res;
        }else {
                return res.data;
        }
}

export async function CreateAnswer (data){
        const res = await POST ('CreateAnswer',data);
        if (res.status=='201'){
                return res;
        }else {
                return res.data;
        }
        // return res;
}

export async function GetAnswer (Id){
        const res = await GET ('GetAnswer/'+Id);
        if (res.status=='201'){
                return res;
        }else {
                return res;
        }
        // return res;
}
export async function Vote(data){
        const res = await POST ('Vote',data);
        if (res.status=='201'){
                return res;
        }else {
                return res;
        }
        // return res;
}