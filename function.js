// Load sound files
const crashSound = new Audio('crash.mp3');
const appleSound = new Audio('apple.mp3');

// Array of messages to cycle through
const messages = [
    "Hmm...This date seems familiar...",
    "Oh my days! \n\n Did I forget \n\n my not-15-year-old-anymore \n\n babes birthday?!?!",
    "I could never.",
    "Happy birthday!!",
    "I can't imagine YOU being 16!",
    "Since your birth \n\n you've experienced the earth \n\n circling the sun \n\n 16 times now! \n\n Isn't that just crazy?",
    "Whatever. \n\n No more boring texts. \n\n Instead look at-"
];

let messageIndex = 0;
let charIndex = 0;
let lClickCount = 0;

function hideImage(element) {
    element.style.display = "none";
    typeWriter();
}

function typeWriter() {
    const textContainer = document.getElementById("typed-text");
    const currentText = messages[messageIndex];

    if (!currentText) return;

    if (charIndex < currentText.length) {
        textContainer.innerHTML += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    } else {
        // 1. Play Crash & Queue Next Messages
        if (currentText.includes("Instead look at-")) {
            crashSound.play();

            if (!messages.includes("What was that?")) {
                messages.push("What was that?");
                messages.push("Ryuk?!");
            }
        }

        // 2. Reveal Ryuk 3 seconds after "What was that?"
        if (currentText.includes("What was that?")) {
            setTimeout(() => {
                const object = document.getElementById("ryuk-pic");
                if (object) {
                    object.style.display = "block";
                }
            }, 3000);
        }

        // 3. Reveal Speech Bubble 2 seconds after "Ryuk?!"
        if (currentText.includes("Ryuk?!")) {
            setTimeout(() => {
                const bubble = document.getElementById("speech-bubble");
                if (bubble) {
                    bubble.innerHTML = "<p>Hehehe... Did you miss me?</p>";
                    bubble.style.display = "block";

                    setTimeout(() => {
                        bubble.innerHTML = "<p>Happy Birthday!</p>";
                        textContainer.innerHTML = "";

                        setTimeout(() => {
                            bubble.innerHTML = "<p>Now... give me an apple!</p>";

                            const appleBtn = document.getElementById("apple-btn");
                            if (appleBtn) {
                                appleBtn.style.display = "inline-block";
                            }
                        }, 4000);

                    }, 4000);
                }
            }, 2000);
        }

        if (messageIndex < messages.length - 1) {
            setTimeout(eraseText, 2000);
        }
    }
}

function eraseText() {
    const textContainer = document.getElementById("typed-text");
    const currentText = messages[messageIndex];

    if (currentText && currentText.includes("Instead look at-")) {
        textContainer.innerHTML = "";
        charIndex = 0;
        messageIndex++;
        setTimeout(typeWriter, 500);
        return;
    }

    if (charIndex > 0) {
        textContainer.innerHTML = messages[messageIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 30);
    } else {
        if (messageIndex < messages.length - 1) {
            messageIndex++;
            setTimeout(typeWriter, 500);
        }
    }
}

// Function triggered when clicking the "Give Apple" button
function giveApple() {
    const bubble = document.getElementById("speech-bubble");
    const appleBtn = document.getElementById("apple-btn");
    const ryukPic = document.getElementById("ryuk-pic");

    appleSound.play();

    if (appleBtn) appleBtn.style.display = "none";
    if (bubble) bubble.style.display = "none";

    // Wait 3 seconds before Death Note appears
    setTimeout(() => {
        const dnPic = document.getElementById("deathnote-pic");
        if (dnPic) dnPic.style.display = "block";

        messages.push("What are you doing?");
        messageIndex++;
        charIndex = 0;
        typeWriter();

        // Ryuk speaks 2 seconds later
        setTimeout(() => {
            if (bubble) {
                bubble.innerHTML = "<p>I just wrote down your haters in there</p>";
                bubble.style.display = "block";
            }

            // Erase "What are you doing?" and type "Awwh-"
            setTimeout(() => {
                eraseText();
                setTimeout(() => {
                    messages.push("Awwh-");
                    messageIndex++;
                    charIndex = 0;
                    typeWriter();

                    // Ryuk's final sentence
                    setTimeout(() => {
                        if (bubble) bubble.innerHTML = "<p>Have fun, little human.</p>";

                        // Disappear Ryuk, bubble, and Death Note
                        setTimeout(() => {
                            if (ryukPic) ryukPic.style.display = "none";
                            if (bubble) bubble.style.display = "none";
                            if (dnPic) dnPic.style.display = "none";

                            // Type "I haven't seen L in a while. Where might he be?"
                            eraseText();
                            setTimeout(() => {
                                messages.push("I haven't seen L in a while. Where might he be?");
                                messageIndex++;
                                charIndex = 0;
                                typeWriter();

                                // Spawn L and Cake after typing finishes
                                setTimeout(() => {
                                    spawnLAndCake();
                                }, 3000);
                            }, 500);

                        }, 3000);

                    }, 3000);

                }, 1000);
            }, 1000);

        }, 2000);

    }, 3000);
}

// Spawns L and Cake in a random position
function spawnLAndCake() {
    const lContainer = document.getElementById("l-container");

    if (!lContainer) return;

    lClickCount = 0;
    moveLRandomly();
    lContainer.style.display = "flex";

    // Erase previous text and type "He stole your cake! Catch him!"
    eraseText();
    setTimeout(() => {
        messages.push("He stole your cake! Catch him!");
        messageIndex++;
        charIndex = 0;
        typeWriter();
    }, 500);
}

// Moves L and the Cake together to a random position on screen
function moveLRandomly() {
    const lContainer = document.getElementById("l-container");
    if (!lContainer) return;

    const randomX = Math.floor(Math.random() * (window.innerWidth - 200)) + 50;
    const randomY = Math.floor(Math.random() * (window.innerHeight - 200)) + 50;

    lContainer.style.left = `${randomX}px`;
    lContainer.style.top = `${randomY}px`;
}

// Click handler for L
function catchL() {
    const lPic = document.getElementById("l-pic");

    lClickCount++;

    if (lClickCount < 5) {
        moveLRandomly();
    } else {
        if (lPic) lPic.style.display = "none";

        // Erase previous text and type the final celebratory message
        eraseText();
        setTimeout(() => {
            messages.push("What an exhausting day! But at least you've got your cake!");
            messageIndex++;
            charIndex = 0;
            typeWriter();
        }, 500);

        spawnStars(20);
    }
}

// Generates dynamic star shapes across the viewport
function spawnStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const randomX = Math.floor(Math.random() * (window.innerWidth - 60));
        const randomY = Math.floor(Math.random() * (window.innerHeight - 60));

        star.style.left = `${randomX}px`;
        star.style.top = `${randomY}px`;

        document.body.appendChild(star);
    }
}