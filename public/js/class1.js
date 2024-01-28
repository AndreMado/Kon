//DRY
const attackSectionHTML = document.getElementById("sectionAttack");
const restartSectionHTML = document.getElementById("restart");
const mailSectionHTML = document.getElementById("mails");
const bottomPetSelector = document.getElementById("pet-selector");

const spanPlayHealth = document.getElementById("spanPlayerHeathl");
const spanEneHealth = document.getElementById("enemyhealth");
const bottomRestart = document.getElementById("restart");

const petSectionHTML = document.getElementById("Choose your pet");
const spanPetPlayer = document.getElementById("petPLAYER");

const spanEnemyPet = document.getElementById("petenemy");
const myPetImage = document.getElementById("enemyPet");

const myEnemyPetImage = document.getElementById("myPetImage");

const addsms2 = document.getElementById("battleResult");
const addsms3 = document.getElementById("enemyAttack");

const addsms = document.getElementById("Restart");
const addsms1 = document.getElementById("yourAttack");
const cardsContainer = document.getElementById("cards-container");

const attackButtomsContainer = document.getElementById("buttomAttack");

const sectionMapCanvas = document.getElementById("map-section");
const canvasHtml = document.getElementById("map");

//VARIABLES
let playerid = null;
let enemigoid = null;
let enemyAttack = [];
let result;
let pets = [];
let petsEnemy = [];
let buttoms = [];
let attacksPlayer = [];
let attackByEnemy = [];
let anyPets;
let anyPetsAttacks;
let kaliInput;
let wadowInput;
let torbalInput;
let osuInput;
let kukiraniInput;
let fousterInput;
let petOfPlayer;
let ataques;
let indexPlayer;
let indexEnemy;
let victoryOfPlayer = 0;
let victoryOfEnemy = 0;
let lienzo = canvasHtml.getContext("2d");
let intervalo;
let mapBackground = new Image();
mapBackground.src =
  "https://static.platzi.com/media/user_upload/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.jpg";
let petObjectCanvas;
let canvaEnemy;
let canvaswidth = window.innerWidth - 40;
let canvasheight = (canvaswidth * 520) / 320;

canvasHtml.width = canvaswidth;
canvasHtml.height = canvasheight;
const maxwidthcanvas = 470;

if (canvasHtml.width > maxwidthcanvas) {
  canvasHtml.width = maxwidthcanvas - 20;
}
if (canvasHtml.height > maxwidthcanvas) {
  canvasHtml.height = maxwidthcanvas;
}

//JS POO
class Pets {
  constructor(name, img, life, imgCanva, id = null) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.life = life;
    this.attacks = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = randomly(0, canvasHtml.width - this.ancho);
    this.y = randomly(0, canvasHtml.height - this.alto);
    this.width = 127;
    this.height = 96;
    this.mapImg = new Image();
    this.mapImg.src = imgCanva;
    this.velocityX = 0;
    this.velocityY = 0;
  }
  generalDrawPets() {
    lienzo.drawImage(this.mapImg, this.x, this.y, this.width, this.height);
  }
}

let Kali = new Pets("Kali", "img/PET1.png", 5, "img/KaliCanva.png");
let Wadow = new Pets("Wadow", "img/PET2.png", 5, "img/PET2.png");
let Torbal = new Pets("Torbal", "img/PET3.png", 5, "img/PET3.png");
let Osu = new Pets("Osu", "img/PET4.png", 5, "img/PET4.png");
let Kukitani = new Pets("Kukitani", "img/PET5.png", 5, "img/PET5.png");
let Fouster = new Pets("Fouster", "img/PET6.png", 5, "img/PET6.png");

pets.push(Kali, Wadow, Torbal, Osu, Kukitani, Fouster);

const Kali_ATTACKS = [
  { nombre: "🔥", id: "fire" },
  { nombre: "🔥", id: "fire" },
  { nombre: "🔥", id: "fire" },
  { nombre: "💧", id: "water" },
  { nombre: "🌱", id: "earth" },
];

