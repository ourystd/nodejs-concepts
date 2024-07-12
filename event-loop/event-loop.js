// Define queues for different types of tasks
let nextTickQueue = [];
let promiseQueue = [];
let timerQueue = [];
let ioQueue = [];
let checkQueue = [];
let closeQueue = [];

// Function to add tasks to the appropriate queue
function addTask(queue, task) {
  queue.push(task);
}

// Function to execute tasks in the microtask queue
function executeMicrotasks() {
  // Execute tasks in nextTick queue
  while (nextTickQueue.length > 0) {
    let task = nextTickQueue.shift();
    task();
  }

  // Execute tasks in promise queue
  while (promiseQueue.length > 0) {
    let task = promiseQueue.shift();
    task();
  }
}

// Function to execute tasks in the timer queue
function executeTimerTasks() {
  while (timerQueue.length > 0) {
    let task = timerQueue.shift();
    task();
  }
}

// Function to execute tasks in the I/O queue
function executeIOQueue() {
  while (ioQueue.length > 0) {
    let task = ioQueue.shift();
    task();
  }
}

// Function to execute tasks in the check queue
function executeCheckQueue() {
  while (checkQueue.length > 0) {
    let task = checkQueue.shift();
    task();
  }
}

// Function to execute tasks in the close queue
function executeCloseQueue() {
  while (closeQueue.length > 0) {
    let task = closeQueue.shift();
    task();
  }
}

// Function to run the event loop
function eventLoop() {
  // Loop until there are no more tasks to execute
  while (true) {
    // Execute microtasks
    executeMicrotasks();

    // Execute tasks in the timer queue
    executeTimerTasks();

    // Execute tasks in the I/O queue
    executeIOQueue();

    // Execute tasks in the check queue
    executeCheckQueue();

    // Execute tasks in the close queue
    executeCloseQueue();

    // Execute microtasks again for the final run
    executeMicrotasks();

    // Check if there are more tasks to process
    if (
      nextTickQueue.length === 0 &&
      promiseQueue.length === 0 &&
      timerQueue.length === 0 &&
      ioQueue.length === 0 &&
      checkQueue.length === 0 &&
      closeQueue.length === 0
    ) {
      // If no tasks remaining, exit the event loop
      break;
    }
  }
}

// Example usage
// Add tasks to different queues
fn1 = () => {
  console.log("fn1");
  addTask(nextTickQueue, () => console.log("FN1: Task in nextTick queue"));
  addTask(promiseQueue, () => {
    console.log("FN1: Task in promise queue");
    addTask(timerQueue, () =>
      console.log("FN1: Nested timer task in promise queue")
    );
    addTask(nextTickQueue, () =>
      console.log("FN1: Nested tick task in promise queue")
    );
    addTask(ioQueue, () =>
      console.log("FN1: Nested I/O task in promise queue")
    );
  });
  addTask(promiseQueue, () => console.log("FN1: Second task in promise queue"));
  addTask(timerQueue, () => console.log("FN1: Task in timer queue"));
  addTask(ioQueue, () => console.log("FN1: Task in I/O queue"));
  addTask(checkQueue, () => console.log("FN1: Task in check queue"));
  addTask(closeQueue, () => console.log("FN1: Task in close queue"));
};

f2 = () => {
  console.log("f2");
  addTask(nextTickQueue, () => console.log("FN2: Task in nextTick queue"));
};

fn3 = () => {
  console.log("fn3");
  fn1();
  f2();
};

fn3();

// Run the event loop
eventLoop();
