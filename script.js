// HTML Elements
const todoInput =
    document.getElementById("todoInput");

const todoDescription =
    document.getElementById("todoDescription");

const addBtn =
    document.getElementById("addBtn");

const todoList =
    document.getElementById("todoList");

const errorMessage =
    document.getElementById("errorMessage");

const emptyState =
    document.getElementById("emptyState");

const charCount =
    document.getElementById("charCount");


// Load from localStorage
let todos =
    JSON.parse(localStorage.getItem("todos"))
    || [];


// Display tasks on load
displayTodos();


// Character Counter
todoInput.addEventListener("input", () => {

    charCount.textContent =
        `${todoInput.value.length} / 50`;
});


// Add Task
addBtn.addEventListener("click", () => {

    // Values
    const task =
        todoInput.value.trim();

    const description =
        todoDescription.value.trim();

    // Empty Validation
    if (task === "") {

        errorMessage.textContent =
            "Task cannot be empty ❌";

        return;
    }

    // Max Length
    if (task.length > 50) {

        errorMessage.textContent =
            "Maximum 50 characters allowed ❌";

        return;
    }

    // Duplicate Validation
    const duplicate =
        todos.find(todo =>
            todo.name.toLowerCase() ===
            task.toLowerCase()
        );

    if (duplicate) {

        errorMessage.textContent =
            "Duplicate task not allowed ❌";

        return;
    }

    // Clear Error
    errorMessage.textContent = "";

    // Create Todo Object
    const todo = {

        name: task,

        description: description
    };

    // Add Task
    todos.push(todo);

    // Save
    saveTodos();

    // Refresh UI
    displayTodos();

    // Clear Fields
    todoInput.value = "";

    todoDescription.value = "";

    charCount.textContent = "0 / 50";
});


// Display Todos
function displayTodos() {

    // Clear UI
    todoList.innerHTML = "";

    // Empty State
    if (todos.length === 0) {

        emptyState.style.display = "block";
    }
    else {

        emptyState.style.display = "none";
    }

    // Loop
    todos.forEach((todo, index) => {

        // Create Card
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

        // Add to Screen
        todoList.appendChild(li);
    });
}


// Edit Todo
function editTodo(index) {

    const updatedTask =
        prompt(
            "Edit Task",
            todos[index].name
        );

    if (
        updatedTask === null ||
        updatedTask.trim() === ""
    ) {

        return;
    }

    // Update
    todos[index].name =
        updatedTask;

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

        todos.splice(index, 1);

        saveTodos();

        displayTodos();
    }
}


// Save Function
function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}