const AIMessage = require('../src/AIMessage');

describe('AIMessage tests', () => {
    it('Quando chamar AIMessage.messages deve retornar um array de mensagens', () => {
        const message = new AIMessage('Mensagem do usuario');
        const messages = message.messages;
        expect(messages).toEqual([
            {
                role: 'system',
                content: '\n        Voce recebera um codigo, identifique a linguagem de programacao e corrija o codigo seguindo as seguintes instrucoes:\n        1. O codigo deve ser identado corretamente.\n        2. Caso encontrar um possivel erro adicione um comentario a linha acima do possivel erro com um TODO para que o usuario possa corrigir.\n        3. Voce deve seguir os principios de clean code a risca.\n        4. Voce deve seguir as boas praticas de programacao a risca.\n        5. Voce deve seguir as boas praticas de orientacao a objetos a risca.\n        OBS: Retorne apenas o codigo corrigido.\n    '
            },
            {
                role: 'user',
                content: 'Mensagem do usuario'
            }
        ]);
    });
});