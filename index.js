const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const players = [];

class Player {
  constructor(id) {
    this.id = id;
  }

  asignarPet(pet) {
    this.pet = pet;
  }
  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }
  selectAttacks(attacks) {
    this.attacks = attacks;
  }
}

class Pet {
  constructor(name) {
    this.name = name;
  }
}

app.get("/play", (req, res) => {
  const id = `${Math.random()}`;
  const player = new Player(id);
  players.push(player);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(id);
});

app.post("/pet/:playerid", (req, res) => {
  const playerId = req.params.playerid || "";
  const name = req.body.pet || "";
  const pet = new Pet(name);

  const playerIndex = players.findIndex((player) => playerId == player.id);
  if (playerIndex >= 0) {
    players[playerIndex].asignarPet(pet);
  }
  console.log(players);
  console.log(playerId);
  res.end();
});

app.post("/pet/:playerid/position", (req, res) => {
  const playerId = req.params.playerid || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;
  const playerIndex = players.findIndex((player) => playerId == player.id);
  if (playerIndex >= 0) {
    players[playerIndex].actualizarPosicion(x, y);
  }
  const enemy = players.filter((player) => playerId !== player.id);
  res.send({
    enemy,
  });
});

app.post("/pet/:playerid/ataques", (req, res) => {
  const playerId = req.params.playerid || "";
  const attacks = req.body.attacks || [];

  const playerIndex = players.findIndex((player) => playerId == player.id);
  if (playerIndex >= 0) {
    players[playerIndex].selectAttacks(attacks);
  }
  res.end();
});

app.get("/pet/:playerid/ataques", (req, res) => {
  const playerId = req.params.playerid || "";

  const player = players.find((player) => playerId == player.id);
  res.send({
    attacks: player.attacks || [],
  });
});

app.listen(8080, () => {
  console.log("Server open");
});