const Torbal_ATTACKS = [
  { nombre: "🔥", id: "fire" },
  { nombre: "💧", id: "water" },
  { nombre: "🌱", id: "earth" },
  { nombre: "🌱", id: "earth" },
  { nombre: "🌱", id: "earth" },
];
const Osu_ATTACKS = [
  { nombre: "🔥", id: "fire" },
  { nombre: "🔥", id: "fire" },
  { nombre: "💧", id: "water" },
  { nombre: "💧", id: "water" },
  { nombre: "🌱", id: "earth" },
];
const Wadow_ATTACKS = [
  { nombre: "🔥", id: "fire" },
  { nombre: "💧", id: "water" },
  { nombre: "💧", id: "water" },
  { nombre: "💧", id: "water" },
  { nombre: "🌱", id: "earth" },
];
const Kukitani_ATTACKS = [
  { nombre: "🔥", id: "fire" },
  { nombre: "🔥", id: "fire" },
  { nombre: "💧", id: "water" },
  { nombre: "🌱", id: "earth" },
  { nombre: "🌱", id: "earth" },
];
const Fouster_ATTACKS = [
  { nombre: "🔥", id: "fire" },
  { nombre: "🔥", id: "fire" },
  { nombre: "💧", id: "water" },
  { nombre: "🌱", id: "earth" },
  { nombre: "🌱", id: "earth" },
];

Kali.attacks.push(...Kali_ATTACKS);
Wadow.attacks.push(...Wadow_ATTACKS);
Torbal.attacks.push(...Torbal_ATTACKS);
Osu.attacks.push(...Osu_ATTACKS);
Kukitani.attacks.push(...Kukitani_ATTACKS);
Fouster.attacks.push(...Fouster_ATTACKS);

function startGame() {
  attackSectionHTML.style.display = "none";
  restartSectionHTML.style.display = "none";
  mailSectionHTML.style.display = "none";
  sectionMapCanvas.style.display = "none";

  pets.forEach((pet) => {
    anyPets = `
    <div>
    <input class= "hidden bg-primary" type="radio" name="PETS" id=${pet.name} />
    <label class="pets" for=${pet.name}>
      <img src=${pet.img} alt="PET1" />
      <p>${pet.name}</p>
    </label>
  </div>
    `;
    cardsContainer.innerHTML += anyPets;
  });
  kaliInput = document.getElementById("Kali");
  wadowInput = document.getElementById("Wadow");
  torbalInput = document.getElementById("Torbal");
  osuInput = document.getElementById("Osu");
  kukiraniInput = document.getElementById("Kukitani");
  fousterInput = document.getElementById("Fouster");

  bottomPetSelector.addEventListener("click", playerPetSelect);

  bottomRestart.addEventListener("click", restartTheGame);

  joinAtGame();
}

function joinAtGame() {
  fetch("http://localhost:8080/play").then(function (res) {
    console.log(res);
    if (res.ok) {
      res.text().then(function (answer) {
        console.log(answer);
        playerid = answer;
      });
    }
  });
}

function playerPetSelect() {
  //attackSectionHTML.style.display = "block";

  if (kaliInput.checked) {
    spanPetPlayer.innerHTML = kaliInput.id;
    addPet(pets[0].name);
    petOfPlayer = kaliInput.id;
  } else if (wadowInput.checked) {
    spanPetPlayer.innerHTML = wadowInput.id;
    addPet(pets[1].name);
    petOfPlayer = wadowInput.id;
  } else if (torbalInput.checked) {
    spanPetPlayer.innerHTML = torbalInput.id;
    addPet(pets[2].name);
    petOfPlayer = torbalInput.id;
  } else if (osuInput.checked) {
    spanPetPlayer.innerHTML = osuInput.id;
    addPet(pets[3].name);
    petOfPlayer = osuInput.id;
  } else if (kukiraniInput.checked) {
    spanPetPlayer.innerHTML = kukiraniInput.id;
    addPet(pets[4].name);
    petOfPlayer = kukiraniInput.id;
  } else if (fousterInput.checked) {
    spanPetPlayer.innerHTML = fousterInput.id;
    addPet(pets[5].name);
    petOfPlayer = fousterInput.id;
  } else {
    return;
  }
  petSectionHTML.style.display = "none";
  sectionMapCanvas.style.display = "flex";
  selectBackPet(petOfPlayer);
  petAttack(petOfPlayer);
  startCanvas();
}

