let items = [];
let capacity = 0;
let dp = [];
let currentStep = 0;
let animationInterval;
const pseudocode = document.getElementById("pseudocode").innerText;

// Initialize DP Table
function initializeDPTable() {
    const dpTable = document.getElementById("dp-table");
    dpTable.innerHTML = ""; // Clear table

    for (let i = 0; i <= items.length; i++) {
        dp[i] = Array(capacity + 1).fill(0);
        const row = document.createElement("tr");

        for (let w = 0; w <= capacity; w++) {
            const cell = document.createElement("td");
            cell.id = `cell-${i}-${w}`;
            cell.textContent = dp[i][w];
            row.appendChild(cell);
        }
        dpTable.appendChild(row);
    }
}

// Update DP Table Cell
function updateDPTable(i, w, value) {
    dp[i][w] = value;
    const cell = document.getElementById(`cell-${i}-${w}`);
    cell.textContent = value;
    cell.classList.add("active-cell");

    setTimeout(() => {
        cell.classList.remove("active-cell");
    }, 500);
}

// Step-by-Step Animation Logic
function animateKnapsack() {
    let i = Math.floor(currentStep / (capacity + 1));
    let w = currentStep % (capacity + 1);

    if (i > items.length) {
        clearInterval(animationInterval);
        return;
    }

    updatePseudocode(i, w);

    if (i === 0 || w === 0) {
        updateDPTable(i, w, 0);
    } else {
        const { weight, value } = items[i - 1];
        if (weight <= w) {
            dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
            updateDPTable(i, w, dp[i][w]);
        } else {
            dp[i][w] = dp[i - 1][w];
            updateDPTable(i, w, dp[i][w]);
        }
    }

    currentStep++;
}

// Pseudocode Highlighting
function updatePseudocode(i, w) {
    let code = pseudocode.split("\n");
    const weight = i > 0 ? items[i - 1].weight : 0;

    if (i === 0 || w === 0) {
        code[1] = `dp[${i}][${w}] = 0 (base case)`;
    } else if (weight <= w) {
        code[3] = `If weight[${i}] <= ${w}`;
        code[4] = `dp[${i}][${w}] = max(dp[${i-1}][${w}], dp[${i-1}][${w - weight}] + value[${i}])`;
    } else {
        code[6] = `dp[${i}][${w}] = dp[${i-1}][${w}] (item too heavy)`;
    }
    
    document.getElementById("pseudocode").innerText = code.join("\n");
}

// Start the animation after collecting user input
function initializeAndStart() {
    // Retrieve values from input fields
    const weightsInput = document.getElementById("weights").value;
    const valuesInput = document.getElementById("values").value;
    capacity = parseInt(document.getElementById("capacity").value);

    // Convert the weights and values from strings to arrays of numbers
    const weights = weightsInput.split(',').map(Number);
    const values = valuesInput.split(',').map(Number);

    if (weights.length !== values.length) {
        alert("Please make sure the number of weights and values are equal.");
        return;
    }

    // Initialize items array
    items = weights.map((weight, index) => ({ weight, value: values[index] }));
    
    // Initialize DP table and start animation
    initializeDPTable();
    currentStep = 0;
    animationInterval = setInterval(animateKnapsack, 1000); // Animate every 1 second
}

// Control Functions
function pauseAnimation() {
    clearInterval(animationInterval);
}

function resetAnimation() {
    clearInterval(animationInterval);
    currentStep = 0;
    initializeDPTable();
}

document.addEventListener("DOMContentLoaded", initializeDPTable);
