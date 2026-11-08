const firstInput = document.getElementsByClassName('proporsia_value')
const hisoblashBtn = document.getElementById('calculate-proporsia')

hisoblashBtn.addEventListener('click', () => {
    for (input of firstInput) {
        if (!input.value) {
            alert('qiymatlarni kiritishingiz shart')
            return
        }
    }
    
    try {
        javob = (firstInput[1].value * firstInput[2].value) / firstInput[0].value
        if (!([Infinity, NaN, undefined, null].includes(javob))) {
            document.getElementById('javob').innerHTML = `X = ${firstInput[1].value} * ${firstInput[2].value} / ${firstInput[0].value} = <span id="fourth-res">${javob.toFixed(3)}</span>`
        }
        else {
            document.getElementById('javob').innerHTML = `<span id="fourth-res">Xaolik, mumkin bo'lmagan qiymatlarni kiritdingiz!</span>`
        }
    } catch {
        document.getElementById('javob').innerHTML = `<span id="fourth-res">XATOLIK</span>`
    }
})