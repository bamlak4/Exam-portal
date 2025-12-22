const questions = [
      {
        text: "A cylindrical water tank has a radius of 3 m and height of 7 m. What is its volume?",
        options: ["198 m³", "197 m³", "200 m³", "210 m³"],
        answer: "198 m³"
      },
      {
        text: "A square floor of side 8 m is to be covered with square tiles of side 0.4 m. How many tiles are needed?",
        options: ["200", "300", "400", "600"],
        answer: "400"
      },
     {
        text: "The diagonal of a square is 14√2 cm. Find its area.",
        options: ["196 cm²","392 cm²","784 cm²","98 cm²"],
        answer: "196 cm²"
    },

{
text: "If the radius of a circle is doubled, its area becomes." ,
options:["2 times","3 times", "4 times","8 times"],
answer: "4 times"
},


{
text: "The volume of a cube is 512 cm³. Find its side length.",
options: [ "6 cm","8 cm", "10 cm","12 cm"],
answer: "8 cm"
} ,

{
text: "Which shape will come next in the sequence? (Square → Circle → Triangle → Square → ?)",
options: [ "Triangle","Circle", "Square","Pentagon"],
answer: "Circle"
},

{
text: "If ALL → ZOO, then TREE → ?",
options: [ "UGFF","GYVV", "FGGV","YYGG"],
answer: "GYVV"
},

{
text: "Find the odd one out: Pencil, Eraser, Sharpener, Book",
options: [ "Pencil","Eraser", "Sharpener","Book"],
answer: "Book"
},

{
text: "If 2 = 6, 3 = 12, 4 = 20, then 5 = ?",
options: [ "25","30","35","40"],
answer: "30"
},

{
text: "Which of the following is symmetrical?",
options: [ "Scalene Triangle","Circle","Trapezium","Parallelogram"],
answer: "Circle"
},

{
text: "A cube is painted red on all faces and then cut into 64 small cubes. How many small cubes will have exactly two red faces?",
options: [ "24","36", "48","12"],
answer: "24",
},

{
text: "Which view will show the least detail of a building?",
options: [ "Plan","Elevation", "Section","Isometric"],
answer: "Isometric"
},


{
text: "If a solid cube is cut along its diagonal plane, what shape will you get?",
options: [ "Pyramid","Tetrahedron", "Prism","Cuboid"],
answer: "Tetrahedron"
},

{
text: "Which of the following is not a perspective drawing technique?",
options: ["One-point","Two-point", "Three-point","Four-point"],
answer: "Four-point"
},

{
text: "When a cone is cut parallel to its base, the shape formed is a:",
options: [ "Sphere","Frustum", "Cylinder","Torus"],
answer: "Frustum"
},

{
text: "Who designed the Guggenheim Museum in New York?",
options: [ "Zaha Hadid","Frank Lloyd Wright", "Le Corbusier","Norman Foster"],
answer: "Frank Lloyd Wright"
},

{
text: "Which Indian monument is known as 'Dream in Marble'?",
options: [ "Lotus Temple","Hawa Mahal", "Taj Mahal","Sun Temple"],
answer: "Taj Maha"
},

{
text: "Le Corbusier designed which city in India?",
options: [ "Chandigarh","Delhi", "Jaipur","Mumbai"],
answer: "Chandigarh"
},

{
text: "Which architect is called 'Master of Light'?",
options: [ "Tadao Ando","Louis Kahn", "Mies van der Rohe","Frank Gehry"],
answer: "Louis Kahn"
},

{
text: "The Fallingwater house is designed by:",
options: [ "Le Corbusier","Frank Lloyd Wright", "Zaha Hadid","Antoni Gaudi"],
answer: "Frank Lloyd Wright"
},

{
text: "If a building has wide openings, large verandahs, and sloping roofs, it is MOST likely designed for:",
options: [ "Desert climate","Heavy rainfall area", "Cold region","Urban high-rise"],
answer: "Heavy rainfall area"
},

{
text: "Which principle of design is shown when elements are repeated to create movement?",
options: [ "Balance","Rhythm", "Proportion","Unity"],
answer: "Rhythm"
},

{
text: "Use of symmetry in design mainly provides:",
options: [ "Harmony","Contrast", "Rhythm","Tension"],
answer: "Harmony"
},

{
text: "A building with thick walls and small windows is best suited for:",
options: [ "Cold regions","Hot deserts", "Coastal areas","Tropical regions"],
answer: "Hot deserts"
},

{
text: "The Lotus Temple in Delhi represents which concept?",
options: [ "Nature-inspired design","Postmodernism", "High-tech","Minimalism"],
answer: "Nature-inspired design"
}
    ];

