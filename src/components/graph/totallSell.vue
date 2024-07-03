<template>
  <div class="container">
    <Line :data="computedChartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';
import axios from 'axios';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
  name: 'App',
  components: {
    Line
  },
  data() {
    return {
      dailyIncome: 20,
      dailyProfits: [],
      products: [],
      days: [],
      months: [],
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
      const data = labels.map(() => {
        const TotallSell = this.products * this.day;
        return TotallSell
      });
      return {
        labels,
        datasets: [{
          label: 'จำนวนสินค้าต่อเดือน',
          backgroundColor: '#00cc00',
          borderColor: '#00cc00',
          pointRadius: 1,
          fill: true,
          data
        }]
      };
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users');
        const userData = response.data;
        this.dailyProfits = userData.map(user => user.dailyProfit);
        this.products = userData.map(user => user.product);
        this.days = userData.map(user => user.day);
        this.months = userData.map(user => user.month);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  }, mounted() {
    // Call fetchUsers method when the component is mounted
    this.fetchUsers();
  }
};
</script>

<style scoped>
.container {
    width: 700px;
    height: 250px;
}
</style>
