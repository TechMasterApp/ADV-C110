Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

Webcam.attach("webcam")

function capture() {
    Webcam.snap((data_uri) => {
        document.getElementById("snapshot").innerHTML = "<img id ='snapimage' src=" + data_uri + ">"
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5AMZzlbAx/model.json", ready)

function ready() {
    console.log("Ready")
}

function predict() {
    ete = document.getElementById("snapimage")
    classifier.classify(ete, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
        document.getElementById("emotion1").innerHTML = result[0].label
        document.getElementById("emotion2").innerHTML = result[1].label

        if (result[0].label == "Happy") {
            document.getElementById("emoji1").innerHTML = "&#128512;"
        } else if (result[0].label == "Angry") {
            document.getElementById("emoji1").innerHTML = "&#128545;"
        } else if (result[0].label == "Bored") {
            document.getElementById("emoji1").innerHTML = "&#128532;"
        } else {
            document.getElementById("emoji1").innerHTML = "&#128546;"
        } 

        if (result[1].label == "Happy") {
            document.getElementById("emoji2").innerHTML = "&#128512;"
        } else if (result[1].label == "Angry") {
            document.getElementById("emoji2").innerHTML = "&#128545;"
        } else if (result[1].label == "Bored") {
            document.getElementById("emoji2").innerHTML = "&#128532;"
        } else {
            document.getElementById("emoji2").innerHTML = "&#128546;"
        } 
    }
}