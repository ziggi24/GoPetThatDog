const socketIO = require('socket.io');

function getRandomPos() {
    let min = 0.2;
    let max = 0.85;
    return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
  }


module.exports = (server) =>{
    const io = socketIO(server);

    const gameState = { 
        dogsPet: 0,
        trees: [
            {
                emoji: '🌲',
                id: 0,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            }, 
            {
                emoji: '🌳',
                id: 1,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌲',
                id: 3,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌳',
                id: 4,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌳',
                id: 5,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌲',
                id: 6,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌳',
                id: 7,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌳',
                id: 8,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌲',
                id: 9,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌳',
                id: 10,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌳',
                id: 11,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
            {
                emoji: '🌲',
                id: 12,
                location: {
                    x: getRandomPos(),
                    y: getRandomPos(), 
                },
            },
        ],
        dogs: [{
            emoji: '🐶',
            id: 0,
            location: {
                x: getRandomPos(),
                y: getRandomPos(), 
            },
        },
        {
            emoji: '🐶',
            id: 1,
            location: {
                x: getRandomPos(),
                y: getRandomPos(), 
            },
        },
        {
            emoji: '🐶',
            id: 2,
            location: {
                x: getRandomPos(),
                y: getRandomPos(), 
            },
        },
    ],
    };

    let hasUpdate = false
    io.on('connection', (socket) =>{
        socket.emit('game-state', gameState);
        socket.on('pet-dog', ({ id }) => { 
            const dogIndex = gameState.dogs.findIndex(dog => dog.id === id);
            if(dogIndex !== -1) {
                gameState.dogsPet += 1;
                gameState.dogs[dogIndex].location.x = getRandomPos();
                gameState.dogs[dogIndex].location.y = getRandomPos();
                
                hasUpdate = true;
            }
        })
    })

    setInterval(() =>{
        if(hasUpdate) {
            io.emit('game-state', gameState);
            hasUpdate = false;
        }
    }, 300);
}