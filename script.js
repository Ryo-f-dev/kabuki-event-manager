let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { text: "会場予約", done: true },
  { text: "市役所へ後援申請", done: true },
  { text: "校長先生への挨拶", done: true },
  { text: "歌舞伎役者との打ち合わせ", done: false },
  { text: "最終打ち合わせ", done: false },
  { text: "後輩への引継ぎ", done: false },
];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.onchange = function () {
      tasks[index].done = checkbox.checked;
      saveTasks();
    };

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.onclick = function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({
    text: text,
    done: false
  });

  saveTasks();
  renderTasks();

  input.value = "";
}

renderTasks();

function logout() {
  localStorage.removeItem("isLoggedIn");
  location.href = "login.html";
}
