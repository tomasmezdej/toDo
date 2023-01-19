<template>
  <v-form
    ref="createListForm"
    lazy-validation
    v-on:submit.prevent
  >
    <v-row>
      <v-col
        cols="12"
        lg="3"
        class="d-flex pb-0"
      >
        <v-select
          v-model="selectedIcon"
          :items="icons"
          label="Icon"
          solo
        >
          <template #item="{ item }">
            <v-icon
              :color="iconColor"
              dark
            >
              {{ item }}
            </v-icon>
          </template>
          <template #selection="{ item }">
            <v-icon
              :color="iconColor"
              dark
            >
              {{ item }}
            </v-icon>
          </template>
        </v-select>
        <v-menu
          v-model="colorPickerMenu"
          :close-on-content-click="true"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2 mt-1"
              v-bind="attrs"
              v-on="on"
              fab
              small
              color="primary"
            >
              <v-icon color="white">
                mdi-palette
              </v-icon>
            </v-btn>
          </template>
          <v-card class="pa-4">
            <v-color-picker
              v-model="iconColor"
              class="ma-2"
              hide-canvas
            ></v-color-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col
        class="pb-0"
      >
        <v-text-field
          :key="createCounter"
          ref="listName"
          v-model="listName"
          :rules="createListRules"
          required
          :persistent-hint="true"
          label="Type list name"
          solo
          single-line
        >
          <template #append>
            <v-btn
              color="primary"
              @click="createList()"
            >
              Create
            </v-btn>
          </template>
        </v-text-field>

      </v-col>
    </v-row>
  </v-form>

</template>
<script>
export default {
  data() {
    return {
      iconColor: '#666AF6',
      colorPickerMenu: false,
      selectedIcon: 'mdi-note',
      icons: [
        'mdi-note',
        'mdi-alert-box',
        'mdi-airplane',
        'mdi-note',
        'mdi-earth',
        'mdi-format-list-checks',
        'mdi-list-box',
        'mdi-food'
      ],
      listName: null,
      createCounter: 0
    }
  },
  methods: {
    createList() {
      if(this.validateCreateList()) {
        this.$emit('create', {
          name: this.listName,
          icon: this.selectedIcon,
          iconColor: this.iconColor,
        })
        this.listName = ''
        this.createCounter++
      }
    }
  },
}
</script>