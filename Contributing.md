### Making a PR:

1. Clone/Pull the repo to the latest state using git.
2. Make a branch for your change using a name that describes your feature/fix.
3. Always run `npm run lint` before pushing code and fix any errors.
4. Commit messages must follow the following format: `[<type1, type2, ...>]: <description>`

### Type

Must be one of the following:

- **Feature**: A new feature
- **Fix**: A bug fix
- **Style**: CSS Changes
- **Cleanup**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, dead code removal etc.)
- **Refactor**: A code change that neither fixes a bug or adds a feature
- **Performance**: A code change that improves performance
- **Tests**: Adding missing tests or fixing them
- **Documentation**: Documentation only changes

### Description

- A short description of the changes you made in the commit

### Example
- `[Feature]: Implement Login Flow`