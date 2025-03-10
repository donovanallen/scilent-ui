import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Search, SearchResult, SearchFilterType } from './Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the search component',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'pill'],
      description: 'The variant of the search component',
      defaultValue: 'default',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the search input should be auto-focused',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the search is in a loading state',
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the search has encountered an error',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display when hasError is true',
    },
    showSearchIcon: {
      control: 'boolean',
      description: 'Whether to show the search icon',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show the clear button',
    },
    expandOnFocus: {
      control: 'boolean',
      description: 'Whether to expand the search input on focus',
    },
    collapseOnBlurIfEmpty: {
      control: 'boolean',
      description: 'Whether to collapse the search input on blur when empty',
    },
    showFilterButtons: {
      control: 'boolean',
      description: 'Whether to show filter buttons',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the search component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

// Mock data for search results
const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'artists',
    title: 'The Beatles',
    subtitle: 'Artist',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5b241d5f6825eaac0ce41bd6',
  },
  {
    id: '2',
    type: 'artists',
    title: 'The Rolling Stones',
    subtitle: 'Artist',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5a00115a648e0a0e6ea6d69c',
  },
  {
    id: '3',
    type: 'albums',
    title: 'Abbey Road',
    subtitle: 'The Beatles',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25',
  },
  {
    id: '4',
    type: 'tracks',
    title: 'Hey Jude',
    subtitle: 'The Beatles',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2733d92b2ad5af9fbc8637425f0',
  },
  {
    id: '5',
    type: 'tracks',
    title: 'Let It Be',
    subtitle: 'The Beatles',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf',
  },
];

// Basic search component
export const Default: Story = {
  args: {
    placeholder: 'Search for artists, albums, or tracks...',
    size: 'md',
    variant: 'default',
    showSearchIcon: true,
    showClearButton: true,
    showFilterButtons: true,
    animate: true,
  },
};

// Search with results
export const WithResults: Story = {
  args: {
    ...Default.args,
    results: mockResults,
  },
  render: args => {
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = (query: string, filterType?: SearchFilterType) => {
      if (!query) {
        setResults([]);
        return;
      }

      // Filter results based on query and filter type
      const filteredResults = mockResults.filter(result => {
        const matchesQuery =
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          (result.subtitle && result.subtitle.toLowerCase().includes(query.toLowerCase()));

        const matchesType = !filterType || filterType === 'all' || result.type === filterType;

        return matchesQuery && matchesType;
      });

      setResults(filteredResults);
    };

    return (
      <Search
        {...args}
        results={results}
        onSearch={handleSearch}
        onQueryChange={query => {
          if (query === '') {
            setResults([]);
          }
        }}
      />
    );
  },
};

// Loading state
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

// Error state
export const Error: Story = {
  args: {
    ...Default.args,
    hasError: true,
    errorMessage: 'Something went wrong with the search. Please try again.',
  },
};

// Empty results
export const EmptyResults: Story = {
  args: {
    ...Default.args,
    results: [],
  },
  render: args => {
    const [query, setQuery] = useState('');

    return (
      <Search
        {...args}
        results={[]}
        onQueryChange={newQuery => setQuery(newQuery)}
        onSearch={() => {}} // Empty search function to simulate no results
      />
    );
  },
};

// Expandable search
export const Expandable: Story = {
  args: {
    ...Default.args,
    expandOnFocus: true,
    collapseOnBlurIfEmpty: true,
  },
};

// Pill variant
export const Variants: Story = {
  args: {
    ...Default.args,
    variant: 'pill',
  },
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Search {...args} variant="pill" placeholder="Pill variant..." />
      <Search {...args} variant="minimal" placeholder="Minimal variant..." />
      <Search {...args} variant="default" placeholder="Default variant..." />
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Search {...args} size="sm" placeholder="Small search..." />
      <Search {...args} size="md" placeholder="Medium search..." />
      <Search {...args} size="lg" placeholder="Large search..." />
    </div>
  ),
};

