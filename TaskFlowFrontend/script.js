// Shared script for login, register, and todos pages
const SERVER_URL = "http://localhost:8080";
const token = localStorage.getItem("token");

// Login page logic
// function login() 
// {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     fetch(`${SERVER_URL}/auth/register`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({email, password})
//     })
//     .then(response => {
//         if(!response.ok)
//         {
//             throw new Error(data.message || "Login failed")
//         }
//         return response.json();
//     })
//     .then(data => {
//         localStorage.setItem("token", data.token);
//         window.location.href = "todos.html"
//     })
//     .catch(error => {
//         alert(error.message);
//     })
// }

function login() 
{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })
    .then(response => response.json().then(data => {
        if (!response.ok) {
            throw new Error(data || "Login failed");
        }
        return data;
    }))
    .then(data => {
        localStorage.setItem("token", data.token);
        window.location.href = "todos.html";
    })
    .catch(error => {
        alert(error.message);
    });
}


// Register page logic
function register() 
{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })
    .then(response => {
        if(response.ok)
        {
            alert("Registration successful! Please log in.");
            window.location.href = "login.html"
        }
        else
        {
            return response.json().then(data => { throw new Error(data.message || "Registration failed")
                
            });
        }
    }).catch(error => {
        alert(error.message);
    })
}

// Todos page logic
function createTodoCard(todo)
{
    const card = document.createElement("div");
    card.className = "todo-card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener("change", function() {
        const updatedTodo = {...todo, isCompleted: checkbox.checked}
        updateTodoStatus(updatedTodo);
    });

    const span = document.createElement("span");
    span.textContent = todo.title;

    if(todo.isCompleted)
    {
        span.style.textDecoration = "line-through";
        span.style.color = "#aaa";
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.onclick = function() {
        deleteTodo(todo.id);
    };

    card.appendChild(checkbox);
    card.appendChild(span);
    card.appendChild(deleteButton);

    return card;
}

// function loadTodos() 
// {
//     if(!token)
//     {
//         alert("Please Login and try again");
//         window.location.href("login.html");
//         return;
//     }

//     fetch(`${SERVER_URL}/todo`, {
//         method: "GET",
//         headers: {Authorization: `Bearer ${token}`},
//     })
//     .then(response => {
//         if(!response.ok)
//         {
//             throw new Error(data.message || "Failed to get Todos")
//         }
//         return response.json();
//     })
//     .then((newTodo) => 
//         {
//             const todoList = document.getElementById("todo-list");
//             todoList.innerHTML = "";

//             if(!todos || todos.length === 0)
//             {
//                 todoList.innerHTML = `<p id="empty-message" No Todos yet. Addone below </p>`;
//             }
//             else{
//                 todos.forEach(todo => {
//                     todoList.innerHTML.appendChild(createTodoCard(todo));
//                 });
//             }
//         })
//     .catch(error => {
//         alert(error.message);
//         document.getElementById("todo-list").innerHTML = `<p style = "color:red"Failed to Load Todos </p>`;
//     })
// }

function loadTodos() 
{
    if (!token) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    fetch(`${SERVER_URL}/todo`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.json().then(data => {
        if (!response.ok) {
            throw new Error(data || "Failed to load tasks");
        }
        return data;
    }))
    .then(todos => {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";

        if (!todos || todos.length === 0) {
            todoList.innerHTML = `<p id="empty-message">No tasks yet. Add one below</p>`;
        } else {
            todos.forEach(todo => {
                todoList.appendChild(createTodoCard(todo));
            });
        }
    })
    .catch(error => {
        alert(error.message);
        document.getElementById("todo-list").innerHTML =
            `<p style="color:red">Failed to Load tasks</p>`;
    });
}


function addTodo() 
{
    const input = document.getElementById("new-todo").value;
    const todoText = input.trim();

    fetch(`${SERVER_URL}/todo/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({title: todoText, isCompleted: false})
    })
    .then(response => {
        if(!response.ok)
        {
            throw new Error(data.message || "Failed to add task")
        }
        return response.json();
    })
    .then((newTodo) => 
        {
            input.value = "";
            loadTodos();
        })
    .catch(error => {
        alert(error.message);
    })
}

function updateTodoStatus(todo) 
{
    fetch(`${SERVER_URL}/todo`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    })
    .then(response => {
        if(!response.ok)
        {
            throw new Error(data.message || "Failed to update task")
        }
        return response.json();
    })
    .then(() => loadTodos())
    .catch(error => {
        alert(error.message);
    })
}

function deleteTodo(id) 
{
    fetch(`${SERVER_URL}/todo/${id}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${token}`},
    })
    .then(response => {
        if(!response.ok)
        {
            throw new Error(data.message || "Failed to delete task")
        }
        return response.text();
    })
    .then(() => loadTodos())
    .catch(error => {
        alert(error.message);
    })
}

// Page-specific initializations
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("todo-list")) {
        loadTodos();
    }
});
