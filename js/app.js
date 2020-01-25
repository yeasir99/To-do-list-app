function UiControlar() {};
UiControlar.prototype.addTaskToList = function (task) {
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
document.querySelector('form').addEventListener('submit', function (e) {
    const task = document.querySelector('input[type=text]');
    if (task.value !== '') {
        var ui = new UiControlar;
        ui.addTaskToList(task);
    }
    e.preventDefault();

});