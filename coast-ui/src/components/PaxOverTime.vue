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
                unit: 'millisecond', 
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20
                }
            },
        },
        responsive: true,
        maintainAspectRatio: true,
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
                    backgroundColor: '#DC0073',
                    borderColor: 'rgb(247,225,158)',
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
            <div class="chart-and-subtitle">
                <div class="chart-container">
                    <Line :data="lineData" :options="chartOptions" :height="'350px'"/>
                </div>
                <div>Number of Passengers Over Time</div>
            </div>
</template>

<style scoped>

.chart-and-subtitle {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.chart-container {
    width: 100%;
    display: flex;
    flex-grow: 1;
    max-height: 350px;
    height: 350px;
    justify-content: center;
    align-items: center;
}
</style>
