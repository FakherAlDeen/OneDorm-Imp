import {GET,POST} from '../../../Helpers/APIs'


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
export async function AddUserDetails (data){
        console.log(data)
        const res = await POST ('AddUserDetails' , data);
        if (res.status=='201'){
                return res;
        }else {
                console.log(res)
                return res.data;
        }
}
