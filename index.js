function flipCard(cardElement) {
    const cardInner = cardElement.querySelector('.card-inner');
    cardInner.classList.toggle('flip');
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const buttonRadius = 30; // Radius for circular buttons

// Calculate positions to center the buttons
const canvasCenterX = canvas.width / 2;
const canvasCenterY = canvas.height / 2;

// Add the buttons to the buttons array
const buttons = [
    { text: 'Bet', x: canvasCenterX - 2.5 * buttonRadius - 60, y: canvasCenterY - buttonRadius },
    { text: 'Deal', x: canvasCenterX - 1.5 * buttonRadius - 20, y: canvasCenterY - buttonRadius },
    { text: 'Draw', x: canvasCenterX + 0.5 * buttonRadius + 20, y: canvasCenterY - buttonRadius },
    { text: 'Reveal', x: canvasCenterX + 1.5 * buttonRadius + 60, y: canvasCenterY - buttonRadius }
];

// Initialize score, bet amount, and round
let score = 1000; // Starting balance
let betAmount = 5; // Default bet amount
let wonAmount = 0; // Amount won in the current round
let canPack = false; // Flag to track if "Pack" can be clicked
let canDraw = true; // Flag to track if "Draw" can be clicked
let canPack2 = false;

// Update the balance and won display
function updateDisplay() {
    document.querySelector('.score .badge').textContent = score; // Update balance
    document.querySelector('.round .badge').textContent = wonAmount; // Update won amount
    document.querySelector('.bet .badge').textContent = betAmount; // Update bet amount
}

// Draw circular buttons and bet amount
function drawButtons() {
    buttons.forEach(button => {
        // Draw circular button
        ctx.beginPath();
        ctx.arc(button.x + buttonRadius, button.y + buttonRadius, buttonRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#1A1A1A';
        ctx.fill();
        ctx.shadowColor = '#FFD700'; // Gold color
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = '#FFD700'; // Gold border
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw button text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(button.text, button.x + buttonRadius, button.y + buttonRadius);

        // Reset shadow
        ctx.shadowBlur = 0;
    });
}

// Initial draw
drawButtons();

// Handle button clicks
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    buttons.forEach(button => {
        // Check if the click is inside the circular button
        const dx = mouseX - (button.x + buttonRadius);
        const dy = mouseY - (button.y + buttonRadius);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= buttonRadius) {
            if (button.text === 'Draw') {
                if (canDraw) {
                    // Deduct bet amount from balance
                    score -= betAmount;
                    wonAmount = 0; // Reset won amount
                    canPack = true; // Enable "Pack" button
                    canDraw = false; // Disable "Draw" button
                    canPack2 = false;
                    updateDisplay(); // Update balance and won display
                    shuffleCards(); // Shuffle the cards
                } else {
                    alert('You must click "Deal" before drawing again!');
                }
            } else if (button.text === 'Deal') {
                let counter = 0;
                cardPositions.forEach(card => {
                    if (card.flipped = true) {
                        counter++;
                    }// Flip all cards
                });
                if (counter >= 5) {
                    canPack2 = true;
                }
                if (canPack && canPack2) {
                    // Calculate payout
                    const payout = calculatePayout();
                    wonAmount = payout; // Update won amount
                    score += wonAmount; // Add won amount to balance
                    canPack = false; // Disable "Pack" button
                    canDraw = true;
                    revealAllCards(); // Enable "Draw" button
                    updateDisplay(); // Update balance and won display
                } else {
                    alert('You must click "Draw" and "Reveal" before packing!');
                }
            } else if (button.text === 'Reveal') {
                canPack2 = true;
                revealAllCards(); // Reveal all cards
            } else if (button.text === 'Bet') {
                // alert('Bet button clicked!');
                document.getElementById('betSelector').style.display = 'flex';
            }
        }
    });
});

document.getElementById('setBetButton').addEventListener('click', () => {
    const selectedBet = parseInt(document.getElementById('betAmount').value);
    if (selectedBet > 0 && selectedBet <= 10) {
        betAmount = selectedBet; // Update the bet amount
        alert(`Bet amount set to $${betAmount}`);
        updateDisplay();
        document.getElementById('betSelector').style.display = 'none'; // Hide the bet selector
    } else {
        alert('Invalid bet amount. Please select a value below 11.');
    }
});


