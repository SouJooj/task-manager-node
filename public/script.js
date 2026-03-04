//busca tarefas | faz POST | DELETE | PUT |
const API_URL = 'http://localhost:3000/tasks';
const taskList = document.getElementById('taskList');
const form = document.getElementById('taskForm');
const taskCounter = document.getElementById('taskCounter');

async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  taskList.innerHTML = '';

  taskCounter.innerText = `Total: ${tasks.length} tarefa(s)`;

  tasks.forEach(task => {
    const li = document.createElement('li');

    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <input type="checkbox" 
          ${task.completed ? 'checked' : ''}
          onchange="toggleTask(${task.id}, ${task.completed}, '${task.title}', '${task.description}')">
        <span>${task.title} - ${task.description}</span>
      </div>
      <button onclick="deleteTask(${task.id})">Excluir</button>
    `;

    taskList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      completed: false
    })
  });

  form.reset();
  loadTasks();
});

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  loadTasks();
}

async function toggleTask(id, currentStatus, title, description) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      completed: !currentStatus
    })
  });

  loadTasks();
}

loadTasks();