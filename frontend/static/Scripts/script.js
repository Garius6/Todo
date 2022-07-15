let cards = []
let timerId = setInterval(() => get(), 1000)
timerId
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000)
//function add_window() {
//  const add = document.querySelector('.add')
//  add.classList.remove("deactive")
//}
//
//function close_window() {
//  const add = document.querySelector('.add')
//  add.classList.add("deactive")
//}
//
//function add_card() {
//  let card = {
//    title: document.querySelector('.input_title').value,
//    description: document.querySelector('.input_title').value,
//    status: 't'
//  }
//    post(card)
//
//  const add = document.querySelector('.add')
//  add.classList.add("deactive")
//}
//
//async function post(card) {
//  let response = await fetch('/api/todo', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json;charset=utf-8'
//    },
//      body: JSON.stringify(card)
//  })
//  
//  if (!response.ok) {
//    throw new Error('Ответ сети был не ok.');
//  }
//}
async function get() {
  fetch('/api/todo')
    .then((response) => {
        
        if (!response.ok) {
            throw new Error('Ответ сети был не ok.');
        }
        return response.json();
    })
    
    
    
    .then((data) => {
        let newCards = []
        console.log(cards)
        for (card in data) {
            let isUnique = true
            for (oldCard in cards) {
                if (data[card].id === cards[oldCard].id) {
                    isUnique = false
                }
            }
            
            if (isUnique) {
                newCards.push(data[card])
            }

        }
     newCards.forEach(element => {
           let new__card = document.querySelector('.new__card')
           let carddd = document.createElement('div')
           carddd.classList.add("card")
           carddd.setAttribute("draggable", "true")
           new__card.prepend(carddd)
           carddd.innerHTML = element.title     
        })
        cards = cards.concat(newCards)
        
    })
}