// Function to reveal all cards
function revealAllCards() {
    cardPositions.forEach(card => {
        card.flipped = true; // Flip all cards
    });
    drawCards(); // Redraw the cards
}

const cardsCanvas = document.getElementById('cardsCanvas');
const cardsCtx = cardsCanvas.getContext('2d');

// Card dimensions
const cardWidth = 100;
const cardHeight = 150;

// Card spacing and positioning
const cardSpacing = 30; // Space between cards
const totalWidth = (cardWidth * 5) + (cardSpacing * 4); // Total width of all cards and spaces
const startX = (cardsCanvas.width - totalWidth) / 2; // Center the cards on the canvas

// List of all card images in the folder with id, value, suit, and src
const allCardImages = [
    // Clubs
    { id: 1, value: '2', suit: 'Clubs', src: '/images/clubs_2.png' },
    { id: 2, value: '3', suit: 'Clubs', src: '/images/clubs_3.png' },
    { id: 3, value: '4', suit: 'Clubs', src: '/images/clubs_4.png' },
    { id: 4, value: '5', suit: 'Clubs', src: '/images/clubs_5.png' },
    { id: 5, value: '6', suit: 'Clubs', src: '/images/clubs_6.png' },
    { id: 6, value: '7', suit: 'Clubs', src: '/images/clubs_7.png' },
    { id: 7, value: '8', suit: 'Clubs', src: '/images/clubs_8.png' },
    { id: 8, value: '9', suit: 'Clubs', src: '/images/clubs_9.png' },
    { id: 9, value: '10', suit: 'Clubs', src: '/images/clubs_10.png' },
    { id: 10, value: '11', suit: 'Clubs', src: '/images/clubs_J.png' },
    { id: 11, value: '12', suit: 'Clubs', src: '/images/clubs_Q.png' },
    { id: 12, value: '13', suit: 'Clubs', src: '/images/clubs_K.png' },
    { id: 13, value: '14', suit: 'Clubs', src: '/images/clubs_A.png' },

    // Diamonds
    { id: 14, value: '2', suit: 'Diamonds', src: '/images/diamonds_2.png' },
    { id: 15, value: '3', suit: 'Diamonds', src: '/images/diamonds_3.png' },
    { id: 16, value: '4', suit: 'Diamonds', src: '/images/diamonds_4.png' },
    { id: 17, value: '5', suit: 'Diamonds', src: '/images/diamonds_5.png' },
    { id: 18, value: '6', suit: 'Diamonds', src: '/images/diamonds_6.png' },
    { id: 19, value: '7', suit: 'Diamonds', src: '/images/diamonds_7.png' },
    { id: 20, value: '8', suit: 'Diamonds', src: '/images/diamonds_8.png' },
    { id: 21, value: '9', suit: 'Diamonds', src: '/images/diamonds_9.png' },
    { id: 22, value: '10', suit: 'Diamonds', src: '/images/diamonds_10.png' },
    { id: 23, value: '11', suit: 'Diamonds', src: '/images/diamonds_J.png' },
    { id: 24, value: '12', suit: 'Diamonds', src: '/images/diamonds_Q.png' },
    { id: 25, value: '13', suit: 'Diamonds', src: '/images/diamonds_K.png' },
    { id: 26, value: '14', suit: 'Diamonds', src: '/images/diamonds_A.png' },

    // Hearts
    { id: 27, value: '2', suit: 'Hearts', src: '/images/hearts_2.png' },
    { id: 28, value: '3', suit: 'Hearts', src: '/images/hearts_3.png' },
    { id: 29, value: '4', suit: 'Hearts', src: '/images/hearts_4.png' },
    { id: 30, value: '5', suit: 'Hearts', src: '/images/hearts_5.png' },
    { id: 31, value: '6', suit: 'Hearts', src: '/images/hearts_6.png' },
    { id: 32, value: '7', suit: 'Hearts', src: '/images/hearts_7.png' },
    { id: 33, value: '8', suit: 'Hearts', src: '/images/hearts_8.png' },
    { id: 34, value: '9', suit: 'Hearts', src: '/images/hearts_9.png' },
    { id: 35, value: '10', suit: 'Hearts', src: '/images/hearts_10.png' },
    { id: 36, value: '11', suit: 'Hearts', src: '/images/hearts_J.png' },
    { id: 37, value: '12', suit: 'Hearts', src: '/images/hearts_Q.png' },
    { id: 38, value: '13', suit: 'Hearts', src: '/images/hearts_K.png' },
    { id: 39, value: '14', suit: 'Hearts', src: '/images/hearts_A.png' },

    // Spades
    { id: 40, value: '2', suit: 'Spades', src: '/images/spades_2.png' },
    { id: 41, value: '3', suit: 'Spades', src: '/images/spades_3.png' },
    { id: 42, value: '4', suit: 'Spades', src: '/images/spades_4.png' },
    { id: 43, value: '5', suit: 'Spades', src: '/images/spades_5.png' },
    { id: 44, value: '6', suit: 'Spades', src: '/images/spades_6.png' },
    { id: 45, value: '7', suit: 'Spades', src: '/images/spades_7.png' },
    { id: 46, value: '8', suit: 'Spades', src: '/images/spades_8.png' },
    { id: 47, value: '9', suit: 'Spades', src: '/images/spades_9.png' },
    { id: 48, value: '10', suit: 'Spades', src: '/images/spades_10.png' },
    { id: 49, value: '11', suit: 'Spades', src: '/images/spades_J.png' },
    { id: 50, value: '12', suit: 'Spades', src: '/images/spades_Q.png' },
    { id: 51, value: '13', suit: 'Spades', src: '/images/spades_K.png' },
    { id: 52, value: '14', suit: 'Spades', src: '/images/spades_A.png' }
];

