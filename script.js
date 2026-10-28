// ==========================================
// QUIZARENA - ONLINE QUIZ COMPETITION
// ==========================================

const questionBank = {

    "Programming": [
        {
            q: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Transfer Machine Language",
                "Hyper Tool Markup Language",
                "Home Text Management Language"
            ],
            answer: 0
        },
        {
            q: "Which language styles web pages?",
            options: ["Python", "CSS", "SQL", "Java"],
            answer: 1
        },
        {
            q: "Which keyword declares a block-scoped variable in JavaScript?",
            options: ["varonly", "define", "let", "integer"],
            answer: 2
        },
        {
            q: "Which HTML tag creates a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            answer: 1
        },
        {
            q: "Which CSS property changes text color?",
            options: ["font-size", "background", "text-style", "color"],
            answer: 3
        },
        {
            q: "What does CPU stand for?",
            options: [
                "Central Processing Unit",
                "Computer Program Utility",
                "Central Power Unit",
                "Control Processing User"
            ],
            answer: 0
        },
        {
            q: "Which symbol checks strict equality in JavaScript?",
            options: ["=", "==", "===", "!="],
            answer: 2
        },
        {
            q: "Which data structure follows FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: 1
        },
        {
            q: "Which method selects an element using its ID?",
            options: [
                "getElementById()",
                "getClass()",
                "selectElement()",
                "getTagById()"
            ],
            answer: 0
        },
        {
            q: "Which HTML element creates an unordered list?",
            options: ["<ol>", "<li>", "<ul>", "<list>"],
            answer: 2
        }
    ],

    "General Knowledge": [
        {
            q: "What is the capital of India?",
            options: ["Mumbai", "Chennai", "New Delhi", "Kolkata"],
            answer: 2
        },
        {
            q: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Mercury"],
            answer: 1
        },
        {
            q: "How many days are there in a leap year?",
            options: ["364", "365", "366", "367"],
            answer: 2
        },
        {
            q: "Which is the largest ocean on Earth?",
            options: [
                "Atlantic Ocean",
                "Indian Ocean",
                "Arctic Ocean",
                "Pacific Ocean"
            ],
            answer: 3
        },
        {
            q: "What is the national currency of Japan?",
            options: ["Won", "Yen", "Dollar", "Euro"],
            answer: 1
        },
        {
            q: "Which organ pumps blood through the human body?",
            options: ["Lungs", "Kidneys", "Heart", "Liver"],
            answer: 2
        },
        {
            q: "Which is the largest planet in our solar system?",
            options: ["Earth", "Saturn", "Jupiter", "Neptune"],
            answer: 2
        },
        {
            q: "Which gas do plants absorb during photosynthesis?",
            options: [
                "Oxygen",
                "Carbon dioxide",
                "Nitrogen",
                "Hydrogen"
            ],
            answer: 1
        },
        {
            q: "How many continents are commonly recognized?",
            options: ["Five", "Six", "Seven", "Eight"],
            answer: 2
        },
        {
            q: "Which instrument measures temperature?",
            options: ["Barometer", "Thermometer", "Compass", "Hygrometer"],
            answer: 1
        }
    ],

    "Science": [
        {
            q: "What is the chemical formula of water?",
            options: ["CO2", "O2", "H2O", "NaCl"],
            answer: 2
        },
        {
            q: "Which planet is closest to the Sun?",
            options: ["Venus", "Earth", "Mars", "Mercury"],
            answer: 3
        },
        {
            q: "What is the SI unit of force?",
            options: ["Joule", "Newton", "Watt", "Pascal"],
            answer: 1
        },
        {
            q: "Which part of a plant mainly absorbs water from soil?",
            options: ["Flower", "Leaf", "Root", "Fruit"],
            answer: 2
        },
        {
            q: "What is the approximate speed of light in vacuum?",
            options: [
                "300,000 km/s",
                "30,000 km/s",
                "3,000 km/s",
                "300 km/s"
            ],
            answer: 0
        },
        {
            q: "Which gas is essential for human respiration?",
            options: ["Helium", "Oxygen", "Neon", "Argon"],
            answer: 1
        },
        {
            q: "What is the basic unit of life?",
            options: ["Atom", "Organ", "Cell", "Tissue"],
            answer: 2
        },
        {
            q: "Which vitamin can the human body produce with sunlight exposure?",
            options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
            answer: 3
        },
        {
            q: "What is the pH of neutral pure water at about 25°C?",
            options: ["0", "5", "7", "14"],
            answer: 2
        },
        {
            q: "Which instrument is used to observe distant celestial objects?",
            options: ["Microscope", "Telescope", "Periscope", "Stethoscope"],
            answer: 1
        }
    ]

};


