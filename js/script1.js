async function predictIrradiance() {
    const city = document.getElementById('cityInput').value;
    const month = document.getElementById('monthInput').value;
    const resultDiv = document.getElementById('result');

    if (!city || !month) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter both city and month.</p>";
        return;
    }

    // Simulate API data
    const temp = Math.floor(Math.random() * 15 + 25); // 25-40°C
    const humidity = Math.floor(Math.random() * 50 + 30); // 30-80%
    const cloud = Math.floor(Math.random() * 80); // 0-80%

    const irradiance = Math.round((600 - (humidity + cloud)) + Math.random() * 50); // mocked
    const energy = (irradiance / 1000 * 0.27).toFixed(3);

    let condition = "";
    if (irradiance > 600) condition = "🟢 Excellent";
    else if (irradiance > 300) condition = "🟡 Moderate";
    else condition = "🔴 Poor";

    resultDiv.innerHTML = `
        <h3>📍 ${city.toUpperCase()}</h3>
        <p>🌡️ Temp: ${temp}°C | 💧 Humidity: ${humidity}% | ☁️ Cloud: ${cloud}%</p>
        <p>☀️ Solar Irradiance: <strong>${irradiance} W/m²</strong></p>
        <p>🔋 Estimated Energy: <strong>${energy} kWh/day</strong></p>
        <p>📊 Condition: ${condition}</p>
        <div class="reference">
            <strong>Reference Chart:</strong><br>
            🟢 Excellent: > 600 W/m²<br>
            🟡 Moderate: 300–600 W/m²<br>
            🔴 Poor: < 300 W/m²
        </div>
    `;
}