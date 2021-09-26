// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearAllTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks);

}

// get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        // create text node and append

        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    })
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task');
    }
    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create text node and append

    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value)

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Sure?')) {
            e.target.parentElement.parentElement.remove()
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        };
    }

    e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('task') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('task'))
    }

    tasks.forEach(function (task) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearAllTasks() {
    if (confirm('Sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}