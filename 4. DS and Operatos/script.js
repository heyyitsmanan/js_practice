"use strict";

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//! Solution Coding Challenge 1

console.log(" ");
console.log("Solution of Coding Challenge 1 Starting...");
console.log(" ");

//? Solution of 1st question
const [players1, players2] = [...game.players];
console.log(players1, players2);

//? Solution of 2nd question
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//? Solution of 3rd question
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//? Solution of 4th question
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

//? Solution of 5th question
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//? Solution of 6th question
const printGoals = function (...players) {
  console.log(`${players.length} goals were scored.`);
};

printGoals("Davies", "Muller", "Lewandowski");
printGoals(...game.scored);

//? Solution of 7th question
team1 > team2 && console.log(`Team 2 is more likely to win.`);
team1 < team2 && console.log(`Team 1 is more likely to win.`);

console.log(" ");
console.log("Solution of Coding Challenge 1 Ended...");
console.log(" ");

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

//! Solution Coding Challenge 2

console.log(" ");
console.log("Solution of Coding Challenge 2 Starting...");
console.log(" ");

//? Solution of 1st question

for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${i + 1} : ${game.scored[i]}`);
}

/* for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1} : ${player}`);
} */

//? Solution of 2nd question

let avgOdd = 0;

for (const theOdd of Object.values(game.odds)) {
  avgOdd += theOdd;
}

avgOdd = avgOdd / Object.keys(game.odds).length;

console.log(`${avgOdd.toFixed(2)}`);

//? Solution of 3rd question

for (const [theKey, theValue] of Object.entries(game.odds)) {
  let theStr = "";
  if (game.hasOwnProperty(theKey)) {
    theStr = `Victory ${game[theKey]}`;
  } else {
    theStr = "draw";
  }
  console.log(`Odd of ${theStr} : ${theValue}`);
}

//? Solution of Bonus question

const scorers = {};

for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

console.log(scorers);

console.log(" ");
console.log("Solution of Coding Challenge 2 Ended...");
console.log(" ");

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

//! Solution Coding Challenge 3

console.log(" ");
console.log("Solution of Coding Challenge 3 Starting...");
console.log(" ");

//? Solution of 1st question

const events = [...new Set(gameEvents.values())];
console.log(events);

//? Solution of 2nd question

gameEvents.delete(64);
console.log(gameEvents);

//? Solution of 3rd question

let eventTime = 0;
for (const eventVals of gameEvents.keys()) {
  eventTime += eventVals;
}
eventTime /= 90;
console.log(
  `An event happened, on average, every ${eventTime.toFixed(1)} minutes`
);

//? Solution of 4th question

for (const [min, event] of gameEvents.entries()) {
  let half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${min} : ${event}`);
}

console.log(" ");
console.log("Solution of Coding Challenge 3 Ended...");
console.log(" ");

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

*/

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));
const button = document.querySelector("button");

/*

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

//! Solution Coding Challenge 4

console.log(" ");
console.log("Solution of Coding Challenge 4 Starting...");
console.log(" ");

button.addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  console.log(text);
  console.log(`-----------------------------`);
  const textArr = text.split("\n");
  for (let i = 0; i < textArr.length; i++) {
    const nMod = textArr[i].trim().toLowerCase();
    const [firstStr, secondStr] = nMod.split("_");
    const newStr = firstStr.concat(
      secondStr[0].toUpperCase() + secondStr.slice(1)
    );
    console.log(newStr.padEnd(20) + `${"✅".repeat(i + 1)}`);
  }
  /* for (const n of textArr) {
    const nMod = n.trim().toLowerCase();
    const [firstStr, secondStr] = nMod.split("_");
    const newStr = firstStr.concat(
      secondStr[0].toUpperCase() + secondStr.slice(1)
    );
    // const symbolStr =
    console.log(newStr);
  } */
  console.log(" ");
  console.log("Solution of Coding Challenge 4 Ended...");
  console.log(" ");
});
