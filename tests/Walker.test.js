const Walker = require("../src/application/Walker");

describe("Walker tests", () => {
  it("Quando chamar walker passando uma pasta, para cada arquivo deve chamar um callback", async () => {
    const callback = jest.fn();
    const walker = new Walker("./tests/testFolder/src", callback);
    await walker.walk();
    expect(callback).toHaveBeenCalledTimes(56);
  });
});
