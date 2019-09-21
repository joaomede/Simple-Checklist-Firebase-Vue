import Vue from 'vue'
import Vuex from 'vuex'

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

      const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
      const user = cookies.get("user");

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
              state.settingsColor.backgroundColor = doc.data().backgroundColor;
              state.settingsColor.textColor = doc.data().textColor;
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

