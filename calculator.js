document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('carbon-calculator');
    const resultsSection = document.getElementById('results');
    const totalFootprint = document.getElementById('total-footprint');
    const comparison = document.getElementById('comparison');
    const gaugeFill = document.getElementById('gauge-fill');
    const recommendationsList = document.getElementById('recommendations-list');
    
    // Emission factors (kg CO2e per unit)
    const emissionFactors = {
        car: 2.31, // kg per mile (average car)
        publicTransport: 0.1, // kg per hour (average)
        flightShort: 150, // kg per flight
        flightLong: 300, // kg per flight
        electricity: 0.5, // kg per kWh (US average)
        heating: {
            'natural-gas': 5.3, // kg per therm
            'electric': 0.5, // kg per kWh
            'oil': 10, // kg per gallon
            'propane': 5.7, // kg per gallon
            'renewable': 0.1 // kg per unit
        },
        diet: {
            'meat-heavy': 2500, // kg per year
            'average': 2000,
            'vegetarian': 1500,
            'vegan': 1000
        },
        foodWaste: {
            'high': 1.2,
            'medium': 1,
            'low': 0.8
        },
        shopping: {
            'high': 2000, // kg per year
            'medium': 1500,
            'low': 1000
        }
    };
    
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Calculate transportation emissions
        const carMiles = parseFloat(document.getElementById('car-miles').value) || 0;
        const carMpg = parseFloat(document.getElementById('car-mpg').value) || 25;
        const carEmissions = (carMiles / carMpg) * emissionFactors.car;
        
        const publicTransportHours = parseFloat(document.getElementById('public-transport').value) || 0;
        const publicTransportEmissions = publicTransportHours * 52 * emissionFactors.publicTransport;
        
        const flightsShort = parseFloat(document.getElementById('flights-short').value) || 0;
        const flightsLong = parseFloat(document.getElementById('flights-long').value) || 0;
        const flightEmissions = (flightsShort * emissionFactors.flightShort) + 
                               (flightsLong * emissionFactors.flightLong);
        
        const transportationEmissions = carEmissions + publicTransportEmissions + flightEmissions;
        
        // Calculate home energy emissions
        const electricityUsage = parseFloat(document.getElementById('electricity').value) || 0;
        const electricityEmissions = electricityUsage * 12 * emissionFactors.electricity;
        
        const heatingType = document.getElementById('heating').value;
        const heatingAmount = parseFloat(document.getElementById('heating-amount').value) || 0;
        const heatingEmissions = heatingAmount * 12 * emissionFactors.heating[heatingType];
        
        const homeEmissions = electricityEmissions + heatingEmissions;
        
        // Calculate diet emissions
        const dietType = document.getElementById('diet-type').value;
        const foodWasteLevel = document.getElementById('food-waste').value;
        const dietEmissions = emissionFactors.diet[dietType] * emissionFactors.foodWaste[foodWasteLevel];
        
        // Calculate shopping emissions
        const shoppingHabits = document.getElementById('shopping-habits').value;
        const shoppingEmissions = emissionFactors.shopping[shoppingHabits];
        
        // Total emissions in kg
        const totalEmissions = transportationEmissions + homeEmissions + dietEmissions + shoppingEmissions;
        // Convert to metric tons
        const totalEmissionsTons = Math.round(totalEmissions / 1000);
        
        // Display results
        totalFootprint.textContent = `${totalEmissionsTons} tons CO₂/year`;
        
        // US average is about 16 tons per person
        const usAverage = 16;
        const percentDifference = Math.round(((totalEmissionsTons - usAverage) / usAverage) * 100);
        
        if (percentDifference > 0) {
            comparison.textContent = `${percentDifference}% higher than US average`;
            comparison.style.color = '#e74c3c';
        } else if (percentDifference < 0) {
            comparison.textContent = `${Math.abs(percentDifference)}% lower than US average`;
            comparison.style.color = '#2ecc71';
        } else {
            comparison.textContent = 'Equal to US average';
            comparison.style.color = '#f39c12';
        }
        
        // Update gauge (0-30 tons)
        const gaugePercentage = Math.min((totalEmissionsTons / 30) * 100, 100);
        gaugeFill.style.width = `${gaugePercentage}%`;
        
        // Generate recommendations
        generateRecommendations(totalEmissionsTons, {
            transportation: transportationEmissions,
            home: homeEmissions,
            diet: dietEmissions,
            shopping: shoppingEmissions
        });
        
        // Show results
        resultsSection.classList.remove('hidden');
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Create breakdown chart
        createBreakdownChart({
            transportation: transportationEmissions,
            home: homeEmissions,
            diet: dietEmissions,
            shopping: shoppingEmissions
        });
    });
    
    function generateRecommendations(totalEmissions, breakdown) {
        recommendationsList.innerHTML = '';
        
        // Always show general recommendations
        const generalRecommendations = [
            "Switch to renewable energy if available in your area",
            "Reduce meat consumption, especially beef and lamb",
            "Combine errands to reduce car trips",
            "Unplug electronics when not in use"
        ];
        
        generalRecommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
        
        // Category-specific recommendations
        const largestCategory = Object.keys(breakdown).reduce((a, b) => 
            breakdown[a] > breakdown[b] ? a : b);
        
        if (largestCategory === 'transportation') {
            addRecommendation("Consider carpooling or using public transportation more often");
            addRecommendation("If buying a new car, choose an electric or hybrid model");
            addRecommendation("For short trips, try walking or biking instead of driving");
        }
        
        if (largestCategory === 'home') {
            addRecommendation("Improve home insulation to reduce heating/cooling needs");
            addRecommendation("Switch to LED light bulbs throughout your home");
            addRecommendation("Lower your thermostat in winter and raise it in summer");
        }
        
        if (largestCategory === 'diet') {
            addRecommendation("Try having meatless Mondays or more vegetarian meals");
            addRecommendation("Buy local and seasonal produce when possible");
            addRecommendation("Plan meals to reduce food waste");
        }
        
        if (largestCategory === 'shopping') {
            addRecommendation("Buy second-hand items when possible");
            addRecommendation("Choose products with minimal packaging");
            addRecommendation("Repair items instead of replacing them");
        }
        
        // If footprint is very high
        if (totalEmissions > 20) {
            addRecommendation("Consider a home energy audit to identify savings opportunities");
            addRecommendation("Look into carbon offset programs for unavoidable emissions");
        }
        
        function addRecommendation(text) {
            const li = document.createElement('li');
            li.textContent = text;
            recommendationsList.appendChild(li);
        }
    }
    
    function createBreakdownChart(breakdownData) {
        const ctx = document.getElementById('breakdownChart').getContext('2d');
        
        // Destroy previous chart if it exists
        if (window.breakdownChart) {
            window.breakdownChart.destroy();
        }
        
        const categories = {
            transportation: 'Transportation',
            home: 'Home Energy',
            diet: 'Diet',
            shopping: 'Shopping'
        };
        
        const labels = Object.keys(breakdownData).map(key => categories[key]);
        const data = Object.values(breakdownData);
        const total = data.reduce((sum, value) => sum + value, 0);
        const backgroundColors = ['#2ecc71', '#3498db', '#f39c12', '#9b59b6'];
        
        // Convert to percentages
        const percentageData = data.map(value => (value / total) * 100);
        
        window.breakdownChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: percentageData,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const kgValue = data[context.dataIndex].toFixed(0);
                                return `${label}: ${value.toFixed(1)}% (${kgValue} kg CO₂)`;
                            }
                        }
                    }
                }
            }
        });
    }
});