<script>
    {% for team, placements in team_placements.items() %}
    var placementsData = {{ placements| tojson}};  // Convert the Python dictionary to a JavaScript object

    // Get all the placement keys from the placementsData object
    var allPlaces = Object.keys(placementsData).map(Number);

    // Find the maximum placement
    var maxPlace = Math.max(...allPlaces);

    // Create an array of all placements from 1 to maxPlace
    var fullRangeFromMaxPlace = Array.from({length: maxPlace }, (_, i) => i + 1);

    // Create an array of integers from 1 to 8
    var arrayFromOneToEight = Array.from({length: 8 }, (_, i) => i + 1);

    // Determine the longer array
    var fullRange = fullRangeFromMaxPlace.length > arrayFromOneToEight.length ? fullRangeFromMaxPlace : arrayFromOneToEight;

    // Create an array of numTimes that corresponds to the full range of placements
    var numTimes = fullRange.map(function (place) {
        return placementsData[place] || 0;  // If placement doesn't exist, set the value to 0
    });

    var maxVal = Math.max(...numTimes);  // Get the maximum value in the numTimes array

    var stepSize = Math.ceil(maxVal / 5 / 10) * 10;

    // Define a single color for all bars (Slate Gray)
    var barColor = '#1d5dbd';  // Slate Gray color (Hex format)

    // Create the chart for each team
    new Chart("placementChart-{{ team| replace('&', '')}}", {
        type: "bar",
    data: {
        labels: fullRange,  // Use the full range of placements
    datasets: [{
        backgroundColor: Array(fullRange.length).fill(barColor),  // Fill all bars with the same color
    data: numTimes
            }]
        },
    options: {
        legend: {display: false },
    title: {
        display: true,
    text: "Placements"
            },
    tooltips: {
        enabled: true,  // Enable tooltips
    mode: 'index',  // How tooltips behave: 'index' will show tooltips for individual bars
    callbacks: {
        // Customize the tooltip title
        title: function (tooltipItem, data) {
                        var placement = tooltipItem[0].label;  // Get the placement number (1st, 2nd, etc.)
    return 'Placement: ' + placement;  // Display 'Placement: 1', 'Placement: 2', etc.
                    },
    // Customize the tooltip label (the value shown)
    label: function (tooltipItem, data) {
                        var value = tooltipItem.value;  // The value of the bar
    return 'Simulation Percentage: ' + value / 10 + '%';  // Display the number of times the placement was achieved
                    }
                }
            },
    scales: {
        yAxes: [{
        ticks: {
        beginAtZero: true,  // Start the y-axis at 0
    stepSize: stepSize
                    }
                }]
            }
        }
    });
    {% endfor %}
</script>
