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
    const { passengerOverTimeChartData, selectedBus } = storeToRefs(store);



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
        responsive: true,
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
                    borderColor: 'rgba(0, 0, 0, 0.1)',
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
        <v-card class="chart-card">
            <v-card-title>Passenger Load Over Time</v-card-title>
            <div class="chart-container">
                <Line :data="lineData" :options="chartOptions"/>
            </div>
        </v-card>
</template>

<style scoped>
.chart-container {
    display: flex;
    flex-grow: 1;
    max-height: 350px;
    height: 350px;
    justify-content: center;
    align-items: center;
}
</style>
