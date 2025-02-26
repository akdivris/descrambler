// Game state
let currentWord = "";
let guessedWords = new Set();
let score = 0;
let currentLevel = 1;
let currentDifficulty = "easy";
let wordsFoundInCurrentLevel = 0;

// Dictionary API configuration
const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Initialize game elements
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const userInput = document.getElementById('user-input');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const currentDifficultyElement = document.getElementById('current-difficulty');
const wordListElement = document.getElementById('word-list');
const trendingGraphElement = document.getElementById('trending-graph');

// Set up difficulty button listeners
difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => setDifficulty(btn.id));
});

function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    currentDifficultyElement.textContent = difficulty.toUpperCase();
    
    // Update button styles
    difficultyBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === difficulty) btn.classList.add('active');
    });
    
    // Reset game with new difficulty
    resetGame();
}

function resetGame() {
    currentLevel = 1;
    score = 0;
    wordsFoundInCurrentLevel = 0;
    guessedWords.clear();
    
    // Update UI
    levelElement.textContent = currentLevel;
    scoreElement.textContent = score;
    wordListElement.innerHTML = "";
    feedbackElement.textContent = "";
    trendingGraphElement.innerHTML = "";
    
    // Start new level
    startNewLevel();
}

function startNewLevel() {
    guessedWords.clear();
    wordsFoundInCurrentLevel = 0;
    generateScrambledWord();
    
    // Update UI for new level
    showLevelStartMessage();
}

