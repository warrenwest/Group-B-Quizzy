// Initial 14 questions
const initialQuizData = [
    {
        "question": "What is the correct syntax to print a message to the console in JavaScript?",
        "options": ["console.print('Hello World')", "console.log('Hello World')", "log.console('Hello World')", "echo('Hello World')"],
        "answer": "console.log('Hello World')"
    },
    {
        "question": "Which of the following is a primitive data type in JavaScript?",
        "options": ["Array", "Object", "String", "Function"],
        "answer": "String"
    },
    {
        "question": "How do you declare a variable in JavaScript?",
        "options": ["var", "let", "const", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "Which method is used to add a new element at the end of an array in JavaScript?",
        "options": ["push()", "pop()", "shift()", "unshift()"],
        "answer": "push()"
    },
    {
        "question": "Which of the following is the correct way to create a function in JavaScript?",
        "options": ["function myFunction() {}", "function:myFunction() {}", "function = myFunction() {}", "def myFunction() {}"],
        "answer": "function myFunction() {}"
    },
    {
        "question": "What will be the result of the following code: '5' + 3?",
        "options": ["8", "53", "Error", "NaN"],
        "answer": "53"
    },
    {
        "question": "Which operator is used to compare both value and type in JavaScript?",
        "options": ["=", "==", "===", "!="],
        "answer": "==="
    },
    {
        "question": "What does the 'typeof' operator do in JavaScript?",
        "options": ["Checks the type of a variable", "Converts a variable to a string", "Converts a variable to a boolean", "Checks if a variable is null"],
        "answer": "Checks the type of a variable"
    },
    {
        "question": "Which method removes the first element from an array in JavaScript?",
        "options": ["shift()", "pop()", "unshift()", "push()"],
        "answer": "shift()"
    },
    {
        "question": "What will the following code output? 'console.log(3 > 2 > 1)'",
        "options": ["true", "false", "undefined", "Error"],
        "answer": "false"
    },
    {
        "question": "What does the 'this' keyword refer to in JavaScript?",
        "options": ["The function's return value", "The object that called the function", "The global object", "The function itself"],
        "answer": "The object that called the function"
    },
    {
        "question": "What is the purpose of the 'bind' method in JavaScript?",
        "options": ["It calls a function immediately", "It creates a new function with a specific 'this' value", "It binds two variables together", "It prevents a function from executing"],
        "answer": "It creates a new function with a specific 'this' value"
    },
    {
        "question": "Which JavaScript function can be used to convert a string into a number?",
        "options": ["parseInt()", "toNumber()", "Number()", "convert()"],
        "answer": "parseInt()"
    },
    {
        "question": "What is the result of the following expression: '2' + 2?",
        "options": ["4", "'22'", "Error", "NaN"],
        "answer": "'22'"
    }
];

// Retrieve the quiz data from localStorage or use the initial questions if not already stored
let quizData = JSON.parse(localStorage.getItem("quizData")) || initialQuizData;
//localStorage.clear();
//localStorage.removeItem('quizData');
let currentQuestionIndex = 0;
let score = 0;

// Wait for the DOM to be fully loaded before running the quiz
document.addEventListener('DOMContentLoaded', function() {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
        const state = JSON.parse(savedState);
        currentQuestionIndex = state.currentQuestionIndex;
        score = state.score;
        loadQuestion();
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('quizContent').style.display = 'block';
    } else {
        document.getElementById('quizContent').style.display = 'none';
    }
});

// Start the quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    document.getElementById('startButton').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';

    loadQuestion();
}

// Load a question
function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const questionData = quizData[currentQuestionIndex];
        const quizContent = `
            <div class="question">${questionData.question}</div>
            <div class="answers">
                ${questionData.options.map((option, index) => `
                    <div class="answer">
                        <input type="radio" name="answer" value="${option}" id="option${index}">
                        <label for="option${index}">${option}</label>
                    </div>
                `).join('')}
            </div>
            <button class="btn" id="hidden-button" onclick="submitAnswer()">Next</button>
        `;
        document.getElementById('quizContent').innerHTML = quizContent;
    } else {
        showResult();
    }
}

// Submit the answer and move to the next question
function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const selectedOption = selectedAnswer.value;
        if (selectedOption === quizData[currentQuestionIndex].answer) {
            score++;
        }
    }

    // Save the current progress to localStorage
    const quizState = {
        currentQuestionIndex: currentQuestionIndex + 1,
        score: score
    };
    localStorage.setItem('quizState', JSON.stringify(quizState));

    currentQuestionIndex++;
    loadQuestion();
}

// Show the result
function showResult() {
    const resultContent = `
        <h2>Your Score: ${score} / ${quizData.length}</h2>
        <button class="btn" id="restart-button" onclick="restartQuiz()">Restart Quiz</button>
    `;
    document.getElementById('quizContent').innerHTML = resultContent;
}

// Restart the quiz
function restartQuiz() {
    localStorage.removeItem('quizState');  // Remove saved state from localStorage
    startQuiz();
}

// Handle form submission to add quiz data
document.getElementById('quizDataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const question = document.getElementById('question').value;
    const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value
    ];
    const answer = document.getElementById('answer').value;

    const newQuestion = {
        question: question,
        options: options,
        answer: answer
    };

    quizData.push(newQuestion);  // Add the new question to quizData

    // Save the updated quiz data to localStorage
    localStorage.setItem('quizData', JSON.stringify(quizData));

    // Clear form inputs (optional)
    document.getElementById('quizDataForm').reset();

    alert('Question added successfully!');
  
});
