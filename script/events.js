const calculate = document.getElementById('calculate')
const resultArea = document.getElementById('result')
calculate.addEventListener('click', () => {
    calculateProblem(misol, false)
})

fullScreenBtn.addEventListener('click', () => {
    currenntIcon += 1
    fullScreenBtn.innerHTML = fullScreenIcons[currenntIcon%2]
    fullScreen()
})

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

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(resultArea.textContent).then(
        copy.innerHTML = `<i class="fa-solid fa-square-check"></i>`,
        setTimeout(() => {
            copy.innerHTML = `<i class="fa-solid fa-clone"></i>`
        }, 2000)
    )
})

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
        const massMatch = element[1] && element[1].toString() === searchValue;

        if (symbolMatch || nameMatch || numberMatch || massMatch) {
            isFound = true;
            const modda = document.createElement('div');
            modda.classList.add('jadvalChild');
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
        fullScreenBtn.style.display = 'block'
        themeToggle.style.display = 'flex'
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
    fullScreenBtn.style.display = 'none'
    themeToggle.style.display = 'none'
    themeIcon.style.display = 'none'
    installBtn.style.display = 'none'
    clearTimeout(timeout)
})

document.addEventListener('keydown', (key) => {
    if (['(',')','1', '2','3','4','5','6','7','8','9','*','+','-','.','/', '0'].includes(key.key) && tools.classList.contains('onCalculator')) {
        misol.push(key.key)
        generateInput(misol)
    }

    if (key.key === 'Enter' && tools.classList.contains('onCalculator')) {
        document.activeElement.blur()
        calculate.click()
    }
    else if (key.key === 'Backspace' && tools.classList.contains('onCalculator')) {
        misol.pop()
        generateInput(misol)
    }
    else if (key.key === 'Delete' && tools.classList.contains('onCalculator')) {
        misol = []
        generateInput(misol)
        resultArea.textContent = '0'
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

how.addEventListener('click', () => {
    calculateProblem(misol, true)
})