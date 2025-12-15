const userEmail = localStorage.getItem('userEmail');
const userRole = localStorage.getItem('userRole');

if (!userEmail) {
    window.location.href = 'login-signup.html';
} else {
    document.getElementById('welcomeMsg').innerText = `Welcome ${userRole.toUpperCase()} - ${userEmail}`;
}

const defaultQuiz = {
    title: "Default Sample Quiz",
    timeLimit: 5, 
    questions: [
        { text: "What is 2 + 2?", options: ["4", "3", "5", "2"], answer: "4" },
        { text: "Which language is used for web?", options: ["Python", "HTML", "C++", "Java"], answer: "HTML" },
        { text: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], answer: "Blue" }
    ]
};

let quizzes = JSON.parse(localStorage.getItem('teacherQuizzes')) || [];
let currentQuiz = quizzes.length > 0 ? quizzes[quizzes.length - 1] : defaultQuiz;

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const questionBox = document.getElementById('questionBox');
    const q = currentQuiz.questions[currentQuestionIndex];
    questionBox.innerHTML = `
        <h3>Q${currentQuestionIndex + 1}: ${q.text}</h3>
        <ul>
            ${q.options.map((opt, i) => `<li><button onclick="answer('${opt}')">${opt}</button></li>`).join('')}
        </ul>
    `;
}

function answer(selected) {
    const correct = currentQuiz.questions[currentQuestionIndex].answer;
    if (selected === correct) score++;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Score: ${score} / ${currentQuiz.questions.length}</p>
        <p>Percentage: ${(score / currentQuiz.questions.length * 100).toFixed(1)}%</p>
    `;
}
showQuestion();

