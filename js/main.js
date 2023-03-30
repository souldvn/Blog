const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks =[]




form.addEventListener('submit', submitHundler)

function submitHundler(event){
    event.preventDefault()
    

    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    tasks.push(newTask)

    console.log(tasks);

    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title'

    const taskHTML =  `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`

tasksList.insertAdjacentHTML('beforeend', taskHTML)

taskInput.value = ''

taskInput.focus()

if(tasksList.children.length > 1){
    emptyList.classList.add('none')
}



}

tasksList.addEventListener('click', deleteTask)

function deleteTask(event){
    if(event.target.dataset.action === 'delete'){
        const parentNode = event.target.closest('.list-group-item')

        const id = Number(parentNode.id)
        
        const index = tasks.findIndex((tasks) => tasks.id === id)

        
        tasks.splice(index, 1)


        parentNode.remove()


        if(tasksList.children.length === 1){
        emptyList.classList.remove('none')
    }
    }



}

tasksList.addEventListener('click', doneTask)

function doneTask(event){
    if (event.target.dataset.action === 'done'){
        const parentNode = event.target.closest('.list-group-item')
        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
    }

}


