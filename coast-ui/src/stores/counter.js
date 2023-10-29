import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { useTheme } from 'vuetify'
import moment from 'moment';


export const useCounterStore = defineStore('counter', () => {
  const theme = useTheme();

  // REFS 
  const selectedBus = ref('12');
  const chartBorderColor = ref('rgba(0, 0, 0, 0.1)');
  const todayDate = moment().format('YYYY-MM-DD');
  const dataCollectionStartDate = moment('2023-10-27').format('YYYY-MM-DD');
  const selectedDate = ref(todayDate);
  const passengerOverTimeChartData = ref([]);
  const maxPassengerData = ref([]);

  async function updateAllChartData() {
    await updatePassengerChartData();
    await updateMaxPassengerTable()
  }

  const baseUrl = 'http://localhost:3000';
  const getParams = () => ({ buses: [selectedBus.value], date: selectedDate.value });

  async function updatePassengerChartData() {
    passengerOverTimeChartData.value = await axios.request({
       method: 'GET', url: `${baseUrl}/chartData`,
       params: getParams()
    })
    .then((response) => response.data.map((obj) => ({ x: obj.timestamp, y: obj.paxLoad})))
  }

  async function updateMaxPassengerTable() {
    maxPassengerData.value = await axios.request({ 
      method: 'GET', 
      url: `${baseUrl}/maxPassenger`, 
      params: getParams()
    }).then((result) => result.data)
  }

  function toggleTheme() { 
    const currentTheme = theme.global.name.value;

    if (currentTheme === 'dark') {
      theme.global.name.value = 'light'
      chartBorderColor.value = 'rgba(0, 0, 0, 0.1)';
    } else {
      theme.global.name.value = 'dark'
      chartBorderColor.value = 'rgb(255,255,255,.1)'
    }
  }
  
  return { 
    passengerOverTimeChartData, 
    updatePassengerChartData, 
    selectedDate, 
    selectedBus, 
    chartBorderColor, 
    toggleTheme, 
    updateMaxPassengerTable, 
    updateAllChartData, 
    maxPassengerData,
    todayDate,
    dataCollectionStartDate
  }
});
