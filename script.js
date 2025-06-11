let box1 = document.getElementById('1');
let box2 = document.getElementById('2');
let box3 = document.getElementById('3');
let box4 = document.getElementById('4');
let box5 = document.getElementById('5');
let box6 = document.getElementById('6');
let box7 = document.getElementById('7');
let box8 = document.getElementById('8');
let box9 = document.getElementById('9');

const winConditions = [
    [box1, box2, box3],
    [box4, box5, box6],
    [box7, box8, box9],
    [box1, box4, box7],
    [box2, box5, box8],
    [box3, box6, box9],
    [box1, box5, box9],
    [box3, box5, box7]
];

let user = "X";
let bot = "O"
let plays = 0
let userSelecteds = [];
let botSelecteds = [];

const verificarVitoria = (array) => {
    return winConditions.some(condition => {
        return condition.every(box => array.includes(box.id));
    });
};

const marcarQuadrado = (id) => {
    let box = document.getElementById(id)
    if (plays % 2 == 0) {
        if (!box.classList.contains('selected-user' && 'selected-bot')) {
            plays = plays + 1
            box.classList.add('selected-user')
            box.innerHTML = `<span>${user}</span>`
            userSelecteds.push(id);
            if (verificarVitoria(userSelecteds)){
                alert("Usuário venceu!");
                return;
            }
        }
        return;
    } else {
        if (!box.classList.contains('selected-bot' && 'selected-user')) {
            plays = plays + 1
            box.classList.add('selected-bot')
            box.innerHTML = `<span>${bot}</span>`
            botSelecteds.push(id);
            if (verificarVitoria(botSelecteds)){
                alert("Bot venceu!");
                return;
            }
        }
        return;
    }
}