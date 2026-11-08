`function calculateProblem(misol=[0], how=false) {
    let satr = ""
    misol = misol.length>0? misol : [0]
    for (const i of misol) {
        if (i in atomicMasses) {
            if (select.value === 'aniq') {
                satr += '+' + atomicMasses[i][0]
            } else {
                satr += '+' + atomicMasses[i][1]
            }
        }
        else if (i === '(') {
            satr += '+' + i
        }
        else {
            satr += i
        }
    }
    let cleanSatr = ''
    amallar = ['+', '-', '*', '/']
    for (const index in satr) {
        let intIndex = parseInt(index)
        if (
            !(
                intIndex === 0 && 
                ['+','*','/'].includes(satr[intIndex])
            )
                && 
            !(
                amallar.includes(satr[intIndex]) && 
                amallar.includes(satr[intIndex-1])
            )
            &&
            !(
                amallar.includes(satr[intIndex]) && 
                satr[intIndex-1] === '('
            )
            &&
            !(
                amallar.includes(satr[intIndex]) &&
                intIndex === satr.length-1
            )
        ) {
            cleanSatr += satr[intIndex]
        }
    }
    try {
        resultArea.textContent = eval(
            cleanSatr
        )
        if (how) {
            inputArea.textContent = cleanSatr
        }
    } catch {
        resultArea.textContent = 'XATOLIK'
    }

    if (Object.keys(histories).length >= 30) {
        let i = 1;
        let newHistories = {};
        for (const key in histories) {
            if (i > Object.keys(histories).length - 30) {
                newHistories[key] = histories[key]
            }
            i++
        }
        histories = newHistories
        i = 0
    }
    if (!['Infinity', 'NaN', 'XATOLIK', 'null', ''].includes(resultArea.textContent)) {
        localStorage.setItem('history', JSON.stringify(histories))
        histories[inputArea.textContent] = resultArea.textContent
        updateHistory()
    }
}`

function calculateProblem(misol=[0], how=false) {
    let satr = ""
    misol = misol.length>0? misol : [0]
    misol = misol.filter(
        function(v, i, jadval) {
            if ((['+', '-', '*', '/'].includes(jadval[jadval.length-1]))) {
                misol.pop()
            }
            booleanResponse = (
                !(i === 0 && ['+', '*', '/'].includes(v))
            )
            return booleanResponse
        }
    )
    for (const i of misol) {
        if (i in atomicMasses) {
            if (select.value === 'aniq') {
                satr += '+' + atomicMasses[i][0]
            } else {
                satr += '+' + atomicMasses[i][1]
            }
        }
        else if (i === '(') {
            satr += '+' + i
        }
        else {
            satr += i
        }
    }
    let cleanSatr = ''
    amallar = ['+', '-', '*', '/']
    for (const index in satr) {
        let intIndex = parseInt(index)
        if (
            !(
                intIndex === 0 && 
                ['+','*','/'].includes(satr[intIndex])
            )
                && 
            !(
                amallar.includes(satr[intIndex]) && 
                amallar.includes(satr[intIndex-1])
            )
            &&
            !(
                amallar.includes(satr[intIndex]) && 
                satr[intIndex-1] === '('
            )
            &&
            !(
                amallar.includes(satr[intIndex]) &&
                intIndex === satr.length-1
            )
        ) {
            cleanSatr += satr[intIndex]
        }
    }
    try {
        resultArea.textContent = eval(
            cleanSatr
        )
        if (how) {
            inputArea.textContent = cleanSatr
        }
    } catch {
        resultArea.textContent = 'XATOLIK'
    }

    if (Object.keys(histories).length >= 30) {
        let i = 1;
        let newHistories = {};
        for (const key in histories) {
            if (i > Object.keys(histories).length - 30) {
                newHistories[key] = histories[key]
            }
            i++
        }
        histories = newHistories
        i = 0
    }
    if (!['Infinity', 'NaN', 'XATOLIK', 'null', ''].includes(resultArea.textContent)) {
        localStorage.setItem('history', JSON.stringify(histories))
        histories[inputArea.textContent] = resultArea.textContent
        updateHistory()
    }
}