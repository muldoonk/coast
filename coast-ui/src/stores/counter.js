import { ref } from 'vue'
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
  const busLines = ref([]);

  async function updateAllChartData() {
    await updatePassengerChartData();
    await updateMaxPassengerTable()
  }

  const baseUrl = import.meta.env.VITE_MONGO_URL;
  const getParams = () => ({ buses: [selectedBus.value], date: selectedDate.value });

  async function updatePassengerChartData() {
    passengerOverTimeChartData.value = await axios.request({
       method: 'GET', url: `${baseUrl}/chartData`,
       crossDomain: true,
       params: getParams()
    })
    .then((response) => response.data.map((obj) => ({ x: obj.timestamp, y: obj.paxLoad})))
  }

  async function updateMaxPassengerTable() {
    maxPassengerData.value = await axios.request({ 
      method: 'GET', 
      crossDomain: true,
      url: `${baseUrl}/maxPassenger`, 
      params: getParams()
    }).then((result) => result.data)
  }

  async function getBusLines() {
    busLines.value = await axios.request({
      method: 'GET', 
      crossDomain: true,
      url: `${baseUrl}/buses`,
    }).then((res) => res.data)
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
    dataCollectionStartDate,
    getBusLines,
    busLines
  }
});
