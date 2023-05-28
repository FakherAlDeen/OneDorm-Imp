import {GET,POST} from '../../../Helpers/APIs'

export async function CreateRequest (data){ // UserId , RequestMessage
        const res = await POST ('CreateRequest',data);
        if (res.status=='201'){
                return res;
        }else {
                return res.data;
        }
}
export async function GetRequests (){ // No arguments
    const res = await GET ('GetRequests');
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}
export async function ApproveRequest (data){ // RequestId
    const res = await POST ('ApproveRequest',data);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}
