/**
 * @typedef {Object} Message
 * @property {String} role - Papel da mensagem.
 * @property {String} content - Conteudo da mensagem.
 */

class AIMessage {
  #systemMessage = `You will receive a piece of code, identify the programming language and refactor the code following these instructions:\n`;
  #rules = [
    `Fix normal mistakes of the programming language detected.`,
    `If you find a potential error, add a comment to the line above the potential error, with the following syntax: //TODO: <message>.`,
    `You must strictly follow the principles of clean code.`,
    `Apply early returns.`,
    `Return only the corrected code.`,
    `If you cannot identify the programming language, return the message "NO_FIXES".`,
    `If there are no corrections to be made, return the message "NO_FIXES".`,
    `If the code is correct, return the message "NO_FIXES".`,
  ];
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
        content: this.#getSystemMessage(),
      },
      {
        role: "user",
        content: this.#userMessage,
      },
    ];
  }

  #getSystemMessage() {
    return this.#systemMessage.concat(
      this.#rules.map((rule, index) => `${index + 1}. ${rule}`).join("\n"),
    );
  }
}

module.exports = AIMessage;
