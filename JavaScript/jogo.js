

//constantes
const grid = document.querySelector(".grid");
const player1Name = document.getElementById('player1Name');
const player2Name = document.getElementById('player2Name');
const pontos = document.getElementById('pontos');
const pontos2 = document.getElementById('pontos2');
const p1 = document.querySelector('.cartafixa');
const teste = document.querySelector('.test');
const pwin = document.getElementById('playerWin');



//Inserir os dados das cartas
let primeiroCard = '';
let segundoCard = '';



//Define o design para informar quando for a vez do jogador, seu nome vai fica branco.
player1Name.style.color = "white";



//Cria a Array das 5 cartas
const personagens = [
    'Sonic',
    'Tails',
    'Knuckles',
    'Amy',
    'Shadow',
];

//Cria a Array da carta fixa
const fixo = [
    'Sonic',
    'Tails',
    'Knuckles',
    'Amy',
    'Shadow',

];


//Cria elemento com tag e classe
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
   
}

//Aqui temos as variaveis que definem os pontos, as tentativas e a vez de cada jogador, true player 1 e false player 2
var pontos_jog1 = 0;
var pontos_jog2 = 0;
var rodada = 3;
let tentativas = 3;
let vez = true;





//------------------------------------------- COMECA AS CONST ------------------------







/*Cria O VISUAL das cartas que vão ficar viradas para baixo,
 const front parte da carta com a imagem, 
 e back as costas da carta. */
const criarCarta = (personagem) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front ");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url('./imgs/Cartas/${personagem}.png')`;

    card.appendChild(front);
    card.appendChild(back);
   
    card.addEventListener('click', virarCartas);
    card.setAttribute('data-personagem', personagem);

    return card;

}


//------------------------------------------------------------------------------------------------------------






/* Cria O VISUAL da carta fixa que ira fica sempre virada para cima portanto:
Ela nao precisa de uma div para as costas da carta;
Ela tambem nao e clicavel.*/
const criarCartaFixa = (fixar) => {
    const cardfix = createElement("div", "card");
    const front = createElement("div", "face front test");

    front.style.backgroundImage = `url('./imgs/Cartas/${fixar}.png')`;
    cardfix.appendChild(front);

    cardfix.classList.add("revelar-carta");
    cardfix.classList.add("cartafixa");
    cardfix.setAttribute('data-personagem', fixar);
   
    return cardfix;
}
//------------------------------------------------------------------------------------------------------------







/* Aqui eu criei a carta fixa, randomizando e chamando a const com o visual da carta que é a criarCartaFixa()
E depois de randomizar o personagem, eu coloco ele dentro na criarCartaFixa()*/

const carregarCartaFixa = () => {
   
    const duplicarPersonagens2 = [...fixo];
    const embaralharCarta = duplicarPersonagens2.sort(() => Math.random());
  
    console.log(embaralharCarta);

    var count = embaralharCarta[Math.floor(Math.random()*embaralharCarta.length)];

    const cardfix = criarCartaFixa(count);
    p1.appendChild(cardfix);
    console.log(count);
    primeiroCard = cardfix;
  
} 
//------------------------------------------------------------------------------------------------------------







/* Aqui literalmente o jogo comeca, eu crio as 5 cartas seguindo a mesma logica da carta fixa,
porem aqui eu tenho que colocar "para cada" o forEach,  se nao ele criaria so 1, mas eu 
preciso das 5, e por ultimo chamo a carta fixa que foi criada a cima*/
const carregarJogo = () => {

    const criarPersonagens = [...personagens];
    const embararlharArray = criarPersonagens.sort(() => Math.random());
    

    embararlharArray.forEach((personagem) => {
        const card = criarCarta(personagem);
        grid.appendChild(card);
        console.log(card);

    })

    //Carrega a carta fixa que já foi criada
    carregarCartaFixa();
    
}
//------------------------------------------------------------------------------------------------------------








/* Aqui toda vez que mudar a vez do jogador esse codigo e chamado
ou seja, quando o jogador acerta, 
ou quando as suas tentativas chegam a 0
Ele re-embaralha as 5 cartas*/
const embaralhar = () => {
    
    const duplicarPersonagens = [...personagens];
    const embaralhardArray2 = duplicarPersonagens.sort(() => Math.random() - 0.5);
    
    //esse codigo apaga todas as divs dentro da div grid e depois cria tudo de novo
    grid.replaceChildren();

    embaralhardArray2.forEach((personagem) => {
        const card = criarCarta(personagem);
        grid.appendChild(card);
        
        console.log(card);
   
       
  
    });

}

//------------------------------------------------------------------------------------------------------------








/* A mesma coisa do código a cima, só que para a carta fixa
 toda vez que mudar a vez do jogador esse codigo e chamado
ou seja, quando o jogador acerta, 
ou quando as suas tentativas chegam a 0*/

const embaralharFixa = () => {
        const duplicarPersonagens2 = [...fixo];
        const embaralharCarta2 = duplicarPersonagens2.sort(() => Math.random());
    

        console.log(embaralharCarta2);


        var count = embaralharCarta2[Math.floor(Math.random()*embaralharCarta2.length)];
        
            const cardfix = criarCartaFixa(count);
            p1.replaceChild(cardfix, p1.childNodes[1]);
  
            console.log(count);
            primeiroCard = cardfix;
            carta1 = primeiroCard.getAttribute('data-personagem');
           
           
            console.log("esse" + count);
    }


