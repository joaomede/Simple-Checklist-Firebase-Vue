import Vue from 'vue'
import Vuex from 'vuex'
import {db} from "./plugins/firebase"
import VueCookies from "vue-cookies"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    settingsColor: null,
    version: null
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getSettingsColor: state => {
      return state.settingsColor;
    },
    getVersion: state => {
      return state.version;
    }
  },
  mutations: {
    setUser(state) {
      db.collection("version").onSnapshot(querySnapshot => {
        querySnapshot.forEach(resp => {
          state.version = resp.data();
        });
      });

      const user = VueCookies.get("user")

      if (user != null) {
        db.collection("users")
          .where("uid", "==", user.uid)
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
              state.user = {
                uid: user.uid,
                email: user.email,
                name: doc.data().name,
                permission: doc.data().permission
              };
              settingsColor();
            });
          });
      } else {
        state.user = {
          uid: null,
          email: null,
          name: null
        };
      }
      function settingsColor() {
        db.collection("app")
          .where("uid", "==", user.uid)
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
              state.settingsColor = {};
              state.settingsColor.textColorChecklist = doc.data().textColorChecklist;
              state.settingsColor.backgroundColorChecklist = doc.data().backgroundColorChecklist;
            });
          });
      }
    }
  },
  actions: {
    setUser({ commit }) {
      commit("setUser");
    }
  }
});

