import {GET,POST} from '../../../Helpers/APIs'

export async function CreatePost (data){
        console.log (data);
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
        if (res.status=='201'){
                console.log (res);
                return res;
        }else {
                console.log (res);
                return res;
        }
        // return res;
}

export async function CreateAnswer (data){
        console.log (data);
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
                console.log (res);
                return res;
        }else {
                console.log (res);
                return res;
        }
        // return res;
}