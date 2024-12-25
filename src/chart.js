const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line', // Line chart type
    data: {
        labels: ['Total (75%)', 'Country 1 (20%)', 'Country 2 (5%)'], // Segment labels
        datasets: [{
            label: 'Mental-health',
            data: [75, 20, 5], // Data percentages
            backgroundColor: 'rgba(54, 162, 235, 0.7)', // Blue for total
            borderColor: 'rgba(54, 162, 235, 1)', // Blue border
            borderWidth: 2,
            fill: false, // No fill under the line
        }]
    },
    options: {
        plugins: {
            legend: {
                display: true, // Show legend
                position: 'bottom' // Legend position
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: 'black' // X-axis tick color
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.2)' // Optional: grid line color
                }
            },
            y: {
                ticks: {
                    color: 'black' // Y-axis tick color
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.2)' // Optional: grid line color
                }
            }
        }
    }
});
