import { useEffect, useState, useCallback } from 'react';
import components from './generated/components.json';
import type { ComponentDoc } from './types';
import Home from './pages/Home';
import ComponentPage from './pages/ComponentPage';
import NotFound from './pages/NotFound';

const docs = components as ComponentDoc[];

function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export function useRoute() {
  const [path, setPath] = useState(currentPath());

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return path;
}

export function navigate(to: string) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

/** Internal link using the History API (no router dependency). */
export function Link(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, onClick, ...rest } = props;
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (href) navigate(href);
    },
    [href, onClick]
  );
  return <a href={href} onClick={handle} {...rest} />;
}

export default function App() {
  const path = useRoute();

  let page: JSX.Element;
  if (path === '/' || path === '') {
    page = <Home docs={docs} />;
  } else {
    const m = path.match(/^\/components\/([\w-]+)$/);
    const doc = m ? docs.find(d => d.slug === m[1]) : undefined;
    if (doc) {
      page = <ComponentPage key={doc.slug} doc={doc} docs={docs} />;
    } else {
      page = <NotFound />;
    }
  }

  return (
    <div className="site">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="site-title" aria-label="scilent-ui home">
          scilent-ui
        </Link>
        <nav aria-label="Main">
          <ul className="site-nav">
            <li>
              <Link href="/" className={path === '/' ? 'is-active' : ''}>
                Home
              </Link>
            </li>
            {docs.map(d => (
              <li key={d.slug}>
                <Link
                  href={`/components/${d.slug}`}
                  className={path === `/components/${d.slug}` ? 'is-active' : ''}
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main">{page}</main>
      <footer className="site-footer">
        <p>
          scilent-ui — <code>@scilent/core</code>. Demos served from Storybook at{' '}
          <code>/storybook/</code>.
        </p>
      </footer>
    </div>
  );
}
