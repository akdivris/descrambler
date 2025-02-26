// Word lists organized by difficulty
const wordLists = {
    easy: {
        words: [
            // 6-8 letter common words
            "action", "better", "camera", "dinner", "energy", "family", "garden",
            "health", "impact", "jungle", "kitchen", "laptop", "market", "nature",
            "orange", "people", "quiet", "rabbit", "simple", "table", "useful",
            "visual", "window", "yellow", "active", "banana", "coffee", "design",
            "editor", "finger", "guitar", "handle", "island", "jacket", "keeper"
        ],
        minLength: 6,
        maxLength: 8,
        wordsPerLevel: 3,
        description: "Common words with 6-8 letters"
    },
    medium: {
        words: [
            // 8-10 letter moderate words
            "algorithm", "bootstrap", "character", "developer", "education",
            "framework", "graphics", "hardware", "internet", "javascript",
            "knowledge", "language", "marketing", "network", "operator",
            "platform", "quality", "research", "software", "terminal",
            "universe", "variable", "workshop", "interface", "database",
            "function", "protocol", "security", "template", "workflow",
            "analytics", "blueprint", "compiler", "debugger", "endpoint"
        ],
        minLength: 8,
        maxLength: 10,
        wordsPerLevel: 4,
        description: "Technical terms with 8-10 letters"
    },
    hard: {
        words: [
            // 10-12 letter complex words
            "application", "development", "engineering", "fundamental",
            "information", "javascript", "kubernetes", "laboratory",
            "management", "networking", "operations", "performance",
            "qualification", "requirement", "statistical", "technology",
            "university", "validation", "wavelength", "experience",
            "distributed", "programming", "integration", "architecture",
            "computation", "deployment", "encryption", "optimization",
            "persistence", "refactoring", "scalability", "transaction"
        ],
        minLength: 10,
        maxLength: 12,
        wordsPerLevel: 5,
        description: "Complex technical terms with 10-12 letters"
    }
};

// Sample trending words (replace with API data)
const trendingWords = {
    today: { word: "javascript", score: 90, bonus: 500 },
    week: { word: "algorithm", score: 85, bonus: 400 },
    month: { word: "developer", score: 70, bonus: 300 },
    year: { word: "software", score: 60, bonus: 200 }
};

// Level progression requirements
const levelProgression = {
    easy: {
        wordsRequired: 3,
        scoreMultiplier: 1
    },
    medium: {
        wordsRequired: 4,
        scoreMultiplier: 1.5
    },
    hard: {
        wordsRequired: 5,
        scoreMultiplier: 2
    }
};
