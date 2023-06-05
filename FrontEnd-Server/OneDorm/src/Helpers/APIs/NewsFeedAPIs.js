import {GET } from '../APIsAll'


export async function NewsFeed (id){
    const res = await GET (`NewsFeed/${id}`);
    if (res.status=='201'){
            return res;
    }else {
            return res.data;
    }
}