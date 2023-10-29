<script setup>
    import { onMounted, ref } from 'vue';
    import { useCounterStore } from '@/stores/counter';
    import { storeToRefs } from 'pinia';
    import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js'
    import { Line } from 'vue-chartjs'
    import 'chartjs-adapter-moment';


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )


    const store = useCounterStore();
    const { chartData, selectedBuses } = storeToRefs(store);
    let lineData = {
            datasets: [
                {
                    label: 'Bus 12',
                    backgroundColor: '#f87979',
                    data: chartData.value
                }
            ],
            options: {
                scales: {
                    x: {
                        type: 'time',
                        parsing: false,
                    },
            }
        }
    };

    defineProps({
        msg: {
            type: String,
            required: true
        },
    });

    onMounted(async () => {
        let response = await store.getChartData({ buses: ['12']});
        chartData.value = response.map((obj) => ({ x: obj.timestamp.toString(), y: obj.paxLoad}));
    });

            
</script>

<template> 
    <v-col cols="12" md="6">
        <v-card>
            <v-card-title>Passenger Load Over Time</v-card-title>
            <Line :data="lineData"/>
        </v-card>
    </v-col>
</template>

<style scoped>
</style>
