objects = [];
status = "";


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("object_name").value;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status :  Objects Detected";
        document.getElementById("object").innerHTML = "Number 0f Objects Detected are " + objects.length;
        fill("red");
        stroke("red");
        nofill();
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%" + objects[i].x + 15, objects[i].y + 15);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label==object_name){
video.stop();
objectDetector.detect(gotResults);
document.getElementById("status").innerHTML = object_name + " Found";
        }
        else{
          document.getElementById("status").innerHTML = object_name + "Not Found"; 
        }
    }
}
}