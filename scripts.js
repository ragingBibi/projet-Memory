document.addEventListener('DOMContentLoaded', () => {
    const memoryGameSection = document.querySelector('.memory-game');
    const scoreSection = document.querySelector('.score-section');

    const cards = [
        { name: "athletisme", img: "img/athletisme.png" },
        { name: "badminton", img: "img/badminton.png" },
        { name: "basketball", img: "img/basketball.png" },
        { name: "escrime", img: "img/escrime.png" },
        { name: "taekwondo", img: "img/taekwondo.png" },
        { name: "tennis", img: "img/tennis.png" },
        { name: "tennisTable", img: "img/tennisTable.png" },
        { name: "natation", img: "img/natation.png" },
    ];

    const cardArray = [...cards, ...cards];

    function melange(tab) {
        for (let i = tab.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tab[i], tab[j]] = [tab[j], tab[i]];
        }
        return tab;
    }

    const melangeCards = melange(cardArray);

    melangeCards.forEach((card) => {
        const memoryCard = document.createElement('div');
        memoryCard.classList.add('memory-card');
        memoryCard.innerHTML = `
        <img class="front-face" src="${card.img}" alt="${card.name}">
        <img class="back-face" src="img/sport.png" alt="cover">`;
        memoryGameSection.appendChild(memoryCard);
    });

    
    

    let carteTourne = false;
    let carte1;
    let carte2;
    let verrouillage = false;
    //comptabilise le nombre de cartes tournées
    let nombreCartesTournees = 0;
    //le score est stocké dans le localStorage. Si le score n'existe pas, on l'initialise à 0
    let score = parseInt(localStorage.getItem('score')) || 0; // Récupère le score depuis le localStorage
    scoreSection.textContent = `Score : ${score}`;


    function flipCard() {
        if (verrouillage) return;
        if (this === carte1) return;
        this.classList.add('flip');
        if (!carteTourne) {
            carteTourne = true;
            carte1 = this;
            return;
        }

        carte2 = this;
        recherchePaire();
    }

    function recherchePaire() {
        let siPaire = carte1.querySelector('.front-face').src === carte2.querySelector('.front-face').src;
        siPaire ? disableCards() : unflipCards();
    }

    function disableCards() {
        carte1.removeEventListener('click', flipCard);
        carte2.removeEventListener('click', flipCard);
        resetBoard();
        nombreCartesTournees += 2;

        // Vérifie si toutes les cartes ont été trouvées
        if (nombreCartesTournees === cardArray.length) {
            score++;
            localStorage.setItem('score', score); // Met à jour le score dans le localStorage
            setTimeout(() => {
                if (confirm(`Bravo, vous avez gagné ! Score : ${score} Souhaitez-vous rejouer ?`)) {
                    location.reload();
                }
            }, 500); // Délai de 500ms avant d'afficher le message de confirmation
        }
    }

    function unflipCards() {
        verrouillage = true;
        setTimeout(() => {
            carte1.classList.remove('flip');
            carte2.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [carteTourne, verrouillage] = [false, false];
        [carte1, carte2] = [null, null];
    }

    document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', flipCard));
});

//https://github.com/search?q=memory+game+language%3AJavaScript&type=repositories&l=JavaScript
//https://marina-ferreira.github.io/tutorials/js/memory-game/