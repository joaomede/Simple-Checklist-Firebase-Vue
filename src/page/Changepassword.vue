<template>
  <div class="centralDiv">
    <v-card class="loginBox">
      <h2
        class="text-center"
        style="margin: 8px"
      >
        Change Your Password
      </h2>

      <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          v-model="password1"
          :rules="[rules.required, rules.min]"
          type="Password"
          label="New password"
        />
      </v-col>

      <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          v-model="password2"
          :rules="[rules.required, rules.min]"
          type="Password"
          label="Repeat new password"
        />
        <div class="text-center my-2">
          <v-btn
            color="primary"
            class="ma-2"
            to="home"
          >
            Back
          </v-btn>
          <v-btn
            color="green"
            dark
            class="ma-2"
            @click="changePassword()"
          >
            Save
          </v-btn>
        </div>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password1: '',
      password2: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    changePassword () {
      const user = this.$firebase.auth().currentUser
      if (this.password1 === this.password2) {
        user
          .updatePassword(this.password1)
          .then(() => {
            console.log('Password updated successfully')
            this.dialog = false
          })
          .catch(error => {
            console.log('Error updating password' + error)
          })
        this.password1 = ''
        this.password2 = ''
      } else {
        console.log('Passwords are different, they must be identical')
        this.dialog = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
