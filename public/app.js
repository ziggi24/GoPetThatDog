const park = document.querySelector('.park');
const scoreElement = document.querySelector('.score .value');
const socket = io();

const treesById = {};
const dogsById = {};

const petDog = (dog) =>{
    return (event) =>{
        socket.emit('pet-dog', {
            id: dog.id,
        });
        if(dogsById[dog.id]) {
            dogsById[dog.id].remove();
            delete dogsById[dog.id];
        }
    }
}


const updateView = (gameState) =>{
    scoreElement.textContent = gameState.dogsPet;
    console.log(gameState);
    gameState.trees.forEach(tree => { 
        if(!treesById[tree.id]) {
            const treeElement = document.createElement('span');
            treeElement.classList.add('tree');
            treeElement.textContent = tree.emoji;
            treesById[tree.id] = treeElement;
            park.appendChild(treeElement);
        }
        treesById[tree.id].style.top = tree.location.y * window.innerHeight + 'px';
        treesById[tree.id].style.left = tree.location.x * window.innerWidth + 'px';
    });
    gameState.dogs.forEach(dog => { 
        if(!dogsById[dog.id]) {
            const dogElement = document.createElement('span');
            dogElement.classList.add('dog');
            dogElement.classList.add('bounce');
            dogElement.textContent = dog.emoji;
            dogsById[dog.id] = dogElement;
            dogElement.addEventListener('click', petDog(dog));
            park.appendChild(dogElement);
        }
        dogsById[dog.id].style.top = dog.location.y * window.innerHeight + 'px';
        dogsById[dog.id].style.left = dog.location.x * window.innerWidth + 'px';
    });
}

socket.on('game-state', updateView);
