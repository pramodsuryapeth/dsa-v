let array = [];
let delay = 3000;

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
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#f5b041';
            bars[j + 1].style.backgroundColor = '#f5b041';

            updatePseudocode(i, j);

            if (array[j] > array[j + 1]) {
                await swapBars(bars[j], bars[j + 1]);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }

            bars[j].style.backgroundColor = '#ff6f61';
            bars[j + 1].style.backgroundColor = '#ff6f61';
        }
        bars[array.length - i - 1].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

function swapBars(bar1, bar2) {
    return new Promise((resolve) => {
        const tempHeight = bar1.style.height;
        const tempText = bar1.textContent;

        bar1.style.height = bar2.style.height;
        bar1.textContent = bar2.textContent;

        bar2.style.height = tempHeight;
        bar2.textContent = tempText;

        setTimeout(() => {
            resolve();
        }, delay);
    });
}

function updatePseudocode(i, j) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    pseudoDisplay.innerHTML = `
procedure BubbleSort(array A, n)
for i from 0 to n-1 do
for j from 0 to n-i-2 do
    if A[j] > A[j+1] then
        // Swap the elements (i = ${i}, j = ${j})
        temp ← A[j]
        A[j] ← A[j+1]
        A[j+1] ← temp
    end if
end for
end for
end procedure
    `;
}

function startBubbleSort() {
    bubbleSort(array);
}