import {GET,POST} from '../../../Helpers/APIs'

export async function SearchPost (SearchVal){
    const res = await GET (`SearchPost?query=${SearchVal}`);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}