//VARIABLES

const grid = document.getElementById('grid');
const resetBtn = document.getElementById('resetBtn');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const sketchBtn = document.getElementById('sketchBtn');
const sizeSlider = document.getElementById("sizeSlider");
const gridSizeOutput = document.getElementById("gridSizeOutput");

const DEFAULT_COLOR = 'pink';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;  
let hue = 0;

//FUNCTIONS

function cellFill() {
    switch (currentMode) {
        case 'rainbow':
            this.style.backgroundColor = rainbowMode();
            break;
        case 'color':
            this.style.backgroundColor = currentColor;
            break;
        case 'sketch':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                }
            } else if (this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
            }
            break;
    }
}

function changeSize(value) {
    currentSize = value;
    updateSizeOutput(value);
    resetGrid();
}

sizeSlider.onmousemove = (e) => updateSizeOutput(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function rainbowMode() {
    hue += 10;
    console.log(hue);
    if (hue > 350) {
        hue = 0
        return `hsl(${hue}, 80%, 50%)`
    }
    else {
        return `hsl(${hue}, 80%, 50%)`;    
    } 
}

function resetGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
      }
    setupGrid(currentSize);
    updateSizeOutput(currentSize);
}

function setupGrid() {
    grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`
  
    for (let i = 0; i < currentSize * currentSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', cellFill);
        grid.appendChild(cell);
    }
}

function updateSizeOutput(value) {
    gridSizeOutput.innerHTML = `${value} x ${value}`;
}

//THE REST

resetBtn.onclick = () => resetGrid();
colorBtn.onclick = () => currentMode = 'color';
rainbowBtn.onclick = () => currentMode = 'rainbow';
sketchBtn.onclick = () => currentMode = 'sketch';

setupGrid();