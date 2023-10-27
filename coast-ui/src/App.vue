<template>
  <v-app>
    <v-container>
      <v-app-bar :elevation="2">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>COAST Data Explorer</v-app-bar-title>
      </v-app-bar>

      <v-row>
        <v-col cols="12" md="6">
          <v-select label="Time Range" :items="['Past Hour', 'Past 2 Hours', 'Past Day', 'Past Week',]"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select label="Bus Line" v-model="busSelections" multiple chips :items="['All', '1', '2', '3',]"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card>
          <v-card-title>Passenger Volume Over Time</v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>
                  Bus Line
                </th>
                <th>
                  Passenger Capacity
                </th>
                <th>
                  Trip ID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
              >
                <td>1</td>
                <td>40</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
          <v-card-title>Passenger Delta by Stop</v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>
                  Bus Line
                </th>
                <th>
                  Passenger Delta
                </th>
                <th>
                  Stop ID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
              >
                <td>1</td>
                <td>40</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
        </v-col>

        
        <v-col cols="12" md="6">
          <v-card>
          <v-card-title>Speed over Time</v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>
                  Bus Line
                </th>
                <th>
                  Speed
                </th>
                <th>
                  Stop ID
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
              >
                <td>1</td>
                <td>40</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
        </v-col>

      </v-row>

      <HelloWorld msg="Welcome to Your Vue.js App"/>

    </v-container>
      </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data: () => ({
      busSelections: [],
  }),
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
