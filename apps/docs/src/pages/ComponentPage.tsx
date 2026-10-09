import { Link } from '../App';
import DemoFrame from '../components/DemoFrame';
import PropsTable from '../components/PropsTable';
import InstallCommands from '../components/InstallCommands';
import type { ComponentDoc } from '../types';
import { intros } from '../content/intros';

interface ComponentPageProps {
  doc: ComponentDoc;
  docs: ComponentDoc[];
}

/** Storybook ids are lowercased component titles, e.g. musicplayer--default. */
const storyId = (doc: ComponentDoc, story: string) => `${doc.name.toLowerCase()}--${story}`;

export default function ComponentPage({ doc, docs }: ComponentPageProps) {
  const index = docs.findIndex(d => d.slug === doc.slug);
  const prev = docs[index - 1];
  const next = docs[index + 1];

  return (
    <article className="component-page">
      <header>
        <p className="breadcrumb">
          <Link href="/">Components</Link> <span aria-hidden="true">/</span> <span>{doc.name}</span>
        </p>
        <h1>{doc.name}</h1>
        <p className="component-description">{doc.description}</p>
        {intros[doc.slug] && <p className="component-intro">{intros[doc.slug]}</p>}
      </header>

      <section aria-labelledby={`${doc.slug}-demo`}>
        <h2 id={`${doc.slug}-demo`}>Live demo</h2>
        <DemoFrame
          storyId={storyId(doc, 'default')}
          title={`${doc.name} default story`}
          minHeight={340}
        />
        {doc.stories.length > 1 && (
          <div className="story-gallery">
            <h3>All stories</h3>
            <ul>
              {doc.stories.map(story => (
                <li key={story}>
                  <p className="story-label">{story}</p>
                  <DemoFrame
                    storyId={storyId(doc, story)}
                    title={`${doc.name} ${story} story`}
                    minHeight={260}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section aria-labelledby={`${doc.slug}-install`}>
        <h2 id={`${doc.slug}-install`}>Install</h2>
        <InstallCommands slug={doc.slug} name={doc.name} />
      </section>

      <section aria-labelledby={`${doc.slug}-props`}>
        <h2 id={`${doc.slug}-props`}>Props API</h2>
        <PropsTable props={doc.props} />
      </section>

      <section aria-labelledby={`${doc.slug}-a11y`}>
        <h2 id={`${doc.slug}-a11y`}>Accessibility</h2>
        <p>
          Checked with <code>jest-axe</code>. Variants verified:
        </p>
        <ul>
          {doc.a11yNotes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </section>

      <nav className="pager" aria-label="Component pagination">
        {prev ? (
          <Link href={`/components/${prev.slug}`} className="pager-link">
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/components/${next.slug}`} className="pager-link">
            {next.name} →
          </Link>
        )}
      </nav>
    </article>
  );
}
