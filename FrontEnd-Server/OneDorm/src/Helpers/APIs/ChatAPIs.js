import {POST ,GET} from '../../../Helpers/APIs'

export async function CreatChat (data){
    const res = await POST ('CreatChat',data);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
    // return res;
}

export async function GetChat (id){
    const res = await GET (`GetChat/${id}`);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}
