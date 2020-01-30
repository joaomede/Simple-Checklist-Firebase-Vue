<template>
    <v-btn
      fab
      dark
      small
      color="primary"
      fixed
      right
      bottom
      @click="eventClick()"
    >
      <v-icon dark>
        fas fa-plus
      </v-icon>
    </v-btn>
</template>

<script>
export default {
  methods: {
    eventClick () {
      this.$emit('eventClick')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
