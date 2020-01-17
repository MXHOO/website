import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  aid: '',
  url: '',
  aname: ''
}
const mutations = {
  updateUserName: (state, content) => {
    state.aid = content.aid
    state.url = 'http://10.12.91.17:8080'
    state.aname = content.aname
  }
}

const actions = {
  actionUpdateName (context, content) {
    return context.commit('updateUserName', content)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
