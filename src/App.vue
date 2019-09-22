<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app style="width: 180px">
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

    <v-row class="child-flex">
      <div>
        <v-app-bar app>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Simple Checklist</v-toolbar-title>

          <div class="flex-grow-1"></div>

          <v-btn icon>
            <v-icon>fas fa-sign-in-alt</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-btn>
        </v-app-bar>
      </div>
    </v-row>

    <v-content>
      <router-view> </router-view>
    </v-content>
    </v-row>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: null
    };
  },
  created() {}
};
</script>

<style>
</style>
