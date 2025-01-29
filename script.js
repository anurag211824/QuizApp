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
let answerDetails =[]
const questionBox = document.querySelector(".question-box");
const allInputs = document.querySelectorAll("input[type=radio]");
let Correct = 0;
let incorrect = 0;
let index = 0;
const loadQuestions = () => {
  if (index === quizData.length) {
    console.log(answerDetails);
    displayResult();
    return;
  }
  let quizQuestion = quizData[index];
  questionBox.innerHTML = `${index + 1}. ${quizQuestion.question}`;

  allInputs.forEach((input, i) => {
    input.value = quizQuestion.options[i];
    input.nextElementSibling.innerHTML = quizQuestion.options[i];
  });
};

const submitQuestion = () => {
  let ans = getAnswer();
  if (!ans) {
    alert("Please select an answer");
    return;
  }
  if (ans === quizData[index].answer) {
    Correct++;
  } else {
    incorrect++;
  }
 answerDetails.push({questionNo:`${index+1}`,
    answer: `${quizData[index].answer}`,
    userAnswer:`${getAnswer()}`
 });
  index++;
  reset();
  loadQuestions();
};
const prevQuestion=()=>{
    if(index>0){
    index--;
    reset();
    loadQuestions();
    }
}
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
        ${answerDetails.map(answer=> `<tr>
        <td>${answer.questionNo}</td>
        <td>${answer.answer}</td>
        <td>${answer.userAnswer}</td>
        </tr>`).join('')}
      </table>
    </div>`
    const result = `<div class="res">
    <h1>Quiz Result</h1> 
    <p>Correct answers: <span>${Correct}</span></p>
    <p>Incorrect answers: <span>${incorrect}</span></p>
    </div>`;
    resultBox.innerHTML= answersInfo+result;
  };
  loadQuestions();


