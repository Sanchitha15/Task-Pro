let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const toggleBtn = document.getElementById('theme-toggle');
const taskpro = document.getElementsByClassName('taskpro')
const themeIcon = document.getElementById('theme-icon');
const addbtn=document.querySelector('.add');
const form =document.querySelector('.form');
const closeForm= document.querySelector('.close-form');
const submit = document.querySelector('#submit')
const cardLayout = document.querySelector('.card-layout');
const hamburger = document.querySelector('.ri-list');
const optionsMenu = document.querySelector('.options');

const deleteAll = document.querySelector('.delete_all');
const confirmModal = document.getElementById('confirm-modal');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');
const noTasks = document.querySelector('.no-task-msg');
const sortBtn = document.querySelector('.ri-sort');
const sortMenu = document.getElementById('sort-menu');
let editingTaskId = null;

const searchInput = document.querySelector('.input input');
const searchIcon = document.querySelector('.ri-search-line');//for mobile phone


//////////////////toggle button//////////////////////
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    
    if (document.body.classList.contains('dark')) {
        themeIcon.classList.remove('ri-sun-fill');
        themeIcon.classList.add('ri-moon-fill');
        taskpro
    } else {
        themeIcon.classList.remove('ri-moon-fill');
        themeIcon.classList.add('ri-sun-fill');
    }
});


////////////////////////FORMMMM///////////////////////////////
//add btn
addbtn.addEventListener('click',function(){
    form.style.display="flex";
    optionsMenu.classList.remove('open');
})

//close  form
closeForm.addEventListener('click',function(){
    form.style.display="none";
})

//submit form
submit.addEventListener('click',function(e){
    e.preventDefault();

    const title = form.querySelector('.task-title').value.trim();
    const desc = form.querySelector('.task-desc').value.trim();
    const priority = form.querySelector('.priority-opt').value;
    const taskType = form.querySelector('.task-type-opt').value;
    const due = form.querySelector('.date').value.trim();
    const status = form.querySelector('.status').value;

    if(!title || !desc || !due){
        alert("Please fill all required fields.");
        return;
    }

    if (editingTaskId !== null) {
        tasks = tasks.map(function(task) {
            if (task.id === editingTaskId) {
                return { ...task, title, desc, priority, taskType, due, status };
            }
            return task;
        });
        editingTaskId = null; 

    } else {
        const newTask = {
            id: Date.now(),
            title, 
            desc, 
            priority, 
            taskType, 
            due, 
            status
        };
        tasks.push(newTask);
    }

    saveToLocalStorage();
    renderTasks();
    form.style.display = 'none';
    form.querySelector('form').reset();
});

////////mobile////////////////////
hamburger.addEventListener('click', function() {
    optionsMenu.classList.toggle('open');
});

document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !optionsMenu.contains(e.target)) {
        optionsMenu.classList.remove('open');
    }
});

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//////////////////card-creation//////////////////////

function createCard(task) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = task.id;
    card.dataset.status = task.status;
    card.dataset.category = task.taskType;

    card.innerHTML = `
        <div class="top">
            <h3 class="title">${task.title}</h3>
            <div class="card-menu-wrapper">
                <button class="more">
                    <i class="ri-more-2-fill"></i>
                </button>
                <div class="card-menu hidden">
                    <button class="edit-btn">
                        <i class="ri-edit-line"></i> Edit
                    </button>
                    <button class="delete-btn">
                        <i class="ri-delete-bin-line"></i> Delete
                    </button>
                </div>
            </div>
        </div>
        <p class="desc">${task.desc}</p>
        <div class="mid">
            <span class="priority ${task.priority}">${task.priority}</span>
            <span class="task-type">${task.taskType}</span>
        </div>
        <div class="bottom">
            <span class="due">
                <i class="ri-calendar-todo-line"></i>${task.due}
            </span>
            <span class="progress-status">${task.status}</span>
        </div>
    `;

    const moreBtn = card.querySelector('.more');
    const cardMenu = card.querySelector('.card-menu');
    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');


    moreBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // stops click reaching document
        cardMenu.classList.toggle('hidden');
        console.log("clicked")
    });

    // delete
    deleteBtn.addEventListener('click', function() {
        tasks = tasks.filter(t => t.id !== task.id);
        saveToLocalStorage();
        renderTasks();
    });

    // edit
    editBtn.addEventListener('click', function() {
        editingTaskId = task.id;
        form.querySelector('.task-title').value = task.title;
        form.querySelector('.task-desc').value = task.desc;
        form.querySelector('.priority-opt').value = task.priority;
        form.querySelector('.task-type-opt').value = task.taskType;
        form.querySelector('.date').value = task.due;
        form.querySelector('.status').value = task.status;
        form.style.display = 'flex';
        cardMenu.classList.add('hidden');
    });

    // close menu when clicking anywhere else
    document.addEventListener('click', function() {
        cardMenu.classList.add('hidden');
    });

    return card;


}



