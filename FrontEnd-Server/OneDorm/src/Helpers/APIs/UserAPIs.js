import {GET,POST} from '../../../Helpers/APIs'


export async function GetUser (Id){
    const res = await GET (`GetUser/${Id}`);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}