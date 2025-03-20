import scilentLogo from '/scilent-3d.png';
import './App.css';
import { IconButton } from '@scilent/core';
import { Icon } from '@scilent/icons';
// import { PlayerExample } from './Player/Player';
// import { AlbumDetails } from './AlbumDetails/AlbumDetails';
// import { Artists } from './Artists/Artists';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FeatureCard = ({
  title,
  icon,
  description,
}: {
  title: string;
  icon?: any;
  description?: string;
}) => (
  <div className="flex flex-col gap-12 border border-scilent-800 rounded-lg p-6">
    {icon && <Icon name={icon} size={64} className="ml-auto" />}
    <div className="flex flex-col gap-2 items-start justify-end w-4/5">
      <span className="text-4xl font-semibold mb-2">{title}</span>
      <p className="text-scilent-400 text-base">{description}</p>
    </div>
  </div>
);

const Header = () => (
  <header className="fixed top-0 left-0 z-50 w-full flex justify-between items-center py-4 px-8 bg-black border-b border-scilent-800">
    <div className="flex gap-2">
      <h2 className="lowercase text-2xl">Scilent UI</h2>
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
  </header>
);

const Hero = () => (
  <div className="h-screen flex flex-col justify-center gap-6 items-start w-full">
    <h1 className="text-4xl text-start w-4/5">The Ultimate Music UI Kit</h1>
    <p className="text-scilent-400 text-xl text-start w-4/5">
      Components, utilities, and templates for building beautiful music interfaces
    </p>

    <div className="flex justify-center gap-4">
      <button className="button button-primary">Get Started</button>
      <input
        type="text"
        className="rounded-full border-2 border-scilent-800 px-4 py-2 w-fit"
        placeholder="$ npm install @scilent/core @scilent/icons"
        disabled
      />
    </div>
  </div>
);

const Features = () => (
  <section className="">
    <div className="grid grid-cols-1 grid-cols-2 gap-4">
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
  </section>
);

const Footer = () => (
  <footer className="w-full border-t border-scilent-800 py-10">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="text-scilent-400">© 2024 Scilent Digital</span>
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
    <div className="relative min-h-screen w-full">
      <Header />
      <Hero />
      <Features />
      {/* <section className="py-24">
        <div className="max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl">Examples</h2>
          </div>
          <PlayerExample track={{
            title: 'Track Title',
            artist: 'Track Artist',
            album: 'Album Name',
            artwork: 'https://picsum.photos/200',
            durationMs: 10000
          }} />
          <hr />
          <AlbumDetails album={{
            title: 'Album Title',
            artist: 'Album Artist',
            artwork: 'https://picsum.photos/200',
            durationMs: 10000,  
            tracks: [
              {
                title: 'Track Title',
                artist: 'Track Artist',
                artwork: 'https://picsum.photos/200',
                durationMs: 10000
              },
              {
                title: 'Track Title 2',
                artist: 'Track Artist 2',
                artwork: 'https://picsum.photos/200',
                durationMs: 10000
              },
              {
                title: 'Track Title 3',
                artist: 'Track Artist 3',
                artwork: 'https://picsum.photos/200',
                durationMs: 10000
              },
              {
                title: 'Track Title 4',
                artist: 'Track Artist 4',
                artwork: 'https://picsum.photos/200',
                durationMs: 10000
              }
            ]
          }} />
          <hr />
          <div style={{ width: '100%' }}>
            <h2 >Top Artists</h2>
          <Artists artists={[
            { name: 'Album Artist One', id: '1', image: 'https://picsum.photos/200' },
            { name: 'Album Artist Two', id: '2', image: 'https://picsum.photos/200' },
            { name: 'Album Artist Three', id: '3', image: 'https://picsum.photos/200' },
            { name: 'Album Artist Four', id: '4', image: 'https://picsum.photos/200' },
            { name: 'Album Artist Five', id: '5', image: 'https://picsum.photos/200' },
          ]} />
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-24">
        {/* <div className="max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl">Core Components</h2>
            <p className="text-scilent-400 mt-6">
              Beautifully designed components for your next project
            </p>
          </div> */}
        {/* <div className="grid grid-cols-1 grid-cols-2 grid-cols-3 gap-4">
            <ComponentPreview title="Album Artwork" />
            <ComponentPreview title="Metadata Labels" />
            <ComponentPreview title="Slider" />
            <ComponentPreview title="Timestamp" />
            <ComponentPreview title="Icons" />
            <ComponentPreview title="Themes" />
          </div> */}
        {/* </div> */}
      </section>

      {/* Documentation Preview */}
      <section className="py-24">
        <div className="max-w-7xl">
          <div className="docs-grid">
            <div>
              <h2 className="text-3xl mb-8">Comprehensive Documentation</h2>
              <p className="text-scilent-300 mb-8">
                Detailed guides, API references, and examples to help you build faster
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="feature-icon">
                    <span className="text-scilent-300">→</span>
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">Quick start guides</h3>
                    <p className="text-scilent-400 text-sm">Get up and running in minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="feature-icon">
                    <span className="text-scilent-300">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">Interactive examples</h3>
                    <p className="text-scilent-400 text-sm">Learn by doing with live code</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="feature-icon">
                    <span className="text-scilent-300">📚</span>
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">API documentation</h3>
                    <p className="text-scilent-400 text-sm">Detailed API references and examples</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
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
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
