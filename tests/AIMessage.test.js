const AIMessage = require("../src/AIMessage");

describe("AIMessage tests", () => {
  it("Quando chamar AIMessage.messages deve retornar um array de mensagens", () => {
    const message = new AIMessage("Mensagem do usuario");
    const messages = message.messages;
    expect(messages).toEqual([
      {
        role: "system",
        content: `You will receive a piece of code, identify the programming language and refactor the code following these instructions:
1. Fix normal mistakes of the programming language detected.
2. If you find a potential error, add a comment to the line above the potential error, with the following syntax: //TODO: <message>.
3. You must strictly follow the principles of clean code.
4. Apply early returns.
5. Return only the corrected code.
6. If you cannot identify the programming language, return the message "NO_FIXES".
7. If there are no corrections to be made, return the message "NO_FIXES".
8. If the code is correct, return the message "NO_FIXES".`,
      },
      {
        role: "user",
        content: "Mensagem do usuario",
      },
    ]);
  });
});