//----------------------------------------------COMECA AS VALIDACAO DO JOGO--------------------------------------------------

    
const checarCartas = () => {
    carta1 = primeiroCard.getAttribute('data-personagem');
    carta2 = segundoCard.getAttribute('data-personagem');

    //Se são iguais 
    if(carta1 === carta2) {
        
    //Jogador 1
        if(tentativas === 3 & vez === true ) {
            pontos_jog1 += 3; //Atribui o valor aos pontos do primeiro jogador
            pontos.innerHTML = `Pontos: ${pontos_jog1}` //Define os pontos na interface
            vez = false;
            tentativas = 3;
            player2Name.style.color = "white";
            player1Name.style.color = "black";
            
        
        } else if(tentativas === 3 & vez === false) {
            pontos_jog2 += 3;
            pontos2.innerHTML = `Pontos: ${pontos_jog2}`;
            vez = true;
            player2Name.style.color = "black";
            player1Name.style.color = "white";
            tentativas = 3;
            rodada -= 1;
            
        } else if(tentativas === 2 & vez === true) {
            pontos_jog1 += 2;
            pontos.innerHTML = `Pontos: ${pontos_jog1}`;
            vez = false;
            player2Name.style.color = "white";
            player1Name.style.color = "black";
            tentativas = 3;
            
        } else if(tentativas === 2 & vez === false) {
            pontos_jog2 += 2;
            pontos2.innerHTML = `Pontos: ${pontos_jog2}`;
            vez = true;
            player2Name.style.color = "black";
            player1Name.style.color = "white";
            tentativas = 3;
            rodada -= 1;
        } else if(tentativas === 1 & vez === true) {
            pontos_jog1 += 1;
            pontos.innerHTML = `Pontos: ${pontos_jog1}`;
            vez = false;
            player2Name.style.color = "white";
            player1Name.style.color = "black";
            tentativas = 3;
            
          
        } else if(tentativas === 1 & vez === false) {
            pontos_jog2 += 1;
            pontos2.innerHTML = `Pontos: ${pontos_jog2}`;
            vez = true;
            player2Name.style.color = "black";
            player1Name.style.color = "white";
            tentativas = 3;
            rodada -= 1;
        
   
    }
                
        setTimeout(() => {
            segundoCard.classList.remove("revelar-card");
            segundoCard = '';
            carta2 = '';
            embaralharFixa();
            embaralhar();
            checarFimdeJogo();
            
        
    }, 1000);

    
      
}

// Se são diferentes
    else {

 

       if(tentativas === 3 & vez === true) {
            tentativas = 2;
            player1Name.style.color = "white";
            player2Name.style.color = "black";
       } else if(tentativas === 2 & vez === true) {
            tentativas = 1;
            player1Name.style.color = "white";
            player2Name.style.color = "black";

       } else if(tentativas === 1 & vez === true) {
            tentativas = 3;
            vez = false;
            player1Name.style.color = "black";
            player2Name.style.color = "white";
            rodada -= 1;
            setTimeout(() => {
                embaralharFixa();
                embaralhar();
                checarFimdeJogo();
               
                }, 500)
       }//jogador 2
       else if(tentativas === 3 & vez === false) {
            tentativas = 2;
            player1Name.style.color = "black";
            player2Name.style.color = "white";

       } else if(tentativas === 2 & vez === false) {
            tentativas = 1;
            player1Name.style.color = "black";
            player2Name.style.color = "white";
       } else if(tentativas === 1 & vez === false) {
            tentativas = 3;
            vez = true;
            player1Name.style.color = "white";
            player2Name.style.color = "black";
            rodada -= 1;
            setTimeout(() => {
                embaralharFixa();
                embaralhar();
                checarFimdeJogo();
               
                }, 500)

         

       }

       setTimeout(() => {
        segundoCard.classList.remove("revelar-card");

        segundoCard = '';
        console.log("cartas viradas");
       
       
        }, 1000)
    }

    
}
  

//Vira a segunda carta
const virarCartas = ({target}) => {

    if(segundoCard == '') {
        target.parentNode.classList.add('revelar-card');
        segundoCard = target.parentNode;
    }

    

    checarCartas();

}

//Fim de Jogo - função
const checarFimdeJogo = () => {
   
    let p1 = document.getElementById('player1Name').textContent;
    let p2 = document.getElementById('player2Name').textContent;
    
    const regras = document.querySelector('.Caixaregras');
    const tab = document.getElementById("tabuleiro"); 
   

    const popup2 = document.getElementById("popup2");
    if(rodada === 0 & pontos_jog1 > pontos_jog2) {
        clearInterval(this.loop); 
        popup2.classList.remove('esconder'); //Mostra a tela de Fim de jogo
        regras.classList.add('desabilitar'); //Desabilita o botão de regras
        grid.classList.add('desabilitar'); //Desabilita continuar jogando
        tab.classList.add('blurs'); //Adiciona o blur no fundo da tela
        pwin.innerHTML = `<br><br><h3>${p1}</h2><br><p>Ganhou com ${pontos_jog1} pontos!</p><br><br>`;
    } else if(rodada === 0 & pontos_jog2 > pontos_jog1) {
        clearInterval(this.loop);
        pwin.innerHTML = `<br><br><h3>${p2}</h2><br><p>Ganhou com ${pontos_jog2} pontos!</p><br><br>`;
        regras.classList.add('desabilitar');
        grid.classList.add('desabilitar');
        tab.classList.add('blurs');
        popup2.classList.remove('esconder');
    } else if(rodada === 0 & pontos_jog1 === pontos_jog2) {
        clearInterval(this.loop);
        grid.classList.add('desabilitar');
        regras.classList.add('desabilitar');
        tab.classList.add('blurs');
        popup2.classList.remove('esconder');
        pwin.innerHTML = `<br><br><h2>${p1} e ${p2}</h3><br><p>Houve um empate! <br> ${pontos_jog1} a ${pontos_jog2} pontos!</p><br><br>`
    }
}

