<template>
  <div class="centralDiv">
    <v-card class="loginBox">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="localUser.email"
              :rules="[rules.required, rules.email]"
              label="E-mail"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="localUser.password"
              :rules="[rules.required, rules.min]"
              label="Your Password"
              type="Password"
            ></v-text-field>
            <div class="text-center my-2">
              <v-btn color="green" class="ma-2" @click="login()">Login</v-btn>
            </div>
            <div class="text-center my-2">
              <v-btn color="primary" class="ma-2" @click="dialogForgot == true">Forgot Password</v-btn>
              <v-btn color="primary" class="ma-2" @click="dialogRegister == true">Register</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localUser: {
        name: "",
        email: "",
        password: "",
        password1: ""
      },
      rules: {
        min: v => v.length >= 8 || "Min 8 characters",
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },

      dialogRegister: false,
      dialogForgot: false
    };
  },
  methods: {
    login() {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.localUser.email, this.localUser.password)
        .then(resp => {
          this.$cookie.set("user", resp.user, 2);
          this.$router.replace("home");
          this.$db
            .collection("users")
            .doc(resp.user.uid)
            .get()
            .then(doc => {
              this.$store.dispatch("setUser", doc.data());
              console.log(`Welcome Back ${doc.data().name}`);
            });
        })
        .catch(() => {
          console.log("Authentication issues, check email and password");
        });
    },
    register() {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.localUser.email, this.localUser.password)
        .then(resp => {
          this.setColorSchemeInit(resp);
          this.dialogRegister = false;
          console.log("Registration successfully Complete");
        })
        .catch(() => {
          console.log("Error trying to register name, contact administrator");
        });
    },
    setColorSchemeInit(resp) {
      const colorSchemeDefault = {
        textColorChecklist: "#000000",
        backgroundColorChecklist: "#ffffff",
        uid: resp.user.uid
      };
      this.$db
        .collection("app")
        .doc(resp.user.uid)
        .set(colorSchemeDefault)
        .then(() => {
          this.setUserProfile(resp);
        })
        .catch(err => {
          this.$notify("Error trying to register name, contact administrator", "red");
        });
    },
    setUserProfile(resp) {
      const newUser = {
        uid: resp.user.uid,
        name: this.userLocal.name,
        email: this.userLocal.email,
        permission: "normal"
      };
      this.$db
        .collection("users")
        .doc(resp.user.uid)
        .set(newUser)
        .then(() => {
          this.$q.cookies.set("user", resp.user);
          this.$store.dispatch("setUser");
          this.$notify(`Welcome ${this.userLocal.name}`, "green");
          this.$router.replace("home");
        })
        .catch(err => {
          this.$notify("Error trying to register name, contact administrator", "red");
        });
    },
    forgotPassword() {
      this.$firebase
        .auth()
        .sendPasswordResetEmail(this.userLocal.email)
        .then(() => {
          console.log("Recovery email sent successfully");
        })
        .catch(() => {
          console.log("Error trying to retrieve email");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>