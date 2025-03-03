import { type Config } from 'prettier';

const config: Config = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSameLine: false,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  embeddedLanguageFormatting: 'auto',
};

export default config;
