/**
 * Shared types for the docs site. Content data comes from
 * src/generated/components.json (produced by scripts/generate-docs-data.mjs).
 */

export interface PropDoc {
  name: string;
  type: string;
  optional: boolean;
  description: string;
  default?: string;
  inherited?: boolean;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  description: string;
  stories: string[];
  props: PropDoc[];
  a11yNotes: string[];
}
