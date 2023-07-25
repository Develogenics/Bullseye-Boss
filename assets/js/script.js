/* eslint-env browser */

// Function to initialize the gallery carousel
function initCarousel() {
  const carouselElement = document.querySelector('.carousel');
  if (!carouselElement) {
      return;
  }

  const firstImg = carouselElement.querySelector('img');
  const arrowIcons = document.querySelectorAll('.wrapper i');
  let isDragStart = false;
  let isDragging = false;
  let prevPageX;
  let prevScrollLeft;
  let positionDiff;

  function showHideIcons() {
      const scrollWidth = carouselElement.scrollWidth - carouselElement.clientWidth;

      arrowIcons[0].style.display = carouselElement.scrollLeft === 0 ? 'none' : 'block';
      arrowIcons[1].style.display = carouselElement.scrollLeft === scrollWidth ? 'none' : 'block';
  }

  arrowIcons.forEach((icon) => {
      icon.addEventListener('click',
          () => {
              const firstImgWidth = firstImg.clientWidth + 14;
              carouselElement.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
              setTimeout(showHideIcons,
                  60);
          });
  });

  function autoSlide() {
      if (carouselElement.scrollLeft + carouselElement.clientWidth >= carouselElement.scrollWidth) {
          return;
      }

      positionDiff = Math.abs(positionDiff);
      const firstImgWidth = firstImg.clientWidth + 14;
      const valDifference = firstImgWidth - positionDiff;

      if (carouselElement.scrollLeft > prevScrollLeft) {
          carouselElement.scrollLeft += positionDiff > firstImgWidth / 3
              ? valDifference
              : -positionDiff;
      } else {
          carouselElement.scrollLeft -= positionDiff > firstImgWidth / 3
              ? valDifference
              : -positionDiff;
      }
  }

  function dragStart(event) {
      isDragStart = true;
      prevPageX = event.pageX || event.touches[0].pageX;
      prevScrollLeft = carouselElement.scrollLeft;
  }

  function dragging(event) {
      if (!isDragStart) {
          return;
      }
      event.preventDefault();
      isDragging = true;
      carouselElement.classList.add('dragging');
      positionDiff = (event.pageX || event.touches[0].pageX) - prevPageX;
      carouselElement.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
  }

  function dragStop() {
      isDragStart = false;
      carouselElement.classList.remove('dragging');
      if (!isDragging) {
          return;
      }
      isDragging = false;
      autoSlide();
  }

  carouselElement.addEventListener('mousedown',
      dragStart);
  carouselElement.addEventListener('touchstart',
      dragStart);
  document.addEventListener('mousemove',
      dragging);
  carouselElement.addEventListener('touchmove',
      dragging);
  document.addEventListener('mouseup',
      dragStop);
  carouselElement.addEventListener('touchend',
      dragStop);
}

document.addEventListener('DOMContentLoaded',
  initCarousel);

// Quiz
const quizData = [
  {
      question: 'Can anyone learn archery',
      choices: ['Yes', 'No', 'Maybe'],
      correctAnswer: 0,
  },
  {
      question: 'How long ago have people been using a bow and arrow?',
      choices: ['25,000 years', '6,000 years', '500 years'],
      correctAnswer: 0,
  },
  {
      question: 'When was archery first included as an Olympic sport?',
      choices: ['1972', '1924', '1900'],
      correctAnswer: 2,
  },
];

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');

let currentQuestion = 0;
let score = 0;

function showResult() {
  questionElement.textContent = '';
  choicesElement.innerHTML = '';
  resultElement.textContent = `You scored ${score} out of ${quizData.length} questions.`;
  resultElement.style.display = 'block';
  submitButton.style.display = 'none';
}
function showQuestion() {
  if (currentQuestion < quizData.length) {
      const { question } = quizData[currentQuestion];
      const { choices } = quizData[currentQuestion];

      questionElement.textContent = question;
      choicesElement.innerHTML = '';

      choices.forEach((choice, index) => {
          const choiceElement = document.createElement('div');
          choiceElement.className = 'choice';

          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'quizChoice';
          radioInput.value = index;

          const choiceLabel = document.createElement('label');
          choiceLabel.textContent = choice;

          choiceElement.appendChild(radioInput);
          choiceElement.appendChild(choiceLabel);
          choicesElement.appendChild(choiceElement);
      });

      submitButton.textContent = 'Submit';
  } else {
      showResult();
  }
}

function handleChoiceClick() {
  const selectedRadio = document.querySelector('input[name="quizChoice"]:checked');
  if (selectedRadio) {
      const selectedIndex = parseInt(selectedRadio.value,
          10); // Provide the radix parameter (10).
      const { correctAnswer } = quizData[currentQuestion];

      if (selectedIndex === correctAnswer) {
          score += 1;
      }

      currentQuestion += 1;
      showQuestion();
  }
}

submitButton.addEventListener('click',
  handleChoiceClick);
showQuestion();

const currentPath = window.location.pathname;
const links = document.querySelectorAll('.navbar .nav-link');
links.forEach((link) => {
  if (link.getAttribute('href') === currentPath) {
      link.classList.add('active-link');
  }
});

function customAlert(message) {
  customAlert(message);
}

function hello() {
  customAlert('Welcome!  > > >   Click OK to be a boss!');
}

// Get the current page's URL
const currentPageURL = window.location.href;

// Conditionally call the 'hello' function based on the URL of the current page
if (currentPageURL.includes("index.html")) {
  hello();
}
