# Scilent UI

A component and utility library for music-based applications and UIs.

## Requirements

- Node.js v23 or higher
- pnpm v10 or higher

## Getting Started

### Using NVM (recommended)

This project uses [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to manage Node.js versions.

```bash
# Install the correct Node.js version
nvm install
nvm use

# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev

# Run linting
pnpm lint

# Run tests
pnpm test

# Build all packages
pnpm build

# Run Storybook
pnpm storybook
```

### Project Structure

This is a monorepo managed with pnpm workspaces and Turborepo. The packages are organized as follows:

- `packages/core`: Core components and utilities
- `packages/icons`: Icon components
- `packages/themes`: Theme definitions and utilities

### Release Process

This project uses [Changesets](https://github.com/changesets/changesets) to manage versions and publish packages.

```bash
# Create a new changeset
pnpm changeset

# Version packages based on changesets
pnpm version-packages

# Publish packages
pnpm release
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Scilent Digital](https://scilent.digital)
