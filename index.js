// select dom elements
const gameTile = document.querySelectorAll('.game-tile');
const playerTurn = document.querySelector('.player-turn > p');
const restart = document.querySelector('.restart');
const start = document.querySelector('.start');
const playerName = document.querySelector('.playerName > form > button');
const PlayerNameValue = document.querySelector('#player-name');

// player names
let playerOneName, playerTwoName;

// store player names in variable
playerName.addEventListener('click', (e) => {
  e.preventDefault();
  if (PlayerNameValue.value === '') {
    window.alert('Enter a name');
    return;
  }
  if (playerOneName === undefined) {
    playerOneName = PlayerNameValue.value;
    playerTurn.textContent = "Enter Player Two's Name";
  } else if (playerTwoName === undefined) {
    playerTwoName = PlayerNameValue.value;
    playerTurn.textContent = 'Click start button to begin';
    playerName.style.pointerEvents = 'none';
    start.style.pointerEvents = 'unset';
    setTimeout(() => {
      start.style.pointerEvents = 'none';
    }, 10000);
  }
  e.target.parentElement.reset();
});

// game board constructor
const GameBoard = () => {
  let board = [];
  const getBoard = () => board;
  return { getBoard };
};

// game play contructor
const Player = (playerOne, playerTwo) => {
  const players = [
    { name: playerOne, tile: 'X' },
    { name: playerTwo, tile: 'O' },
  ];

  const playerDetails = () => players;

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const getBoard = () => Array.from(gameTile);

  const matchTile = (t1, t2, t3) => {
    if (t1 === '') return false;
    if (t1 !== t2) return false;
    if (t1 !== t3) return false;
    return t1;
  };

  const getWinner = () => {
    let tile = getBoard();
    return (
      matchTile(
        tile[0].textContent,
        tile[1].textContent,
        tile[2].textContent
      ) ||
      matchTile(
        tile[3].textContent,
        tile[4].textContent,
        tile[5].textContent
      ) ||
      matchTile(
        tile[6].textContent,
        tile[7].textContent,
        tile[8].textContent
      ) ||
      matchTile(
        tile[0].textContent,
        tile[3].textContent,
        tile[6].textContent
      ) ||
      matchTile(
        tile[1].textContent,
        tile[4].textContent,
        tile[7].textContent
      ) ||
      matchTile(
        tile[2].textContent,
        tile[5].textContent,
        tile[8].textContent
      ) ||
      matchTile(
        tile[0].textContent,
        tile[4].textContent,
        tile[8].textContent
      ) ||
      matchTile(tile[6].textContent, tile[4].textContent, tile[2].textContent)
    );
  };

  const checkDraw = () => {
    for (let i = 0; i < gameTile.length; i++) {
      if (gameTile[i].textContent === '') {
        return true;
      }
    }
    return false;
  };

  return {
    switchPlayer,
    getActivePlayer,
    getWinner,
    checkDraw,
    playerDetails,
  };
};

let player;

// start game func
start.addEventListener('click', () => {
  player = Player(playerOneName, playerTwoName);
  playerTurn.textContent = `${player.getActivePlayer().name}'s turn`;
  restart.style.pointerEvents = 'unset';
});

// selecting board  to place tile
gameTile.forEach((tile, i) => {
  tile.addEventListener('click', (e) => {
    if (player === undefined) return;
    e.target.textContent = player.getActivePlayer().tile;
    e.target.style.backgroundColor = '#eee';
    e.target.style.pointerEvents = 'none';
    player.switchPlayer();
    playerTurn.textContent = `${player.getActivePlayer().name}'s turn`;
    if (player.getWinner() === 'X' || player.getWinner() === 'O') {
      const playerName = player
        .playerDetails()
        .find((x) => x.tile === `${player.getWinner()}`);
      playerTurn.textContent = `${playerName.name} wins`;
      // console.log(`${playerName.name} wins`);
      for (let i = 0; i < gameTile.length; i++) {
        gameTile[i].style.pointerEvents = 'none';
        if (gameTile[i].textContent === '') {
          gameTile[i].textContent = 'game over';
          gameTile[i].style.fontSize = '24px';
          gameTile[i].style.paddingLeft = '30px';
        }
      }
    } else {
      if (!player.checkDraw()) {
        playerTurn.textContent = `Game ends in draw!!!`;
      }
    }
  });
});

// display board
gameTile.forEach((tile, i) => {
  const board = GameBoard();
  tile.dataset.num = i;
  tile.textContent = board.getBoard()[i];
});

// restart game
restart.addEventListener('click', () => {
  gameTile.forEach((tile) => {
    tile.style.backgroundColor = '';
    tile.textContent = '';
    tile.style.pointerEvents = 'unset';
    playerName.style.pointerEvents = 'unset';
    player = undefined;
    playerTurn.textContent = `Enter Player One's Name`;
    playerOneName = undefined;
    playerTwoName = undefined;
    start.style.pointerEvents = 'none';
  });
});
