let taskIndexForTimer = -1;
let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let taskTimers = [];

function addTask() {
    const taskName = document.getElementById('task').value;
    const taskTime = document.getElementById('time').value;

    if (taskName && taskTime) {
        $.post("/add_task", { task: taskName, time: taskTime }, function(response) {
            displayTasks();
            document.getElementById('task').value = '';  // clear task input
            document.getElementById('time').value = '';  // clear time input
        });
    }
}

function displayTasks() {
    $.get("/tasks", function(tasks) {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <input type="checkbox" onclick="toggleTaskCompletion(${index})" ${task.completed ? 'checked' : ''}>
                <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.task}</span>
                <span>${task.time}</span>
                <button class="btn btn-info" onclick="startTimer(${index})"><i class="fas fa-clock"></i></button>
                <button class="btn btn-warning" onclick="editTask(${index})"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn btn-danger" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
            `;
            taskList.appendChild(taskItem);
        });
    });
}

function toggleTaskCompletion(index) {
    $.post("/toggle_task", { index: index }, function(response) {
        displayTasks();
    });
}

function deleteTask(index) {
    $.post("/delete_task", { index: index }, function(response) {
        displayTasks();
    });
}

function editTask(index) {
    $.get("/tasks", function(tasks) {
        document.getElementById('editTask').value = tasks[index].task;
        document.getElementById('editTime').value = tasks[index].time;
        taskIndexForEdit = index;
        document.getElementById('editTaskPopup').style.display = 'block';
    });
}

function saveEdit() {
    const editedTask = document.getElementById('editTask').value;
    const editedTime = document.getElementById('editTime').value;
    $.post("/edit_task", { index: taskIndexForEdit, task: editedTask, time: editedTime }, function(response) {
        displayTasks();
        closeEditPopup();
    });
}

function closeEditPopup() {
    document.getElementById('editTaskPopup').style.display = 'none';
}

// Start the timer for a specific task
function startTimer(index) {
    // Update the task index for the timer
    taskIndexForTimer = index;

    // Show the timer popup
    document.getElementById('timerPopup').style.display = 'block';

    // Reset the elapsed time
    elapsedTime = 0;
    startTime = Date.now() - elapsedTime;

    // Start the timer
    isRunning = true;
    document.getElementById('startPauseBtn').innerHTML = 'Pause';
    updateTimer();
}

// Toggle between start and pause
function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);  // Pause the timer
        isRunning = false;
        document.getElementById('startPauseBtn').innerHTML = 'Resume';
    } else {
        // Resume the timer
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        document.getElementById('startPauseBtn').innerHTML = 'Pause';
        updateTimer();
    }
}

// Stop the timer and update task time
function stopTimer() {
    clearInterval(timerInterval);  // Stop the timer
    isRunning = false;
    elapsedTime = Date.now() - startTime;

    // Send the time update to the server
    $.post("/update_task_time", { index: taskIndexForTimer, elapsedTime: elapsedTime }, function(response) {
        document.getElementById('timerPopup').style.display = 'none';
        displayTasks();  // Refresh the task list after timer stop
    });
}

// Update the timer display every second
function updateTimer() {
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        
        document.getElementById('timerDisplay').innerHTML =
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

// Initialize tasks display
displayTasks();
