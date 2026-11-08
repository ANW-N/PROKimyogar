let timer;
let interval;
const btn = document.getElementById('backspace')
document.getElementsByClassName('qavs')[0].addEventListener('click', () => {
     misol.push(`(`)
    generateInput(misol)
})


document.getElementsByClassName('qavs')[1].addEventListener('click', () => {
    misol.push(`)`)
    generateInput(misol)
})

document.getElementById('backspace').addEventListener('click', () => {
    misol.pop()
    generateInput(misol)
})
function btnPointerDown() {
    timer = setTimeout(() => {
        interval = setInterval(() => {
            misol.pop()
            generateInput(misol)
        }, 80);
    }, 150);
}

function btnPointerUp() {
    clearTimeout(timer);
    clearInterval(interval)
}

btn.addEventListener("pointerdown", btnPointerDown);
btn.addEventListener("pointerup", btnPointerUp);
btn.addEventListener("pointerleave", btnPointerUp);
btn.addEventListener("pointercancel", btnPointerUp);

function generateInput(misol) {
    inputArea.textContent = ""
    for (const i of misol) {
        inputArea.textContent += i
    }
    inputArea.innerHTML += `<div class="cursor"></div>`
}

let misol = []
const array = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "*",
    ".", "0", "/",
]
const inputArea = document.getElementById('formula')
array.forEach(element => {
    const button = document.createElement('button');
    button.innerHTML = element;
    button.classList.add('calculator_btn')
    document.getElementById('calculator-btn').appendChild(button);
    button.addEventListener('click', () => {
        misol.push(`${element}`)
        generateInput(misol)
    })
    document.getElementById('clear').addEventListener('click', () => {
        inputArea.textContent = ``;
        resultArea.innerHTML = `0`;
        misol = []
    })
});


for (const i in atomicMasses) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
        misol.push(i)
        generateInput(misol)
    });
    document.getElementById('buttons').appendChild(button);
    button.classList.add('modda')
}