objects = []
function preload() {
    objectd = ml5.objectDetector("cocossd", modelLoaded);
}
function setup() {
    canvas = createCanvas(320, 320);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    modelLoaded();
}
function draw() {
    image(camera, 0, 26, 320, 320);
    if (status != "") {
        objectd.detect(camera, gotResults);
        for (var i = 0; i < objects.length; i++) {
            label = objects[i].label;
            confidence = objects[i].confidence;
            x = objects[i].x;
            y = objects[i].y;
            height = objects[i].height;
            width = objects[i].width;
        }
        if (label == document.getElementById("search").innerHTML) {
            camera.stop();
            objectd.detect(gotResults);
            document.getElementById("status").innerHTML = "Status: Found Wanted Object";
            document.getElementById("number").innerHTML = "Confidence: " + confidence + "%";
            speechSynthesis = SpeechSynthesisUtterance("Object Mentioned Found");
            fill("violet");
            text(label, x, y);
            noFill();
            stroke("magenta");
            rect(x, y, width, height);
        }
        else{
            document.getElementById("status").innerHTML = "Status: Wanted Object Not Found";
            document.getElementById("number").innerHTML = "Confidence: 0%";
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function start() {
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
