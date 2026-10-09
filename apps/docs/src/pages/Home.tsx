import { Link } from '../App';
import type { ComponentDoc } from '../types';
import DemoFrame from '../components/DemoFrame';

interface HomeProps {
  docs: ComponentDoc[];
}

export default function Home({ docs }: HomeProps) {
  const player = docs.find(d => d.slug === 'music-player')!;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero-title">
          scilent-ui
        </h1>
        <p className="hero-tagline">
          React components for building music and audio apps — players, artwork, metadata, and
          transport controls. Copy the source into your project and own it, or install the npm
          package. Built for the parts of a music product's UI that generic component libraries
          leave to you: scrubbing, truncating artist names, buffering bars, platform-styled players.
        </p>
        <DemoFrame
          storyId="musicplayer--default"
          title="MusicPlayer default story"
          minHeight={360}
        />
        <p className="hero-hint">
          Live demo rendered by the{' '}
          <a href="/storybook/index.html" target="_blank" rel="noreferrer">
            Storybook
          </a>{' '}
          build served at <code>/storybook/</code>.
        </p>
      </section>

      <section aria-labelledby="components-heading">
        <h2 id="components-heading">Components</h2>
        <ul className="component-grid">
          {docs.map(doc => (
            <li key={doc.slug} className="component-card">
              <Link href={`/components/${doc.slug}`} className="component-card-link">
                <h3>{doc.name}</h3>
                <p>{doc.description}</p>
                <p className="component-card-meta">{doc.props.length} props</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="install-heading">
        <h2 id="install-heading">Get started</h2>
        <p>
          Two ways in, pick the one that fits how you ship: install the npm package for versioned
          updates, or copy a component's source through the registry and own the code outright.
        </p>
        <div className="install-blocks">
          <div>
            <h3>npm</h3>
            <pre>
              <code>npm i @scilent/core</code>
            </pre>
          </div>
          <div>
            <h3>shadcn registry</h3>
            <pre>
              <code>npx shadcn add "https://scilent-ui.dev/r/music-player.json"</code>
            </pre>
          </div>
        </div>
      </section>

      <section aria-labelledby="player-heading">
        <h2 id="player-heading">{player.name}</h2>
        <p>{player.description}</p>
      </section>
    </>
  );
}
