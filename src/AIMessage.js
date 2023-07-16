/**
 * @typedef {Object} Message
 * @property {String} role - Papel da mensagem.
 * @property {String} content - Conteudo da mensagem.
 */

class AIMessage {
  #systemMessage = `
        Voce recebera um codigo, identifique a linguagem de programacao e corrija o codigo seguindo as seguintes instrucoes:
        1. O codigo deve ser identado corretamente.
        2. Caso encontrar um possivel erro adicione um comentario a linha acima do possivel erro com um TODO para que o usuario possa corrigir.
        3. Voce deve seguir os principios de clean code a risca.
        4. Voce deve seguir as boas praticas de programacao a risca.
        5. Voce deve seguir as boas praticas de orientacao a objetos a risca.
        OBS: Retorne apenas o codigo corrigido.
        OBS: Caso nao consiga identificar a linguagem de programacao retorne a mensagem "NO_FIXES".
        OBS: Caso nao ha correcoes a serem feitas retorne a mensagem "NO_FIXES".
    `;
  #userMessage;

  /**
   * @constructor AIMessage
   * @param {String} userMessage - Mensagem do usuario.
   */
  constructor(userMessage) {
    this.#userMessage = userMessage;
  }

  /**
   * @method messages
   * @description Metodo responsavel por retornar as mensagens.
   * @returns {Array<Message>} Retorna um array de mensagens.
   */
  get messages() {
    return [
      {
        role: "system",
        content: this.#systemMessage,
      },
      {
        role: "user",
        content: this.#userMessage,
      },
    ];
  }
}

module.exports = AIMessage;