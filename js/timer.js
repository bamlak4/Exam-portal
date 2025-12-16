let timer = 600; 
 const timeBox = document.getElementById("timer");const timerInterval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(timerInterval);
      gradeQuiz();
      return;
    }

    timer--;
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    timeBox.textContent = Time: ${min}:${sec.toString().padStart(2, "0")};
  }, 1000); add tghis on js
