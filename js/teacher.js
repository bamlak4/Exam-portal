
let teacherQuizzes = JSON.parse(localStorage.getItem('teacherQuizzes')) || [];
let teacherStudents = JSON.parse(localStorage.getItem('teacherStudents')) || [];
let teacherResults = JSON.parse(localStorage.getItem('teacherResults')) || [];
let teacherSettings = JSON.parse(localStorage.getItem('teacherSettings')) || {
    defaultTime: 10,
    maxAttempts: 1,
    passingScore: 60,
    randomizeQuestions: false,
    showResults: true
};

window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn || isLoggedIn !== 'true' || userRole !== 'teacher') {
        alert("Access denied! Teacher login required.");
        window.location.href = "login.html";
        return;
    }
    
    const userData = localStorage.getItem('userData');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            document.getElementById('teacherName').textContent = `Welcome, ${user.name}`;
        } catch (e) {
            console.log("Could not parse user data");
        }
    }
    
   
    if (teacherStudents.length === 0) {
        teacherStudents = [
            { id: 1, name: "Aneni kidanu", email: "stu1@gmail.com" },
            { id: 2, name: "Bamlak chernet", email: "stu2@gmail.com" },
            { id: 3, name: "Azeb yirga", email: "stu3@gmail.com" }
        ];
        localStorage.setItem('teacherStudents', JSON.stringify(teacherStudents));
    }
    
    if (teacherResults.length === 0) {
        teacherResults = [
            { studentName: "aneni kidanu", quizTitle: "Math Quiz", score: "85%", date: "2025-01-15", status: "Passed" },
            { studentName: "Bamlak chernet", quizTitle: "Math Quiz", score: "92%", date: "2025-01-15", status: "Passed" },
            { studentName: "Azeb yirga", quizTitle: "Math Quiz", score: "45%", date: "2025-01-15", status: "Failed" }
        ];
        localStorage.setItem('teacherResults', JSON.stringify(teacherResults));
    }
    
   
    loadSettings();
};


function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}


function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


let questionCounter = 0;

function showCreateQuiz() {
    showModal('quizModal');
    document.getElementById('questionsContainer').innerHTML = '';
    questionCounter = 0;
    addQuestion(); 
}

function addQuestion() {
    questionCounter++;
    const questionHTML = `
        <div class="quiz-question" id="question${questionCounter}">
            <div class="question-header">
                <h4>Question ${questionCounter}</h4>
                <button class="remove-question" onclick="removeQuestion(${questionCounter})">🗑 Remove</button>
            </div>
            <div class="form-group">
                <input type="text" class="question-text" placeholder="Enter question text">
            </div>
            <div class="form-group">
                <label>Options (mark correct answer with ✓):</label>
                <input type="text" class="option" placeholder="Option A">
                <input type="text" class="option" placeholder="Option B">
                <input type="text" class="option" placeholder="Option C">
                <input type="text" class="option" placeholder="Option D">
            </div>
        </div>
    `;
    document.getElementById('questionsContainer').innerHTML += questionHTML;
}

function removeQuestion(questionId) {
    const questionElement = document.getElementById(`question${questionId}`);
    if (questionElement) {
        questionElement.remove();
        
        const questions = document.querySelectorAll('.quiz-question');
        questions.forEach((q, index) => {
            q.querySelector('h4').textContent = `Question ${index + 1}`;
            q.id = `question${index + 1}`;
        });
        questionCounter = questions.length;
    }
}

function saveQuiz() {
    const title = document.getElementById('quizTitle').value;
    const description = document.getElementById('quizDescription').value;
    const timeLimit = document.getElementById('quizTime').value;
    
    if (!title.trim()) {
        alert("Please enter a quiz title");
        return;
    }
    
    const questions = [];
    const questionElements = document.querySelectorAll('.quiz-question');
    
    questionElements.forEach((q, index) => {
        const questionText = q.querySelector('.question-text').value;
        const options = Array.from(q.querySelectorAll('.option')).map(input => input.value);
        
        if (questionText.trim() && options.some(opt => opt.trim())) {
            questions.push({
                text: questionText,
                options: options,
                answer: options[0] 
            });
        }
    });
    
    if (questions.length === 0) {
        alert("Please add at least one question");
        return;
    }
    
    const newQuiz = {
        id: Date.now(),
        title: title,
        description: description,
        timeLimit: parseInt(timeLimit),
        questions: questions,
        createdDate: new Date().toISOString().split('T')[0],
        studentCount: 0
    };
    
    teacherQuizzes.push(newQuiz);
    localStorage.setItem('teacherQuizzes', JSON.stringify(teacherQuizzes));
    
    alert(`Quiz "${title}" created successfully with ${questions.length} questions!`);
    closeModal('quizModal');
    
  
    document.getElementById('quizTitle').value = '';
    document.getElementById('quizDescription').value = '';
    document.getElementById('quizTime').value = '10';
}


