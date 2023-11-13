import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import moment from 'moment';


export const useCounterStore = defineStore('counter', () => {

  // REFS 
  const selectedBus = ref('12');
  const todayDate = moment().format('YYYY-MM-DD');
  const dataCollectionStartDate = moment('2023-10-27').format('YYYY-MM-DD');
  const selectedDate = ref(todayDate);
  const passengerOverTimeChartData = ref([]);
  const maxPassengerData = ref([]);

  async function updateAllChartData() {
    await updatePassengerChartData();
    await updateMaxPassengerTable()
  }

  const baseUrl = 'http://34.204.70.71:3000';
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

  return { 
    passengerOverTimeChartData, 
    updatePassengerChartData, 
    selectedDate, 
    selectedBus, 
    updateMaxPassengerTable, 
    updateAllChartData, 
    maxPassengerData,
    todayDate,
    dataCollectionStartDate
  }
});
