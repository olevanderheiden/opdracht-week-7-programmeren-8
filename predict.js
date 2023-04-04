const nn = ml5.neuralNetwork({ task: 'regression', debug: true })


let battery = document.getElementById('battery')
let weight = document.getElementById('weight')

nn.load('./model/model.json', modelLoaded)

const button = document.querySelector('#btn')
button.addEventListener('click',() => makePrediction())

function modelLoaded() {
    //yay
}

async function makePrediction() {
    let valueBattery = parseInt(battery.value)
    let valueWeight = parseInt(weight.value)

    const results = await nn.predict({ battery: valueBattery, weight: valueWeight })

    // console.log(`Geschatte opslag: ${results[0].storage}`)
    document.getElementById('result').innerHTML = `Geschatte dikte: ${results[0].thickness} Milimeter`
}

