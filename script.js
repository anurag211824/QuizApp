const quizData = [
  {
    question:
      "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["let", "var", "const", "static"],
    answer: "const",
  },
  {
    question: "Which of these array methods modifies the original array?",
    options: ["map()", "filter()", "slice()", "splice()"],
    answer: "splice()",
  },
  {
    question: "Which function is used to delay execution in JavaScript?",
    options: ["setTimeout()", "setInterval()", "delay()", "wait()"],
    answer: "setTimeout()",
  },
  {
    question: "How do you create an arrow function?",
    options: ["function => () {}", "() => {}", "function() => {}", "() -> {}"],
    answer: "() => {}",
  },
  {
    question: "What is the purpose of the `this` keyword in JavaScript?",
    options: [
      "Refers to the current function",
      "Refers to the global object",
      "Refers to the current object",
      "Refers to the previous object",
    ],
    answer: "Refers to the current object",
  },
];

let answerDetails = [];
const questionBox = document.querySelector(".question-box");
const allInputs = document.querySelectorAll("input[type=radio]");
const timerValue = document.getElementById("timer-value"); // Timer display element
let Correct = 0;
let incorrect = 0;
let index = 0;
let intervalId;
let countdown;

const loadQuestions = () => {
  if (index === quizData.length) {
    clearInterval(intervalId);
    clearInterval(countdown);
    displayResult();
    return;
  }
  let quizQuestion = quizData[index];
  questionBox.innerHTML = `${index + 1}. ${quizQuestion.question}`;

  allInputs.forEach((input, i) => {
    input.value = quizQuestion.options[i];
    input.nextElementSibling.innerHTML = quizQuestion.options[i];
  });

  startCountdown(); // Start the countdown for the current question
};

const startCountdown = () => {
  let timeLeft = 10; // 10 seconds for each question
  timerValue.textContent = `${timeLeft} sec / 10 sec`;

  // Update the timer every second
  countdown = setInterval(() => {
    timeLeft--;
    timerValue.textContent = `${timeLeft} sec / 10 sec`;

    // If time runs out, submit the question
    if (timeLeft <= 0) {
      clearInterval(countdown);
      submitQuestion();
    }
  }, 1000);
};

const submitQuestion = () => {
  clearInterval(countdown); // Stop the countdown timer
  let ans = getAnswer();
  if (ans === quizData[index].answer) {
    Correct++;
  } else {
    incorrect++;
  }

  let userAnswer = getAnswer();
  if (userAnswer === undefined) {
    userAnswer = "Not Attempted";
  }

  answerDetails.push({
    questionNo: `${index + 1}`,
    answer: `${quizData[index].answer}`,
    userAnswer: `${userAnswer}`,
  });

  index++;
  reset();
  loadQuestions();
};

const prevQuestion = () => {
  if (index > 0) {
    index--;
    reset();
    loadQuestions();
  }
};

const getAnswer = () => {
  let answer;
  allInputs.forEach((input) => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
};

const reset = () => {
  allInputs.forEach((input) => {
    input.checked = false;
  });
};

const displayResult = () => {
  const resultBox = document.querySelector(".quiz-box");
  const answersInfo = `<div>
    <h1>Quiz Details</h1>
    <table>
      <tr>
        <th>Question No</th>
        <th>Correct Answer</th>
        <th>User Answer</th>
      </tr>
      ${answerDetails
        .map(
          (answer) => `<tr>
        <td>${answer.questionNo}</td>
        <td>${answer.answer}</td>
        <td>${answer.userAnswer}</td>
        </tr>`
        )
        .join("")}
    </table>
  </div>`;
  const result = `<div class="res">
  <h1>Quiz Result</h1> 
  <p>Correct answers: <span>${Correct}</span></p>
  <p>Incorrect answers: <span>${incorrect}</span></p>
  <button onclick="location.reload()">Restart Quiz</button>
  </div>`;
  resultBox.innerHTML = answersInfo + result;

};

// Load the first question
loadQuestions();