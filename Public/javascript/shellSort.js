// Initialize the variables
let array = [];
let isSorting = false;
let pseudocodeElement = document.getElementById("pseudocode");
let arrayContainer = document.getElementById("arrayContainer");
let pseudocodeContainer = document.getElementById("pseudocodeContainer");

// Function to generate a random array
function generateArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
}

// Function to render the array on the page
function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; // Scale the height of the bars
        arrayContainer.appendChild(bar);
    });
}

// Function to change pseudocode
function updatePseudocode(code, highlightLine = -1) {
    const lines = code.split("\n");
    const highlightedCode = lines.map((line, index) => {
        if (index === highlightLine) {
            return `<span class="pseudocode-line-highlight">${line}</span>`;
        }
        return line;
    }).join("\n");
    pseudocodeElement.innerHTML = highlightedCode;
}

// Shell Sort algorithm with pseudocode updates
async function shellSort() {
    const n = array.length;
    let gap = Math.floor(n / 2);

    // Display initial pseudocode
    let pseudocode = `
        Initialize gap = n / 2
        While gap >= 1:
            For i = gap to n-1:
                temp = array[i]
                j = i
                While j >= gap and array[j - gap] > temp:
                    array[j] = array[j - gap]
                    j -= gap
                array[j] = temp
            gap = gap / 2
    `;
    updatePseudocode(pseudocode, 0);

    while (gap >= 1) {
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j = i;
            updatePseudocode(pseudocode, 2); // Highlight pseudocode for 'temp = array[i]'
            await sleep(200); // Pause for animation effect

            // Inner loop to perform sorting
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
                updatePseudocode(pseudocode, 6); // Highlight pseudocode for the while loop
                renderArray();
                await sleep(200); // Pause for animation effect
            }

            array[j] = temp;
            updatePseudocode(pseudocode, 8); // Highlight pseudocode for 'array[j] = temp'
            renderArray();
            await sleep(200); // Pause for animation effect
        }

        gap = Math.floor(gap / 2);
        updatePseudocode(pseudocode, 10); // Highlight pseudocode for gap update
        await sleep(200); // Pause for animation effect
    }

    isSorting = false;
}

// Sleep function to create animation delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Event listeners for buttons
document.getElementById("generateArrayBtn").addEventListener("click", () => {
    const size = document.getElementById("arraySize").value;
    generateArray(size);
});

document.getElementById("startSortBtn").addEventListener("click", () => {
    if (!isSorting) {
        isSorting = true;
        shellSort();
    }
});

// Initial call to generate an array when the page loads
generateArray(10);
