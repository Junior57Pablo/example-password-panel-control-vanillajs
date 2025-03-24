const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let senhaAtual = 0;

server.on('connection', (ws) => {
    console.log('Novo cliente conectado');
    ws.send(JSON.stringify({ senha: senhaAtual })); // Envia a senha atual ao novo cliente

    ws.on('message', (message) => {
        // Converte a mensagem de Buffer para string
        const msg = message.toString();
        console.log("passou aqui: ", msg); // Agora você verá a mensagem como string

        if (msg === 'chamar_senha') {
            senhaAtual++; // Incrementa a senha
            const data = JSON.stringify({ senha: senhaAtual });
            // Envia a nova senha para todos os clientes conectados
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });

    ws.on('error', (error) => {
        console.error('Erro no WebSocket do cliente:', error);
    });
});

console.log('Servidor WebSocket rodando na porta 8080');