function showResults() {
    showModal('resultsModal');
    
    
    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = '';
    
    teacherResults.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.studentName}</td>
            <td>${result.quizTitle}</td>
            <td>${result.score}</td>
            <td>${result.date}</td>
            <td><span style="color: ${result.status === 'Passed' ? 'green' : 'red'}">${result.status}</span></td>
        `;
        resultsTable.appendChild(row);
    });
    
    
    const totalStudents = teacherStudents.length;
    const totalQuizzes = teacherQuizzes.length;
    const passedStudents = teacherResults.filter(r => r.status === 'Passed').length;
    const averageScore = teacherResults.length > 0 ? 
        teacherResults.reduce((sum, r) => sum + parseInt(r.score), 0) / teacherResults.length : 0;
    
    document.getElementById('statsText').innerHTML = `
        <strong>Total Students:</strong> ${totalStudents}<br>
        <strong>Total Quizzes:</strong> ${totalQuizzes}<br>
        <strong>Pass Rate:</strong> ${((passedStudents / teacherResults.length) * 100 || 0).toFixed(1)}%<br>
        <strong>Average Score:</strong> ${averageScore.toFixed(1)}%<br>
        <strong>Total Attempts:</strong> ${teacherResults.length}
    `;
}


function showStudents() {
    showModal('studentsModal');
    updateStudentList();
}

function updateStudentList() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    
    teacherStudents.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        studentItem.innerHTML = `
            <div>
                <strong>${student.name}</strong><br>
                <small>${student.email}</small>
            </div>
            <button class="remove-question" onclick="removeStudent(${student.id})">Remove</button>
        `;
        studentList.appendChild(studentItem);
    });
}

function addStudent() {
    const name = document.getElementById('newStudentName').value;
    const email = document.getElementById('newStudentEmail').value;
    
    if (!name.trim() || !email.trim()) {
        alert("Please enter both name and email");
        return;
    }
    
    if (!email.includes('@')) {
        alert("Please enter a valid email address");
        return;
    }
    
    const newStudent = {
        id: Date.now(),
        name: name,
        email: email
    };
    
    teacherStudents.push(newStudent);
    localStorage.setItem('teacherStudents', JSON.stringify(teacherStudents));
    
    document.getElementById('newStudentName').value = '';
    document.getElementById('newStudentEmail').value = '';
    
    updateStudentList();
    alert(`Student "${name}" added successfully!`);
}

function removeStudent(studentId) {
    if (confirm("Are you sure you want to remove this student?")) {
        teacherStudents = teacherStudents.filter(s => s.id !== studentId);
        localStorage.setItem('teacherStudents', JSON.stringify(teacherStudents));
        updateStudentList();
        alert("Student removed successfully!");
    }
}


function showSettings() {
    showModal('settingsModal');
    document.getElementById('defaultTime').value = teacherSettings.defaultTime;
    document.getElementById('maxAttempts').value = teacherSettings.maxAttempts;
    document.getElementById('passingScore').value = teacherSettings.passingScore;
    document.getElementById('randomizeQuestions').checked = teacherSettings.randomizeQuestions;
    document.getElementById('showResults').checked = teacherSettings.showResults;
}

function loadSettings() {
    if (Object.keys(teacherSettings).length > 0) {
        document.getElementById('defaultTime').value = teacherSettings.defaultTime;
        document.getElementById('maxAttempts').value = teacherSettings.maxAttempts;
        document.getElementById('passingScore').value = teacherSettings.passingScore;
        document.getElementById('randomizeQuestions').checked = teacherSettings.randomizeQuestions;
        document.getElementById('showResults').checked = teacherSettings.showResults;
    }
}

function saveSettings() {
    teacherSettings = {
        defaultTime: parseInt(document.getElementById('defaultTime').value),
        maxAttempts: parseInt(document.getElementById('maxAttempts').value),
        passingScore: parseInt(document.getElementById('passingScore').value),
        randomizeQuestions: document.getElementById('randomizeQuestions').checked,
        showResults: document.getElementById('showResults').checked
    };
    
    localStorage.setItem('teacherSettings', JSON.stringify(teacherSettings));
    alert("Settings saved successfully!");
    closeModal('settingsModal');
}
