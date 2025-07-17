// Placeholder for dashboard interactivity and data fetching
// Future: Fetch real-time data, update cards and tables dynamically

document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('energyChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        datasets: [
          {
            label: 'Production (kWh)',
            data: [0, 5, 15, 30, 20, 10, 2],
            borderColor: '#f9d923',
            backgroundColor: 'rgba(249,217,35,0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#f9d923',
          },
          {
            label: 'Consumption (kWh)',
            data: [2, 6, 12, 22, 18, 12, 4],
            borderColor: '#1a237e',
            backgroundColor: 'rgba(26,35,126,0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#1a237e',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'kWh'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time of Day'
            }
          }
        }
      }
    });
  }
}); 

