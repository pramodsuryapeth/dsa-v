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

async function startCountingSort() {
    const bars = document.getElementsByClassName('bar');
    await countingSort(array, bars);
}

async function countingSort(array, bars) {
    const max = Math.max(...array);
    const count = new Array(max + 1).fill(0);

    updatePseudocode(1);  
    await sleep(delay);

     
    for (let num of array) {
        count[num]++;
    }

    updatePseudocode(2);  
    await sleep(delay);

    let index = 0;
    for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
            updatePseudocode(3);  
            bars[index].style.backgroundColor = '#f39c12';
            array[index] = i;
            bars[index].style.height = `${i * 5}px`;
            bars[index].querySelector('span').textContent = i;
            count[i]--;
            index++;
            await sleep(delay);
            bars[index - 1].style.backgroundColor = '#2ecc71';  
        }
    }

    updatePseudocode(4);  
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updatePseudocode(step) {
    const steps = [
        "procedure CountingSort(array A)",
        "Create a count array initialized to 0",
        "For each element in A, increment the corresponding count index",
        "For each index in the count array, set A to the correct value",
        "end procedure"
    ];

    let pseudocodeHTML = steps
        .map((line, index) =>
            `<div style="${index + 1 === step ? 'color: red; font-weight: bold;' : ''}">${line}</div>`
        )
        .join("");

    document.getElementById("pseudocodeDisplay").innerHTML = pseudocodeHTML;
}
