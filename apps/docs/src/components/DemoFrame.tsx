import { useState } from 'react';

interface DemoFrameProps {
  storyId: string;
  title: string;
  minHeight?: number;
}

/**
 * Embeds a Storybook story via iframe. Storybook static output is served at
 * /storybook/ (iframe.html). A loading fallback shows until the frame loads.
 */
export default function DemoFrame({ storyId, title, minHeight = 320 }: DemoFrameProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="demo-frame" style={{ minHeight }}>
      {!loaded && (
        <div className="demo-loading" aria-hidden="true">
          <span className="spinner" />
          <span>Loading demo…</span>
        </div>
      )}
      <iframe
        src={`/storybook/iframe.html?id=${storyId}&viewMode=story`}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'demo-iframe is-loaded' : 'demo-iframe'}
        style={{ minHeight }}
      />
    </div>
  );
}
