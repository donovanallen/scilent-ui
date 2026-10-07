import * as index from './index';

describe('core package index exports', () => {
  const documentedComponents = [
    'ArtistLabel',
    'AlbumArtwork',
    'Timestamp',
    'MetadataLabel',
    'Slider',
    'IconButton',
    'Card',
  ];

  it.each(documentedComponents)('exports %s', name => {
    const exported = (index as Record<string, unknown>)[name];
    expect(exported).toBeDefined();
    expect(['function', 'object']).toContain(typeof exported);
  });

  it('does not export undefined placeholder components', () => {
    for (const name of documentedComponents) {
      expect((index as Record<string, unknown>)[name]).not.toBeUndefined();
    }
  });
});
