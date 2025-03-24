const socket = new WebSocket('ws://localhost:8080'); // Criação da conexão WebSocket

const statusElement = document.getElementById('statusWebSocket'); // Elemento para exibir o status da conexão WebSocket

socket.onopen = () => {
    console.log("Conexão WebSocket estabelecida.");
    statusElement.innerText = "Status: Conectado"; // Atualiza para "Conectado"
    statusElement.style.color = "green";
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    document.getElementById('senhaAtual').innerText = `Senha Atual: ${data.senha}`; // Atualiza a senha atual
};

socket.onerror = (error) => {
    console.log("Erro no WebSocket: ", error);
    statusElement.innerText = "Status: Erro na Conexão"; // Atualiza para erro
    statusElement.style.color = "red";
};

socket.onclose = () => {
    console.log("Conexão WebSocket fechada.");
    statusElement.innerText = "Status: Desconectado"; // Atualiza para "Desconectado"
    statusElement.style.color = "red";
};

// Função chamada quando o botão "Chamar Próxima Senha" é pressionado
function chamarSenha() {
    // Verifica se a conexão WebSocket está aberta
    if (socket.readyState === WebSocket.OPEN) {
        console.log("Enviando comando para chamar próxima senha...");
        
        socket.send('chamar_senha'); // Envia a mensagem 'chamar_senha' para o servidor

        // Toca um som ao chamar a senha
        const audio = new Audio('beep.mp3'); // Certifique-se de ter o arquivo beep.mp3 no diretório
        audio.play().catch((error) => {
            console.error('Erro ao tocar o áudio:', error);
        });
    } else {
        console.error("WebSocket não está aberto.");
        statusElement.innerText = "Status: Falha ao Enviar (Desconectado)";
        statusElement.style.color = "orange";
    }
}
