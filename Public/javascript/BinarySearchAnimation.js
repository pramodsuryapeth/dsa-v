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

async function startHeapSort() {
    const bars = document.getElementsByClassName('bar');
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    await heapSort(array, bars, pseudoDisplay);
}

async function heapSort(array, bars, pseudoDisplay) {
    let n = array.length;
 
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, bars, n, i, pseudoDisplay);
    }

   
    for (let i = n - 1; i > 0; i--) {
        
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0] * 3}px`;
        bars[0].textContent = array[0];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[i].textContent = array[i];
        bars[0].style.backgroundColor = '#2ecc71'; 
        bars[i].style.backgroundColor = '#f39c12';  
        await sleep(delay);

        await heapify(array, bars, i, 0, pseudoDisplay);
    }
}

async function heapify(array, bars, n, i, pseudoDisplay) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
 
    updatePseudocode(i, left, right, "Heapify the tree");
    bars[i].style.backgroundColor = '#ff5733';   
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
       
        [array[i], array[largest]] = [array[largest], array[i]];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[i].textContent = array[i];
        bars[largest].style.height = `${array[largest] * 3}px`;
        bars[largest].textContent = array[largest];
        await sleep(delay);

        await heapify(array, bars, n, largest, pseudoDisplay);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePseudocode(i, left, right, action) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    const newText = `
${action}
    - Current: A[${i}]
    - Left: A[${left}]
    - Right: A[${right}]
    `;
    pseudoDisplay.textContent = newText;
}
