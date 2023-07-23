var carouselElement = document.querySelector(".carousel");
if (carouselElement) {
  let firstImg = Array.from(carouselElement.querySelectorAll("img"))[0];
  let arrowIcons = document.querySelectorAll(".wrapper i");
  let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

  let showHideIcons = () => {
    
    let scrollWidth = carouselElement.scrollWidth - carouselElement.clientWidth; 
    arrowIcons[0].style.display = carouselElement.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carouselElement.scrollLeft == scrollWidth ? "none" : "block";
  };

  arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let firstImgWidth = firstImg.clientWidth + 14; 
    
      carouselElement.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60);
    });
  });

  let autoSlide = () => {
   
    if (carouselElement.scrollLeft - (carouselElement.scrollWidth - carouselElement.clientWidth) > -1 || carouselElement.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); 
    let firstImgWidth = firstImg.clientWidth + 14;
    
    let valDifference = firstImgWidth - positionDiff;
    if (carouselElement.scrollLeft > prevScrollLeft) { 
      return carouselElement.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    
    carouselElement.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  };

  let dragStart = (e) => {
   
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carouselElement.scrollLeft;
  };

  let dragging = (e) => {
   
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carouselElement.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carouselElement.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  };

  let dragStop = () => {
    isDragStart = false;
    carouselElement.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  };

  carouselElement.addEventListener("mousedown", dragStart);
  carouselElement.addEventListener("touchstart", dragStart);
  document.addEventListener("mousemove", dragging);
  carouselElement.addEventListener("touchmove", dragging);
  document.addEventListener("mouseup", dragStop);
  carouselElement.addEventListener("touchend", dragStop);
}



let quizData = [
  {
    question: "Can anyone learn archery",
    choices: ["Yes", "No", "Maybe"],
    correctAnswer: 0,
  },
  {
    question: "How long ago have people been using a bow and arrow?",
    choices: ["25,000 years", "6,000 years", "500 years"],
    correctAnswer: 0,
  },
  {
    question: "When was archery first included as an Olympic sport?",
    choices: ["1972", "1924", "1900"],
    correctAnswer: 2,
  },
];

let questionElement = document.getElementById("question");
let choicesElement = document.getElementById("choices");
let submitButton = document.getElementById("submit-btn");
let resultElement = document.getElementById("result");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  if (currentQuestion < quizData.length) {
    let question = quizData[currentQuestion].question;
    let choices = quizData[currentQuestion].choices;

    questionElement.textContent = question;
    choicesElement.innerHTML = "";

    choices.forEach((choice, index) => {
      let choiceElement = document.createElement("div");
      choiceElement.className = "choice";

      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "quizChoice";
      radioInput.value = index; 

      let choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;

      choiceElement.appendChild(radioInput);
      choiceElement.appendChild(choiceLabel);
      choicesElement.appendChild(choiceElement);
    });

    submitButton.textContent = "Submit";
  } else {
    showResult();
  }
}

function handleChoiceClick() {
  const selectedRadio = document.querySelector('input[name="quizChoice"]:checked');
  if (selectedRadio) {
    let selectedIndex = parseInt(selectedRadio.value);
    let correctAnswer = quizData[currentQuestion].correctAnswer;

    if (selectedIndex === correctAnswer) {
      score++;
    }

    currentQuestion++;
    showQuestion();
  }
}

function showResult() {
  questionElement.textContent = "";
  choicesElement.innerHTML = "";
  resultElement.textContent = `You scored ${score} out of ${quizData.length} questions.`;
  resultElement.style.display = "block";
  submitButton.style.display = "none";
}

submitButton.addEventListener("click", handleChoiceClick);
showQuestion();


  let currentPath = window.location.pathname;

  
  let links = document.querySelectorAll(".navbar .nav-link");
  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add('active-link');
    }
  });


function hello(){ 
alert("Welcome!  > > >   Click ok to be a boss!"); 
}