<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
      style="width: 180px"
    >
      <v-list dense>
        <v-list-item to="home">
          <v-list-item-action style="margin-right: 10px">
            <v-icon>fas fa-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="changepassword">
          <v-list-item-action style="margin-right: 10px">
            <v-icon>fas fa-key</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Change Password</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="settings">
          <v-list-item-action style="margin-right: 10px">
            <v-icon>fas fa-cogs</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="about">
          <v-list-item-action style="margin-right: 10px">
            <v-icon>fas fa-info-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div>
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

        <v-toolbar-title>Simple Checklist</v-toolbar-title>

        <div class="flex-grow-1" />

        <v-btn
          v-if="user.uid == null"
          icon
          to="login"
        >
          <v-icon>fas fa-sign-in-alt</v-icon>
        </v-btn>

        <v-btn
          v-if="user.uid != null"
          icon
          @click="logout()"
        >
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <v-content>
      <router-view />
    </v-content>

    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    logout() {
      this.$firebase.auth().signOut();
      this.$cookies.remove("user");
      this.$store.dispatch("setUser");
      this.$router.replace("login");
    },
    init() {
      this.$store.dispatch("setUser");
    }
  }
};
</script>
