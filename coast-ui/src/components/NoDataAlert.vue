<script setup>
import { computed} from 'vue'
  import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

  const store = useCounterStore();
  const {passengerOverTimeChartData, maxPassengerData } = storeToRefs(store);
  const shouldShowAlert = computed(() => {
    return !passengerOverTimeChartData.value?.length || !maxPassengerData.value?.length
  })
</script>

<template>
  <v-col class="alerts-container">
    <v-alert :border="'start'" variant="tonal" color="#C51162">This site has gone live very recently. Stay tuned while we gather more data and add more graphs!</v-alert>
    <v-alert v-if="shouldShowAlert" 
             color="info" 
             variant="tonal" 
             :border="'start'">
             Looks like we are missing some data. Try selecting a different day or a different bus line! Note: Bus service does not run on Sundays.
    </v-alert>
  </v-col>

</template>

<style scoped>
  .alerts-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>