// UNO Game Logic

class Card {
    constructor(color, value) {
        this.color = color;
        this.value = value;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.colors = ['Red', 'Green', 'Blue', 'Yellow'];
        this.createDeck();
    }

    createDeck() {
        for (let color of this.colors) {
            for (let value = 0; value <= 9; value++) {
                this.cards.push(new Card(color, value));
            }
            this.cards.push(new Card(color, 'Skip'));
            this.cards.push(new Card(color, 'Reverse'));
            this.cards.push(new Card(color, 'Draw Two'));
        }
        this.cards.push(new Card('Wild', 'Wild'));
        this.cards.push(new Card('Wild', 'Draw Four'));
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    drawCard() {
        return this.cards.pop();
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    draw(deck) {
        this.hand.push(deck.drawCard());
    }

    playCard(card) {
        this.hand = this.hand.filter(c => c !== card);
    }
}

class Game {
    constructor() {
        this.deck = new Deck();
        this.players = [];
        this.currentPlayerIndex = 0;
        this.direction = 1;
        this.winner = null;
    }

    addPlayer(name) {
        this.players.push(new Player(name));
    }

    startGame() {
        this.deck.shuffle();
        for (let player of this.players) {
            for (let i = 0; i < 7; i++) {
                player.draw(this.deck);
            }
        }
    }

    playTurn(card) {
        const currentPlayer = this.players[this.currentPlayerIndex];
        if (this.validateCard(card)) {
            currentPlayer.playCard(card);
            if (currentPlayer.hand.length === 0) {
                this.winner = currentPlayer.name;
            } else {
                this.advanceTurn();
            }
        }
    }

    validateCard(card) {
        // Add logic to validate the card played based on the game rules
        return true; // placeholder
    }

    advanceTurn() {
        this.currentPlayerIndex += this.direction;
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;
        } else if (this.currentPlayerIndex < 0) {
            this.currentPlayerIndex = this.players.length - 1;
        }
    }
}

// Example initialization
const game = new Game();
game.addPlayer('Player 1');
game.addPlayer('Player 2');
game.startGame();
console.log(game);