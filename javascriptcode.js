var playing = false;
var score = 0;
var action;
var time = 60;
var correctanswer = 0;

document.getElementById("startgame").onclick = 
function() {
    if (playing)
    {
        location.reload();
    }
    else
    {
        playing = true;
        time = 60;
        score = 0;

        document.getElementById("startgame").innerHTML = "Reset Game";
        showElement("timeremaining");
        document.getElementById("scoreval").innerHTML = score;
        hideElement("gameover");

        time = 60;
        startCountdown();
        generateQuestions();
    }
}

function startCountdown() {
    action = setInterval(function() {
        time -= 1;
        document.getElementById("timevalue").innerHTML = time;

        if(time == 0)
        {
            playing = false;
            stopCountdown();
            document.getElementById("gameover").innerHTML = "<p>Game Over</p><p>Your score is " + score + "</p>";
            showElement("gameover");

            hideElement("timeremaining");
            hideElement("correct");
            hideElement("tryagain");
            

            document.getElementById("startgame").innerHTML = "Start Game";
        }
    }, 1000);

}

for (i = 1; i < 5; i++)
{
    document.getElementById("box"+i).onclick = 
    function() {
        if (playing == true)
        {
            if (this.innerHTML == correctanswer)
            {
                score++;
                document.getElementById("scoreval").innerHTML = score;
                showElement("correct");
                hideElement("tryagain");

                setTimeout(function() {
                    hideElement("correct");
                }, 1000);

                generateQuestions();
            }

            else
            {
                showElement("tryagain");
                hideElement("correct");
                setTimeout(function() {
                    hideElement("tryagain");
                }, 1000);
            }
        }
    }
}


function stopCountdown() {
    clearInterval(action);
    
}

function hideElement(Id) {
    document.getElementById(Id).style.display = "none";
}

function showElement(Id) {
    document.getElementById(Id).style.display = "block";
}

function generateQuestions() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    var operators = ["+", "-", "*"];
    var select = Math.floor(Math.random() * 3);
    var finalexp = num1 + " " + operators[select] + " " + num2;
    document.getElementById("questionbox").innerHTML = "<p>" + finalexp + "</p>";

    if (select == 0)
    correctanswer = num1 + num2;
    else if(select == 1)
    correctanswer = num1 - num2;
    else
    correctanswer = num1 * num2;

    var correctpos = 1 + Math.floor(Math.random() * 4);
    document.getElementById("box"+correctpos).innerHTML = correctanswer;
    for (i = 1; i < 5; i++)
    {
        if(i != correctpos)
        {
            var x = Math.floor(Math.random()*100);
            if (x == correctanswer)
            x++;
            document.getElementById("box"+i).innerHTML = x;
        }
    }

}