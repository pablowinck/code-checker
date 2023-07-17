const fs = require("fs");

/**
 * @typedef {Object} Directory
 * @property {String} path - Path of the folder.
 * @property {Boolean} checked - Flag indicating whether the folder has been walked.
 */
/**
 * @class FileWalker
 * @description This class is responsible for walking through the files of a folder and executing a callback function for each file found.
 * @param {String} path - Path of the folder to be walked.
 * @param {Function} callback - Callback function to be executed for each file found.
 * @returns {FileWalker} Returns an instance of FileWalker.
 */
class FileWalker {
  /**
   * @type {String} path
   * @description Path of the folder to be walked.
   */
  #path;
  /**
   * @type {Array<Directory>} directories
   */
  #directories;
  /**
   * @type {Function} callback
   * @description Callback function to be executed for each file found.
   * @param {String} path - Path of the file.
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
   * @description Method responsible for walking through the files of a folder and executing a callback function for each file found.
   * @returns {Promise} Returns a promise that is resolved when all files in the folder are walked.
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
   * @description Method responsible for mapping all folders of the folder passed in the constructor.
   * @returns {Promise} Returns a promise that is resolved when all folders are mapped.
   */
  async #mapDirectories() {
    await new Promise((resolve, reject) => {
      fs.readdir(this.#path, (err, files) => {
        if (err) {
          console.error(`[${this.#path}] -- Error reading the directory`, err);
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
   * @description Method responsible for marking a folder as walked.
   * @param {String} path - Path of the folder to be marked.
   */
  #checkDirectory(path) {
    this.#directories.find(
      (directory) => directory.path === path,
    ).checked = true;
  }

  /**
   * @method #getUnchekedDirectory
   * @description Method responsible for returning a folder that has not yet been walked.
   * @returns {Directory} Returns a folder that has not yet been walked.
   */
  #getUnchekedDirectory() {
    return this.#directories.find(({ checked }) => !checked);
  }

  /**
   * @method #walkInDirectory
   * @description Method responsible for walking through the files of a folder and executing a callback function for each file found.
   * @param {String} path - Path of the folder to be walked.
   * @returns {Promise} Returns a promise that is resolved when all files in the folder are walked.
   */
  async #walkInDirectory(path) {
    await new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          console.error(`[${path}] -- Error reading the directory`, err);
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
   * @description Method responsible for adding a folder to the list of folders to be walked.
   * @param {String} path - Path of the folder to be added.
   * @returns {void}
   */
  async #addDirectory(path) {
    this.#directories.push({ path, checked: false });
  }
}

module.exports = FileWalker;
