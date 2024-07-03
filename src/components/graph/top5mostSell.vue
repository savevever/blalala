<template>
    <div class="container">
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>

</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'สินค้าขายดีที่สุด5รายการ',
                    data: [40, 20, 12, 14, 15, 20, 12, 14, 20, 12, 14,15],
                    backgroundColor: '#f87979',
                }]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#333',
                            font: {
                                size: 16
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'เดือน',
                            font: {
                                size: 14,
                                weight: 'bold',
                            }
                        },
                        ticks: {
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'ยอดขายทั้งหมด',
                            font: {
                                size: 14,
                                weight: 'bold',
                            }
                        },
                        ticks: {
                        }
                    }
                },

            }
        }
    }
}
</script>
<style scoped>
.container {
    width: 700px;
    height: 270px;
}

#my-chart-id {
    width: 700px;
    height: 100%;
}
</style>