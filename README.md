# Code Checker

## Description

Code Checker is an open source project that uses the GPT language model to review and correct code following good
programming practices. It scans every file in a project and sends its content to the GPT Chat, which returns a corrected
version of the code.

## Prerequisites

- Node.js v20 (refer to the `.nvmrc` file for the exact version)
- An OpenAI API key. You need to create a `.env` file in the project root and add your OpenAI API key
  as `OPENAI_API_KEY`.

## How to install

1. Clone this repository.
2. Navigate to the project directory.
3. Create a `.env` file in the project root with the following content:

    ```
    OPENAI_API_KEY=your-openai-key
    ```

   Replace `your-openai-key` with your actual OpenAI API key.

4. Run `npm install` to install the project dependencies.

## How to use

Run the `index.js` script with the `npm start` command, providing the path to the project folder you want to check as a
command line argument:

```bash
npm start path/to/your/project
```

If you do not provide a project path, the script will use `'./src'` as default.

You can use the example project located at `./tests/mock-project` to try out Code Checker.

## Tests

To run the tests, use the `npm test` command:

```bash
npm test
```

## Project Structure

- `src`: The project's source code. Contains the following main components:
    - `index.js`: This is the orchestrator of the project. It controls the program flow.
    - `FileWalker.js`: This component is responsible for walking through the files of the project being checked.
    - `AIMessage.js`: This component is responsible for assembling the prompt for GPT Chat with the content of the
      files.
- `tests`: Contains tests for the project.
- `tests/mock-project`: A mock project structure used for testing.

## Dependencies

This project uses the following dependencies:

Main dependencies:

- `dotenv`: ^16.3.1
- `openai`: ^3.3.0

Development dependencies:

- `jest`: ^29.6.1
- `prettier`: 3.0.0

## How to contribute

This is an open source project and we would love to see contributors. Here are some guidelines for contributing to the
project:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes or additions to the project.
4. Make a pull request detailing the changes you made.
5. Your PR will be reviewed and if it is helpful, it will be approved and merged into the project.

We thank you in advance for any contribution!