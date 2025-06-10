let user = "X";
let bot = "O"
let plays = 0

const marcarQuadrado = (id) => {
    let box = document.getElementById(id)
    if (!box.classList.contains('selected')) {
        plays = plays + 1
        box.classList.add('selected')
        box.innerHTML = `<span>${plays % 2 == 0 ? bot : user}</span>`
    }
    return;
}