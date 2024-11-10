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

async function startQuickSort() {
    const bars = document.getElementsByClassName('bar');
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    await quickSort(array, 0, array.length - 1, bars, pseudoDisplay);
}

async function quickSort(array, low, high, bars, pseudoDisplay) {
    if (low < high) {
        const pivotIndex = await partition(array, low, high, bars, pseudoDisplay);
        await quickSort(array, low, pivotIndex - 1, bars, pseudoDisplay);
        await quickSort(array, pivotIndex + 1, high, bars, pseudoDisplay);
    }
}

async function partition(array, low, high, bars, pseudoDisplay) {
    const pivot = array[high];
    let i = low - 1;

    updatePseudocode("Partitioning", low, high, pivot);  

    for (let j = low; j <= high - 1; j++) {
        bars[j].style.backgroundColor = '#ff5733';  
        updatePseudocode("Comparing element with pivot", low, high, pivot);

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];  
            bars[i].style.height = `${array[i] * 3}px`;
            bars[i].textContent = array[i];
            bars[j].style.height = `${array[j] * 3}px`;
            bars[j].textContent = array[j];
        }

        await sleep(delay);
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]]; 
    bars[i + 1].style.height = `${array[i + 1] * 3}px`;
    bars[i + 1].textContent = array[i + 1];
    bars[high].style.height = `${array[high] * 3}px`;
    bars[high].textContent = array[high];

    updatePseudocode("Pivot is placed", low, high, pivot);
    return i + 1;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePseudocode(action, low, high, pivot) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    pseudoDisplay.innerHTML = 
`procedure QuickSort(array A, low, high)
    if low < high then
        pivotIndex = Partition(A, low, high)
        QuickSort(A, low, pivotIndex - 1)
        QuickSort(A, pivotIndex + 1, high)
    end if
end procedure

procedure Partition(array A, low, high)
    pivot = A[high] // pivot = ${pivot}
    i = low - 1
    for j = low to high - 1 do
        ${action}
        if A[j] < pivot then
            i = i + 1
            swap A[i] with A[j]
        end if
    end for
    swap A[i + 1] with A[high]
    return i + 1
end procedure`;
}
