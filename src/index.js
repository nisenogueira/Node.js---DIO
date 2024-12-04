const player1 = {
    NOME: "Mario", // Nome do jogador 1
    VELOCIDADE: 4, // Atributo de velocidade do jogador 1
    MANOBRABILIDADE: 3, // Atributo de manobrabilidade do jogador 1
    PODER: 3, // Atributo de poder do jogador 1
    PONTOS: 0, // Pontos acumulados pelo jogador 1
}

const player2 = {
    NOME: "Luigi", // Nome do jogador 2
    VELOCIDADE: 3, // Atributo de velocidade do jogador 2
    MANOBRABILIDADE: 4, // Atributo de manobrabilidade do jogador 2
    PODER: 4, // Atributo de poder do jogador 2
    PONTOS: 0, // Pontos acumulados pelo jogador 2    
}

// Função assíncrona para rolar um dado e retornar um número entre 1 e 6
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

// Função assíncrona para obter um bloco aleatório (RETA, CURVA ou CONFRONTO)
async function getRandomBlock() {
    let random = Math.random(); // Gera um número aleatório entre 0 e 1
    let result;

    // Define o tipo de bloco com base no número aleatório
    switch (true) {
        case random < 0.33:
            result = "RETA"; // Bloco RETA
            break;
        case random < 0.66:
            result = "CURVA"; // Bloco CURVA
            break;
        default:
            result = "CONFRONTO"; // Bloco CONFRONTO
    }
    return result; // Retorna o bloco sorteado
}

// Função assíncrona para registrar o resultado do lançamento do dado
async function logRollResult(characterName, block, diceResult, attribute)
{    
    console.log(
        `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
            diceResult + attribute
        }`
    ); // Exibe o resultado da rolagem
}

// Função assíncrona que simula o motor da corrida entre dois personagens
async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) { // Loop para 5 rodadas
        console.log(`🏁 Rodada  ${round}`);
        
        // Sorteia um bloco para a rodada
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // Rola os dados para ambos os personagens
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Variáveis para armazenar o total de testes de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        // Teste de habilidade baseado no tipo de bloco sorteado
        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE; // Cálculo para o jogador 1
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE; // Cálculo para o jogador 2

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE; // Cálculo para o jogador 1
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE; // Cálculo para o jogador 2

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }   

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER; // Cálculo de poder para o jogador 1
            let powerResult2 = diceResult2 + character2.PODER; // Cálculo de poder para o jogador 2

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            // Verifica quem venceu o confronto
            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢 `);
                character2.PONTOS--; // Reduz os pontos do jogador 2
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢 `);
                character1.PONTOS--; // Reduz os pontos do jogador 1
            }

            console.log(powerResult2 === powerResult1 
                ? "Confronto empatado! Nenhum ponto foi perdido."
                : ""
            );
        }

        // Verifica o vencedor da rodada com base no total de habilidades
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++; // Aumenta os pontos do jogador 1
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++; // Aumenta os pontos do jogador 2
        }
    
        console.log("---------------------");
    } // Fim do loop for
}

// Função assíncrona para declarar o vencedor após a corrida
async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    // Compara os pontos para determinar o vencedor
    if (character1.PONTOS > character2.PONTOS)
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    else if(character2.PONTOS > character1.PONTOS)
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    else console.log("A corrida terminou em empate!");
}

// Função principal que inicia a corrida
(async function main(){
    console.log(`🏁 🚥 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    
    await playRaceEngine(player1, player2); // Inicia o motor da corrida
    await declareWinner(player1, player2); // Declara o vencedor
})();
