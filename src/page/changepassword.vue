<template>
  <div class="centralDiv">
    <v-card
      max-width="344"
      class="mx-auto my-card"
      style="justify-content: center; align-items: center"
    >
      <h2 class="text-center">Change Your Password</h2>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
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
  }
};
</script>

<style lang="scss" scoped>
</style>