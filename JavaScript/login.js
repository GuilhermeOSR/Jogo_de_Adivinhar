
const regras = document.querySelector('.Caixaregras')

// Escolher Nick dos Jogadores
function nicks() {
    const p1 = document.getElementById("player1");
    document.getElementById("player1Name").innerHTML = p1.value;

    const p2 = document.getElementById("player2");
    document.getElementById("player2Name").innerHTML = p2.value;

}

//Começa o jogo quando todos os jogadores colocarem seus apelidos
function startGame() {
    const empty = "";
    const n = 1;
    const p1 = document.getElementById("player1");
    const p2 = document.getElementById("player2");

    const popup = document.getElementById("popup");
   if(p1.value == empty & p2.value == empty) {
    alert("Insira um apelido!");
   }
   else if(p1.value == empty & p2.value > empty || p1.value > empty & p2.value == empty) {
    alert("Está faltando inserir um apelido!")
   }
   else if(p1.value > empty  & p2.value > empty) {
    const tab = document.getElementById("tabuleiro");
    tab.classList.remove("blurs");
    popup.classList.add("esconder"); 
    carregarJogo(); //Carrega o jogo e as cartas
    regras.classList.remove('desabilitar')
    nicks(); //Executa a função de definir os apelidos
   
   }


}


