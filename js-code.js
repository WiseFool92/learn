"Node".concat(" is server-side.");
'Node is server-side.'

console.log("Node".concat(" is server-side."));

// Writing OOP mutable code
let x = 1
x = 2 + 1
// Writing immutable functional code
const x = 1
const newX = 2 + x

// Imperative Coding
const originalArray = [1,2,3];
let doubledArray = [];
originalArray.forEach(function(element) {
  const doubledElement = element * 2;
  doubledArray.push(doubledElement);
});

// Declaratice Coding
const originalArray = [1,2,3];
const newArray = originalArray.map(function(element) {
  return element *2;
});

// Pure Function - Always returns one output & affects one thing. - No Side effects
function addOne(num) {
  return num + 1;
};

// Unpure Function
function guessMyNumber(num) {
  const myNumber = Math.floor(Math.random() * Math.floor(10) ) + 1;
  if (num === myNumber) {
    return "You guessed right!"
  } else {
    return "That wasn't it."
  }
}

// Jquery w/side effects
// no return value
// only side effects of appending a word to the DOM
function addWord(word) {
  $("#typing-box").append(word);
}

// PigDice Ex of how pure functions cannot rely on external variables or states
class Player {

  constructor() {
    this.totalScore = 0;
  }

  tallyScore(roundScore) {
    this.totalScore = this.totalScore + roundScore;
    return this.totalScore;
  }
}

// Same problems occur with global variables
let score = 0;

function incrementScore(points) {
  score += points;
  return score;
}

// What Makes a First Class Javascript Function
// A callback is when a function is passed into another function as an argument
// Test this in Node Repl
function add(num1, num2) {
  return num1 + num2;
}

function printResult(sum) {
  return `The value of this equation is ${sum}.`
}

printResult(add(5, 7));

// Assigning Functions to Variables
// Function expression
// Test in Repl
const funkyVariable = function(arg) {
  return arg;
}
funkyVariable("Hello!");

// Higher order functions return other functions - Can be used to implement closure into your programming
function doAThing() {
  return function() {
    return "A thing was done."
  }
}



// Closures
function welcome(salutation) {
  return function(yourName) {
    return '${salutation}! Nice to meet you, ${yourName}!'
  }
}

const heyThere = welcome("Hey there");

function(yourName) {
  return '${salutation}! Nice to meet you, ${yourName}!'
}

// In Repl
> heyThere("Joe")
"Hey there! Nice to meet you, Joe!"

> const spanishGreeting = welcome("Buenos días!");
> spanishGreeting("Joe");
"Buenos días! Nice to meet you, Joe!"

// Closure Example Two
const multiplier = (numberToMultiplyBy) => {
  return (numberToMultiply) => {
    return numberToMultiplyBy * numberToMultiply;
  }
}

const doubler = multiplier(2);
const tripler = multiplier(3);
const quadrupler = multiplier(4);

// if you wrote out what the doubler was doing it would look like this
(numberToMultiply) => {
  return 2 * numberToMultiply;
}
//
(numberToMultiply) => {
  return 3 * numberToMultiply;
}
//
(numberToMultiply) => {
  return 4 * numberToMultiply;
}

