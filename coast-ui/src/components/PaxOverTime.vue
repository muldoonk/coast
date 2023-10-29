<script setup>
    import { computed } from 'vue';
    import { useCounterStore } from '@/stores/counter';
    import { storeToRefs } from 'pinia';
    import zoomPlugin from 'chartjs-plugin-zoom';
    import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        TimeScale,
        BarElement,
        TimeSeriesScale
    } from 'chart.js'
    import { Line } from 'vue-chartjs'
    import 'chartjs-adapter-moment';
    const store = useCounterStore();
    const { passengerOverTimeChartData, selectedBus, chartBorderColor } = storeToRefs(store);



    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        TimeScale,
        TimeSeriesScale,
        Title,
        Tooltip,
        Legend,
        zoomPlugin
    )


    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                unit: 'millisecond'
            },
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    drag: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
        }
    }

    const lineData = computed(() => {
        const set =  {
                    label: `Bus ${selectedBus.value}`,
                    backgroundColor: '#f87979',
                    borderColor: chartBorderColor.value,
                    data: passengerOverTimeChartData.value,
                    stepped: true
        }
        return {
            datasets: [
                set
            ],
        };
    });

            
</script>

<template> 
    <v-col cols="12" md="6">
        <v-card>
            <v-card-title>Passenger Load Over Time</v-card-title>
            <Line :data="lineData" :options="chartOptions"/>
        </v-card>
    </v-col>
</template>

<style scoped>
</style>
