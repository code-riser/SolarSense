// Placeholder for real-time monitoring & AI analytics logic

let mlChart = null;
const mlChartCtx = document.getElementById('mlChart');
const mlStatus = document.getElementById('mlStatus');

function renderMLChart(labels, data, label, color) {
  if (mlChart) mlChart.destroy();
  mlChart = new Chart(mlChartCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          borderColor: color,
          backgroundColor: color + '33',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: color,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
        title: { display: false }
      },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'kWh' } },
        x: { title: { display: true, text: 'Day' } }
      }
    }
  });
}

async function callMLApi(endpoint, label, color) {
  mlStatus.textContent = 'Loading...';
  try {
    const res = await fetch(`http://localhost:8000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (endpoint === 'predict-energy') {
      renderMLChart(data.days, data.prediction, 'Predicted Energy (kWh)', color);
    } else {
      renderMLChart(data.days, data.forecast, 'Forecasted Consumption (kWh)', color);
    }
    mlStatus.textContent = 'Prediction loaded!';
  } catch (err) {
    mlStatus.textContent = 'Error: ' + err.message;
  }
}

document.getElementById('predictBtn').onclick = () => {
  callMLApi('predict-energy', 'Predicted Energy (kWh)', '#f9d923');
};
document.getElementById('forecastBtn').onclick = () => {
  callMLApi('forecast-consumption', 'Forecasted Consumption (kWh)', '#1a237e');
};

// Real-time anomaly alert logic
const alertLog = [];
const alertContainer = document.createElement('div');
alertContainer.style.position = 'fixed';
alertContainer.style.top = '20px';
alertContainer.style.right = '20px';
alertContainer.style.zIndex = '9999';
document.body.appendChild(alertContainer);

function showAnomalyAlert(alert) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger alert-dismissible fade show';
  alertDiv.style.minWidth = '300px';
  alertDiv.innerHTML = `
    <strong>⚠️ Anomaly Detected!</strong><br>
    ${alert.reason}<br>
    <small>${new Date(alert.timestamp).toLocaleTimeString()}</small>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    <button class="btn btn-sm btn-outline-light ms-2" onclick="this.parentNode.remove();">Acknowledge</button>
  `;
  alertContainer.appendChild(alertDiv);
  alertLog.push(alert);
  setTimeout(() => {
    if (alertDiv.parentNode) alertDiv.parentNode.removeChild(alertDiv);
  }, 15000);
}

// Connect to Socket.io
const socket = io('http://localhost:5000');
socket.on('anomalyAlert', (alert) => {
  showAnomalyAlert(alert);
}); 