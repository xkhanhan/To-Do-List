import Vue from 'vue';
import Vuex from 'vuex';

import MyLocalStorage from "@/localStorage";

// 总计划 数据
const localAll = new MyLocalStorage('allPlanLocal');
const localDataAll = localAll.getItem();
const allArray = localDataAll ? localDataAll.array : [];

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        dialogVisible: false, // 控制表单的展示与隐藏

        /**
         * 控制表单的数据内容
         */
        formDate: {
            title: "", // 计划头
            time1: "", // 计划开始时间
            time2: "", // 计划结束时间
            type: "", // 计划类型
            container: "", // 计划内容
            isComp: false, // 计划是否完成
            submit : false,
        },

        index: 0, // 修改数据时数据的下标
        typeBtn: 'add',// 控制表单的功能为 添加 还是 修改
        allArray, //  计划任务的数据
    },
    mutations: {
        dialogVisible(state, payload) {
            state.dialogVisible = payload;
        },
        formDate(state, payload) {
            state.formDate = payload;
        },
        typeBtn(state, payload) {
            state.typeBtn = payload;
        },
        index(state, payload) {
            state.index = payload;
        },

        // 添加数据
        addArray(state, payload) {
            state.submit = false;
            state.allArray.push(payload); // 向总计划数据中添加一条数据
            // 重新赋值总计划数据
            localAll.setItem({
                array: state.allArray,
            });
        },

        // 修改数据
        updateArray(state, payload) {
            state.submit = false;
            // 修改总计划数据中的值
            state.allArray.splice(state.index, 1, payload);
            // 重新赋值
            localAll.setItem({
                array: state.allArray,
            });
        },

        completePlan(state, payload) {
            const form = state.allArray[payload];
            const tim2 = new Date();
            Vue.set(form, "isComp", true);
            Vue.set(form, "time2" , tim2);
            // 重新赋值
            localAll.setItem({
                array: state.allArray,
            });
        },

        remove(state){
            const len = state.allArray.length;
            state.allArray.splice(0,len); 
            localAll.setItem({
                array: state.allArray,
            });
        }

    },
})