// ==========================================
// APPLICATION STATE
// ==========================================

const QUIZ_TIME = 300;

let student = {};
let category = "Programming";
let questions = [];
let currentIndex = 0;
let answers = [];
let remainingTime = QUIZ_TIME;
let timerInterval = null;
let quizEnded = false;


// ==========================================
// DOM ELEMENTS
// ==========================================

const registrationSection = document.getElementById("registration");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");

const registrationForm = document.getElementById("registration-form");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");


// ==========================================
// NAVIGATION
// ==========================================

function hideAllScreens() {
    registrationSection.classList.add("hidden");
    quizSection.classList.add("hidden");
    resultSection.classList.add("hidden");
}

function showHome() {
    clearInterval(timerInterval);
    hideAllScreens();

    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
}

function showRegistration() {
    clearInterval(timerInterval);
    hideAllScreens();

    registrationSection.classList.remove("hidden");

    registrationSection.scrollIntoView({
        behavior: "smooth"
    });
}

function startCategory(selectedCategory) {
    category = selectedCategory;
    showRegistration();
}


// ==========================================
// STUDENT REGISTRATION
// ==========================================

registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    student = {
        name: document.getElementById("student-name").value.trim(),
        register: document.getElementById("register-number").value.trim(),
        college: document.getElementById("college-name").value.trim(),
        department: document.getElementById("department").value
    };

    if (
        !student.name ||
        !student.register ||
        !student.college ||
        !student.department
    ) {
        alert("Please complete all student details.");
        return;
    }

    beginQuiz();

});


// ==========================================
// START QUIZ
// ==========================================

function beginQuiz() {

    clearInterval(timerInterval);

    questions = questionBank[category].map(question => ({
        ...question,
        options: [...question.options]
    }));

    currentIndex = 0;
    answers = new Array(questions.length).fill(null);
    remainingTime = QUIZ_TIME;
    quizEnded = false;

    hideAllScreens();

    quizSection.classList.remove("hidden");

    document.getElementById("quiz-category").textContent =
        category.toUpperCase();

    document.getElementById("quiz-student").textContent =
        `Participant: ${student.name} | Register No: ${student.register}`;

    renderQuestion();

    updateTimer();

    timerInterval = setInterval(function() {

        if (quizEnded) {
            clearInterval(timerInterval);
            return;
        }

        remainingTime--;

        updateTimer();

        if (remainingTime <= 0) {
            finishQuiz();
        }

    }, 1000);

    quizSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// RENDER QUESTIONS
// ==========================================

function renderQuestion() {

    const question = questions[currentIndex];

    document.getElementById("question-number").textContent =
        `Question ${currentIndex + 1} of ${questions.length}`;

    questionText.textContent = question.q;

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option, index) {

        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "quiz-answer";
        radio.checked = answers[currentIndex] === index;

        const text = document.createElement("span");
        text.textContent = option;

        if (radio.checked) {
            label.classList.add("selected");
        }

        radio.addEventListener("change", function() {

            if (quizEnded) return;

            answers[currentIndex] = index;

            renderQuestion();

        });

        label.appendChild(radio);
        label.appendChild(text);

        optionsContainer.appendChild(label);

    });

    previousButton.disabled = currentIndex === 0;

    nextButton.disabled = currentIndex === questions.length - 1;

    const answered = answers.filter(
        answer => answer !== null
    ).length;

    document.getElementById("answered-count").textContent =
        `${answered} of ${questions.length} answered`;

    document.getElementById("progress-bar").style.width =
        `${((currentIndex + 1) / questions.length) * 100}%`;

}


// ==========================================
// NAVIGATION BUTTONS
// ==========================================

previousButton.addEventListener("click", function() {

    if (currentIndex > 0 && !quizEnded) {
        currentIndex--;
        renderQuestion();
    }

});

nextButton.addEventListener("click", function() {

    if (currentIndex < questions.length - 1 && !quizEnded) {
        currentIndex++;
        renderQuestion();
    }

});


// ==========================================
// TIMER
// ==========================================

