// Store all quiz questions in an array of objects.
// Each object contains one question, its options, and its correct answer.

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyper Transfer Main Language"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "Which language is used to style a website?",
        options: [
            "HTML",
            "CSS",
            "SQL",
            "Python"
        ],
        answer: "CSS"
    },

    {
        question: "Which keyword declares a variable that can be reassigned?",
        options: [
            "const",
            "let",
            "return",
            "class"
        ],
        answer: "let"
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<img>",
            "<p>",
            "<a>",
            "<h1>"
        ],
        answer: "<a>"
    },

    {
        question: "Which JavaScript method selects an element by its ID?",
        options: [
            "document.getElementById()",
            "document.createElement()",
            "console.log()",
            "Array.push()"
        ],
        answer: "document.getElementById()"
    }
];


// Get references to the HTML elements we need to control.

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");

const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");

const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");


// These variables track the user's progress through the quiz.

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;


// Start the quiz when the user clicks the Start button.

startButton.addEventListener("click", startQuiz);


// Move to the next question when the user clicks Next.

nextButton.addEventListener("click", nextQuestion);


// Restart the quiz when the user clicks Try Again.

restartButton.addEventListener("click", startQuiz);


// This function starts a new quiz and resets previous progress.

function startQuiz() {

    // Reset the question position and score.
    currentQuestionIndex = 0;
    score = 0;

    // Show the quiz screen and hide the other screens.
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    // Display the first question.
    showQuestion();
}


// This function displays the current question and its answer options.

function showQuestion() {

    // Prevent selecting an answer until the new options are ready.
    answerSelected = false;

    // Get the current question object from the questions array.
    const currentQuestion = questions[currentQuestionIndex];

    // Display the question text.
    questionText.textContent = currentQuestion.question;

    // Display the question number, starting from 1.
    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Update the current score.
    scoreDisplay.textContent = `Score: ${score}`;

    // Calculate progress as a percentage.
    const progress =
        (currentQuestionIndex / questions.length) * 100;

    // Update the width of the progress bar.
    progressBar.style.width = `${progress}%`;

    // Remove answer buttons from the previous question.
    answerButtons.innerHTML = "";

    // Clear feedback from the previous question.
    feedback.textContent = "";

    // Disable Next until an answer has been selected.
    nextButton.disabled = true;

    // Create a button for every answer option.
    currentQuestion.options.forEach(function(option) {

        // Create a new HTML button element.
        const button = document.createElement("button");

        // Add the CSS class that styles answer buttons.
        button.classList.add("answer-btn");

        // Set the text displayed inside the button.
        button.textContent = option;

        // Check the selected answer when this button is clicked.
        button.addEventListener("click", function() {
            selectAnswer(button, option, currentQuestion.answer);
        });

        // Add the new button to the answer buttons container.
        answerButtons.appendChild(button);

    });
}


// This function checks whether the selected answer is correct.

function selectAnswer(selectedButton, selectedOption, correctAnswer) {

    // Stop the user from answering the same question twice.
    if (answerSelected) {
        return;
    }

    // Record that an answer has been selected.
    answerSelected = true;

    // Get every answer button for the current question.
    const buttons = answerButtons.querySelectorAll(".answer-btn");

    // Disable all buttons after an answer is selected.
    buttons.forEach(function(button) {
        button.disabled = true;
    });

    // Check whether the selected option matches the correct answer.
    if (selectedOption === correctAnswer) {

        // Increase the score by one.
        score++;

        // Highlight the selected answer in green.
        selectedButton.classList.add("correct");

        // Show positive feedback.
        feedback.textContent = "Correct! Well done! 🎉";
        feedback.style.color = "#197443";

    } else {

        // Highlight the selected incorrect answer in red.
        selectedButton.classList.add("wrong");

        // Find and highlight the correct answer.
        buttons.forEach(function(button) {

            if (button.textContent === correctAnswer) {
                button.classList.add("correct");
            }

        });

        // Show feedback explaining that the answer was incorrect.
        feedback.textContent = `Incorrect! Correct answer: ${correctAnswer}`;
        feedback.style.color = "#b42332";

    }

    // Update the score shown on the screen.
    scoreDisplay.textContent = `Score: ${score}`;

    // Allow the user to move to the next question.
    nextButton.disabled = false;

    // Change the Next button label on the last question.
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "See Results 🏆";
    } else {
        nextButton.textContent = "Next Question →";
    }

}


// This function moves to the next question or shows the results.

function nextQuestion() {

    // Do nothing if the user has not selected an answer.
    if (!answerSelected) {
        return;
    }

    // Move to the next question.
    currentQuestionIndex++;

    // Check whether all questions have been answered.
    if (currentQuestionIndex < questions.length) {

        // Display the next question.
        showQuestion();

    } else {

        // All questions are finished, so show the final result.
        showResults();

    }

}


// This function calculates and displays the final result.

function showResults() {

    // Hide the quiz and display the result screen.
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // Display the final score.
    finalScore.textContent = `${score} / ${questions.length}`;

    // Calculate the percentage of correct answers.
    const percentage = (score / questions.length) * 100;

    // Choose a message based on the user's score.
    if (percentage === 100) {

        resultMessage.textContent = "Perfect score! Amazing work! 🌟";

    } else if (percentage >= 60) {

        resultMessage.textContent = "Great job! Keep learning! 🎉";

    } else {

        resultMessage.textContent = "Keep practicing. You can do it! 💪";

    }

    // Fill the progress bar completely when the quiz is finished.
    progressBar.style.width = "100%";

}