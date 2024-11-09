let array = [];
let target = null;
let delay = 40;

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

async function linearSearch(array, target) {
    const bars = document.getElementsByClassName('bar');
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = '#f5b041';
        updatePseudocode(i);

        if (array[i] === target) {
            bars[i].classList.add('found');
            break;
        }

        bars[i].style.backgroundColor = '#ff6f61';
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    if (array.indexOf(target) === -1) {
        alert('Target not found!');
    }
}

function updatePseudocode(i) {
    const pseudoDisplay = document.getElementById('pseudocodeDisplay');
    pseudoDisplay.innerHTML = `
procedure LinearSearch(array A, target)
for i from 0 to length of A - 1 do
// Checking index ${i}
if A[i] == target then
    return i
end if
end for
return -1
end procedure
    `;
}

function startLinearSearch() {
    target = parseInt(document.getElementById('targetInput').value);
    linearSearch(array, target);
}