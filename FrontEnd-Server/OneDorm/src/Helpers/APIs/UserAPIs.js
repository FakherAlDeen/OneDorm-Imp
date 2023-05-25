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
export async function EditProfile (data){
        console.log(data)  // UserId , Data
        const res = await POST ('EditProfile' , data);
        if (res.status=='201'){
                return res;
        }else {
                console.log(res)
                return res.data;
        }
}
export async function SetUsername (data){
        console.log(data) // UserId , Username
        const res = await POST ('SetUsername' , data);
        if (res.status == '201'){ // done
                console.log("Username set")
                return res;
        } else if(res.status == '205'){
                // username taken
                console.log("Username Taken");
        }
        else {
                console.log(res)
                return res.data;
        }
}
