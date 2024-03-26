var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level  = 0;



$(".btn").click(function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
})

$(document).on("keypress",function(){
    if(!started){
        textLevel(level);
        nextSequence();
        started = true;

    }
})



function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 3);
    level++;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    textLevel(level);
}




function playSound(name){
    switch(name){
        case "green" :
            var greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
            break;
        case "red" :
            var redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
            break;
        case "yellow" :
            var yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
            break;
        case "blue" :
            var blueAudio = new Audio("sounds/blue.mp3");
            blueAudio.play();
            break;
        default :
            alert("alert");
    }
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");

    setTimeout(function(){
        $("." + currentColor).removeClass('pressed');

}, 100);
}

function textLevel(level){
    $("h1").text("Level " + level);
}

function checkAnswer(currentLevel){
    var index = userClickedPattern.length-1;
    var gameIndex = gamePattern.length - 1;
    if(userClickedPattern[index] === gamePattern[index]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern.length = 0;
        }, 1000);
       
        }
    }else{
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        $("h1").text("Game Over, Press Any Key to Restart");
        gameOver();
    }

}

function gameOver(){
    level = 0;
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    started = false;
}