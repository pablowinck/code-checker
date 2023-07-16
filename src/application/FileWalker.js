const fs = require("fs");

/**
 * @typedef {Object} Directory
 * @property {String} path - Caminho da pasta.
 * @property {Boolean} checked - Flag que indica se a pasta ja foi caminhada.
 */
/**
 * @class FileWalker
 * @description Essa classe eh responsavel por caminhar pelos arquivos de uma pasta e executar uma funcao de callback para cada arquivo encontrado.
 * @param {String} path - Caminho da pasta a ser caminhada.
 * @param {Function} callback - Funcao de callback a ser executada para cada arquivo encontrado.
 * @returns {FileWalker} Retorna uma instancia de FileWalker.
 */
class FileWalker {
  /**
   * @type {String} path
   * @description Caminho da pasta a ser caminhada.
   */
  #path;
  /**
   * @type {Array<Directory>} directories
   */
  #directories;
  /**
   * @type {Function} callback
   * @description Funcao de callback a ser executada para cada arquivo encontrado.
   * @param {String} path - Caminho do arquivo.
   * @returns {void}
   * @example
   * const callback = (path) => {
   *   console.log(path);
   * }
   */
  #callback;

  constructor(path, callback) {
    this.#path = path;
    this.#directories = [];
    this.#callback = callback;
  }

  /**
   * @method walk
   * @description Metodo responsavel por caminhar pelos arquivos de uma pasta e executar uma funcao de callback para cada arquivo encontrado.
   * @returns {Promise} Retorna uma promessa que eh resolvida quando todos os arquivos da pasta sao caminhados.
   */
  async walk() {
    await this.#mapDirectories();
    let directory = this.#getUnchekedDirectory();
    while (directory) {
      await this.#walkInDirectory(directory.path);
      this.#checkDirectory(directory.path);
      directory = this.#getUnchekedDirectory();
    }
  }

  /**
   * @method #mapDirectories
   * @description Metodo responsavel por mapear todas as pastas da pasta passada no construtor.
   * @returns {Promise} Retorna uma promessa que eh resolvida quando todas as pastas sao mapeadas.
   */
  async #mapDirectories() {
    await new Promise((resolve, reject) => {
      fs.readdir(this.#path, (err, files) => {
        if (err) {
          console.error(`[${this.#path}] -- Erro ao ler o diretorio\n`, err);
          reject();
          return;
        }
        files.forEach((file) => {
          const newPath = `${this.#path}/${file}`;
          const stat = fs.statSync(newPath);
          if (stat.isDirectory()) {
            this.#addDirectory(newPath);
            return;
          }
          this.#callback(newPath);
        });
        resolve();
      });
    });
  }

  /**
   * @method #checkDirectory
   * @description Metodo responsavel por marcar uma pasta como caminhada.
   * @param {String} path - Caminho da pasta a ser marcada.
   */
  #checkDirectory(path) {
    this.#directories.find(
      (directory) => directory.path === path
    ).checked = true;
  }

  /**
   * @method #getUnchekedDirectory
   * @description Metodo responsavel por retornar uma pasta que ainda nao foi caminhada.
   * @returns {Directory} Retorna uma pasta que ainda nao foi caminhada.
   */
  #getUnchekedDirectory() {
    return this.#directories.find(({ checked }) => !checked);
  }

  /**
   * @method #walkInDirectory
   * @description Metodo responsavel por caminhar pelos arquivos de uma pasta e executar uma funcao de callback para cada arquivo encontrado.
   * @param {String} path - Caminho da pasta a ser caminhada.
   * @returns {Promise} Retorna uma promessa que eh resolvida quando todos os arquivos da pasta sao caminhados.
   */
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
              this.#callback(newPath);
            }
          });
          resolve();
        }
      });
    });
  }

  /**
   * @method #addDirectory
   * @description Metodo responsavel por adicionar uma pasta na lista de pastas a serem caminhadas.
   * @param {String} path - Caminho da pasta a ser adicionada.
   * @returns {void}
   */
  async #addDirectory(path) {
    this.#directories.push({ path: path, checked: false });
  }
}

module.exports = FileWalker;