// Shuffle the array and pick 6 random cards
function getRandomCards() {
    const shuffled = [...allCardImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
}

// Generate card positions with random cards
function generateCardPositions() {
    const randomCards = getRandomCards();
    return randomCards.map((card, index) => ({
        id: card.id,
        value: card.value,
        suit: card.suit,
        x: startX + index * (cardWidth + cardSpacing),
        y: (cardsCanvas.height - cardHeight) / 2, // Center vertically
        front: card.src,
        back: '/images/back_light.png',
        flipped: false,
        disabled: false // Add a disabled property
    }));
}

// Initialize card positions
let cardPositions = generateCardPositions();

// Load images
function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });
}

// Draw bet amount in the center of the buttons
cardsCtx.fillStyle = '#FFD700'; // Gold color
cardsCtx.font = '20px Arial';
cardsCtx.textAlign = 'center';
cardsCtx.textBaseline = 'middle';
cardsCtx.fillText(`Bet: $${betAmount}`, canvasCenterX, canvasCenterY); // Position below buttons
// Draw a single card with a box shadow
async function drawCard(card) {
    const img = await loadImage(card.flipped ? card.front : card.back);

    // Add box shadow effect
    cardsCtx.save();
    cardsCtx.shadowColor = 'rgba(255, 255, 255, 0.5)'; // Shadow color
    cardsCtx.shadowBlur = 10; // Blur radius
    cardsCtx.shadowOffsetX = 5; // Horizontal offset
    cardsCtx.shadowOffsetY = 5; // Vertical offset

    // Draw the card
    cardsCtx.drawImage(img, card.x, card.y, cardWidth, cardHeight);

    // Restore canvas state
    cardsCtx.restore();
}

// Draw all cards
async function drawCards() {
    cardsCtx.clearRect(0, 0, cardsCanvas.width, cardsCanvas.height);
    for (const card of cardPositions) {
        await drawCard(card);
    }
}

// Check if a card is clicked
cardsCanvas.addEventListener('click', (event) => {
    const rect = cardsCanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    cardPositions.forEach((card) => {
        if (
            !card.disabled && // Ignore disabled cards
            mouseX >= card.x &&
            mouseX <= card.x + cardWidth &&
            mouseY >= card.y &&
            mouseY <= card.y + cardHeight
        ) {
            card.flipped = !card.flipped; // Flip the card
            checkForDuplicateValues(); // Check for duplicates after flipping
            drawCards(); // Redraw the cards
        }
    });
});

