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

async function bubbleSort(array) {
    const bars = document.getElementsByClassName('bar');
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    await bubbleSortHelper(array, bars, pseudoDisplay);
}

async function bubbleSortHelper(array, bars, pseudoDisplay) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            bars[j].style.backgroundColor = '#f5b041';  
            bars[j + 1].style.backgroundColor = '#f5b041'; 

            updatePseudocode(i, j);

            if (array[j] > array[j + 1]) {
                 
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j].textContent = array[j];
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                bars[j + 1].textContent = array[j + 1];
            }
            await sleep(delay);
            bars[j].style.backgroundColor = '#ff6f61';  
            bars[j + 1].style.backgroundColor = '#ff6f61'; 
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePseudocode(i, j) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    pseudoDisplay.innerHTML = `
procedure BubbleSort(array A)
    for i ← 0 to length(A) - 1 do
        for j ← 0 to length(A) - i - 2 do
            if A[j] > A[j + 1] then
                swap A[j] and A[j + 1]
            end if
        end for
    end for
end procedure
    `;
}

function startBubbleSort() {
    bubbleSort(array);
}
