import axios from 'axios';

const apiUrl = 'http://localhost:3000';

// state 状態管理するデータを定義する
const state = {
  events: [],
  event: null,
  isEditMode: false,
};
// getters stateの値を取り出す関数を定義する
const getters = {
  events: (state) =>
    state.events.map((event) => {
      return {
        // 文字列からDate型に変換するために、eventの要素を全て展開して、startとend要素をnew Dateで上書きする
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    }),
  event: (state) =>
    state.event
      ? {
          ...state.event,
          start: new Date(state.event.start),
          end: new Date(state.event.end),
        }
      : null,
  isEditMode: (state) => state.isEditMode,
};
// mutations eventsデータをstateに保存する関数を定義する
const mutations = {
  setEvents: (state, events) => {
    state.events = events;
  },
  setEventMutations: (state, event) => {
    state.event = event;
  },
  setEditMode: (state, bool) => {
    state.isEditMode = bool;
  },
  appendEvent: (state, event) => {
    state.events = [...state.events, event];
  },
};
// actions axiosでAPIリクエストを送信してeventsデータを取得し、mutationsを呼び出す関数を定義する
const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data);
  },
  // APIにPOSTリクエストを送り、データベースに新しいイベントデータを登録する
  async createEvent({ commit }, event) {
    const response = await axios.post(`${apiUrl}/events`, event);
    commit('appendEvent', response.data);
  },
  setEventActions({ commit }, event) {
    commit('setEventMutations', event);
  },
  setEditMode({ commit }, bool) {
    commit('setEditMode', bool);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
