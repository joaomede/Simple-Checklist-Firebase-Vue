<template>
  <div class="centralDiv">
    <v-card
      max-width="344"
      class="mx-auto my-card"
      style="justify-content: center; align-items: center"
    >
      <h2 class="text-center">Change Your Password</h2>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="title"
          :rules="[rules.required, rules.counter]"
          label="Title"
          counter
          maxlength="20"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
        ></v-text-field>
      </v-col>
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
        password: ""
      },
      email: "",
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    login() {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(
          this.localUser.email,
          this.localUser.password
        )
        .then(resp => {
          this.$router.replace("home");

          this.$db
            .collection("users")
            .doc(resp.user.uid)
            .get()
            .then(doc => {
              this.$store.dispatch("setUser", doc.data());
              console.log(`Wellcome Back ${doc.data().nome}`);
            });
        })
        .catch(() => {
          console.log("Authentication issues, check email and password");
        });
    },
  }
};
</script>

<style lang="scss" scoped>
</style>