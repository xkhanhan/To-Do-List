import Vue from 'vue';
import Vuex from 'vuex';

import MyLocalStorage from "@/localStorage";
const local = new MyLocalStorage();
const localData = local.getItem("planLocal");
const array = localData ? localData.array : [];
console.log(array);
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dialogVisible: false,
        formDate: {
            title: "",
            time1: "",
            time2: "",
            type: "",
            container: "",
        },
        array : array,
    },
    mutations: {
        dialogVisible(state ,payload) {
            state.dialogVisible = payload;
        },
        formDate(state ,payload) {
            state.formDate = payload;
        },
        addArray(state ,payload){
            const key = "palnLocal";
            let data = local.getItem(key);
  
            if (data) {
              data.array.push(payload);
              local.setItem(key, data);
            } else {
              local.setItem(key, {
                array: [payload],
              });
            }

            state.array.push(payload);
        }
    },
   
})