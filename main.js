const btnAdd = document.querySelector(".btn-add")
const list = document.querySelector(".list")
const clearBtn = document.querySelector(".btnClear")
const doneBtn = document.querySelector(".btnDone")
const processBtn = document.querySelector(".btnProcess")
const showAllBtn = document.querySelector(".btnShowAll")

const todos = [
    {
        id: 1,
        content: "Go shopping",
        status: false
    },
    {
        id: 2,
        content: "Fly to the moon",
        status: false
    }
]

//action
clearBtn.addEventListener("click", function (e) {
    todos.length = 0
    renderTodo()
})
doneBtn.addEventListener("click", function (e) {
    const doneTodo = todos.filter(val => val.status)
    renderTodo(doneTodo)
})
processBtn.addEventListener("click", function (e) {
    const processTodo = todos.filter(val => !val.status)
    renderTodo(processTodo)
})
showAllBtn.addEventListener("click", function (e) {
    renderTodo(todos)
})
renderTodo(todos)

function renderTodo(todos) {
    const lis = document.querySelectorAll(".list li")
    for (let i = 0; i < lis.length; i++) {
        lis[i].remove();
    }
    todos.forEach(val => {
        const li = document.createElement('li')
        li.dataset.id = val.id
        if (val.status) {
            li.classList.add("checked")
        }
        li.innerHTML = `
            <input class="check" type="checkbox" ${val.status ? 'checked' : ''}>
            <span class="content">${val.content}</span>
            <span class="delete">x</span>
        `
        list.appendChild(li)
    })
}

//click check
document.addEventListener("click", function (e) {
    const target = e.target
    if (e.target.classList.contains("check")) {
        //lay data id
        const id = target.parentNode.dataset.id
        const currentIdx = todos.findIndex(val => val.id == id)
        todos[currentIdx].status = !todos[currentIdx].status
        //render 
        renderTodo(todos)
    }
    if (e.target.classList.contains("delete")) {
        //lay data id
        const id = target.parentNode.dataset.id
        const currentIdx = todos.findIndex(val => val.id == id)
        todos.pop(todos[currentIdx])
        //render 
        renderTodo(todos)
    }
})

function randomId() {
    const date = new Date()
    return date.getTime()
}

btnAdd.addEventListener('click', function (e) {
    e.preventDefault()
    const input = document.querySelector('.input-todo')
    if (input.value.trim()) {
        todos.push({
            id: randomId(),
            content: input.value,
            status: false
        })
    }
    input.value = ''
    renderTodo(todos)
})

