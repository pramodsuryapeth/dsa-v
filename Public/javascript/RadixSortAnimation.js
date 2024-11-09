let array = [];
let delay = 500;

function generateArray() {
    const input = document.getElementById('arrayInput').value;
    array = input.split(',').map(Number);
    createBars(array);
}

function createBars(array) {
    const arrayContainer = document.getElementById('arrayContainer');
    arrayContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i] * 3}px`;
        bar.textContent = array[i];
        arrayContainer.appendChild(bar);
    }
}

async function startRadixSort() {
    const bars = document.getElementsByClassName('bar');
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    await radixSort(array, bars, pseudoDisplay);
}

async function radixSort(array, bars, pseudoDisplay) {
    let max = Math.max(...array);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        await countingSort(array, bars, pseudoDisplay, exp);
        exp *= 10;
    }
}

async function countingSort(array, bars, pseudoDisplay, exp) {
    const n = array.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        let index = Math.floor(array[i] / exp) % 10;
        count[index]++;
    }

    // Change count[i] to contain the actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        let index = Math.floor(array[i] / exp) % 10;
        output[count[index] - 1] = array[i];
        count[index]--;
    }

    // Copy the output array to array[], so that array[] contains sorted numbers
    for (let i = 0; i < n; i++) {
        array[i] = output[i];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[i].textContent = array[i];
        bars[i].style.backgroundColor = '#f39c12'; // Sorting step highlight
    }

    await sleep(delay);
    updatePseudocode(exp, "Sorting by digit");

    // Reset the colors for the bars
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = '#3498db'; // Default color after sorting
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePseudocode(exp, action) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');

    let radixSortStep = `
    procedure RadixSort(array A)
        max = findMax(A)
        exp = 1
        while max / exp > 0 do
            CountingSort(A, exp)
            exp *= 10
        end while
    end procedure
    `;

    let countingSortStep = `
    procedure CountingSort(array A, exp)
        for i ← 0 to length(A) - 1 do
            count[index(A[i], exp)]++
        end for

        for i ← 1 to 9 do
            count[i] += count[i-1]
        end for

        for i ← length(A) - 1 to 0 do
            output[count[index(A[i], exp)] - 1] = A[i]
            count[index(A[i], exp)]--
        end for

        copy output to A
    end procedure
    `;

    let dynamicAction = `
        Action: Sort array by the ${exp}-th digit (units, tens, hundreds, etc.).
    `;

    pseudoDisplay.innerHTML = `
        ${radixSortStep}
        ${dynamicAction}
        ${countingSortStep}
    `;
}
