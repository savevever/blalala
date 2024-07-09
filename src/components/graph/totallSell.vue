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
      products: [],
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
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
      const labels = this.months;
      const data = this.calculateMonthlyNetRevenue();
      return {
        labels,
        datasets: [{
          label: 'รายได้ต่อปี',
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
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8081/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    calculateMonthlyNetRevenue() {
      const monthlyNetRevenue = Array(12).fill(0);
      this.products.forEach(product => {
        const { price, itemsSold, cogs, shippingCosts, month} = product;
        const netRevenue = (price * itemsSold) - (cogs + shippingCosts);
        const monthIndex = this.months.indexOf(month.charAt(0).toUpperCase() + month.slice(1).toLowerCase());
        if (monthIndex !== -1) {
          monthlyNetRevenue[monthIndex] += netRevenue;
        }
      });
      console.log(monthlyNetRevenue);
      return monthlyNetRevenue;
    }
  },
  async created() {
    await this.fetchProducts();
  }
};
</script>



<style scoped>
.container {
    width: 700px;
    height: 250px;
}
</style>
