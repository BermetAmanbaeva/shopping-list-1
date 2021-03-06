//selectors
const todoInput = document.querySelector(".todo-input") //input
const todoButton = document.querySelector(".todo-button") //button
const todoList = document.querySelector(".todo-list") //ul
const filterOption = document.querySelector(".filter-todo")//select

//functions
const addTodo = (event) => {
    //prevent button from submitting form
    event.preventDefault()
    //creating todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todoDiv")
    //creating LI
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    saveLocalTodos(todoInput.value)
    //create complete button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = "<i class='fas fa-check'></i>"
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton)
    //creating delete button
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>"
    deleteButton.classList.add("delete-btn")
    todoDiv.appendChild(deleteButton)
    //append todoDiv to UL
    todoList.appendChild(todoDiv)
    todoInput.value = ""
} 

//creating delete and complete function
const deleteComplete = (event) => {
    const item = event.target;
    //console.log(item)
    if (item.classList.contains("delete-btn")) {
        const todo = item.parentElement; //div
        todo.classList.add("fall") //fall
        todo.addEventListener("transitionend", () => {
            removeLocalTodos(todo) //run func
        })
    } else if (item.classList.contains("completed-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//creating filter option func
const filterTodo = (event) => {
    const todos = todoList.childNodes; //all DIVs inside UL
    todos.forEach(function(todo){
        console.log(event.target.value)
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
        }
    })
}

const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todoDiv")
        //creating LI
        const newTodo = document.createElement("li")
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)
        //create complete button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = "<i class='fas fa-check'></i>"
        completedButton.classList.add("completed-btn")
        todoDiv.appendChild(completedButton)
        //creating delete button
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>"
        deleteButton.classList.add("delete-btn")
        todoDiv.appendChild(deleteButton)
        //append todoDiv to UL
        todoList.appendChild(todoDiv)
    })
}

const removeLocalTodos = (todo) => {
    //splice(startIndex, deleteCount)
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const text = todo.children[0].innerText
    const index = todos.indexOf(text)
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}
//event-listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteComplete)
filterOption.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", getTodos)