<template>
  <v-container
    fluid
    class="header px-5 d-flex"
    :class="($route.path !== '/') ? 'justify-space-between' : 'justify-end' "
  >
    <v-icon
      v-if="$route.path !== '/' && userName"
      color="white"
      @click="$router.back()"
    >
      mdi-keyboard-backspace
    </v-icon>
    <h4 v-if="userName">
      <v-icon class="mb-1">
        mdi-account-circle
      </v-icon>
      {{ userName }}
    </h4>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      headerPanelShown: true,
      searchVal: null
    }
  },
  computed: {
    userName() {
      return this.$store.state.userName
    }
  },
}
</script>