// Example of a callback closure
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=[[API-KEY-GOES-HERE]]`)
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonifiedResponse) {
    getElements(jsonifiedResponse);
  });



// Currying

// Uncurried Function
function aThingIMaybeLike(howMuchILikeIt, thing, reason) {
  return 'I ${howMuchILikeIt} ${thing} because ${reason}.';
}

aThingIMaybeLike("really like", "functional programming", "it's cool");

// Curried
function aThingIMaybeLike(howMuchILikeIt) {
  return function(thing) {
    return function(reason) {
      return 'I ${howMuchILikeIt} ${thing} because ${reason}.';
    }
  }
}

aThingIMaybeLike("really like")("functional programming")("it's cool")

// Example of how currying adds modularity to code
const thingsThatBugMe = aThingIMaybeLike("do not like");

// Then call with different inner arguments
thingsThatBugMe("global variables")("they are a code smell");
> 'I do not like global variables because they are a code smell.'
thingsThatBugMe("functions with side effects")("they break code");
> 'I do not like functions with side effects because they break code.'

// Doing this with multiple arguements as well
const reasonIlLoveCoding = aThingIMaybeLike("love")("coding");
// test in Repl
> reasonILoveCoding("it is fun");
'I love coding because it is fun.'
> reasonILoveCoding("I enjoy problem-solving");
'I love coding because I enjoy problem-solving.'





// Map, Reduce & Filter
const numArray = [1, 2, 3, 4, 5];
let doubledArray = [];
numArray.forEach(function(element) {
  doubledArray.push(element * 2);
});
doubledArray;

// map
const numArray = [1, 2, 3, 4, 5];
const doubledArray = numArray.map(function(element) {
  return element * 2;
});
doubledArray;
// if you wanted to use arrow functions
const doubledArray = numArray.map (e => e * 2);

// Reduce
const numArray = [3, 7, 5];
const summedArray = numArray.reduce(function(currentValue, element) {
  return element + currentValue;
}, 0);

const friends = [
  {
    name: "Jasmine",
    wantToDo: ["hike", "go out to eat", "swim"]
  },
  {
    name: "Ada",
    wantToDo: ["play games", "hike", "cook meals"]
  },
  {
    name: "Desmond",
    wantToDo: ["sleep", "swim", "play games"]
  },
  {
    name: "Andres",
    wantToDo: ["hike", "swim", "play games"]
  }
];

// Ex # 1
const toDos = friends.reduce(function(array, friend) {
  return array.concat(friend.wantToDo);
});
// In Repl
> toDos
'["hike", "go out to eat", "swim", "play games", "hike", "cook meals", "sleep", "swim", "play games", "hike", "swim", "play games"]`

// Ex # 2
const toDoTally = toDos.reduce(function(voteTally, toDo) {
  voteTally[toDo] = (voteTally[toDo] || 0) +1;
  return voteTally;
}, {});
// In Repl
> toDoTally
{
  "hike:": 3,
  "go out to eat": 1,
  "swim": 3,
  "play games": 3,
  "cook meals": 1,
  "sleep": 1
}

// Sort
const mostPopular = Object.entries(toDoTally).sort(function(a,b) { return b[1] - a[1] });
// In Repl
> mostPopular
[["hike", 3], ["swim", 3], ["play games", 3], ["go out to eat", 1], ["cook meals", 1], ["sleep", 1]]

// Filter
const numArray = [7, 14, 32, 8];
const filteredArray = numArray.filter(e => e > 10);

const employees = [
  {
    name: "Ada",
    role: "developer"
  },
  {
    name: "Tom",
    role: "HR"
  },
  {
    name: "Jasmine",
    role: "developer"
  },
  {
    name: "Hank",
    role: "administrative assistant"
  }
];

// In Repl
> const developers = employees.filter(e => e.role === "developer")
[ { name: 'Ada', role: 'developer' },
  { name: 'Jasmine', role: 'developer' } ]


// Recursion
// How we first learned to write this:
let counter = 0
for (let i = 0; i < 3 ; i++) {
  counter += 1
}

// How to Solve Recursively
const incrementCounter = (counter) => {
  if (isNaN(counter)) {  // This is the termination condition.
    return;
  }
  if (counter >= 3) {
    return counter;
  } else {
    console.log(counter);
    return incrementCounter(counter + 1); // This is the base case (The final condition of a successfully called recursive function)
  }
}
incrementCounter(0);

// Order of Functions completing
incrementCounter() {
  // This call will complete last.
  return incrementCounter() {
    // This call will complete second.
    return incrementCounter() {
      // This call will complete first.
    }
  }
}