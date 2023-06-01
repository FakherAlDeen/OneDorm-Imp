import {GET} from '../../../Helpers/APIs'

export async function Notification (id){
    const res = await GET (`GetNotification/${id}`);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}

export async function OpenNotification (id){
    const res = await GET (`OpenNotification/${id}`);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}