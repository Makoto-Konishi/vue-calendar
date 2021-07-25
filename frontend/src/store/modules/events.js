import axios from 'axios';

const apiUrl = 'http://localhost:3000';

// state 状態管理するデータを定義する
const state = {
  events: []
};
// getters stateの値を取り出す関数を定義する
const getters = {
  events: state => state.events
};
// mutations eventsデータをstateに保存する関数を定義する
const mutations = {
  setEvents: (state, payload) => (state.events = payload)
};
// actions axiosでAPIリクエストを送信してeventsデータを取得し、mutationsを呼び出す関数を定義する
const actions = {
  async fetchEvents({commit}){
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data);
  }
};

export default{
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
