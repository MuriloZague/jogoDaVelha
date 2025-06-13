const tipoJogo = document.getElementById('select')

let box1 = document.getElementById('1');
let box2 = document.getElementById('2');
let box3 = document.getElementById('3');
let box4 = document.getElementById('4');
let box5 = document.getElementById('5');
let box6 = document.getElementById('6');
let box7 = document.getElementById('7');
let box8 = document.getElementById('8');
let box9 = document.getElementById('9');

const boxes = [
    box1,
    box2,
    box3,
    box4,
    box5,
    box6,
    box7,
    box8,
    box9
];

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


tipoJogo.addEventListener("change", (e) => {
    const pagina = e.target.value;
    if(pagina){
        window.location.href = pagina
    }
})

const verificarVitoria = (array) => {
    return winConditions.some(condition => {
        return condition.every(box => array.includes(box.id));
    });
};

const marcarQuadrado = (id, isBot = false) => {
    let box = document.getElementById(id)

    if (box.classList.contains('selected-user') || box.classList.contains('selected-bot')){
        return;
    }

    if (!isBot){
        box.innerHTML = `<span>${user}</span>`
        box.classList.add('selected-user')
        userSelecteds.push(id);
        plays = plays + 1;
        if (verificarVitoria(userSelecteds)){
            setTimeout(() => alert('Usuário venceu!'), 100)
            document.querySelectorAll('.box').forEach(botao => {
                    botao.disabled = true;
                });
            return;
        }

        if (plays >= 9){
            setTimeout(() => alert('Empate!'), 100)
            document.querySelectorAll('.box').forEach(botao => {
                    botao.disabled = true;
                });
            return;
        }
        botJoga()
    } else {
        box.innerHTML = `<span>${bot}</span>`
        box.classList.add('selected-bot')
        botSelecteds.push(id);
        plays = plays + 1;
        if (verificarVitoria(botSelecteds)){
            setTimeout(() => alert('BOT venceu!'), 100)
            document.querySelectorAll('.box').forEach(botao => {
                    botao.disabled = true;
                });
            return;
        }
    }
}

const botJoga = () => {
    const available = boxes.filter(box =>
        !box.classList.contains('selected-user') &&
        !box.classList.contains('selected-bot')
    );

    if (available.length === 0){
        return;
    }
    
    winConditions.forEach((condition) => {
        const selected = condition.filter(id => botSelecteds.includes(id));
        const empty = condition.filter(id => !botSelecteds.includes(id) && !userSelecteds.includes(id));
        if (selected.length === 2 && empty.length === 1) {
            marcarQuadrado(empty[0], true);
            return;
        }
    });

    winConditions.forEach((condition) => {
        const selected = condition.filter(id => userSelecteds.includes(id));
        const empty = condition.filter(id => !botSelecteds.includes(id) && !userSelecteds.includes(id));
        if (selected.length === 2 && empty.length === 1) {
            marcarQuadrado(empty[0], true);
            return;
        }
    });


    if (!userSelecteds.includes('5') && !botSelecteds.includes('5')) {
        return marcarQuadrado('5', true);
    }

    const lados = ['2', '4', '6', '8'].filter(id => !userSelecteds.includes(id) && !botSelecteds.includes(id));
    if (lados.length > 0) {
        const escolhaLado = lados[Math.floor(Math.random() * lados.length)];
        return marcarQuadrado(escolhaLado, true);
    }

    const picos = ['3', '1', '9', '7'].filter(id => !userSelecteds.includes(id) && !botSelecteds.includes(id));
    if (picos.length > 0) {
        const escolhaPico = picos[Math.floor(Math.random() * picos.length)];
        return marcarQuadrado(escolhaPico, true);
    }
}