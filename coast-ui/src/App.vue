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
      </v-app-bar>
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="selectedDate" 
                            :max="store.todayDate" 
                            :min="store.dataCollectionStartDate" 
                            type="date"
                            theme="dark"
                            @input="store.updateAllChartData" >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select label="Bus Line" v-model="selectedBus" @update:modelValue="store.updateAllChartData" :items="[ '1', '6', '12', '13', '14', '33', '33s', '34', '40', '41', '42', '43', '44', '100']"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <NoDataAlert></NoDataAlert>
          </v-row>
          <v-row class="chart-column">
            <v-col class="grid">
              <PaxOverTime></PaxOverTime>
              <MaxPaxTable></MaxPaxTable>
            </v-col>
          </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.grid {
	display: grid;
	column-gap: 30px;
	row-gap: 30px;
	grid-template-rows: 400px;
	width: 100%;
	grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
}

.v-table {
  height: 100%;
}
</style>