// Custom filter types
export const CustomFilters: Story = {
  args: {
    ...Default.args,
    filterTypes: ['artists', 'albums', 'tracks', 'playlists', 'podcasts'],
  },
};

// Highly styled example
export const StyledExample: Story = {
  render: () => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (query: string, filterType?: SearchFilterType) => {
      if (!query) {
        setResults([]);
        return;
      }

      // Simulate API call
      setIsSearching(true);

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Filter results based on query and filter type
      const filteredResults = mockResults.filter(result => {
        const matchesQuery =
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          (result.subtitle && result.subtitle.toLowerCase().includes(query.toLowerCase()));

        const matchesType = !filterType || filterType === 'all' || result.type === filterType;

        return matchesQuery && matchesType;
      });

      setResults(filteredResults);
      setIsSearching(false);
    };

    return (
      <div
        style={{
          padding: '30px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '12px',
          width: '600px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <h2
          style={{
            color: 'white',
            marginBottom: '20px',
            fontWeight: 600,
            fontSize: '24px',
          }}
        >
          Scilent Music Search
        </h2>
        <Search
          placeholder="Search your music library..."
          variant="pill"
          size="lg"
          filterTypes={['artists', 'albums', 'tracks', 'playlists']}
          showFilterButtons={true}
          animate={true}
          expandOnFocus={false}
          isLoading={isSearching}
          results={results}
          onSearch={handleSearch}
          onQueryChange={query => {
            if (query === '') {
              setResults([]);
            }
          }}
          onResultSelect={result => {
            console.log('Selected result:', result);
          }}
          style={{
            maxWidth: '100%',
          }}
        />
        <div
          style={{
            marginTop: '20px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
          }}
        >
          Search across multiple music platforms with a single interface
        </div>
      </div>
    );
  },
};

// Platform-specific styling
export const PlatformSpecific: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Apple Music style */}
      <div
        style={{
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 style={{ marginBottom: '15px', color: '#333' }}>Apple Music Style</h3>
        <Search
          placeholder="Search Apple Music..."
          variant="pill"
          size="md"
          filterTypes={['artists', 'albums', 'tracks']}
          showFilterButtons={true}
          animate={true}
          style={
            {
              '--color-primary': '#ff2d55',
              '--color-primary-light': '#ffb3c0',
              '--color-primary-dark': '#d30f45',
            } as React.CSSProperties
          }
        />
      </div>

      {/* Spotify style */}
      <div
        style={{
          padding: '20px',
          background: '#121212',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h3 style={{ marginBottom: '15px', color: '#fff' }}>Spotify Style</h3>
        <Search
          placeholder="Search Spotify..."
          variant="default"
          size="md"
          filterTypes={['artists', 'albums', 'tracks', 'playlists', 'podcasts']}
          showFilterButtons={true}
          animate={true}
          style={
            {
              '--color-primary': '#1DB954',
              '--color-primary-light': '#1ed760',
              '--color-primary-dark': '#1aa34a',
              '--color-background': '#282828',
              '--color-text': '#ffffff',
              '--color-text-muted': '#b3b3b3',
              '--color-border': '#333',
            } as React.CSSProperties
          }
        />
      </div>

      {/* Tidal style */}
      <div
        style={{
          padding: '20px',
          background: '#000',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h3 style={{ marginBottom: '15px', color: '#fff' }}>Tidal Style</h3>
        <Search
          placeholder="Search TIDAL..."
          variant="minimal"
          size="md"
          filterTypes={['artists', 'albums', 'tracks', 'videos']}
          showFilterButtons={true}
          animate={true}
          style={
            {
              '--color-primary': '#00ffff',
              '--color-primary-light': '#33ffff',
              '--color-primary-dark': '#00cccc',
              '--color-background': '#000',
              '--color-text': '#ffffff',
              '--color-text-muted': '#999',
              '--color-border': '#333',
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  ),
};
