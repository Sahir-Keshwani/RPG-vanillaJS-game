// * List of keyboard SHORTCUTS
// select all next occurrences - ctrl+shift+l
// select next occurrence (not all) - ctrl+d

// * NOTES
// #1. ALWAYS FOLLOW THE "DRY" (don't repeat yourself)..
// Whenever the code is matching then try to combine the codes & make non-repetitive

//!  Declare Variable
// better to declare all the variable in the beginning of program.
// (when wanna declare new variable jump to the beginning)
let xp = 0;
let health = 1000;
let gold = 5000;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// ! DOM
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


// an object is something where there can be multiple key-value pairs
// an object is always inside curly brackets {}
// Here we created an object inside an array
const weapons = [
    {
        name:"Stick",
        power: 5
    },
    {
        name: "Dagger",
        power: 30
    },
    {
        name: "Claw Hammer",
        power: 50
    },
    {
        name: "Sword",
        power: 100
    }
];

const monster = [
    {
        name: "Slime",
        level: 2,
        health: 15
    },
    {
        name: "Fanged Beast",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }
];

// Here we are creating a new variable with an object inside an array => [{}]
// trying to make an object with key-value pairs for different functions so wont repeat
const locations = [
    {
        // name is the key and town square is the value
        // each key-value pair in object is separated by comma (,)
        name: "town square",
        // if there are multiple words in a key then need to put them in inverted commas
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        // we can also put multiple names as single value in camel-casing (same like variables)
        // would prefer to use single(camel-case) words for simplicity
        buttonFunctions: [goStore, goCave, fightDragon],
        // can use backslash (\) before to escape a character inside a string
        text: "You are in the \"town\" square.."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        buttonFunctions: [buyHealth, buyWeapon, goTown],
        text: "You enter the store"
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        buttonFunctions: [fightSlime, fightBeast, goTown],
        text: "You enter the cave.. You see some monsters.."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        buttonFunctions: [attack, dodge, goTown],
        text: "You are fighting a monster.."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        buttonFunctions: [goTown, goTown, easterEgg],
        text: "The monster screams ''Arg!!'' as it dies...\n You gain experience points and find some hidden gold.."
    },
    {
        name: "lose",
        "button text": ["REPLAY??", "REPLAY??", "REPLAY??"],
        buttonFunctions: [restart, restart, restart],
        text: "💀 YOU ARE DEAD 💀"
    },
    {
        name: "win",
        "button text": ["REPLAY!!", "REPLAY!!", "REPLAY!!"],
        buttonFunctions: [restart, restart, restart],
        text: "🎉 You defeat the dragon 🐲 You win the game 🎉"

    },
    {
        name: "Easter Egg",
        "button text": ["2", "8", "Go to town square"],
        buttonFunctions: [pickTwo, pickEight],
        text: "You find a secret game. pick a number above... numbers will be randomly chosen between 0 to 10. If the number you choose matches one of the random numbers, YOU WIN!!!"
    }
];

// ! Initialize Button
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;



// ! Functions

function update(locations) {
    // making the stats hidden using the css property as none
    monsterStats.style.display = "none";
    // specify the concerned array & object key-value pair needed
    // when mentioning multi-word key of an object we need to use [] to specify
    // [0] is the index value of an array that needs to be located
    // eg: variableName["multi-word key"][array index number]
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    // when mentioning single word key of object we can do it with a DOT notation to specify
    // eg: variableName.singleWordKey
    button1.onclick = locations.buttonFunctions[0];
    button2.onclick = locations.buttonFunctions[1];
    button3.onclick = locations.buttonFunctions[2];
    // (note: this is object key is just a string so no need for any array indexing)
    text.innerText = locations.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}


function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        goldText.innerText = gold;
        health += 10;
        healthText.innerText = health;
        text.innerText = "➕ You just got healthier ➕";
    } else {
        text.innerText = "😟 You don't have enough gold to buy health 😟";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon ++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You just brought " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerHTML += "<br> In your inventory you have: " + inventory;
        } else {
            text.innerText = "😟 You do not have enough gold to buy a weapon 😟";
        }
    } else {
        text.innerText = "You already have the most powerful weapon";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        // using .shift() we can remove the first item/element from an array
        let soldWeapon = inventory.shift();
        text.innerText = "You just sold a " + soldWeapon + ".";
        text.innerHTML += "<br> In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon.";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterNameText.innerText = monster[fighting].name;
    monsterHealth = monster[fighting].health;
    monsterHealthText.innerText = monsterHealth;
    monsterStats.style.display = "block";
}

function attack() {
    text.innerText = "The " + monster[fighting].name + " attacks";
    text.innerHTML += "<br>You attack it with your " + weapons[currentWeapon].name + " .";

    // created a function so that not all the attack hits be successful.. 80% success attacks (on random basis)
    if (wasAttackSuccessful()) {
        health -= getMonsterAttackValue(monster[fighting].level);
    } else {
        text.innerText = "⚔️ Your attack was missed ⚔️"
    }

    healthText.innerText = health;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealthText.innerText = monsterHealth;

    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }

    // creating a chances of weapon break while hit.. 10% chances of breaks (on random basis)
    if (weaponBreak ()) {
        // .pop() is used to remove the last data/element from an array
         text.innerHTML += "<br> Your " + inventory.pop() + " breaks.";
         currentWeapon--;
    }
}

function dodge() {
    text.innerText = "You dodged the attack from " + monster[fighting].name + ".";
}

function wasAttackSuccessful() {
    // randomizing the attack clicks
    // random > .2 (means- 80% success hits and 20% failure) [cos' used greater than >]
    return Math.random() > .2 || health <= 20;
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}


function weaponBreak() {
    // randomizing the weapon breaks
    // random < .1 (means- 90% failure and 10% success) [cos' used less than < ]
    return Math.random() <= .1 && inventory.length !== 1;
}

function defeatMonster() {
    gold += Math.floor(monster[fighting].level * 6.7);
    goldText.innerText = gold;
    xp += monster[fighting].level;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    xpText.innerText = xp;
    health = 100;
    healthText.innerText = health;
    gold = 50;
    goldText.innerText = gold;
    currentWeapon = 0;
    inventory = ["stick"];
    goTown();
}

function easterEgg(params) {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    let numbers = [];

    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 10));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers: \n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i];
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText = gold;
    } else {
        text.innerText += "\n Wrong! You lost 10 health";
        health -= 10;
        healthText = health;

        if (health <= 0) {
            lose();
        }
    }
}
