
let array = [];
let isSorting = false;
let pseudocodeElement = document.getElementById("pseudocode");
let arrayContainer = document.getElementById("arrayContainer");
let pseudocodeContainer = document.getElementById("pseudocodeContainer");


function generateArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
}

 
function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; 
        arrayContainer.appendChild(bar);
    });
}

 
function updatePseudocode(code, highlightLine = -1) {
    const lines = code.split("\n");
    const highlightedCode = lines.map((line, index) => {
        if (index === highlightLine) {
            return `<span class="pseudocode-line-highlight">${line}</span>`;
        }
        return line;
    }).join("\n");
    pseudocodeElement.innerHTML = highlightedCode;
}

 
async function shellSort() {
    const n = array.length;
    let gap = Math.floor(n / 2);
 
    let pseudocode = `
        Initialize gap = n / 2
        While gap >= 1:
            For i = gap to n-1:
                temp = array[i]
                j = i
                While j >= gap and array[j - gap] > temp:
                    array[j] = array[j - gap]
                    j -= gap
                array[j] = temp
            gap = gap / 2
    `;
    updatePseudocode(pseudocode, 0);

    while (gap >= 1) {
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j = i;
            updatePseudocode(pseudocode, 2); 
            await sleep(200);  

            
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
                updatePseudocode(pseudocode, 6);  
                renderArray();
                await sleep(200); 
            }

            array[j] = temp;
            updatePseudocode(pseudocode, 8);  
            renderArray();
            await sleep(200);  
        }

        gap = Math.floor(gap / 2);
        updatePseudocode(pseudocode, 10);  
        await sleep(200); 
    }

    isSorting = false;
}

 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
document.getElementById("generateArrayBtn").addEventListener("click", () => {
    const size = document.getElementById("arraySize").value;
    generateArray(size);
});

document.getElementById("startSortBtn").addEventListener("click", () => {
    if (!isSorting) {
        isSorting = true;
        shellSort();
    }
});

 
generateArray(10);
