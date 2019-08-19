console.log(uuidv4())

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}





renderTodos(todos, filters)



document.querySelector('#search-text').addEventListener('input', function(e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#todo-form').addEventListener('submit', function(e) {
    e.preventDefault()
    const inputTodo = e.target.elements.enterTodo.value
    console.log('inputTodo' + inputTodo)
    todos.push({
        id: uuidv4(),
        text: inputTodo,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.enterTodo.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', function(e) {
    filters.hideCompleted = e.target.checked  // set 
    renderTodos(todos, filters)
})




// const todoTag = document.createElement('p')
// todoTag.textContent = function(

// const pTag = document.querySelectorAll('p') 
// pTag.forEach(function (p) {
//     if (p.textContent.includes('the')) {
//         p.remove()
//     }
// })

