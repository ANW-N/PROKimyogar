let theme = localStorage.getItem('theme') == 'light' ? 'light' : 'dark'
const themeIcon = document.getElementById('theme-icon')

if (theme == 'light') {
    document.body.classList.add('light-mode')
    themeIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`
}

const aniqlik = localStorage.getItem('aniqlik') || 'yaxlit'
const select = document.getElementById('aniqlik')
select.value = aniqlik
select.addEventListener('change', () => {
    localStorage.setItem('aniqlik', select.value)
})

let histories = JSON.parse(localStorage.getItem('history') || '{}')
const historyList = document.getElementById('history-list')
const clearHistory = document.getElementById('history-clear')
const historyBox = document.getElementById('history')
const noHistory = document.getElementById('no-history')
function updateHistory() {
    historyList.innerHTML = ''
    if ((Object.keys(histories).length === 0) || (!noHistory)) {
        noHistory.style.display = 'block'
    } else {
        noHistory.style.display = 'none'
        for (const history in histories) {
            historyList.innerHTML += `
            <div>
            <span>${history}</span>
            <span class="history-value">${histories[history]}</span>

            </div>
            `
        }
    }
}
const vibratsiyaSelect = document.getElementById('vibrate')
if (localStorage.getItem('vibratsiya')) {
    vibratsiyaSelect.checked = localStorage.getItem('vibratsiya') === 'bor'? true : false
}
vibratsiyaSelect.addEventListener('change', () => {
    localStorage.setItem('vibratsiya', vibratsiyaSelect.checked? 'bor':"yo'q")
})
updateHistory()
clearHistory.addEventListener('click', () => {
    localStorage.removeItem('history')
    histories = {}
    updateHistory()
})