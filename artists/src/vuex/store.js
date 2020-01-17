import Vue from "vue";
import Vuex from "vuex"



Vue.use(Vuex)
const state = {
    tid: "",
    tname: "",
    oid: "",
    password: "" ,
    url:"",
    organization:"",
}
const mutations = {
    updateUserName: (state, content) => {
        state.oid = content.oid;
        state.password = content.password;
        state.tid = content.tid;
        state.tname = content.tname;
        state.url= "http://139.9.115.22:8080";
        state.organization=content.organization;
    },
}
const actions = {
    actionUpdateName(context, content) {
        return context.commit('updateUserName', content)
    },
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
})