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
let health = 100;
let gold = 90;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

// an object is something where there can be multiple key-value pairs
// an object is always inside curly brackets {}
// Here we created an object inside an array
const weapons = [
    {
        name:"stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 100
    },
    {
        name: "sword",
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
]


// Here we are creating a new variable with an object inside an array
// trying to make an object with key-value pairs for different functions so wont repeat
const locations = [
    {
        // name is the key and town square is the value
        // each key-value pair in object is separated by comma (,)
        name: "town square",
        // if there are multiple words in a key then need to put them in inverted commas
        // we can also put multiple names as single value in camel-casing (same like variables)
        // would prefer to use single(camel-case) words for simplicity
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        // can use backslash (\) before to escape a character inside a string
        text: "You are in the \"town\" square.."
    },

    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon 30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store"
    },

    {
        name: "cave",
        "button text": ["fight slime", "fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run" ],
        "button function": [attack, dodge, run],
        text: "You are fighting a monster."
    }

];



// ! Initialize Buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(locations) {
    // specify the concerned array & object key-value pair needed
    // when mentioning multi-word key of an object we need to use [] to specify
    // [0] is the index value of an array that needs to be located
    // eg: variableName["multi-word key"][array index number]
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    // when mentioning single word key of object we can do it with a DOT notation to specify
    // eg: variableName.singleWordKey
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

function fightDragon() {

}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        goldText.innerText = gold;
        health += 10;
        healthText.innerText = health;
        text.innerText = "👨‍⚕️ You just got healthier 👨‍⚕️"
    } else {
        text.innerText = "⚠️ You do not have enough gold to buy health.. ⚠️";
        button2.innerText = "Sell weapon for 15 gold."
        button2.onclick = sellWeapon;
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText = " You Just brought a " + newWeapon + ".";
            text.innerHTML += "<br> In your inventory you have: " + inventory;
        } else {
            text.innerText = "⚠️ You do not have enough gold to buy weapon.. ⚠️";
        }
    } else {
        text.innerText = "⚔️ You already have the most powerful weapon! ⚔️";
        button2.innerText = "Sell weapon for 15 gold."
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let soldWeapon = inventory.shift();
        text.innerText = "You just sold " + soldWeapon + ".";
        text.innerHTML += "<br> In your inventory you have: " + inventory;
    } else {
        text.innerText = "😲 You need to have at least one weapon 😲"
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

function goFight() {

}

function attack() {
    console.log("DELETE THIS SOON");
}

function dodge() {
    console.log("DELETE THIS SOON");
}

var run; // TEMPORARY ONLY (DELETE SOON)
// function run() {
//     console.log("DELETE THIS SOON");
//  }
