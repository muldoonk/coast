<script setup>
  import { onMounted } from 'vue';
  import { computed} from 'vue'
  import { useCounterStore } from '@/stores/counter';
  import { storeToRefs } from 'pinia';

  const store = useCounterStore();
  const { selectedBus, selectedDate, busLines } = storeToRefs(store);
  onMounted(async () => {
    await store.updatePassengerChartData();
    await store.getBusLines();
  });
</script>

<template>
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
</template>

<style>
.bus-select {
  width: fit-content;
  font-weight: lighter;
  display: flex;
  gap: 10px;

  .v-select .v-select__selection {
    margin-top: 0;
  }
}
</style>