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

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, bars, n, i, pseudoDisplay, "Building Heap");
    }

    // One by one extract elements
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0] * 3}px`;
        bars[0].textContent = array[0];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[i].textContent = array[i];
        bars[0].style.backgroundColor = '#2ecc71'; // Green for swapped
        bars[i].style.backgroundColor = '#f39c12'; // Orange for swapped
        await sleep(delay);

        await heapify(array, bars, i, 0, pseudoDisplay, "Heapify after swap");
    }
}

async function heapify(array, bars, n, i, pseudoDisplay, action) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Update pseudocode to reflect heapifying
    updatePseudocode(i, left, right, action, "Heapify");
    bars[i].style.backgroundColor = '#ff5733';  // Red for current element
    
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        // Swap elements
        [array[i], array[largest]] = [array[largest], array[i]];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[i].textContent = array[i];
        bars[largest].style.height = `${array[largest] * 3}px`;
        bars[largest].textContent = array[largest];
        await sleep(delay);

        await heapify(array, bars, n, largest, pseudoDisplay, action);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePseudocode(i, left, right, action, phase) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    
    let heapifyStep = `
    procedure heapify(array A, n, i)
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        if left < n and A[left] > A[largest] then
            largest = left
        end if
        if right < n and A[right] > A[largest] then
            largest = right
        end if
        if largest ≠ i then
            Swap A[i] and A[largest]
            heapify(array A, n, largest)
        end if
    end procedure
    `;

    let heapSortStep = `
    procedure HeapSort(array A)
        for i ← length(A) / 2 - 1 to 0 do
            ${action}
        end for

        for i ← length(A) - 1 to 1 do
            Swap A[0] and A[i]
            ${action} with reduced heap
        end for
    end procedure
    `;

    let dynamicAction = "";

    if (phase === "Heapify") {
        dynamicAction = `
            Heapify at index ${i}: 
            left child = ${left}, right child = ${right}, largest = ${i}
            Action: Compare left and right children with current node.
        `;
    } else if (phase === "Building Heap") {
        dynamicAction = `
            Build the heap: heapify subtrees.
        `;
    } else if (phase === "Heapify after swap") {
        dynamicAction = `
            Heapify after swapping root with last element.
        `;
    }

    pseudoDisplay.innerHTML = `
        ${heapSortStep}
        ${dynamicAction}
        ${heapifyStep}
    `;
}
