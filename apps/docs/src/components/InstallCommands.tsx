import { useState } from 'react';

interface InstallCommandsProps {
  slug: string;
  name: string;
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — user can select manually */
    }
  };
  return (
    <div className="code-block">
      <div className="code-block-header">
        <span>{label}</span>
        <button type="button" className="copy-btn" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function InstallCommands({ slug, name }: InstallCommandsProps) {
  const npmCode = `npm i @scilent/core\n\nimport { ${name} } from '@scilent/core'`;
  const registryCode = `npx shadcn add "https://scilent-ui.dev/r/${slug}.json"`;
  return (
    <div className="install-blocks">
      <div>
        <h3>npm</h3>
        <CodeBlock code={npmCode} label="package" />
      </div>
      <div>
        <h3>shadcn registry</h3>
        <CodeBlock code={registryCode} label="registry" />
      </div>
    </div>
  );
}
