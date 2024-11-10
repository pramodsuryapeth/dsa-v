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

async function startInsertionSort() {
    const bars = document.getElementsByClassName('bar');
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    await insertionSort(array, bars, pseudoDisplay);
}

async function insertionSort(array, bars, pseudoDisplay) {
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = '#f39c12';  

        updatePseudocode(i, j, "Inserting element");
 
        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = '#ff5733';  
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j + 1].textContent = array[j + 1];
            j = j - 1;
            await sleep(delay);
        }
        
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
        bars[j + 1].textContent = array[j + 1];

        bars[i].style.backgroundColor = '#2ecc71';  
        updatePseudocode(i, j, "Element inserted at correct position");
        await sleep(delay);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePseudocode(i, j, action) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    pseudoDisplay.innerHTML = `
procedure InsertionSort(array A)
    for i ← 1 to length(A) - 1 do
        key = A[i]
        j = i - 1
        ${action}
        while j ≥ 0 and A[j] > key do
            A[j + 1] = A[j]
            j = j - 1
        end while
        A[j + 1] = key
    end for
end procedure
    `;
}
