// Event Loop
const EventEmitter = require("node:events");

// create school event emitter class
class SchoolBell extends EventEmitter { };

// declare a schoolBell_1 instance
const schoolBell_1 = new SchoolBell();

// event listener
schoolBell_1.on('ring', () => {
  console.log("Yaho, class finished!");
})

// evnet emitter
schoolBell_1.emit('ring');
