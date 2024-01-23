<script setup>
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCounterStore } from '@/stores/counter';
  import PaxOverTime from './components/PaxOverTime.vue';
  import NoDataAlert from './components/NoDataAlert.vue';
  const store = useCounterStore();
  const { selectedBus, selectedDate, busLines } = storeToRefs(store);
  onMounted(async () => {
    await store.updatePassengerChartData();
    await store.getBusLines();
  });
</script>

<template>
  <v-app>
      <v-app-bar :elevation="0">
        <v-app-bar-title>COAST Data Explorer</v-app-bar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-main>
        <v-container>
          <div class="content-container">
            <div class="bus-select">
              <v-select v-model="selectedBus" 
                      variant="underlined"
                      @update:modelValue="store.updateAllChartData" 
                      :items="busLines" 
                      item-title="route_long_name" 
                      item-value="route_short_name">
                      <template v-slot:prepend>Explore data for bus line</template>
              </v-select>
              <v-text-field v-model="selectedDate" 
                            :max="store.todayDate" 
                            variant="underlined"
                            :min="store.dataCollectionStartDate" 
                            type="date"
                            theme="dark"
                            @input="store.updateAllChartData">
                <template v-slot:prepend>on</template>
              </v-text-field>
            </div>

            <v-card variant="flat" color="white">
                <PaxOverTime></PaxOverTime>
            </v-card>
          </div>

      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">

.v-app-bar.v-toolbar {
  background: linear-gradient(45deg, #ff31454f, #cadaff91) !important;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .v-card {
    padding: 10px;
  }
  > .v-card {
    width: 100%;
  }
}
.v-table {
  height: 100%;
}
.bus-select {
  width: fit-content;
  font-weight: lighter;
  display: flex;
  gap: 10px;
  .v-select .v-select__selection {
    margin-top: 0;
  }

  // .v-input {
  //   font-size: 24px; // large since it's page header
  // }
  // .v-field {
  //   font-size: 24px;
  // }
}
</style>