function selectBackPet(petOfPlayer) {
  fetch(`http://localhost:8080/pet/${playerid}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pet: petOfPlayer,
    }),
  });
}

function petAttack(petOfPlayer) {
  let petA;
  for (let i = 0; i < pets.length; i++) {
    if (petOfPlayer === pets[i].name) {
      petA = pets[i].attacks;
    }
  }
  iterateButtoms(petA);
}

function iterateButtoms(PetA) {
  PetA.forEach((attack) => {
    anyPetsAttacks = `
    <button id=${attack.id} class="rounded-lg bg-green-700 p-4 BAK">
    ${attack.nombre}
  </button>
    `;
    attackButtomsContainer.innerHTML += anyPetsAttacks;
  });

  bottomFire = document.getElementById("fire");
  bottomWater = document.getElementById("water");
  bottomEarth = document.getElementById("earth");
  buttoms = document.querySelectorAll(".BAK");
}

function enemyPick(enemy) {
  let myActuallyPet = document.createElement("img");
  myActuallyPet.src;

  spanEnemyPet.innerHTML = enemy.name;
  attackByEnemy = enemy.attacks;
  myActuallyPet.src = enemy.img;

  myActuallyPet.innerHTML = myPetImage.appendChild(myActuallyPet);
  whatAttackIs();
}

function startBattle() {
  clearInterval(intervalo);
  if (attacksPlayer.length == 5) {
    battleResult();
  }
}

function battleResult() {
  mailSectionHTML.style.display = "grid";

  for (let index = 0; index < attacksPlayer.length; index++) {
    if (attacksPlayer[index] == enemyAttack[index]) {
      indexBothAttacks(index, index);
      result = "DRAW";
    } else if (
      attacksPlayer[index] == "WATER" &&
      enemyAttack[index] == "FIRE"
    ) {
      indexBothAttacks(index, index);
      result = "WON";
      victoryOfPlayer++;
    } else if (
      attacksPlayer[index] == "EARTH" &&
      enemyAttack[index] == "FIRE"
    ) {
      indexBothAttacks(index, index);
      result = "WON";
      victoryOfPlayer++;
    } else if (
      attacksPlayer[index] == "EARTH" &&
      enemyAttack[index] == "WATER"
    ) {
      indexBothAttacks(index, index);
      result = "WON";
      victoryOfPlayer++;
    } else {
      indexBothAttacks(index, index);
      result = "LOST";
      victoryOfEnemy++;
    }
    battleSms();
  }

  whoLost();
}
function indexBothAttacks(player, enemy) {
  indexPlayer = attacksPlayer[player];
  indexEnemy = enemyAttack[enemy];
}

function addPet(pet) {
  let myActuallyPet = document.createElement("img");
  myActuallyPet.src = "";

  if (pet == "Kali") {
    myActuallyPet.src = "img/PET1.png";
  } else if (pet == "Wadow") {
    myActuallyPet.src = "img/PET2.png";
  } else if (pet == "Torbal") {
    myActuallyPet.src = "img/PET3.png";
  } else if (pet == "Osu") {
    myActuallyPet.src = "img/PET4.png";
  } else if (pet == "Kukitani") {
    myActuallyPet.src = "img/PET5.png";
  } else {
    myActuallyPet.src = "img/PET6.png";
  }

  myActuallyPet.innerHTML = myEnemyPetImage.appendChild(myActuallyPet);
}

function battleSms() {
  let sms1 = document.createElement("p");
  sms1.classList.toggle("flex");
  sms1.classList.toggle("justify-center");
  sms1.classList.toggle("items-center");
  sms1.classList.toggle("text-four");
  sms1.classList.toggle("text-xs");
  sms1.classList.toggle("font-extralight");
  sms1.innerHTML = indexPlayer;

  addsms1.appendChild(sms1);

  let sms2 = document.createElement("p");
  sms2.classList.toggle("flex");
  sms2.classList.toggle("justify-center");
  sms2.classList.toggle("items-center");
  sms2.classList.toggle("text-four");
  sms2.classList.toggle("text-xs");
  sms2.classList.toggle("font-extralight");
  sms2.innerHTML = result;
  addsms2.appendChild(sms2);

  let sms3 = document.createElement("p");
  sms3.classList.toggle("flex");
  sms3.classList.toggle("justify-center");
  sms3.classList.toggle("items-center");
  sms3.classList.toggle("text-four");
  sms3.classList.toggle("text-xs");
  sms3.classList.toggle("font-extralight");
  sms3.innerHTML = indexEnemy;
  addsms3.appendChild(sms3);
}
function whoLost() {
  if (victoryOfPlayer == victoryOfEnemy) {
    battleFinalSms("WHAT A FIGHT! DRAW, TRY AGAIN!");
  } else if (victoryOfEnemy < victoryOfPlayer) {
    battleFinalSms("YOU WON THE GAME");
  } else {
    battleFinalSms("YOU LOST THE GAME :C");
  }
  spanPlayHealth.innerHTML = victoryOfPlayer;
  spanEneHealth.innerHTML = victoryOfEnemy;
}
function battleFinalSms(finalResult) {
  let sms = document.createElement("p");
  sms.classList.toggle("text-four");
  sms.classList.toggle("text-4xl");
  sms.innerHTML = finalResult;
  addsms.appendChild(sms);
  restartSectionHTML.style.display = "block";
}
function randomly(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function restartTheGame() {
  location.reload();
}

function drawCanvas() {
  petObjectCanvas.x = petObjectCanvas.x + petObjectCanvas.velocityX;
  petObjectCanvas.y = petObjectCanvas.y + petObjectCanvas.velocityY;
  lienzo.clearRect(0, 0, canvasHtml.width, canvasHtml.height);
  lienzo.drawImage(mapBackground, 0, 0, canvasHtml.width, canvasHtml.height);
  petObjectCanvas.generalDrawPets();

  sendPosition(petObjectCanvas.x, petObjectCanvas.y);
  petsEnemy.forEach(function (PETS) {
    if (PETS != undefined) {
      PETS.generalDrawPets();
      checkColition(PETS);
    }
  });

  function sendPosition(x, y) {
    fetch(`http://localhost:8080/pet/${playerid}/position`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x,
        y,
      }),
    }).then(function (res) {
      res.json().then(function ({ enemy }) {
        console.log(enemy);

        petsEnemy = enemy.map(function (enemigo) {
          let petENEMY = null;
          if (enemigo.pet != undefined) {
            const petNAME = enemigo.pet.name;
            switch (petNAME) {
              case "Kali":
                petENEMY = new Pets(
                  "Kali",
                  "img/PET1.png",
                  5,
                  "img/KaliCanva.png",
                  enemigo.id
                );
                break;
              case "Wadow":
                petENEMY = new Pets(
                  "Wadow",
                  "img/PET2.png",
                  5,
                  "img/PET2.png",
                  enemigo.id
                );
                break;
              case "Torbal":
                petENEMY = new Pets(
                  "Torbal",
                  "img/PET3.png",
                  5,
                  "img/PET3.png",
                  enemigo.id
                );
                break;
              case "Osu":
                petENEMY = new Pets(
                  "Osu",
                  "img/PET4.png",
                  5,
                  "img/PET4.png",
                  enemigo.id
                );
                break;
              case "Kukitani":
                petENEMY = new Pets(
                  "Kukitani",
                  "img/PET5.png",
                  5,
                  "img/PET5.png",
                  enemigo.id
                );
                break;
              case "Fouster":
                petENEMY = new Pets(
                  "Fouster",
                  "img/PET6.png",
                  5,
                  "img/PET6.png",
                  enemigo.id
                );
                break;
              default:
                break;
            }
            petENEMY.x = enemigo.x;
            petENEMY.y = enemigo.y;
          }
          return petENEMY;
        });
      });
    });
  }
}

