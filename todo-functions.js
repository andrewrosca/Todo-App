// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : [] 
    } catch (e) {
        []
    }

}



// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos)) // convert input to string
} 




 // Render application todos based on filters
 const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => { // returns array of items that match input
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed 
        return searchTextMatch && hideCompletedMatch
    })
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))
    
    console.log(filteredTodos)

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Remove a todo from the list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// 
const toggleTodo = (id, todo, checkBox) => {
    // find the index of the todo based on the id of the clicked checkbox
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    console.log(todoIndex)
    // if todo found will return 0 
    if (todoIndex > -1) {
        todo.completed = checkBox.checked
        console.log(todo.completed)
    }
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement('div')
    const checkBox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkBox.setAttribute('type', 'checkbox')
    todoElement.appendChild(checkBox)

    // set checkbox checked if todo completed
    checkBox.checked = todo.completed
    
    // toggle true or false on toggle 
    checkBox.addEventListener('click', () => {
        toggleTodo(todo.id, todo, checkBox)
        saveTodos(todos)
        renderTodos(todos, filters)
    }) 


    // Setup todo text
    todoText.textContent = todo.text
    todoElement.appendChild(todoText)
    // Setup the remove button 
    removeButton.textContent = 'x'
    todoElement.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters) 
    })

    return todoElement
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2') 
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}
