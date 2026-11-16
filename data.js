Papa.parse('LGBTSurvey.csv', {
  download: true,
  header: false,
  skipEmptyLines: true,
  complete: function(results) {
    console.log("running");
    console.log(results.data);
    const tbody = document.querySelector('#dataTable tbody');
        tbody.innerHTML = '';

    const headerIndex = results.data.findIndex(
        row => row[0] && row[0].trim() === 'Responses'
    );

    console.log("header at:", headerIndex);

    if (headerIndex === -1) {
        console.error("no response heading")
        return;
    }

    results.data.slice(headerIndex + 1, 26).forEach(row => {
        if (!row[0] || row[0] === 'Totals' || row[0] === 'Notes') {
            return;
        }

        const response = row.length === 10
        ? row.slice(0, 2).join(',')
        : row[0];

        const percentage = row[row.length - 1];

        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${response}</td>
        <td>${percentage === 'x' ? 'N/A' : Number(percentage).toFixed(2) + '%'}</td>
        `;

        tbody.appendChild(tr);
    });

    const notes = document.querySelector('#notes');
    results.data.slice(30, 33).forEach(row => {
        const paragraph = document.createElement('p');
        paragraph.textContents = row.filter(Boolean).join(' ');
        notes.appendChild(paragraph);
    })

    console.log("rows added:", tbody.children.length);

  },

    error: function(error) {
        console.error("cant load csv");
        console.error(error);
      }
});