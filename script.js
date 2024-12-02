// Helper function for typewriter effect
function typewriterEffect(textElement, text, callback) {
    let index = 0;
    textElement.style.opacity = 1; // Ensure the row is visible
    const interval = setInterval(() => {
        if (index < text.length) {
            textElement.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 70); // Smoother typing speed
}

// Helper function for fade-out effect
function fadeOut(element, callback) {
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.display = "none";
        if (callback) callback();
    }, 2000); // Match CSS transition duration
}

// Fade in effect for elements
function fadeInLine(lineElement) {
    lineElement.style.opacity = 1;
}

// Dynamically split text into rows if needed
function splitTextIntoRows(text, maxCharacters) {
    const words = text.split(' ');
    let row = '';
    const rows = [];

    words.forEach((word) => {
        if ((row + word).length <= maxCharacters) {
            row += `${word} `;
        } else {
            rows.push(row.trim());
            row = `${word} `;
        }
    });

    if (row) rows.push(row.trim());
    return rows;
}

// Scenes setup
const scenes = [
    {
        element: document.getElementById("scene1"),
        text: "Hello There!! Press the cat above!",
        interaction: () => {
            const gif = document.getElementById("catGif");
            gif.addEventListener("click", () => {
                fadeOut(scenes[0].element, () => {
                    showScene(1);
                });
            });
        }
    },
    {
        element: document.getElementById("scene2"),
        text: "Hello Theree!! How have you been? Tomorrow is the 2nd Quarterly text, Right?",
        interaction: () => {
            setTimeout(() => {
                fadeOut(scenes[1].element, () => {
                    showScene(2);
                });
            }, 2000); // Wait 2 seconds after text display
        }
    },
    {
        element: document.getElementById("scene3"),
        text: "I know the exam might be tough, but I believe in you! Trust yourself, take a moment to pray, and you’ll do great. You’ve got this!",
        interaction: () => {
            setTimeout(() => {
                fadeOut(scenes[2].element, () => {
                    showScene(3);
                });
            }, 3000); // Wait 3 seconds after text display
        }
    },
    {
        element: document.getElementById("scene4"),
        text: "GOODLUCK!! I know you can do it. No matter the outcome, It'll be fine. Just do your best! You've got this 😸😸",
        interaction: null
    }
];

// Show scene function
function showScene(index) {
    const scene = scenes[index];
    scene.element.style.display = "flex";
    scene.element.style.opacity = 1;

    const textElement = scene.element.querySelector(".text");
    const lineElement = scene.element.querySelector(".line");

    fadeInLine(lineElement); // Line fades in

    // Adjust text into rows for mobile
    const maxCharacters = 25; // Adjust for mobile-friendly width
    const rows = splitTextIntoRows(scene.text, maxCharacters);

    textElement.textContent = ''; // Clear previous content

    rows.forEach((row, rowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.className = 'text-row';
        rowElement.style.opacity = 0; // Ensure it's hidden initially
        textElement.appendChild(rowElement);

        setTimeout(() => {
            typewriterEffect(rowElement, row, () => {
                if (rowIndex === rows.length - 1 && scene.interaction) {
                    scene.interaction(); // Trigger interaction after last row
                }
            });
        }, rowIndex * 2000); // Delay each row's typewriter effect
    });
}

// Prevent dragging, zooming, or touch gestures
document.addEventListener("gesturestart", (e) => e.preventDefault());
document.addEventListener("gesturechange", (e) => e.preventDefault());
document.addEventListener("gestureend", (e) => e.preventDefault());

// Start with the first scene
showScene(0);