function whatAttackIs() {
  buttoms.forEach((buttom) => {
    buttom.addEventListener("click", (e) => {
      if (e.target.textContent === "\n    🔥\n  ") {
        attacksPlayer.push("FIRE");
        console.log(attacksPlayer);
        buttom.style.background = "#FF8400";
        buttom.disabled = true;
      } else if (e.target.textContent === "\n    💧\n  ") {
        attacksPlayer.push("WATER");
        console.log(attacksPlayer);
        buttom.style.background = "#6469FD";

        buttom.disabled = true;
      } else {
        attacksPlayer.push("EARTH");
        console.log(attacksPlayer);
        buttom.style.background = "#55D330";

        buttom.disabled = true;
      }

      if (attacksPlayer.length === 5) {
        sendAttacks();
      }
    });
  });
}

function sendAttacks() {
  fetch(`http://localhost:8080/pet/${playerid}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attacks: attacksPlayer,
    }),
  });
  intervalo = setInterval(getAttacks, 50);
}

function getAttacks() {
  fetch(`http://localhost:8080/pet/${enemigoid}/ataques`).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ attacks }) {
        if (attacks.length === 5) {
          enemyAttack = attacks;
          startBattle();
        }
      });
    }
  });
}

function movePetX() {
  petObjectCanvas.velocityX = 5;
}
function movePetNX() {
  petObjectCanvas.velocityX = -5;
}
function movePetY() {
  petObjectCanvas.velocityY = -5;
}
function movePetNY() {
  petObjectCanvas.velocityY = 5;
}

