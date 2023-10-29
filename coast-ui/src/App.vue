<script setup>
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCounterStore } from '@/stores/counter';
  import PaxOverTime from './components/PaxOverTime.vue';
  import MaxPaxTable from './components/MaxPaxTable.vue';
  import NoDataAlert from './components/NoDataAlert.vue';
  const store = useCounterStore();
  const { selectedBus, selectedDate } = storeToRefs(store);

  onMounted(async () => {
    await store.updatePassengerChartData();
    await store.updateMaxPassengerTable();
  });
</script>

<template>
  <v-app>
    <v-app-bar>
        <v-app-bar-title>COAST Data Explorer</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="store.toggleTheme">
          <font-awesome-icon icon="fa-solid fa-circle-half-stroke" />
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="selectedDate" 
                            :max="store.todayDate" 
                            :min="store.dataCollectionStartDate" 
                            @input="store.updateAllChartData" 
                            type="date">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select label="Bus Line" v-model="selectedBus" @update:modelValue="store.updateAllChartData" :items="[ '1', '6', '12', '13', '14', '33', '33s', '34', '40', '41', '42', '43', '44', '100']"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <NoDataAlert></NoDataAlert>
          </v-row>
          <v-row>
            <PaxOverTime></PaxOverTime>
            <MaxPaxTable></MaxPaxTable>
          </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.v-card {
  height: 500px;
}

.v-table {
  height: 100%;
}
</style>
