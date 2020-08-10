let tasks = [{
    descr: 'Написать логику на JS',
    isCompleted: true,
    id: 0,
    }, {
    descr: 'Написать стили на SASS',
    isCompleted: true,
    id: 1,
    }, {
    descr: 'Макс блять молодец',
    isCompleted: true,
    id: 2,
    }];
getTasks();
function filter(e) {
    const element = e.currentTarget;
    const newTasks = tasks.sort(function(a,b) {
        if(element.checked) {
            if (a.isCompleted < b.isCompleted) {
                return 1;
            }
        } else {
            if (a.isCompleted > b.isCompleted) {
                return 1;
            }
        }
        // a должно быть равным b
        return -1;
    
})
renderTaskList();
}

function Filterbtn() {
    let btnFilter = document.querySelector('.filter-block-btn__btn');
    btnFilter.addEventListener('click', filter);
}

function sortTask(e) {
    const element = e.currentTarget;
    const newTasks = tasks.sort(function(a,b) {
        if(element.checked) {
            if (a.descr > b.descr) {
                return 1;
            }
        } else {
            if (a.descr < b.descr) {
                return 1;
            }
        }
        // a должно быть равным b
        return -1;
    })
    renderTaskList();
}

function Sortbtn() {
    let btnSort = document.querySelector('.addTask-block-sort__btn');
    btnSort.addEventListener('click', sortTask);
}
function Deletebtn() {
    let btnDelete = document.querySelector('.deleteAll');
    btnDelete.addEventListener('click', filterTask);
}


//кнопка с добвлением новой задачи 
function checkFluency() {
    var checkbox = document.getElementById('btn__openAdd');
    if (checkbox.checked == true) {
        document.getElementById('addTask-block').style.display = 'flex';
    }
}

//// html элемнт задачи
//const el_task = document.querySelector('');
//el_task.addEventListener('click', onRemoveTask)
window.addEventListener('DOMContentLoaded', function () {
    renderTaskList();
    initListeners();
    saveTask();
    getTasks();
})

function onRemoveTask(event) {
    renderTaskList();
    saveTask();
    getTasks();

}

function initListeners() {
    let add = document.querySelector('.addTask-block-btn__add');
    add.addEventListener('click', onAddTask);
    //        if (!onAddTask.value) return /////
    inputEnter();
    logicChangeStateTask();
    Sortbtn();
    Filterbtn();
    ClickClose();
    Deletebtn();
}
//функция на запрет добавления пустой или повторяющейся строки
function validate(value) {
    function validateRepeat() {
        let isRepeat = tasks.some(function (task) {
            return value == task.descr
        })

        return !isRepeat;
    }

    function validateEmptyText() {
        return value != '';
    }

    return validateRepeat() && validateEmptyText();
}

// false or true
function logicChangeStateTask() {
    let checkboxStateTasks = document.querySelectorAll('.task-block-btn__btn');
    Array.from(checkboxStateTasks).forEach(function (checkboxStateTask) {
        checkboxStateTask.addEventListener('click', onChangeStateTask);
    })
}

function onChangeStateTask(event) {
    let checkbox = event.currentTarget;
    let task_id = Number.parseInt(checkbox.dataset.task_id);
    let task = tasks.find(function (task) {
        return task.id == task_id;
    });
    task.isCompleted = checkbox.checked;
    saveTask();
    getTasks();
}
//рандом id
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/// нажатие на enter 
function inputEnter() {
    document.getElementById('addTask-block__btn').addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            onAddTask(e);
        }
    })
}


function onAddTask(event) {
    saveTask();
    getTasks();
    event.preventDefault();
    let text = document.getElementById('addTask-block__btn').value
    saveTask();
    getTasks();
    if (validate(text)) {
        tasks.push({
            descr: text,
            isCompleted: false,
            id: getRndInteger(1,100000),
        });
        document.getElementById('addTask-block__btn').value = "";
        renderTaskList();
        saveTask();
        getTasks();
    }
}
function saveTask() {
    let str = JSON.stringify(tasks)
    localStorage.setItem("tasks", str)
}

function getTasks() {

    let str = localStorage.getItem("tasks")
    storageTasks = JSON.parse(str)
    if (storageTasks) {
        tasks = storageTasks;
    }
}
function SliceTask(e) {
    const {dataset} = e.currentTarget;
    let {task_id} = dataset;
    task_id = Number.parseInt(task_id);
    tasks.forEach((taskFind, id) => {
        if (taskFind.id === task_id) {
            task_id = id;
            console.log(task_id);
            return;
        }
    })
    tasks.splice(task_id, 1);
    renderTaskList();
}

function ClickClose() {
    const list_btnClose = Array.from(document.querySelectorAll('.close'));
    list_btnClose.forEach(function(btnClose) {
      btnClose.addEventListener('click', SliceTask);
    });
}
                                                      
function renderTaskList() {
    // Удаление всех задач
    let el_container = document.querySelector('.content');
    el_container.innerHTML = '';

    tasks.forEach(function (task) {
        const el_newTask = document.createElement('div');
        el_newTask.className = 'task-block';
        el_newTask.id = "task-block";
        el_newTask.dataset.task_id = task.id;
        el_newTask.innerHTML = `
            <span class="task-block__text">${task.descr}</span>
            <div class="task-block-btnClose">
                    
                </div>
            <div class="task-block-btn">
                <label class="task-block-btn__btnWarp" for="task-block-btn__btnWarp"><span class="task-block-btn__btnStyle"></span></label>
            </div>`;
        
        const el_checkbox = document.createElement('input');
        el_checkbox.type = 'checkbox';
        el_checkbox.className = "task-block-btn__btn";
        el_checkbox.id = "task-block-btn__btn";
        el_checkbox.name = "task-block-btn__btn";
        el_checkbox.checked = task.isCompleted;
        el_checkbox.dataset.task_id = task.id;
        el_newTask.children[2].insertAdjacentElement('afterbegin', el_checkbox);
        
        const el_btnClose = document.createElement('button');
        el_btnClose.className = "close";
        el_btnClose.dataset.task_id = task.id;
        el_newTask.children[1].insertAdjacentElement('afterbegin', el_btnClose);
        el_container.appendChild(el_btnClose);
        const wrapBtnClose = el_newTask.querySelector('.task-block-btnClose');
        wrapBtnClose.appendChild(el_btnClose);
        
        el_container.appendChild(el_newTask);
        
        initListeners();
    })
}
function filterTask() {
    let positionbytask = [];
    tasks = tasks.filter(function(task) {
        return !task.isCompleted;
    })
    
    renderTaskList();
}
console.log(tasks)
                                     
