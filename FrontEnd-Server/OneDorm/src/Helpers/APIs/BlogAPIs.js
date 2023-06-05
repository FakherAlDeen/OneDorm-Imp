import {GET,POST} from '../APIsAll'
import { UserStore } from '../../stores/UserStore';
export async function CreateBlog (data){
    const res = await POST ('CreateBlog',data);
    data['Token']= UserStore().UserID;
    console.log (data);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
    // return res;
}

export async function EditBlog (data){
    const res = await POST ('EditBlog',data);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
    // return res;
}

export async function GetBlog (Id){
    // console.log(Id);
    const res = await GET ('GetBlog/'+Id);
    if (res.status=='200'){
            return res;
    }else {
            return res;
    }
    // return res;
}

export async function DeleteBlog(data){
    const res = await POST ('DeleteBlog',data);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}

export async function BlogVote(data){
    const res = await POST ('BlogVote',data);
    if (res.status=='201'){
            return res;
    }else {
            return res;
    }
    // return res;
}