function scrambleLetters(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function generateScrambledWord() {
    const difficultySettings = wordLists[currentDifficulty];
    const eligibleWords = difficultySettings.words.filter(word => 
        word.length >= difficultySettings.minLength && 
        word.length <= difficultySettings.maxLength
    );
    
    // Get multiple words based on difficulty
    const numWords = Math.min(3, eligibleWords.length);
    const selectedWords = [];
    
    for (let i = 0; i < numWords; i++) {
        let word;
        do {
            word = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
        } while (selectedWords.includes(word));
        selectedWords.push(word);
    }
    
    // Combine and scramble the words
    currentWord = selectedWords.join('');
    document.getElementById('scrambled-word').textContent = scrambleLetters(currentWord);
}

function rescrambleCurrentWord() {
    if (currentWord) {
        document.getElementById('scrambled-word').textContent = scrambleLetters(currentWord);
        // Add a small animation to the button
        const btn = document.getElementById('rescramble');
        btn.style.transform = 'rotate(360deg)';
        setTimeout(() => btn.style.transform = '', 300);
    }
}

async function validateWord(word) {
    if (word.length < 3 || !isMadeFromScrambled(word)) {
        return false;
    }

    try {
        const response = await fetch(`${DICTIONARY_API_URL}${word}`);
        if (response.ok) {
            return true;
        }
    } catch (error) {
        console.error('Dictionary API error:', error);
    }

    // Fallback to local word lists
    return Object.values(wordLists).some(list => 
        list.words.includes(word.toLowerCase())
    );
}

function isMadeFromScrambled(word) {
    const scrambledLetters = [...currentWord.toLowerCase()];
    return [...word.toLowerCase()].every(letter => {
        const index = scrambledLetters.indexOf(letter);
        if (index === -1) return false;
        scrambledLetters.splice(index, 1);
        return true;
    });
}

function calculateScore(word) {
    const length = word.length;
    let baseScore = 0;

    // Base scoring based on word length
    if (length === 3) baseScore = 100;
    else if (length === 4) baseScore = 200;
    else if (length === 5) baseScore = 400;
    else baseScore = 800; // 6+ letters

    // Apply difficulty multiplier
    const multiplier = levelProgression[currentDifficulty].scoreMultiplier;
    baseScore *= multiplier;

    // Add level bonus
    baseScore *= currentLevel;

    // Add trending bonus if applicable
    const trendBonus = getTrendingBonus(word);
    
    return Math.floor(baseScore + trendBonus);
}

function getTrendingBonus(word) {
    word = word.toLowerCase();
    for (const [period, data] of Object.entries(trendingWords)) {
        if (data.word === word) {
            return data.bonus * levelProgression[currentDifficulty].scoreMultiplier;
        }
    }
    return 0;
}

function updateTrendingGraph(word) {
    word = word.toLowerCase();
    let trendData = null;

    // Find trending data for the word
    for (const [period, data] of Object.entries(trendingWords)) {
        if (data.word === word) {
            trendData = { period, ...data };
            break;
        }
    }

    if (trendData) {
        const barWidth = (trendData.score / 100) * 100;
        trendingGraphElement.innerHTML = `
            <div class="trend-info">
                <span class="prompt">> WORD:</span> ${word.toUpperCase()}
                <span class="prompt">> TREND_PERIOD:</span> ${trendData.period}
                <span class="prompt">> TREND_SCORE:</span> ${trendData.score}/100
                <span class="prompt">> BONUS:</span> +${trendData.bonus}
            </div>
            <div class="trend-bar" style="width: ${barWidth}%"></div>
        `;
    }
}

function showLevelStartMessage() {
    const settings = wordLists[currentDifficulty];
    feedbackElement.innerHTML = `
        <span class="prompt">> LEVEL ${currentLevel} [${currentDifficulty.toUpperCase()}]</span><br>
        <span class="prompt">> REQUIRED:</span> ${levelProgression[currentDifficulty].wordsRequired} words<br>
        <span class="prompt">> LETTERS:</span> ${settings.minLength}-${settings.maxLength}
    `;
    feedbackElement.className = 'feedback';
}

function checkLevelProgress() {
    const required = levelProgression[currentDifficulty].wordsRequired;
    if (wordsFoundInCurrentLevel >= required) {
        currentLevel++;
        levelElement.textContent = currentLevel;
        levelElement.classList.add('level-up');
        
        setTimeout(() => {
            levelElement.classList.remove('level-up');
            startNewLevel();
        }, 1000);
        
        return true;
    }
    return false;
}

async function handleGuess() {
    const word = userInput.value.trim().toLowerCase();
    
    if (word.length < 3) {
        showFeedback("Word must be at least 3 letters long!", "incorrect");
        return;
    }

    if (guessedWords.has(word)) {
        showFeedback("Word already found!", "incorrect");
        return;
    }

    if (await validateWord(word)) {
        const points = calculateScore(word);
        score += points;
        guessedWords.add(word);
        wordsFoundInCurrentLevel++;
        
        // Update UI
        scoreElement.textContent = score;
        const wordEntry = document.createElement("div");
        wordEntry.innerHTML = `<span class="prompt">></span> ${word.toUpperCase()} <span class="points">(+${points})</span>`;
        wordListElement.appendChild(wordEntry);
        
        showFeedback(`Correct! +${points} points`, "correct");
        updateTrendingGraph(word);
        
        if (!checkLevelProgress()) {
            const remaining = levelProgression[currentDifficulty].wordsRequired - wordsFoundInCurrentLevel;
            showFeedback(`Found: ${word.toUpperCase()} (+${points} pts)<br>Remaining words needed: ${remaining}`, "correct");
        }
    } else {
        showFeedback("Invalid word!", "incorrect");
    }
    
    userInput.value = "";
}

function showFeedback(message, type) {
    feedbackElement.innerHTML = message;
    feedbackElement.className = `feedback ${type}`;
}

// Event Listeners
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleGuess();
});

document.getElementById("new-game").addEventListener("click", resetGame);
document.getElementById("start-over").addEventListener("click", startNewLevel);
document.getElementById("clear-input").addEventListener("click", () => {
    userInput.value = "";
    feedbackElement.textContent = "";
});
document.getElementById("rescramble").addEventListener("click", rescrambleCurrentWord);

// Initialize game
setDifficulty('easy');
