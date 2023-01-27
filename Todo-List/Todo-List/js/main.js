const addBtn = document.querySelector('.add-btn');
const input = document.querySelector('input');
const list = document.querySelector('.list');
const filters = document.querySelectorAll('.list-filters span');
const clearBtn = document.querySelector('.clear-btn');

// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem('todo-list'));

// Adding 'active' class to current filter button 
filters.forEach(btn =>{
    btn.addEventListener('click',()=>{
        document.querySelector('span.active').classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    })
})

// Showing task
const showTodo = (filter) =>{
    let li = '';
    if(todos){
        todos.forEach((todo, id) => {
            // if todo status is completed, set the  isCompleted value to checked 
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all"){
                li += `
            <li class="todo">
                <label for=${id}>
                    <input type="checkbox" onclick="updateStatus(this)" id="${id}"  ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <button type="button" onclick='deleteTask(${id})' class="btn delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
            </li>
            `;
            }
        });
    }
    list.innerHTML = li || "<span class='any-text'>You don't have any task here</span>";
    
    // let checkTask = list.querySelectorAll('.todo');
    // !checkTask.length ? clearBtn.classList.remove('active') : clearBtn.classList.add('active');
    
    list.offsetHeight >=250 ? list.classList.add('overflow') : list.classList.remove('overflow');
}

showTodo("all");

// Updating(toggle) checkbox status
const updateStatus = (selectedTask) =>{
    // getting pragraph the contains task name
    let taskname = selectedTask.parentElement.lastElementChild;  // parentElement() : Returns the parent element of the child element  lastElementChild() : return  HTML content  :last element
    if(selectedTask.checked){
        taskname.classList.add("checked");
        // updating the status of selected task to completed
        todos[selectedTask.id].status = "completed";
    }else{
        taskname.classList.remove("checked");
        // updating the status of selected task to pending
        todos[selectedTask.id].status = "pending";
    }
    // updating todo in localstorage
    localStorage.setItem('todo-list', JSON.stringify(todos));
}

// Click button to add task
addBtn.addEventListener('click',()=>{
    addTask();
})

// Operating keyboard to add task
input.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){
        addTask();
    }
})
  
// Adding task
const addTask = () =>{
    let inputValue = input.value;

    if(inputValue.trim() === ""){
        alert('Please enter correct information!');
        return;
    }else{
        if(!todos){  // if todos isn't exist, pass an empty to todos
            todos = [];
        }
        let todoInfo = {name: inputValue, status: "pending"};  // Object data
        todos.push(todoInfo);  // add new task to todoList
        localStorage.setItem('todo-list', JSON.stringify(todos));  // store key/value in localstorage and transform data into JSON string 
        input.value = "";
        showTodo("all");
    }
}

// Removing task
const deleteTask = (deleteId) =>{
    // removing selected task from array
    if(confirm('Are you sure you want to delete this item?')){
        todos.splice(deleteId, 1);
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo("all");
    }
}

// Removing all tasks
clearBtn.addEventListener('click',()=>{
    // removing all task from array
    todos.splice(0, todos.length);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo("all");
})
