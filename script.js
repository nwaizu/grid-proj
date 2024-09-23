let numColumns = 0;
let numRows = 0;

function generateTable() {
    numColumns = parseInt(document.getElementById('columnsInput').value);
    numRows = parseInt(document.getElementById('rowsInput').value);

    // Checking if dimensions are within the allowed range
    if (isNaN(numColumns) || isNaN(numRows) || numColumns < 3 || numRows < 3 || numColumns > 8 || numRows > 8) {
        alert("Please enter valid dimensions: 3 to 8 for both Y and X!");
        return;
    }

    let tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ""; // Clear previous table if any

    const table = document.createElement('table');
    for (let r = 1; r <= numRows; r++) {
        const row = document.createElement('tr');
        for (let c = 1; c <= numColumns; c++) {
            const cell = document.createElement('td');
            cell.innerText = `X${r}Y${c}`;
            cell.dataset.x = r;
            cell.dataset.y = c;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    tableContainer.appendChild(table);

    document.getElementById("tableContainer").style.display = "block";
    document.getElementById("inputPoints").style.display = "block";
}


function calculateShortestPath() {
    const startPoint = document.getElementById("startPoint").value;
    const endPoint = document.getElementById("endPoint").value;

    const start = parsePoint(startPoint);
    const end = parsePoint(endPoint);

    // Check if the points are valid (within the table bounds)
    if (!start || !end || start.x > numRows || start.y > numColumns || end.x > numRows || end.y > numColumns || start.x < 1 || start.y < 1 || end.x < 1 || end.y < 1) {
        alert("Error: Starting or Ending point has exceeded the table. Please enter valid points.");
        return;
    }

    // Clear previous path highlights
    document.querySelectorAll('.path').forEach(cell => cell.classList.remove('path'));

    const distance = getShortestPath(start, end);
    drawPath(start, end);
    document.getElementById("result").innerText = `The shortest distance from ${startPoint} to ${endPoint} is ${distance} units.`;
}


function parsePoint(point) {
    const match = point.match(/^X(\d+)Y(\d+)$/);
    if (!match) return null;
    return { x: parseInt(match[1]), y: parseInt(match[2]) };
}

function getShortestPath(start, end) {
    // Calculate Manhattan distance (shortest path in a grid)
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
}

function drawPath(start, end) {
    const table = document.querySelector('table');
    const cells = table.querySelectorAll('td');

    // Mark the path cells
    const startCell = Array.from(cells).find(cell => cell.dataset.x == start.x && cell.dataset.y == start.y);
    const endCell = Array.from(cells).find(cell => cell.dataset.x == end.x && cell.dataset.y == end.y);

    if (!startCell || !endCell) return;

    let current = { x: start.x, y: start.y };
    while (current.x !== end.x || current.y !== end.y) {
        const cell = Array.from(cells).find(cell => cell.dataset.x == current.x && cell.dataset.y == current.y);
        if (cell) cell.classList.add('path');

        if (current.x < end.x) current.x++;
        else if (current.x > end.x) current.x--;

        if (current.y < end.y) current.y++;
        else if (current.y > end.y) current.y--;
    }

    // Add the end cell
    const finalCell = Array.from(cells).find(cell => cell.dataset.x == end.x && cell.dataset.y == end.y);
    if (finalCell) finalCell.classList.add('path');
}
