const fs = require("fs");

/**
 * @class Walker
 * @description Essa function eh responsavel por caminhar pelos arquivos de uma pasta e executar uma funcao de callback para cada arquivo encontrado.
 * @param {String} path - Caminho da pasta a ser caminhada.
 * @param {Function} callback - Funcao de callback a ser executada para cada arquivo encontrado.
 */
class Walker {
  constructor(path, callback) {
    this.path = path;
    this.allDirectories = [];
    this.callback = callback;
  }

  async walk() {
    await this.#mapDirectories();
    let directory = this.#getDirectory();
    while (directory) {
      await this.#walkInDirectory(directory.path);
      this.#checkDirectory(directory.path);
      directory = this.#getDirectory();
    }
  }

  async #mapDirectories() {
    await new Promise((resolve, reject) => {
      fs.readdir(this.path, (err, files) => {
        if (err) {
          console.error(`[${this.path}] -- Erro ao ler o diretorio\n` + err);
          reject();
        } else {
          files.forEach((file) => {
            const newPath = this.path + "/" + file;
            const stat = fs.statSync(newPath);
            if (stat.isDirectory()) {
              this.#addDirectory(newPath);
            } else {
              this.callback(newPath);
            }
          });
          resolve();
        }
      });
    });
  }

  #checkDirectory(path) {
    this.allDirectories.forEach((directory) => {
      if (directory.path === path) {
        directory.checked = true;
      }
    });
  }

  #getDirectory() {
    const directory = this.allDirectories.find((directory) => {
      return directory.checked === false;
    });
    return directory;
  }

  async #walkInDirectory(path) {
    await new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          console.error(`[${path}] -- Erro ao ler o diretorio\n` + err);
          reject();
        } else {
          files.forEach((file) => {
            const newPath = path + "/" + file;
            const stat = fs.statSync(newPath);
            if (stat.isDirectory()) {
              this.#addDirectory(newPath);
            } else {
              this.callback(newPath);
            }
          });
          resolve();
        }
      });
    });
  }

  async #addDirectory(path) {
    this.allDirectories.push({ path: path, checked: false });
  }
}

module.exports = Walker;
