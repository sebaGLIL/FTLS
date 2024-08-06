document.addEventListener('DOMContentLoaded', () => {
    const easyButton = document.getElementById('easy');
    const mediumButton = document.getElementById('medium');
    const hardButton = document.getElementById('hard');
    const gameBoard = document.getElementById('gameBoard');
    const movesDisplay = document.getElementById('moves');
    let squares = [];
    let firstGuess = '';
    let secondGuess = '';
    let moves = 0;
    const howToPlayBtn = document.getElementById('how-to-play');
    const closePopupBtn = document.getElementById('close-popup');
    const popup = document.getElementById('popup');

    howToPlayBtn.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    function createBoard(level) {
        gameBoard.innerHTML = '';
        squares = [];
        moves = 0;
        movesDisplay.textContent = '0';

        let totalImages = level / 2;
        let imageNumbers = [];

        for (let i = 1; i <= totalImages; i++) {
            imageNumbers.push(i, i); // Ensure each image has a pair
        }

        imageNumbers.sort(() => 0.5 - Math.random());

        let columns = 8; // Default columns for easy level on desktop
        if (level === 48) {
            columns = 12; // Medium level
        } else if (level === 72) {
            columns = 12; // Hard level
        }

        // Mobile adjustments
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            if (level === 32) {
                columns = 4; // 4 columns for easy level on mobile
            } else if (level === 48) {
                columns = 6; // 6 columns for medium level on mobile
            } else if (level === 72) {
                columns = 6; // 6 columns for hard level on mobile
            }
        }

        gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        for (let i = 0; i < level; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.width = '100%'; // Full width of column
            square.style.height = '0'; // Initially no height
            square.style.paddingTop = '100%'; // Padding top to maintain aspect ratio
            square.setAttribute('data-id', i);
            square.addEventListener('click', flipSquare);
            const img = document.createElement('img');
            img.src = `images/${imageNumbers[i]}.jpg`;
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.display = 'none';
            square.appendChild(img);
            gameBoard.appendChild(square);
            squares.push({ id: i, pairId: imageNumbers[i], element: img });
        }
    }

    function flipSquare() {
        const clicked = this;
        if (clicked.childNodes[0].style.display === 'none' && firstGuess === '') {
            clicked.childNodes[0].style.display = 'block';
            firstGuess = squares[clicked.getAttribute('data-id')];
        } else if (clicked.childNodes[0].style.display === 'none' && secondGuess === '') {
            clicked.childNodes[0].style.display = 'block';
            secondGuess = squares[clicked.getAttribute('data-id')];
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstGuess.pairId === secondGuess.pairId) {
            setTimeout(() => {
                let firstSquare = document.querySelector(`[data-id="${firstGuess.id}"]`);
                let secondSquare = document.querySelector(`[data-id="${secondGuess.id}"]`);
                firstSquare.classList.add('matched');
                secondSquare.classList.add('matched');
                const allMatched = Array.from(document.querySelectorAll('.square')).every(square => square.classList.contains('matched'));
                if (allMatched) {
                    setTimeout(() => {
                        alert(`Congratulations, you won! Your record is ${moves} moves.`);
                        resetGame(level);
                    }, 500);
                }
                resetTurn();
            }, 500);
        } else {
            setTimeout(() => {
                firstGuess.element.style.display = 'none';
                secondGuess.element.style.display = 'none';
                resetTurn();
            }, 500);
        }
        moves++;
        movesDisplay.textContent = moves;
    }

    function resetGame(level) {
        gameBoard.innerHTML = '';
        moves = 0;
        movesDisplay.textContent = '0';
        createBoard(level);
    }

    function resetTurn() {
        firstGuess = '';
        secondGuess = '';
    }

    easyButton.addEventListener('click', () => createBoard(32));
    mediumButton.addEventListener('click', () => createBoard(48));
    hardButton.addEventListener('click', () => createBoard(72));
});
