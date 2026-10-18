document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const columns = document.querySelectorAll('.column');
    
    // Load tasks from local storage or use empty array
    let tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];

    // Render tasks on load
    renderTasks();

    // Add new task
    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            const newTask = {
                id: Date.now().toString(),
                text: text,
                status: 'todo' // Default status
            };
            tasks.push(newTask);
            saveAndRender();
            taskInput.value = '';
        }
    });

    // Handle Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    function renderTasks() {
        // Clear all columns
        document.getElementById('todo-list').innerHTML = '';
        document.getElementById('in-progress-list').innerHTML = '';
        document.getElementById('done-list').innerHTML = '';

        tasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.classList.add('task');
            taskEl.setAttribute('draggable', 'true');
            taskEl.setAttribute('data-id', task.id);
            
            taskEl.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn" onclick="deleteTask('${task.id}')">×</button>
            `;

            // Drag Events
            taskEl.addEventListener('dragstart', () => {
                taskEl.classList.add('dragging');
            });

            taskEl.addEventListener('dragend', () => {
                taskEl.classList.remove('dragging');
                saveAndRender(); // Save new positions after drag ends
            });

            // Append to correct column
            const targetList = document.getElementById(`${task.status}-list`);
            if (targetList) {
                targetList.appendChild(taskEl);
            }
        });
    }

    // Expose delete function to global scope
    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveAndRender();
    };

    function saveAndRender() {
        localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Drag and Drop Logic for Columns
    columns.forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault(); // Necessary to allow dropping
            const draggable = document.querySelector('.dragging');
            const taskList = column.querySelector('.task-list');
            taskList.appendChild(draggable); // Visually move it immediately
        });

        column.addEventListener('drop', e => {
            const draggable = document.querySelector('.dragging');
            const taskId = draggable.getAttribute('data-id');
            const newStatus = column.getAttribute('data-status');
            
            // Update the task's status in our array
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex > -1) {
                tasks[taskIndex].status = newStatus;
            }
            saveAndRender();
        });
    });
});