function updateTimer() {

    const minutes = Math.floor(remainingTime / 60);

    const seconds = remainingTime % 60;

    document.getElementById("timer").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


// ==========================================
// SUBMIT QUIZ
// ==========================================

submitButton.addEventListener("click", function() {

    if (quizEnded) return;

    const unanswered = answers.filter(
        answer => answer === null
    ).length;

    if (unanswered > 0) {

        const confirmed = confirm(
            `${unanswered} question(s) are unanswered. Submit the quiz?`
        );

        if (!confirmed) return;

    } else {

        const confirmed = confirm(
            "Are you sure you want to submit your competition?"
        );

        if (!confirmed) return;

    }

    finishQuiz();

});


// ==========================================
// CALCULATE SCORE AND SHOW RESULT
// ==========================================

function finishQuiz() {

    if (quizEnded) return;

    quizEnded = true;

    clearInterval(timerInterval);

    let correct = 0;

    questions.forEach(function(question, index) {

        if (answers[index] === question.answer) {
            correct++;
        }

    });

    const incorrect = questions.length - correct;

    const percentage = Math.round(
        (correct / questions.length) * 100
    );

    const marks = Math.round(
        (correct / questions.length) * 100
    );

    hideAllScreens();

    resultSection.classList.remove("hidden");

    document.getElementById("result-heading").textContent =
        percentage >= 40 ? "Congratulations!" : "Keep Practicing!";

    document.getElementById("result-description").textContent =
        `You completed the ${category} competition.`;

    document.getElementById("percentage").textContent =
        `${percentage}%`;

    document.getElementById("correct").textContent = correct;

    document.getElementById("incorrect").textContent = incorrect;

    document.getElementById("marks").textContent =
        `${marks}/100`;

    document.getElementById("result-name").textContent =
        student.name;

    document.getElementById("result-register").textContent =
        student.register;

    document.getElementById("result-college").textContent =
        student.college;

    document.getElementById("result-department").textContent =
        student.department;

    renderAnswerReview();

    saveLeaderboardResult({
        name: student.name,
        register: student.register,
        category: category,
        score: marks,
        date: new Date().toISOString()
    });

    renderLeaderboard();

    resultSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// ANSWER REVIEW
// ==========================================

function renderAnswerReview() {

    const container = document.getElementById("review-container");

    container.innerHTML = "";

    questions.forEach(function(question, index) {

        const isCorrect = answers[index] === question.answer;

        const item = document.createElement("div");
        item.className = "review-item";

        const heading = document.createElement("h3");

        heading.textContent = `${index + 1}. ${question.q}`;

        const selected = document.createElement("p");

        selected.className = isCorrect
            ? "correct-text"
            : "wrong-text";

        selected.textContent =
            "Your answer: " +
            (
                answers[index] === null
                    ? "Not answered"
                    : question.options[answers[index]]
            );

        const correctAnswer = document.createElement("p");

        correctAnswer.className = "correct-text";

        correctAnswer.textContent =
            "Correct answer: " + question.options[question.answer];

        item.appendChild(heading);
        item.appendChild(selected);
        item.appendChild(correctAnswer);

        container.appendChild(item);

    });

}


// ==========================================
// LOCAL LEADERBOARD
// ==========================================

function getLeaderboard() {

    try {

        const saved = localStorage.getItem("quizArenaLeaderboard");

        const parsed = saved ? JSON.parse(saved) : [];

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        return [];

    }

}

function saveLeaderboardResult(result) {

    try {

        const leaderboard = getLeaderboard();

        leaderboard.push(result);

        leaderboard.sort(function(a, b) {
            return b.score - a.score;
        });

        // Demo leaderboard: retain the 20 highest-scoring attempts.
        localStorage.setItem(
            "quizArenaLeaderboard",
            JSON.stringify(leaderboard.slice(0, 20))
        );

    } catch (error) {

        alert("The browser could not save the leaderboard.");

    }

}

function renderLeaderboard() {

    const body = document.getElementById("leaderboard-body");

    body.innerHTML = "";

    const leaderboard = getLeaderboard();

    if (leaderboard.length === 0) {

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.textContent = "No competition results yet.";

        row.appendChild(cell);
        body.appendChild(row);

        return;

    }

    leaderboard.forEach(function(result, index) {

        const row = document.createElement("tr");

        const values = [
            index === 0 ? "🥇 1" :
            index === 1 ? "🥈 2" :
            index === 2 ? "🥉 3" :
            String(index + 1),

            result.name,
            result.category,
            `${result.score}/100`
        ];

        values.forEach(function(value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        body.appendChild(row);

    });

}


// ==========================================
// RESTART
// ==========================================

function restartQuiz() {

    clearInterval(timerInterval);

    quizEnded = true;

    registrationForm.reset();

    hideAllScreens();

    registrationSection.classList.remove("hidden");

    registrationSection.scrollIntoView({
        behavior: "smooth"
    });

}


// INITIALIZE LEADERBOARD

renderLeaderboard();
