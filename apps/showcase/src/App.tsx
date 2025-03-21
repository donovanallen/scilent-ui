import scilentLogo from '/scilent-3d.png';
import './App.css';
import { IconButton } from '@scilent/core';
import { Icon } from '@scilent/icons';
import { ScriptCopyBtn } from './ScriptCopy';
import { MagicCard } from './MagicCard';
import { AuroraText } from './AuroraText';
import { AnimatedShinyText } from './ShinyText';
import { Terminal } from './Terminal';
import { ScrollProgress } from './ScrollProgress';
// import { PlayerExample } from './Player/Player';
// import { AlbumDetails } from './AlbumDetails/AlbumDetails';
// import { Artists } from './Artists/Artists';

const customCommandMap = {
  npm: 'npm install @scilent/core @scilent/icons',
  yarn: 'yarn add @scilent/core @scilent/icons',
  pnpm: 'pnpm add @scilent/core @scilent/icons',
  bun: 'bun add @scilent/core @scilent/icons',
};
const FeatureCard = ({
  title,
  icon,
  description,
}: {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  description?: string;
}) => (
  <div className="flex flex-col gap-12 border border-scilent-800 rounded-lg p-6 w-full">
    <MagicCard>
      {icon && <Icon name={icon} size={64} className="ml-auto" />}
      <div className="flex flex-col gap-2 items-start justify-end w-4/5">
        <span className="text-4xl font-semibold mb-2">{title}</span>
        <p className="text-scilent-400 text-base">{description}</p>
      </div>
    </MagicCard>
  </div>
);

const Header = () => (
  <header className="fixed top-0 left-0 z-50 w-full py-4 px-8 bg-black border-b border-scilent-800">
    <div className=" flex justify-between items-center relative">
      <div className="flex gap-2">
        <h2 className="lowercase text-3xl">Scilent UI</h2>
        <span className="text-opacity-50 text-sm">v0.0.1</span>
      </div>
      <div className="flex justify-end gap-4 items-center">
        <IconButton aria-label="Github" variant="ghost" icon={() => <Icon name="GithubLogo" />} />
        <IconButton aria-label="Figma" variant="ghost" icon={() => <Icon name="FigmaLogo" />} />
        <div className="my-4">
          <input
            type="text"
            className="rounded-full border-2 border-scilent-800 px-4 py-2"
            placeholder="Search documentation..."
            disabled
          />
        </div>
        <IconButton aria-label="Theme Toggle" variant="ghost" icon={() => <Icon name="Sun" />} />
      </div>
    </div>
    <ScrollProgress />
  </header>
);

const Hero = () => (
  <div className="h-screen flex flex-col justify-center gap-y-6 items-start w-full px-8">
    <h1 className=" font-bold text-4xl text-start w-4/5">
      The Ultimate <AuroraText>Music UI Kit</AuroraText>
    </h1>
    <p className="text-scilent-400 text-xl text-start w-4/5">
      Components, utilities, and templates for building beautiful music interfaces
    </p>
    <ScriptCopyBtn
      showMultiplePackageOptions={true}
      codeLanguage="shell"
      lightTheme="nord"
      darkTheme="vitesse-dark"
      commandMap={customCommandMap}
      className="mt-6"
    />
    <button className="button button-primary">
      <AnimatedShinyText>Start building now</AnimatedShinyText>
    </button>
  </div>
);

const Features = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <FeatureCard
      title="Accessibility First"
      icon="PersonSimpleCircle"
      description="Built on Radix Primitives, all components meet WCAG requirements, ensuring a consistent experience for all users."
    />
    <FeatureCard
      title="Fully Customizable"
      icon="Palette"
      description="Flexible theming system lets you adjust colors, spacing, and animations with the styling framework of your choice."
    />
    <FeatureCard
      title="DSP Compliant"
      icon="ShieldCheck"
      description="Components designed to be compliant with various popular music streaming API standards, ensuring your app is ready for showtime."
    />
    <FeatureCard
      title="Open-Source"
      icon="GitBranch"
      description="Join our growing community of developers building better music interfaces together."
    />
  </div>
);

const CodePreview = () => (
  <Terminal>
    <div className="code-preview">
      <pre>
        <code className="text-scilent-300">{`import { Button } from '@scilent/core'
import ArtistLabel from '../../../packages/core/src/components/ArtistLabel/ArtistLabel';
import { Icon } from '../../../packages/icons/src/icons/Icon';
import { formatDuration } from '../../../packages/core/src/components/Timestamp/utils';
import { IconType as PhosphorIconType } from '@phosphor-icons/react';

function Example() {
  return (
    <Button variant="primary">
      Get Started
    </Button>
  )
}`}</code>
      </pre>
    </div>
  </Terminal>
);

const Support = () => (
  <div className="flex flex-col gap-4 items-center">
    <h1 className="text-3xl">Support Scilent UI</h1>
    <p className="text-scilent-400">
      Using Scilent UI in a profit-making product, as a freelancer, or for fun projects? Your
      contributions help to make Scilent UI better.
    </p>
    <button className="button button-primary">Support Scilent UI</button>
  </div>
);
const Footer = () => (
  <footer className="w-full border-t border-scilent-800 py-10">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="text-scilent-400">© 2025 Scilent Digital</span>
      </div>
      <img src={scilentLogo} className="h-10" alt="Scilent logo" />
      <nav className="flex gap-4">
        <a href="#" className="footer-link">
          Docs
        </a>
        <a href="#" className="footer-link">
          Components
        </a>
        <a href="#" className="footer-link">
          GitHub
        </a>
      </nav>
    </div>
  </footer>
);

function App() {
  return (
    <div className="relative min-h-screen w-full px-8 md:px-12">
      <Header />
      <Hero />

      <section className="h-screen">
        <Features />
      </section>

      {/* Documentation Preview */}
      <section className="h-screen px-6 md:px-24 my-12">
        <CodePreview />
      </section>

      <section className="mb-12 py-24 bg-gradient-to-b from-scilent-900 to-scilent-800 border border-scilent-800">
        <Support />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
