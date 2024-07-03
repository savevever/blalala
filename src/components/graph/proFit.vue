<template>
    <div class="container">
        <Line :data="computedChartData" :options="chartOptions" />
    </div>
</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
    name: 'App',
    components: {
        Line
    },
    data() {
        return {
            dailyIncome: 20, // กำหนดรายได้รายวันที่นี่เพื่อสามารถปรับเปลี่ยนได้อย่างง่ายดายถ้าจำเป็น
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
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
                            text: 'Month',
                            font: {
                                size: 14,
                                weight: 'bold',
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Sales',
                            font: {
                                size: 14,
                                weight: 'bold',
                            },
                            beginAtZero: true
                        }
                    }
                },
            }
        }
    },
    computed: {
        computedChartData() {
            const labels = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const data = labels.map((month, index) => {
                const year = 2024;
                const daysInMonth = new Date(year, index + 1, 0).getDate();
                return daysInMonth * this.dailyIncome;
            });
            return {    
                labels,
                datasets: [{
                    label: 'กำไรต่อเดือน',
                    backgroundColor: '#00cc00',
                    borderColor: '#00cc00',
                    pointRadius: 1,
                    fill: true,
                    data
                }]
            };
        }
    }
};
</script>

<style scoped>
.container {
    width: 700px;
    height: 250px;
}
</style>