function keyIsPress(event) {
  switch (event.key) {
    case "ArrowUp":
      movePetY();
      break;
    case "ArrowDown":
      movePetNY();
      break;
    case "ArrowLeft":
      movePetNX();
      break;
    case "ArrowRight":
      movePetX();
      break;
    default:
      break;
  }
}

function keyIsNotPress() {
  petObjectCanvas.velocityX = 0;
  petObjectCanvas.velocityY = 0;
}

function startCanvas() {
  petObjectCanvas = getPetCanvas(petOfPlayer);
  intervalo = setInterval(drawCanvas, 50);

  window.addEventListener("keydown", keyIsPress);
  window.addEventListener("keyup", keyIsNotPress);
}

function getPetCanvas() {
  for (let i = 0; i < pets.length; i++) {
    if (petOfPlayer === pets[i].name) {
      return pets[i];
    }
  }
}

function checkColition(enemy) {
  canvaEnemy = enemy;
  const enemyup = enemy.y + enemy.height;
  const enemydown = enemy.y;
  const enemyright = enemy.x + enemy.width;
  const enemyleft = enemy.x;

  const playerup = enemy.y + enemy.height;
  const playerdown = enemy.y;
  const playerright = enemy.x + enemy.width;
  const playerleft = enemy.x;
  if (
    playerup > enemyup ||
    playerdown < enemydown ||
    playerright < enemyleft ||
    playerleft > enemyright
  ) {
    return;
  }

  keyIsNotPress();
  clearInterval(intervalo);
  enemigoid = enemy.id;
  sectionMapCanvas.style.display = "none";
  attackSectionHTML.style.display = "block";
  enemyPick(enemy);
  //alert(enemy.name);
}

window.addEventListener("load", startGame);
