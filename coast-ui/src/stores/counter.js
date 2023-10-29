import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const selectedBuses = ref([]);

  const chartData = ref([]);

  const getChartData = ({ buses }) => {
    return axios.request({ method: 'GET', url: 'http://localhost:3000/chartData', params: { buses } }).then((response) => response.data)
  }

  return { count, chartData, doubleCount, increment, getChartData, selectedBuses }
})
