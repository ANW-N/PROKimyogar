function workWithTheme() {
    themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode')
    if (theme == 'light') {
        localStorage.setItem('theme', 'dark')
        theme = 'dark'
        themeIcon.innerHTML = `<i class="fa-solid fa-sun fa-spin" style="color: rgb(255, 212, 59);"></i>`
    } else {
        localStorage.setItem('theme', 'light')
        theme = 'light'
        themeIcon.innerHTML = `<i class="fa-solid fa-moon"></i>`
        }
    })
}
workWithTheme()