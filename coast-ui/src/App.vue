<script setup>
  import SpeedOverTime from './components/SpeedOverTime.vue'
</script>

<template>
  <v-app>
    <v-app-bar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>COAST Data Explorer</v-app-bar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-select label="Time Range" :items="['Past Hour', 'Past 2 Hours', 'Past Day', 'Past Week',]"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select label="Bus Line" v-model="busSelections" multiple chips :items="['All', '1', '2', '3',]"></v-select>
            </v-col>
          </v-row>

          <v-row>
            <SpeedOverTime></SpeedOverTime>

        </v-row>

      </v-container>
    </v-main>

  </v-app>
</template>

<style scoped>
</style>
