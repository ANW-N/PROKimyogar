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
const calculate = document.getElementById('calculate')
const resultArea = document.getElementById('result')
calculate.addEventListener('click', () => {
    let satr = ""
    for (const i of misol) {
        if (i in atomicMasses) {
            if (select.value === 'aniq') {
                satr += '+' + atomicMasses[i][0]
            } else {
                satr += '+' + atomicMasses[i][1]
            }
        }
        else {
            satr += i
        }
    }
    try {
        resultArea.textContent = eval(
            satr
        )
    } catch {
        resultArea.textContent = 'XATOLIK'
    }

    histories[inputArea.textContent] = resultArea.textContent
    localStorage.setItem('history', JSON.stringify(histories))
    updateHistory()
})
function fullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
}
const modalarJadvali = document.getElementById('moddalar_jadvali')
function generateTable() {
    modalarJadvali.innerHTML = ''
    for (const i in atomicMasses) {
        const modda = document.createElement('div')
        modda.classList.add('modda')
        modda.classList.add('jadvalChild')
        const element = atomicMasses[i]
        modda.classList.add(element[2])
        const electrons = element[5].join(' ')
        modda.innerHTML = `
            <span class="wrap-nums">
                <h5>${element[4]}</h5>
                <h5 class="${element[6]? 'rounded':''}">${element[6] || ''}</h5>
            </span>

            <span class="wrap-contents">
                <h1>${i}</h1>
                <span class="split-2">
                    <h4>${element[3]}</h4>
                    <h5>${element[0]} | ${element[1]}</h5>
                </span>
            </span

            <span class="electrons">
                ${electrons}
            </span>
        `
        modalarJadvali.appendChild(modda)
    }
}
generateTable()

const blurAnimation = document.getElementById('blur-animation')
const displays = document.getElementsByClassName('display')
const menues = document.getElementsByName('menu')

const tools = document.getElementById('tools')
function showDisplay(id, displayStyle = 'flex', activeTool = null) {
    for (const menu of menues) {
        menu.disabled = true
    }
    fullScreen()
    blurAnimation.classList.add('start')
    animatsiyaBor=true
    setTimeout(() => {
        blurAnimation.classList.remove('start')
        for (const menu of menues) {
            menu.disabled = false
        }
    }, 600)
    setTimeout(() => {
        for (const display of displays) {
            if (display.id === id) {
                display.style.display = displayStyle
            } else {
                display.style.display = 'none'
            }
        }
    }, 300)

    if (activeTool) {
        for (const className of tools.classList) {
            if (className.startsWith('on')) {
                tools.classList.remove(className)
            }
        }
        tools.classList.add(activeTool)
    }
}

const footer = document.querySelector('footer')
const label = document.getElementsByClassName('menues')
let timeout2;
footer.addEventListener('mouseenter', () => {
    timeout2 = setTimeout(()=>{
        for (const l of label) {
            l.style.display = 'flex'
        }
        clearTimeout(timeout2)
    }, 100)
})
footer.addEventListener('mouseleave', () => {
    clearTimeout(timeout2)
    for (const l of label) {
        l.style.display = 'none'
    }
})
const copy = document.getElementById('copy')
copy.addEventListener('click', () => {
    navigator.clipboard.writeText(resultArea.textContent).then(
        copy.innerHTML = `<i class="fa-solid fa-square-check"></i>`,
        setTimeout(() => {
            copy.innerHTML = `<i class="fa-solid fa-clone"></i>`
        }, 2000)
    )
})

const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')

