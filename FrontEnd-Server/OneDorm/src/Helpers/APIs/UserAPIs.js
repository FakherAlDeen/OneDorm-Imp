import {GET,POST,PUTIMAGE } from '../../../Helpers/APIs'


export async function GetUser (Id){
        const res = await GET (`GetUser/${Id}`);
        if (res.status=='201'){
            return res;
        }else {
            return res.data;
        }
}
export async function DeleteUser (data){
        console.log(data)
        const res = await POST ('DeleteUser' , data);
        if (res.status=='201'){
                return res;
        }else {
                console.log(res)
                return res.data;
        }
}
export async function AddHashtags (data){
        console.log(data)
        const res = await POST ('AddHashtags' , data);
        if (res.status=='201'){
                return res;
        }else {
                console.log(res)
                return res.data;
        }
}
export async function EditProfile (data){
        console.log(data)
        const res = await POST ('EditProfile' , data);
        if (res.status=='201'){
                return res;
        }else {
                return res.data;
        }
}

export async function SetUsername (data){
        console.log(data)
        const res = await POST ('SetUsername' , data);
        // console.log ("User", res);
        return res;
}

export async function UploadImage (data){
        const res = await PUTIMAGE ('UploadImage' , data);
        return res;
}

export async function GetImage (id){
        const res = await GET (`GetImage/${id}` );
        console.log (res);
        return res;
}