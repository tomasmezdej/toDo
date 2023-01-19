<template>
  <v-card @click="$router.push(`/lists/${list.id}`)" class="list-element mt-2">
    <v-card-title class="d-flex justify-space-between">
      <h5>
        <v-icon
          :color="list.iconColor"
        >
          {{ list.icon }}
        </v-icon>
        {{ list.title }}
      </h5>
      <div>
        <small class="text-light mr-2">{{ index + 1 }}</small>
        <v-icon
          color="error"
          size="20"
          @click.stop.prevent="removeItem(list.id)"
        >
          mdi-trash-can-outline
        </v-icon>
      </div>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  props: ['list', 'index'],
  methods: {
    removeItem(listId) {
      this.$axios.delete(`/lists/${listId}`)
        .then((response) => {
          this.$emit('refreshData')
        })
        .catch((error) => {
        })
    },
  },
}
</script>