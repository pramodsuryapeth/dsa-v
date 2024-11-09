let array = [];
let target = null;
let delay = 1000;

function generateArray() {
    const input = document.getElementById('arrayInput').value;
    array = input.split(',').map(Number).sort((a, b) => a - b); // Ensure the array is sorted for binary search
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

async function binarySearch(array, target) {
    let low = 0;
    let high = array.length - 1;
    const bars = document.getElementsByClassName('bar');
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        bars[mid].style.backgroundColor = '#f5b041'; // Highlight the middle element
        updatePseudocode(low, mid, high);

        if (array[mid] === target) {
            bars[mid].classList.add('found');
            break;
        } else if (array[mid] < target) {
            low = mid + 1;
            bars[mid].style.backgroundColor = '#ff6f61'; // Reset middle element color
        } else {
            high = mid - 1;
            bars[mid].style.backgroundColor = '#ff6f61'; // Reset middle element color
        }

        await new Promise(resolve => setTimeout(resolve, delay));
    }

    if (array.indexOf(target) === -1) {
        alert('Target not found!');
    }
}

function updatePseudocode(low, mid, high) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    pseudoDisplay.innerHTML = `
procedure BinarySearch(array A, target)
low = 0
high = length of A - 1
while low <= high do
mid = (low + high) / 2  // Low: ${low}, Mid: ${mid}, High: ${high}
if A[mid] == target then
    return mid
else if A[mid] < target then
    low = mid + 1
else
    high = mid - 1
end while
return -1
end procedure
    `;
}

function startBinarySearch() {
    target = parseInt(document.getElementById('targetInput').value);
    binarySearch(array, target);
}