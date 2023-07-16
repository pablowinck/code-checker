const FileWalker = require("../src/FileWalker");

describe("Walker tests", () => {
  it("Quando chamar walker passando uma pasta, para cada arquivo deve chamar um callback", async () => {
    const callback = jest.fn();
    const quantityOfFiles = 56;
    const walker = new FileWalker("./tests/mock-project/src", callback);
    await walker.walk();
    expect(callback).toHaveBeenCalledTimes(quantityOfFiles);
  });
});