let currentQuestion = 0;
    let userAnswers = {};
    let step = 0;

    const questionBox = document.getElementById("questionBox");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const resultBox = document.getElementById("result");
    const ultraPrevBtn = document.getElementById("ultraprevBtn");
    const ultraNextBtn = document.getElementById("ultranextBtn");
    const time = document.getElementById("timer");

       function loadQuestion(index) {
      const q = questions[index];
      questionBox.innerHTML = `
        <h2>Question #${index+1}</h2>
        <p>${q.text}</p>
        <div class="options">
          ${q.options.map(opt => `
            <label>
              <input type="radio" name="q${index}" value="${opt}" ${userAnswers[index] === opt ? "checked" : ""}>
              ${opt}
            </label>
          `).join("")}
        </div>
      `;
          
      prevBtn.disabled = index === 0;
      ultraPrevBtn.disabled = index === 0;
      prevBtn.classList.toggle("btn-disabled", index === 0);
      ultraPrevBtn.classList.toggle("btn-disabled", index === 0);
      nextBtn.textContent = index === questions.length - 1 ? "Submit" : "Next";
        }

    function saveAnswer() {
      const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
      if (selected) {
        userAnswers[currentQuestion] = selected.value;
      }
    }

    function goToOne() {
      while(currentQuestion >0) {
        currentQuestion--;
        step++;
      }
      loadQuestion(currentQuestion);
    }

    nextBtn.addEventListener("click", () => {
      saveAnswer();
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
      } else {
        gradeQuiz();
      }
    });

    prevBtn.addEventListener("click", () => {
      saveAnswer();
      if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
      }
    });

    ultraPrevBtn.addEventListener("click", () => {
      saveAnswer();
      if (currentQuestion > 0) {
        goToOne();
        currentQuestion=0;
        loadQuestion(currentQuestion);
      }
    });

    ultraNextBtn.addEventListener("click", () => {
      saveAnswer();
      if (currentQuestion < questions.length - 1) {
        currentQuestion+=step;
        loadQuestion(currentQuestion);
        step=0;
      } 
    });

    function gradeQuiz() {
  let score = 0;
  let reviewHTML = "";

  questions.forEach((q, i) => {
    const isCorrect = userAnswers[i] === q.answer;
    if (isCorrect) score++;

    reviewHTML += `
      <div class="review-item">
        <p><strong>Q${i + 1}:</strong> ${q.text}</p>
        <p>Your answer: ${userAnswers[i] || "Not answered"}</p>
        <p>Correct answer: ${q.answer}</p>
        <p>${isCorrect ? " Correct" : " Incorrect"}</p>
      </div>
    `;
  });

  const percentage = Math.round((score / questions.length) * 100);
  const grade =
    percentage >= 90 ? "A" :
    percentage >= 80 ? "B" :
    percentage >= 70 ? "C" :
    percentage >= 60 ? "D" : "F";

  questionBox.innerHTML = `
    <div class="result-summary">
      <h2>🎉 Quiz Completed!</h2>
      <h3>Score: ${score}/${questions.length}</h3>
      <h3>Percentage: ${percentage}%</h3>
      <h3>Grade: ${grade}</h3>
      <h3>Status: ${percentage >= 60 ? " Passed" : " Failed"}</h3>
      <button class="btn" onclick="location.reload()" style="margin-top:20px;">
        Restart Quiz
      </button>
    </div>
    <hr>
    <div class="review-section">
      <h3>Review Your Answers:</h3>
      ${reviewHTML}
    </div>
  `;

  document.querySelector(".btns").style.display = "none";
  const time = document.getElementById("timer");
  if (time) time.style.display = "none";
}

  window.logout = function() {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login-signup.html';
    };

    window.onload = function() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const welcomeMsg = document.getElementById('welcomeMsg');
  
  if (welcomeMsg && userData.name) {
    welcomeMsg.textContent = `Welcome, ${userData.name}!`;
  }
  
  loadQuestion(currentQuestion);
};

    loadQuestion(currentQuestion);
  }
  
