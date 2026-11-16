Papa.parse('LGBTSurvey.csv', {
  download: true,
  header: false,
  skipEmptyLines: true,
 
  complete: function(results) {
 
    const labels = [];
    const values = [];

    const headerIndex = results.data.findIndex(
        row => row[0] && row[0].trim() === 'Responses'
    );

    if (headerIndex === -1) {
        console.error('no survey readings')
        return;
    }

    results.data.slice(headerIndex + 1, 26).forEach(row => {
        if (!row[0] || row[0] === 'Totals') {
            return;
        }

        const response = row.length === 10
        ? row.slice(0, 2).join(',')
        : row[0];

        const percentage = row[row.length - 1];

        if (percentage !== 'x' && !isNaN(Number(percentage))) {
            labels.push(response);
            values.push(Number(percentage));
        }
    });

    new Chart(
        document.getElementById('revenueChart'),
        {type:'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'All Respondents (%)',
                    data: values,
                    backgroundColor: '#c25286'
                }]
            },
            
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Percentage of respondents (%)'
                        }
                    }
                }
            }
        }
    );
  }
});
