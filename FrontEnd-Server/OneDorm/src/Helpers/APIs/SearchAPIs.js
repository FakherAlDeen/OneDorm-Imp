import {GET } from '../APIsAll'


export async function SearchPost (SearchVal){
    const res = await GET (`SearchPost?query=${SearchVal}`);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}