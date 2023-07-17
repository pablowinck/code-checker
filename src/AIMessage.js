/**
 * @typedef {Object} Message
 * @property {String} role - Role of the message.
 * @property {String} content - Content of the message.
 */

class AIMessage {
  #systemMessage = `You will receive a piece of code, identify the programming language and refactor the code following these instructions:\n`;
  #rules = [
    `Fix normal mistakes of the detected programming language.`,
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
   * @param {String} userMessage - User's message.
   */
  constructor(userMessage) {
    this.#userMessage = userMessage;
  }

  /**
   * @method messages
   * @description Method responsible for returning the messages.
   * @returns {Array<Message>} Returns an array of messages.
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
