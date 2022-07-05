const cards = document.querySelectorAll('.card')
const column__inners = document.querySelectorAll('.column__inner')

cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging')
    card.dataTransfer.effectAllowed = "copyMove"
  })

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging')
  })
})

column__inners.forEach(column__inner => {
  column__inner.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(column__inner, e.clientY)
    const card = document.querySelector('.dragging')
    if (afterElement == null) {
      column__inner.appendChild(card)
    } else {
      column__inner.insertBefore(card, afterElement)
    }
  })
})

function getDragAfterElement(column__inner, y) {
  const cardElements = [...column__inner.querySelectorAll('.card:not(.dragging)')]

  return cardElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function add_window() {
    const add = document.querySelector('.add')
    add.classList.remove("deactive")
}

function close_window() {
    const add = document.querySelector('.add')
    add.classList.add("deactive")
} 

function add_card() {
    let user = {
        title: document.querySelector('.input_title').value,
        description: document.querySelector('.input_title').value,
        status: 't'
    }
    post(user)
    const add = document.querySelector('.add')
    add.classList.add("deactive")
}

async function post(user) {
    let response = await fetch('C:\Users\Ahmed\Desktop\ToDoList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(user)
    })
}

//let url = '/todo';
//let response = await fetch(url);
//
//let commits = await response.json(); // читаем ответ в формате JSON
//
//alert(commits[0].author.login);