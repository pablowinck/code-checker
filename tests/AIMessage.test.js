const AIMessage = require("../src/AIMessage");

describe("AIMessage tests", () => {
  it("Quando chamar AIMessage.messages deve retornar um array de mensagens", () => {
    const message = new AIMessage("Mensagem do usuario");
    const messages = message.messages;
    expect(messages[1]).toEqual({
      role: "user",
      content: "Mensagem do usuario",
    });
  });
});
