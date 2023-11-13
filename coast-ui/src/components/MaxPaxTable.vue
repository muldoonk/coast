<script setup>
    import { computed, ref } from 'vue';
    import { useCounterStore } from '@/stores/counter';
    import { storeToRefs } from 'pinia';
    const store = useCounterStore();
    import moment from 'moment';
    const { maxPassengerData } = storeToRefs(store);
    
    const tableData = computed(()  => {
        return maxPassengerData.value;
    });

    const getSortIcon = (field) => {
        if (activeSort.field === field) {
            return activeSort.asc ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
        } else {
            return 'fa-solid fa-sort'
        }
    }
    
    let activeSort = { field: 'paxLoad', asc: false };
    let paxSortIcon = ref(getSortIcon('paxLoad'));
    let timeSortIcon = ref(getSortIcon('timestamp'));

    const toggleActiveSort = (fieldToSort) => {
        if (fieldToSort === activeSort.field) {
            activeSort = {
                field: activeSort.field, 
                asc: !activeSort.asc
            }
        } else {
            activeSort = { field: fieldToSort, asc: false};
        }

        maxPassengerData.value.sort((a,b) => {
            if (activeSort.asc) {
                return a[activeSort.field] > b[activeSort.field]
            } else {
                return a[activeSort.field] < b[activeSort.field]
            }
        });

        paxSortIcon.value = getSortIcon('paxLoad');
        timeSortIcon.value = getSortIcon('timestamp');
    };


</script>

<template> 
        <v-card>
            <v-card-title>Max Passenger Loads</v-card-title>
            <v-table>
                <thead class="sticky-header">
                    <tr>
                        <th class="text-left" @click="toggleActiveSort('paxLoad')">
                            Passenger Count
                            <font-awesome-icon :icon="paxSortIcon"></font-awesome-icon>
                        </th>
                        <th class="text-left" @click="toggleActiveSort('timestamp')">
                            Time
                            <font-awesome-icon :icon="timeSortIcon"></font-awesome-icon>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="item in tableData" >
                        <td>{{ item.paxLoad }}</td>
                        <td>{{ moment(item.timestamp).format('MM/DD, h:mm a') }}</td>
                    </tr>
                    </tbody>
            </v-table>
        </v-card>
</template>

<style scoped>

.sticky-header {
    position: sticky;
    top: 0;
    background: rgb(var(--v-theme-surface));
}
</style>