//////////////////renderrr////////////////////////////



function renderTasks(){
    cardLayout.innerHTML = ''

    if (tasks.length === 0) {
        const msg = document.createElement('p');
        msg.classList.add('no-task-msg');
        msg.textContent = 'No Tasks available';
        cardLayout.appendChild(msg);
        return; 
    }

    tasks.forEach(function(task) {
    const card = createCard(task);
    cardLayout.appendChild(card);
    
    });

}

    /////////delete all///////////////////
    deleteAll.addEventListener('click', function() {
    confirmModal.style.display = "flex";
    optionsMenu.classList.remove('open'); 
});

confirmYes.addEventListener('click', function() {
    tasks = [];
    saveToLocalStorage(); 
    renderTasks();
    confirmModal.style.display = "none";
});


confirmNo.addEventListener('click', function() {
    confirmModal.style.display = "none";
});
//////////////sortingg///////////////////////////



let currentSort ='default';

sortBtn.addEventListener('click',function(e){
    e.stopPropagation();
    sortMenu.classList.toggle('open')
    optionsMenu.classList.remove('open');
})

document.addEventListener('click', function(e) {
    if (!sortMenu.contains(e.target) && !sortBtn.contains(e.target)) {
        sortMenu.classList.remove('open');
    }
});

function applySortAndClose(criteria) {

    sortMenu.classList.remove('open'); 

    if (criteria === 'default') {
        renderTasks();
        return;
    }

    const sorted = [...tasks];

    if (criteria === 'priority') {
        const order = { high: 1, medium: 2, low: 3 };
        sorted.sort((a, b) => order[a.priority] - order[b.priority]);

    } else if (criteria === 'status') {
        const order = { 'not-started': 1, 'progress': 2, 'done': 3 };
        sorted.sort((a, b) => order[a.status] - order[b.status]);

    } else if (criteria === 'date') {
        sorted.sort((a, b) => new Date(a.due) - new Date(b.due));
        // nearest date first

    } else if (criteria === 'type') {
        const order = { work: 1, health: 2, personal: 3 };
        sorted.sort((a, b) => order[a.taskType] - order[b.taskType]);
    }

    renderSorted(sorted);
}


function renderSorted(sortedArray) {
    
    cardLayout.innerHTML = '';
    
    if (sortedArray.length === 0) {
        const msg = document.createElement('p');
        msg.classList.add('no-task-msg');
        msg.textContent = 'No Tasks available';
        cardLayout.appendChild(msg);
        return;
    }

    sortedArray.forEach(function(task) {
        const card = createCard(task);
        cardLayout.appendChild(card);
    });
}

////////////search barrr/////////////////

searchInput.addEventListener('input', function() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === '') {
        renderTasks();
        return;
    }

    const filtered = tasks.filter(function(task) {
        return task.title.toLowerCase().includes(query);
    });

    renderSorted(filtered); 
});

//search bar for mobile phones

searchIcon.addEventListener('click', function() {
    const isVisible = searchInput.style.display === 'inline';

    if (isVisible) {
        
        searchInput.style.display = 'none';
        searchInput.value = '';
        searchIcon.classList.remove('ri-close-line');
        searchIcon.classList.add('ri-search-line');
        renderTasks(); 
    } else {
        
        searchInput.style.display = 'inline';
        searchInput.focus(); 
        searchIcon.classList.remove('ri-search-line');
        searchIcon.classList.add('ri-close-line');
    }
});
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim().toLowerCase();
        if (query === '') {
            renderTasks();
            return;
        }
        const filtered = tasks.filter(function(task) {
            return task.title.toLowerCase().includes(query);
        });
        renderSorted(filtered);
        searchInput.blur();
    }
});


renderTasks();