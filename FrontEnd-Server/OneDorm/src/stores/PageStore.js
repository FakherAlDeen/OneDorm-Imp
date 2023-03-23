import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const PageStore = defineStore('Page',{
    state: ()=>{
        return {
            PageIamIn:'landing',
        }
    },
    getters: {
        Page: (state) => state.PageIamIn,

    },
    actions:{
        ChangePage (newPage) {
            this.PageIamIn = newPage;
        }
    }

})
