let array = [];
let delay = 800;

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
        bar.style.height = `${array[i] * 5}px`;

        const barLabel = document.createElement('span');
        barLabel.textContent = array[i];
        bar.appendChild(barLabel);
        arrayContainer.appendChild(bar);
    }
}

async function startMergeSort() {
    const bars = document.getElementsByClassName('bar');
    await mergeSortHelper(array, 0, array.length - 1, bars);
}

async function mergeSortHelper(array, left, right, bars) {
    if (left < right) {
        const middle = Math.floor((left + right) / 2);

        updatePseudocode(1);  
        await sleep(delay);

        await mergeSortHelper(array, left, middle, bars);
        updatePseudocode(2); 
        await sleep(delay);

        await mergeSortHelper(array, middle + 1, right, bars);
        updatePseudocode(3);  
        await sleep(delay);

        await merge(array, left, middle, right, bars);
        updatePseudocode(4);  
        await sleep(delay);
    }
}

async function merge(array, left, middle, right, bars) {
    const n1 = middle - left + 1;
    const n2 = right - middle;

    let leftArray = array.slice(left, middle + 1);
    let rightArray = array.slice(middle + 1, right + 1);

    let i = 0, j = 0, k = left;

    updatePseudocode(5);  
    await sleep(delay);

    while (i < n1 && j < n2) {
        updatePseudocode(6);  
        bars[k].style.backgroundColor = '#f39c12';

        if (leftArray[i] <= rightArray[j]) {
            updatePseudocode(7);  
            array[k] = leftArray[i];
            bars[k].style.height = `${leftArray[i] * 5}px`;
            bars[k].querySelector('span').textContent = leftArray[i];
            i++;
        } else {
            updatePseudocode(8); 
            array[k] = rightArray[j];
            bars[k].style.height = `${rightArray[j] * 5}px`;
            bars[k].querySelector('span').textContent = rightArray[j];
            j++;
        }
        k++;
        await sleep(delay);
        bars[k - 1].style.backgroundColor = '#2ecc71';
    }

    while (i < n1) {
        updatePseudocode(9); 
        array[k] = leftArray[i];
        bars[k].style.height = `${leftArray[i] * 5}px`;
        bars[k].querySelector('span').textContent = leftArray[i];
        i++;
        k++;
        await sleep(delay);
    }

    while (j < n2) {
        updatePseudocode(10); 
        array[k] = rightArray[j];
        bars[k].style.height = `${rightArray[j] * 5}px`;
        bars[k].querySelector('span').textContent = rightArray[j];
        j++;
        k++;
        await sleep(delay);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
function updatePseudocode(step) {
    const steps = [
        "procedure MergeSort(array A, left, right)",
        "if left < right then",
        "mid ← floor((left + right) / 2)",
        "MergeSort(A, left, mid)",
        "MergeSort(A, mid + 1, right)",
        "Merge(A, left, mid, right)",
        "procedure Merge(array A, left, mid, right)",
        "i ← 0, j ← 0, k ← left",
        "while i < length(A[left...mid]) and j < length(A[mid+1...right])",
        "if A[left[i]] <= A[right[j]] then",
        "A[k] ← A[left[i]]",
        "else A[k] ← A[right[j]]",
        "i ← i + 1 or j ← j + 1",
        "k ← k + 1",
        "end while"
    ];

    let pseudocodeHTML = steps
        .map((line, index) =>
            `<div style="${index + 1 === step ? 'color: red; font-weight: bold;' : ''}">${line}</div>`
        )
        .join("");

    document.getElementById("pseudocodeDisplay").innerHTML = pseudocodeHTML;
}
