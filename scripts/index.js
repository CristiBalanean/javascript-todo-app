let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

let isEditingIndex = -1;

const taskStyle = 'style="text-decoration: line-through;"';

renderTasks();

document.querySelector('.app-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function renderTasks() {
    let tasksHTML = '';

    for (let i = 0; i < tasksArray.length; i++) {
        if (i === isEditingIndex) {
            tasksHTML += `
            <div class="task-container">
                <input class="task-checkbox" type='checkbox'>
                <input class="task-edit-input" value="${tasksArray[i].task}" onkeydown="
                    if(event.key === 'Enter') {
                        saveEditTask(${i});
                    }
                ">
                <button class="task-save-button" onclick="saveEditTask(${i});">
                    <img src="images/save-icon.svg">
                </button>
                <button class="task-cancel-button" onclick="cancelEditTask();">x</button>
            </div>
        `;
        } else {
            if (tasksArray[i].isCompleted) {
                tasksHTML += `
                    <div class="task-container">
                        <input class="task-checkbox" checked onclick="completeTask(${i});" type='checkbox'>
                        <p class="task-text" ${taskStyle}>${tasksArray[i].task}</p>
                        <button class="task-edit-button" onclick="editTask(${i});">
                            <img src="images/edit-icon.svg">
                        </button>
                        <button class="task-delete-button" onclick="removeTask(${i});">
                            <img src="images/bin-icon.svg">
                        </button>
                    </div>
                `;
            } else {
                tasksHTML += `
                    <div class="task-container">
                        <input class="task-checkbox" onclick="completeTask(${i});" type='checkbox'>
                        <p class="task-text">${tasksArray[i].task}</p>
                        <button class="task-edit-button" onclick="editTask(${i});">
                            <img src="images/edit-icon.svg">
                        </button>
                        <button class="task-delete-button" onclick="removeTask(${i});">
                            <img src="images/bin-icon.svg">
                        </button>
                    </div>
                `;
            }
        }
    }

    document.querySelector(".tasks-container").innerHTML = tasksHTML;
}

function addTask() {
    const input = document.querySelector(".app-input");

    if (input.value !== '') {
        tasksArray.push({ task: input.value, isCompleted: false });
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
        renderTasks();
        input.value = '';
    }
}

function removeTask(index) {
    tasksArray.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    renderTasks();
}

function editTask(index) {
    isEditingIndex = index;
    renderTasks();
}

function cancelEditTask() {
    isEditingIndex = -1;
    renderTasks();
}

function saveEditTask(index) {
    const input = document.querySelector(".task-edit-input");
    if (input) {
        tasksArray[index].task = input.value;
        isEditingIndex = -1;
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
        renderTasks();
    }
}

function completeTask(index) {
    tasksArray[index].isCompleted = !tasksArray[index].isCompleted;
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    renderTasks();
}
