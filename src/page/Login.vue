<template>
  <div class="centralDiv">
    <v-card class="loginBox">
      <h2 class="text-center">
        Login
      </h2>
      <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          v-model="localUser.email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
        />
      </v-col>

      <v-col
        cols="12"
        sm="12"
      >
        <v-text-field
          v-model="localUser.password"
          :rules="[rules.required, rules.min]"
          label="Your Password"
          type="Password"
        />
        <div class="text-center my-2">
          <v-btn
            color="green"
            dark
            class="ma-2"
            @click="login()"
          >
            Login
          </v-btn>
        </div>
        <div class="text-center my-2">
          <v-btn
            color="primary"
            class="ma-2"
            @click="dialogForgot = true"
          >
            Forgot Password
          </v-btn>
          <v-btn
            color="primary"
            class="ma-2"
            @click="dialogRegister = true"
          >
            Register
          </v-btn>
        </div>
      </v-col>
    </v-card>

    <v-dialog v-model="dialogRegister">
      <v-card>
        <h2 class="text-center">
          Register
        </h2>

        <v-col
          cols="12"
          sm="12"
        >
          <v-text-field
            v-model="localUser.name"
            label="Your Name"
          />
        </v-col>

        <v-col
          cols="12"
          sm="12"
        >
          <v-text-field
            v-model="localUser.email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
          />
        </v-col>

        <v-col
          cols="12"
          sm="12"
        >
          <v-text-field
            v-model="localUser.password"
            :rules="[rules.required, rules.min]"
            label="Your Password"
            type="Password"
          />
        </v-col>

        <v-col
          cols="12"
          sm="12"
        >
          <v-text-field
            v-model="localUser.password1"
            :rules="[rules.required, rules.min]"
            label="Your Password"
            type="Password"
          />

          <div class="text-center my-2">
            <v-btn
              color="primary"
              class="ma-2"
              @click="dialogRegister = false"
            >
              Back
            </v-btn>
            <v-btn
              color="green"
              dark
              class="ma-2"
              @click="register()"
            >
              Register
            </v-btn>
          </div>
        </v-col>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogForgot">
      <v-card>
        <h2 class="text-center">
          Recover your access
        </h2>

        <v-col
          cols="12"
          sm="12"
        >
          <v-text-field
            v-model="localUser.email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
          />
          <div class="text-center my-2">
            <v-btn
              color="primary"
              class="ma-2"
              @click="dialogForgot = false"
            >
              Back
            </v-btn>
            <v-btn
              color="green"
              dark
              class="ma-2"
              @click="forgotPassword()"
            >
              Recover Password
            </v-btn>
          </div>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      localUser: {
        name: '',
        email: '',
        password: '',
        password1: ''
      },
      rules: {
        min: v => v.length >= 8 || 'Min 8 characters',
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },

      dialogRegister: false,
      dialogForgot: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    login () {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.localUser.email, this.localUser.password)
        .then(resp => {
          this.$cookies.set('user', JSON.stringify(resp.user))
          this.$router.replace('home')
          this.$db
            .collection('users')
            .doc(resp.user.uid)
            .get()
            .then(doc => {
              this.$store.dispatch('setUser', doc.data())
              console.log(`Welcome Back ${doc.data().name}`)
            })
        })
        .catch(() => {
          console.log('Authentication issues, check email and password')
        })
    },
    register () {
      this.$firebase
        .auth()
        .createUserWithEmailAndPassword(this.localUser.email, this.localUser.password)
        .then(resp => {
          this.setColorSchemeInit(resp)
          this.dialogRegister = false
          console.log('Registration successfully Complete')
        })
        .catch(err => {
          console.log('Error trying to register name, contact administrator: ' + err)
        })
      this.dialogRegister = false
    },
    setColorSchemeInit (resp) {
      const colorSchemeDefault = {
        textColorChecklist: '#000000',
        backgroundColorChecklist: '#ffffff',
        uid: resp.user.uid
      }
      this.$db
        .collection('app')
        .doc(resp.user.uid)
        .set(colorSchemeDefault)
        .then(() => {
          this.setUserProfile(resp)
        })
        .catch(err => {
          console.log('Error trying to register name, contact administrator: ' + err)
        })
    },
    setUserProfile (resp) {
      const newUser = {
        uid: resp.user.uid,
        name: this.localUser.name,
        email: this.localUser.email,
        permission: 'normal'
      }
      this.$db
        .collection('users')
        .doc(resp.user.uid)
        .set(newUser)
        .then(() => {
          this.$cookies.set('user', resp.user)
          this.$store.dispatch('setUser')
          console.log(`Welcome ${this.localUser.name}`)
          this.$router.replace('home')
        })
        .catch(err => {
          console.log('Error trying to register name, contact administrator: ' + err)
        })
    },
    forgotPassword () {
      this.$firebase
        .auth()
        .sendPasswordResetEmail(this.localUser.email)
        .then(() => {
          console.log('Recovery email sent successfully')
        })
        .catch(err => {
          console.log('Error trying to retrieve email: ' + err)
        })
    },
    checkLogin () {
      if (this.user != null) {
        this.$router.replace('home')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
