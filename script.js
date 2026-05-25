// Getting HTML elements
const todoInput = document.getElementById("todoInput");

const todoDescription = document.getElementById("todoDescription");

const addBtn = document.getElementById("addBtn");

const todoList = document.getElementById("todoList");

const errorMessage = document.getElementById("errorMessage");

const emptyState = document.getElementById("emptyState");

const charCount = document.getElementById("charCount");


// Load todos from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];


// Display todos when page loads
displayTodos();


// Character Counter
todoInput.addEventListener("input", () => {

    charCount.textContent =
        `${todoInput.value.length} / 50`;
});


// Add Task
addBtn.addEventListener("click", () => {

    // Getting values
    const todoText = todoInput.value.trim();

    const descriptionText =
        todoDescription.value.trim();

    // Empty validation
    if (todoText === "") {

        errorMessage.textContent =
            "Task cannot be empty ❌";

        return;
    }

    // Max length validation
    if (todoText.length > 50) {

        errorMessage.textContent =
            "Maximum 50 characters allowed ❌";

        return;
    }

    // Duplicate validation
    const duplicate = todos.find(todo =>
        todo.name.toLowerCase() ===
        todoText.toLowerCase()
    );

    if (duplicate) {

        errorMessage.textContent =
            "Duplicate task not allowed ❌";

        return;
    }

    // Clear error
    errorMessage.textContent = "";

    // Create object
    const todo = {

        name: todoText,

        description: descriptionText
    };

    // Add into array
    todos.push(todo);

    // Save data
    saveTodos();

    // Refresh UI
    displayTodos();

    // Clear inputs
    todoInput.value = "";

    todoDescription.value = "";

    charCount.textContent = "0 / 50";
});


// Display Todos
function displayTodos() {

    // Clear old list
    todoList.innerHTML = "";

    // Empty state
    if (todos.length === 0) {

        emptyState.style.display = "block";
    }
    else {

        emptyState.style.display = "none";
    }

    // Loop through todos
    todos.forEach((todo, index) => {

        // Create list item
        const li =
            document.createElement("li");

        li.innerHTML = `

            <div class="todo-title">
                ${todo.name}
            </div>

            <div class="todo-description">
                ${todo.description}
            </div>

            <div class="todo-buttons">

                <button class="edit-btn"
                    onclick="editTodo(${index})">
                    ✏ Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTodo(${index})">
                    🗑 Delete
                </button>

            </div>
        `;

        // Add into UI
        todoList.appendChild(li);
    });
}


// Edit Todo
function editTodo(index) {

    const updatedTask = prompt(
        "Edit task",
        todos[index].name
    );

    // Cancel
    if (updatedTask === null) {

        return;
    }

    // Empty validation
    if (updatedTask.trim() === "") {

        alert("Task cannot be empty");

        return;
    }

    // Update task
    todos[index].name = updatedTask;

    // Save
    saveTodos();

    // Refresh
    displayTodos();
}


// Delete Todo
function deleteTodo(index) {

    const confirmDelete =
        confirm("Delete this task?");

    if (confirmDelete) {

        // Remove task
        todos.splice(index, 1);

        // Save
        saveTodos();

        // Refresh UI
        displayTodos();
    }
}


// Save To Local Storage
function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}