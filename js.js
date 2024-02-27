const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const timeCount = quizBox.querySelector(".timer .timer-sec");
const timeLine = quizBox.querySelector("header .time-line");
const timeOff = quizBox.querySelector("header .time-text");

const optionList = document.querySelector(".option-list");


startBtn.onclick = () => {
    infoBox.classList.add("activeInfo");
}

exitBtn.onclick = () => {
    infoBox.classList.remove("activeInfo");
}

continueBtn.onclick = () => {
    quizBox.classList.add("activeQuiz");
    infoBox.classList.remove("activeInfo");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = quizBox.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const qiutQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    queCount = 0;
    queNumb = 1;
    counter;
    counterLine;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time Left"
}

qiutQuiz.onclick = () => {
    window.open("/index.html");
}

nextBtn.onclick = () => {
    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
        timeOff.textContent = "Time Left"
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions complete")
        showResultBox();
    }

}

function showQuestions(index) {
    const queText = document.querySelector(".que-text")
    let queTag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    let optionTag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></div>';

let crossIcon = ' <div class="icon cross"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></div>'

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore)
        answer.classList.add("correct")
        console.log("Answer is Correct")
        answer.insertAdjacentHTML("beforeend", tickIcon)
    } else {
        answer.classList.add("incorrect")
        console.log("Answer is Wrong")
        answer.insertAdjacentHTML("beforeend", crossIcon)

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute("class", "option correct")
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");

    }
    nextBtn.style.display = "block";
}

function showResultBox() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score-text");
    if (userScore > 3) {
        let scoreTag = ' <span>and congrats! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) {
        let scoreTag = ' <span>and nice, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = ' <span>and sorry, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off"
            userScore += 0;

            let correctAns = questions[queCount].answer;
            let allOptions = optionList.children.length;
            nextBtn.style.display = "block";


            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute("class", "option correct")
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 27);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px"
        if (time > 600) {
            clearInterval(counterLine);

        }
    }
}





function queCounter(index) {
    const bottomQuesCounter = quizBox.querySelector(".total-que")
    let totalQuesCounting = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>'
    bottomQuesCounter.innerHTML = totalQuesCounting;

}