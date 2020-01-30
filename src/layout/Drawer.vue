<template>
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
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
