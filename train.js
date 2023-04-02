import {createChart, updateChart} from "./scatterplot.js"

const nn = ml5.neuralNetwork({ task: 'regression', debug: true })


loadData();


function loadData() {
    Papa.parse("./data/mobilephones.csv", {
        download:true,
        header:true,
        dynamicTyping:true,
        complete: results => dataLoaded(results.data)
    })
}

function dataLoaded(data) {
    const chartdata = data.map(mobile => ({
        x: mobile.battery,
        y: mobile.thickness,
    }))
    createChart(chartdata,"Battery", "Thickness")

    checkData(data)
}

function checkData(data){
    // data voorbereiden
    data.sort(() => (Math.random() - 0.5))
    // let trainData = data.slice(0, Math.floor(data.length * 0.8))
    // let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    // neural network aanmaken

    // data toevoegen aan neural network
    // for(let mobile of trainData){
     for(let mobile of data){
        // nn.addData({ battery: mobile.battery, thickness: mobile.thickness}, { weight: mobile.weight })
        nn.addData({ battery: mobile.battery, weight: mobile.weight }, { thickness: mobile.thickness })

    }
    // normalize

    nn.normalizeData()

    nn.train({ epochs: 10 }, () => finishedTraining())
}

async function finishedTraining() {
    document.getElementById('save').addEventListener('click', () => {
        nn.save()
    })
    let predictions = []
    for (let bat = 800; bat < 9500; bat += 25) {
        const pred = await nn.predict({battery: bat})
        predictions.push({x: bat, y: pred[0].thickness})
    }
    updateChart("Predictions", predictions)
}