searchBtn.addEventListener('click', () => {
    const searchValue = searchInput.value.trim().toLowerCase();

    if (!searchValue) {
        alert('Iltimos, qidirish maydonini to\'ldiring.');
        return;
    }

    modalarJadvali.innerHTML = '';
    let isFound = false;

    for (const i in atomicMasses) {
        const element = atomicMasses[i];
        
        // Element belgisi (H, He), nomi (Vodorod, Geliy) yoki tartib raqami (1, 2) bo'yicha qidirish
        const symbolMatch = i.toLowerCase() === searchValue;
        const nameMatch = element[3] && element[3].toString().toLowerCase().includes(searchValue);
        const numberMatch = element[4] && element[4].toString() === searchValue;

        if (symbolMatch || nameMatch || numberMatch) {
            isFound = true;
            const modda = document.createElement('div');
            modda.classList.add('modda', 'jadvalChild');
            modda.classList.add(element[2]);
            modda.style.maxHeight = 'min-content';
            const electrons = Array.isArray(element[5]) ? element[5].join(' ') : element[5];

            modda.innerHTML = `
                <span class="wrap-nums">
                    <h5>${element[4]}</h5>
                    <h5 class="${element[6] ? 'rounded' : ''}">${element[6] || ''}</h5>
                </span>

                <span class="wrap-contents">
                    <h1>${i}</h1>
                    <span class="split-2">
                        <h4>${element[3]}</h4>
                        <h5>${element[0]} | ${element[1]}</h5>
                    </span>
                </span>

                <span class="electrons">
                    ${electrons}
                </span>
            `;
            modalarJadvali.appendChild(modda);
        }
    }

    if (!isFound) {
        alert('Element topilmadi!');
        generateTable(); // Topilmagan holatda butun jadvalni qayta tiklaydi
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click()
    }
})

searchInput.addEventListener('input', () => {
    if (!searchInput.value.trim()) {
        generateTable()
    }
})

let deferredPrompt;

const installBtn = document.getElementById("install-btn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    deferredPrompt = e;

    // O'rnatish tugmasini ko'rsatamiz
    installBtn.style.display = "flex";
});

installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;

    // Brauzerning PWA o'rnatish oynasini ochadi
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log(
        outcome === "accepted"
            ? "Ilova o'rnatildi"
            : "O'rnatish bekor qilindi"
    );

    deferredPrompt = null;

    installBtn.style.display = "none";
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(registration => {
                console.log("PWA Service Worker ishlayapti:", registration.scope);
            })
            .catch(error => {
                console.error("Service Worker xatosi:", error);
            });
    });
}

const buttons = document.getElementsByClassName('buttons')
const moddalar = document.getElementsByClassName('modda')
for (const button of buttons) {
    button.addEventListener('click', () => {
        if (localStorage.getItem('vibratsiya') === 'bor') {
            navigator.vibrate(50)
        }
    })
}

document.addEventListener('click', (event) => {
    const isVibratable = event.target.closest('button, .modda, .calculator_btn, .menues');
    
    if (isVibratable) {
        if (vibratsiyaSelect.value === 'bor' && 'vibrate' in navigator) {
            try {
                navigator.vibrate(50);
            } catch (e) {
                console.log("Vibratsiya xatosi:", e);
            }
        }
    }
});
let timeout;
const searchArea = document.getElementById('search')

tools.addEventListener('mouseenter', () => {
    timeout = setTimeout(()=>{
        if (tools.classList.contains('onCalculator')) {
            historyBox.style.display = 'flex'
        }
        if (tools.classList.contains('onTable')) {
            searchArea.style.display = 'flex'
        }
        themeToggle.style.display = 'block'
        themeIcon.style.display = 'block'
        installBtn.style.display = 'flex'
        clearTimeout(this)
    }, 150)
})

tools.addEventListener('mouseleave', () => {
    if (tools.classList.contains('onCalculator')) {
        historyBox.style.display = 'none'
    }
    if (tools.classList.contains('onTable')) {
        searchArea.style.display = 'none'
    }
    themeToggle.style.display = 'none'
    themeIcon.style.display = 'none'
    installBtn.style.display = 'none'
    clearTimeout(timeout)
})

document.addEventListener('keydown', (key) => {
    if ((key.key === '*' || ['1', '2','3','4','5','6','7','8','9'].includes(key.key)) && tools.classList.contains('onCalculator')) {
        misol.push(key.key)
        generateInput(misol)
    }

    if (key.key === 'Enter' && tools.classList.contains('onCalculator')) {
        calculate.click()
    }

    if (key.key === 'Backspace' && tools.classList.contains('onCalculator')) {
        misol.pop()
        generateInput(misol)
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key === 'Backspace') {
        clearInterval(interval)
    }
});

document.addEventListener('keypress', (event) => {
    if (event.key === 'Backspace') {
        interval = setInterval(() => {
            misol.pop()
            generateInput(misol)
        }, 80);
    }
})
