song1 = "";
song2 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scorerightWrist = 0;
scoreleftWrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}



function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);   
        song2.stop();
        song1_status = song1.isPlaying();
        if(song1_status == true){
            song1.play();
        } else{
            song2.play();
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);   
        song1.stop();
        song2_status = song2.isPlaying();
        if(song2_status == true){
            song2.play();
        } else{
            song1.play();
        }
    }
    
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keyPoints[9].score;
        console.log("scoreleftWrist = " +scoreleftWrist);

        scorerightWrist = results[0].pose.keyPoints[10].score;
        console.log("scorerightWrist = " +scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWistY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " +leftWistX+ "leftWristY = " +leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWistY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " +rightWistX+ "rightWristY = " +rightWristY);
    }
}