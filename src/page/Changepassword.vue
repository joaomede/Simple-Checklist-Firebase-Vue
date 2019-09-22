<template>
  <div class="centralDiv">
    <v-card
      class="loginBox"
    >
      <h2 class="text-center">Change Your Password</h2>
      <v-text-field
        v-model="password"
        :rules="[rules.required, rules.min]"
        type="Password"
        label="New password"
        hint="At least 8 characters"
        counter
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.required, rules.min]"
        type="Password"
        label="Repeat new password"
        hint="At least 8 characters"
        counter
      ></v-text-field>
      <div class="text-center my-2">
        <v-btn color="primary" class="ma-2" to="home">Back</v-btn>
          <v-btn color="green" dark class="ma-2" @click="changePassword()">Save</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password1: "",
      password2: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },
  methods: {
    changePassword() {
      const user = this.$firebase.auth().currentUser;
      if (this.password1 === this.password1) {
        user
          .updatePassword(this.password1)
          .then(() => {
            // ok
          })
          .catch(error => {
            // error
          });
        this.password1 = "";
        this.password2 = "";
      } else {
        // non-equal password
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>