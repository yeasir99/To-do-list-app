function UiControlar() {}

UiControlar.prototype.addTaskToList = function(task) {
  if (task.value === "") {
    alert(`Before submit please inter task name`);
    return;
  }
  const container = document.querySelector(".task-container");
  const div = document.createElement("div");
  div.className = "task-container_item";
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
};




UiControlar.prototype.addTaskToLs = function(task) {
  let items;
  localStorage.getItem("items") === null
    ? (items = [])
    : (items = JSON.parse(localStorage.getItem("items")));

  items.push(task);
  localStorage.setItem("items", JSON.stringify(items));
};

UiControlar.prototype.editTask = function(ele) {
  let matchvalue;
  const taskList = ele.target.parentElement.parentElement;
  const taskName = taskList.firstElementChild;
  const input = document.createElement("input");
  input.type = "text";
  matchvalue = taskName.textContent;
  input.value = taskName.textContent;
  taskList.insertBefore(input, taskName);
  taskList.removeChild(taskName);
  input.className = "item-name";
  ele.target.textContent = "Save";
  Object.defineProperty(this, 'matchvalue',{
    get: function(){return matchvalue}
  }
  )
};

UiControlar.prototype.saveTask = function(ele) {
  const taskList = ele.target.parentElement.parentElement;
  const input = taskList.firstElementChild;
  const div = document.createElement("div");
  div.textContent = input.value;
  taskList.insertBefore(div, input);
  taskList.removeChild(input);
  div.className = "item-name";
  ele.target.textContent = "Edit";
};

UiControlar.prototype.removeTask = function(ele) {
  const taskList = ele.target.parentElement.parentElement;
  taskList.remove();
};


// save data in localStorage

function getTaskFromLs() {
  let items;
  localStorage.getItem("items") === null
    ? (items = [])
    : (items = JSON.parse(localStorage.getItem("items")));

  items.forEach(function(value) {
    const container = document.querySelector(".task-container");
    const div = document.createElement("div");
    div.className = "task-container_item";
    div.innerHTML = `
          <div class="item-name">${value}</div>
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
  });
};


//remove data from local storage

function removeTaskFromLs(ele){
  let taskParent = ele.target.parentElement.parentElement;
  let items = JSON.parse(localStorage.getItem("items"));
 
  items.forEach((item, index)=>{
      if(taskParent.firstElementChild.textContent == item){
        items.splice(index, 1);
      }
  });
  localStorage.setItem('items', JSON.stringify(items))
}

// edit data ans save new data in local storage
function editDataLs(ele){
  let items = JSON.parse(localStorage.getItem("items"));
  items.forEach((item, index)=>{
      if(matchValue = items){
        items[index] = ele.target.parentElement.parentElement.firstElementChild.textContent;
      }
  });
  localStorage.setItem('items', JSON.stringify(items));
}


// load content from local storage

document.addEventListener("DOMContentLoaded", function() {
  var ui = new UiControlar();
  getTaskFromLs.call(ui);
});

document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const task = document.querySelector("input[type=text]");
  var ui = new UiControlar();
  ui.addTaskToList(task);
  ui.addTaskToLs(task.value);
  task.value = "";
});

document
  .querySelector(".task-container")
  .addEventListener("click", function(e) {
    var ui = new UiControlar();
    let matchValue;
    if (e.target.textContent === "Edit") {
      ui.editTask(e);
      matchValue = ui.matchvalue;
    } else if (e.target.textContent === "Save") {
      ui.saveTask(e);
      editDataLs.call(ui,e);
    } else if (e.target.textContent === "Remove") {
      removeTaskFromLs.call(ui,e)
      ui.removeTask(e);
    }
  });
