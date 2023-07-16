/**
 * @typedef {Object} Message
 * @property {String} role - Papel da mensagem.
 * @property {String} content - Conteudo da mensagem.
 */

class AIMessage {
  #systemMessage = `
  You will receive a piece of code, identify the programming language and correct the code following these instructions:
  1. If you find a potential error, add a comment to the line above the potential error, with the following syntax: //TODO: <message>.
  2. You should strictly follow the principles of clean code.
  3. Return only the corrected code.
  4. If you cannot identify the programming language, return the message "NO_FIXES".
  5. If there are no corrections to be made, return the message "NO_FIXES".
  6. If the code is correct, return the message "NO_FIXES".
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
