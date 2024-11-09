let array = [];
let delay = 1000;

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

async function startSelectionSort() {
    const bars = document.getElementsByClassName('bar');
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    await selectionSort(array, bars, pseudoDisplay);
}

async function selectionSort(array, bars, pseudoDisplay) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = '#f5b041'; // Highlight the current position

        updatePseudocode(i, minIndex, "Highlighting current element");

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = '#f5b041'; // Highlight the comparison element
            updatePseudocode(i, j, "Comparing elements");

            if (array[j] < array[minIndex]) {
                minIndex = j;
                updatePseudocode(i, j, "Updating minimum element");
            }
            await sleep(delay);

            bars[j].style.backgroundColor = '#ff6f61'; // Reset color after comparison
        }

        // Swap elements if necessary
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[i].textContent = array[i];
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;
            bars[minIndex].textContent = array[minIndex];

            updatePseudocode(i, minIndex, "Swapping elements");
        }

        bars[i].style.backgroundColor = '#4caf50'; // Mark as sorted
        updatePseudocode(i, minIndex, "Element sorted");
        await sleep(delay);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePseudocode(i, j, action) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    pseudoDisplay.innerHTML = `
procedure SelectionSort(array A)
    for i ← 0 to length(A) - 1 do
        minIndex = i
        ${action}
        for j ← i + 1 to length(A) do
            ${action}
            if A[j] < A[minIndex] then
                minIndex = j
            end if
        end for
        swap A[i] and A[minIndex]
    end for
end procedure
    `;
}
