<template>
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
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>