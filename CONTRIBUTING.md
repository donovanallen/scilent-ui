# Contributing to Scilent UI

Thank you for your interest in contributing to Scilent UI! This document provides guidelines and instructions for contributing to this project.

## Development Environment Setup

### Prerequisites

- Node.js v23 or higher
- pnpm v10 or higher
- Git

### Setup Steps

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/scilent-ui.git
   cd scilent-ui
   ```
3. Set up the development environment:

   ```bash
   # Install the correct Node.js version using NVM
   nvm install
   nvm use

   # Install dependencies
   pnpm install

   # Setup Husky git hooks
   pnpm prepare
   ```

## Development Workflow

### Branch Naming Convention

- `feature/short-description` - For new features
- `fix/short-description` - For bug fixes
- `docs/short-description` - For documentation changes
- `refactor/short-description` - For code refactoring
- `chore/short-description` - For maintenance tasks

### Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts
- `build`: Changes that affect the build system or external dependencies
- `revert`: Reverts a previous commit

### Creating Changesets

When making changes that should be released, you need to create a changeset:

```bash
pnpm changeset
```

This will prompt you to:

1. Select the packages you've modified
2. Choose the type of version bump (patch, minor, major)
3. Write a description of the changes

The changeset will be committed to your branch and used when creating a new release.

### Testing Your Changes

Before submitting a pull request, make sure to:

1. Run linting:

   ```bash
   pnpm lint
   ```

2. Run type checking:

   ```bash
   pnpm typecheck
   ```

3. Run tests:

   ```bash
   pnpm test
   ```

4. Test your components in Storybook:
   ```bash
   pnpm storybook
   ```

### Component Development with Storybook

We use Storybook for developing and documenting components in isolation. Storybook provides a great way to visualize different states of your components and develop them interactively.

#### Running Storybook

To start Storybook locally:

```bash
# From the root directory
pnpm storybook

# Or from a specific package
cd packages/core
pnpm storybook
```

This will start Storybook on port 6006. Open your browser to http://localhost:6006 to view it.

#### Creating Stories

Each component should have a corresponding `.stories.tsx` file. For example, for a `Button.tsx` component, create a `Button.stories.tsx` file in the same directory.

Basic story structure:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  // Add parameters, argTypes, etc.
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // Component props
  },
};

// Add more stories for different states/variants
```

#### Adding Documentation

For comprehensive documentation, create an MDX file alongside your component and stories:

```tsx
// ComponentName.mdx
import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ComponentStories from './ComponentName.stories';

<Meta of={ComponentStories} />

# ComponentName

Component description and usage guidelines.

<Canvas of={ComponentStories.Default} />

## Props

<Controls />

## Usage Examples

...
```

### Vite Development Environment

This project uses Vite as the development environment for Storybook. Vite provides:

- Extremely fast hot module replacement (HMR)
- Native ES modules support
- Optimized build performance
- Built-in support for TypeScript, JSX, CSS, and more

The Vite configuration for Storybook is located in `packages/core/.storybook/vite.config.ts`.

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Create a changeset if your changes should be released
3. Submit a pull request to the `main` branch
4. Address any feedback from code reviews
5. Once approved, your PR will be merged

## Project Structure

```
scilent-ui/
├── .changeset/          # Changeset files for version management
├── .github/             # GitHub Actions workflows
├── .husky/              # Git hooks
├── packages/            # Monorepo packages
│   ├── core/            # Core components
│   │   ├── .storybook/  # Storybook configuration
│   │   ├── src/         # Component source code
│   │   │   ├── components/ # UI components
│   │   │   ├── hooks/      # React hooks
│   │   │   ├── types/      # TypeScript types
│   │   │   └── utils/      # Utility functions
│   ├── icons/           # Icon components
│   └── themes/          # Theme definitions
├── scripts/             # Build and utility scripts
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── commitlint.config.js # Commitlint configuration
└── turbo.json           # Turborepo configuration
```

## Code Style and Standards

- TypeScript for type safety
- React functional components with hooks
- ESLint for code linting
- Prettier for code formatting
- Jest for testing

## Need Help?

If you have questions or need help, please open an issue on GitHub.