// Check for duplicate card values and disable them
let payout = 0;
let suitsArray = [];
let valuesArray = [];
function checkForDuplicateValues() {
    const valueCounts = {};
    cardPositions.forEach(card => {
        if (card.flipped) {
            valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
        }
    });

    cardPositions.forEach(card => {
        if (card.flipped && valueCounts[card.value] > 1) {
            card.disabled = true; // Disable cards with duplicate values
            suitsArray.push(card.suit)
            valuesArray.push(card.value)
        } else {
            card.disabled = false; // Enable cards without duplicates
        }
    });
}

// Shuffle the card positions and display them as per the new sequence
function shuffleCards() {
    // Reset all cards to show their back and enable them
    cardPositions.forEach(card => {
        card.flipped = false;
        card.disabled = false;
    });

    // Generate new random card positions
    cardPositions = generateCardPositions();

    // Redraw the shuffled cards
    drawCards();
}

// Initial draw
drawCards();

function calculatePayout() {

    const flippedCards = cardPositions.filter(card => card.flipped);
    // const flippedCards = [
    //     { id: 9, value: '10', suit: 'Clubs', src: '/images/clubs_10.png' },
    //     { id: 10, value: '11', suit: 'Clubs', src: '/images/clubs_J.png' },
    //     { id: 11, value: '12', suit: 'Clubs', src: '/images/clubs_Q.png' },
    //     { id: 12, value: '13', suit: 'Clubs', src: '/images/clubs_K.png' },
    //     { id: 13, value: '14', suit: 'Clubs', src: '/images/clubs_A.png' },
    // ]
    const suits = flippedCards.map(card => card.suit);
    const values = flippedCards.map(card => parseInt(card.value)); // Convert values to integers

    // Sort values for sequence checks
    const sortedValues = [...values].sort((a, b) => a - b);

    // Helper functions
    const isSameSuit = suits.every(suit => suit === suits[0]);
    const isSequence = sortedValues.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
    const valueCounts = values.reduce((counts, val) => {
        counts[val] = (counts[val] || 0) + 1;
        return counts;
    }, {});

    const counts = Object.values(valueCounts);
    const maxCount = Math.max(...counts);

    let payout = 0;

    // Check for Royal Flush
    if (isSameSuit && sortedValues.every(val => val >= 10)) {
        payout = 4000 / 5 * betAmount;
    }
    // Check for Straight Flush
    else if (isSameSuit && isSequence && sortedValues[0] < 10) {
        payout = 250 / 5 * betAmount;
    }
    // Check for Four of a Kind (Aces)
    else if (maxCount === 4 && values.includes(14)) {
        payout = 400 / 5 * betAmount;
    }
    // Check for Four of a Kind
    else if (maxCount === 4) {
        payout = (Math.max(...values) * 4) / 5 * betAmount;
    }
    // Check for Full House
    else if (counts.includes(3) && counts.includes(2) && Math.min(...values) > 10) {
        payout = 125 / 5 * betAmount;
    }
    // Check for Flush
    else if (isSameSuit) {
        payout = 40 / 5 * betAmount;
    }
    // Check for Straight
    else if (isSequence) {
        payout = 20 / 5 * betAmount;
    }
    // Check for Three of a Kind
    else if (maxCount === 3) {
        payout = 15 / 5 * betAmount;
    }
    // Check for Two Pair
    else if (counts.filter(count => count === 2).length === 2) {
        payout = 10 / 5 * betAmount;
    }
    // Check for Jack or Better
    else if (values.some(val => val > 10)) {
        payout = 5 / 5 * betAmount;
    } else {
        payout = 0 / 5 * betAmount;
    }

    return payout;
}

//local storage functions
// function getSerializedObjectAsJSON(obj)
// {
//     return JSON.stringify(obj)
// }
// function getObjectFromJSON(json)
// {
//     return JSON.parse(json)
// }
// function updateLocalStorageItem(key, value)
// {
//     localStorage.setItem(key, value)
// }
// function removeLocalStorageItem(key)
// {
//     localStorage.removeItem(key)
// }
// function getLocalStorageItemValue(key)
// {
//     return localStorage.getItem(key)
// }

// function updateGameObject(score,round)
// {
//     gameObj.score = score
//     gameObj.round = round
// }
// function saveGameObjectToLocalStorage(score,round)
// {
//     updateGameObject(score, round)
//     updateLocalStorageItem(localStorageGameKey, getSerializedObjectAsJSON(gameObj))
// }
