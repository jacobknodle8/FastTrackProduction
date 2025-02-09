// Add click event listeners to expandable rows
document.querySelectorAll('.expandable').forEach(row => {
    row.addEventListener('click', () => {
        const nextRow = row.nextElementSibling;
        const arrowButton = row.querySelector('.expand-btn');
        if (nextRow && nextRow.classList.contains('expandable-content')) {
            // Toggle display of the hidden row
            const isExpanded = nextRow.style.display === 'table-row';
            nextRow.style.display = isExpanded ? 'none' : 'table-row';

            // Rotate the arrow
            if (arrowButton) {
                arrowButton.classList.toggle('rotate', !isExpanded);
            }
        }
    });
});

// Display correct results table depending on selected tab
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(tabId).classList.remove('hidden');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}

document.getElementById('score-form').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('wrapper').style.display = 'none';
    document.getElementById('loader').style.display = 'block';
    console.log('Form submitted');
    this.submit();
});