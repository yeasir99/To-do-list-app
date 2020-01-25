function UiControlar() {};
UiControlar.prototype.addTaskToList = function (task) {
    if (task.value === '') {
        alert(`Before submit please inter task name`);
        return;
    }
    const container = document.querySelector('.task-container')
    const div = document.createElement('div');
    div.className = 'task-container_item'
    div.innerHTML = `
        <div class="item-name">${task.value}</div>
        <div class=".item-tools">
        <label class="item-tools_status">
            complete
            <input type="checkbox">
        </label>
            <button class="item-tools_edit">Edit</button>
            <button class="item-tools_remove">Remove</button>
        </div>
        
    `;
    container.appendChild(div);
    task.value = '';

};

UiControlar.prototype.editTask = function (e) {
    const taskList = e.target.parentElement.parentElement;
    const taskName = taskList.firstElementChild;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskName.textContent;
    taskList.insertBefore(input, taskName);
    taskList.removeChild(taskName);
    input.className = 'item-name';
    e.target.textContent = 'Save';
};

UiControlar.prototype.saveTask = function (e) {
    const taskList = e.target.parentElement.parentElement;
    const input = taskList.firstElementChild;
    const div = document.createElement('div');
    div.textContent = input.value;
    taskList.insertBefore(div, input);
    taskList.removeChild(input);
    div.className = 'item-name';
    e.target.textContent = 'Edit';
}

UiControlar.prototype.removeTask = function (e) {
    const taskList = e.target.parentElement.parentElement;
    taskList.remove();
}


document.querySelector('form').addEventListener('submit', function (e) {
    const task = document.querySelector('input[type=text]');
    var ui = new UiControlar;
    ui.addTaskToList(task);
    e.preventDefault();
});

document.querySelector('.task-container').addEventListener('click', function (e) {
    var ui = new UiControlar;
    if (e.target.textContent === 'Edit') {
        ui.editTask(e);
    } else if (e.target.textContent === 'Save') {
        ui.saveTask(e);
    } else if (e.target.textContent === 'Remove') {
        ui.removeTask(e);
    }
})