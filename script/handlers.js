function fullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Xatolik yuz berdi: ${err.message}`);
        });
    } else {
        document.exitFullscreen().catch((err) => {
            console.error(`Xatolik yuz berdi: ${err.message}`);
        });
    }
}

function generateTable() {
    modalarJadvali.innerHTML = ''
    for (const i in atomicMasses) {
        const modda = document.createElement('div')
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

function showDisplay(id, displayStyle = 'flex', activeTool = null) {
    for (const menu of menues) {
        menu.disabled = true
    }
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
    }, 200)

    if (activeTool) {
        for (const className of tools.classList) {
            if (className.startsWith('on')) {
                tools.classList.remove(className)
            }
        }
        tools.classList.add(activeTool)
    }
}

for (const button of buttons) {
    button.addEventListener('click', () => {
        if (localStorage.getItem('vibratsiya') === 'bor') {
            navigator.vibrate(50)
        }
    })
}