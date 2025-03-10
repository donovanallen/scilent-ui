import React, { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import * as Primitive from '@radix-ui/react-primitive';

// Types for the Search component
export type SearchSize = 'sm' | 'md' | 'lg';
export type SearchVariant = 'default' | 'minimal' | 'pill';
export type SearchFilterType = 'artists' | 'albums' | 'tracks' | string;

export interface SearchResult {
  id: string;
  type: SearchFilterType;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export interface SearchProps {
  /**
   * The size of the search component
   * @default 'md'
   */
  size?: SearchSize;

  /**
   * The variant of the search component
   * @default 'default'
   */
  variant?: SearchVariant;

  /**
   * Placeholder text for the search input
   * @default 'Search...'
   */
  placeholder?: string;

  /**
   * Whether the search input should be auto-focused
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Whether the search is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the search has encountered an error
   * @default false
   */
  hasError?: boolean;

  /**
   * Error message to display when hasError is true
   */
  errorMessage?: string;

  /**
   * Available filter types for the search
   * @default ['artists', 'albums', 'tracks']
   */
  filterTypes?: SearchFilterType[];

  /**
   * Currently active filter type
   */
  activeFilterType?: SearchFilterType;

  /**
   * Callback when the filter type changes
   */
  onFilterChange?: (filterType: SearchFilterType) => void;

  /**
   * Callback when the search query changes
   */
  onQueryChange?: (query: string) => void;

  /**
   * Callback when the search is submitted
   */
  onSearch?: (query: string, filterType?: SearchFilterType) => void;

  /**
   * Callback to handle custom search logic
   */
  onCustomSearch?: (query: string, filterType?: SearchFilterType) => Promise<SearchResult[]>;

  /**
   * Search results to display
   */
  results?: SearchResult[];

  /**
   * Callback when a result is selected
   */
  onResultSelect?: (result: SearchResult) => void;

  /**
   * Whether to show the search icon
   * @default true
   */
  showSearchIcon?: boolean;

  /**
   * Whether to show the clear button
   * @default true
   */
  showClearButton?: boolean;

  /**
   * Whether to expand the search input on focus
   * @default false
   */
  expandOnFocus?: boolean;

  /**
   * Whether to collapse the search input on blur when empty
   * @default false
   */
  collapseOnBlurIfEmpty?: boolean;

  /**
   * Whether to show filter buttons
   * @default true
   */
  showFilterButtons?: boolean;

  /**
   * Whether to animate the search component
   * @default true
   */
  animate?: boolean;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Custom styles
   */
  style?: React.CSSProperties;
}

// Animations
const expandAnimation = keyframes`
  from {
    width: 40px;
    opacity: 0.7;
  }
  to {
    width: 100%;
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Styled components
const SearchContainer = styled.div<{
  $size: SearchSize;
  $variant: SearchVariant;
  $isExpanded: boolean;
  $animate: boolean;
  $isCollapsible: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${props => (props.$isCollapsible && !props.$isExpanded ? '40px' : '100%')};
  max-width: ${props => {
    switch (props.$size) {
      case 'sm':
        return '300px';
      case 'lg':
        return '500px';
      default:
        return '400px';
    }
  }};
  transition: ${props => (props.$animate ? 'all 0.2s ease-in-out' : 'none')};
  ${props =>
    props.$animate &&
    props.$isExpanded &&
    props.$isCollapsible &&
    css`
      animation: ${expandAnimation} 0.2s ease-in-out;
    `}
`;

const InputWrapper = styled.div<{
  $size: SearchSize;
  $variant: SearchVariant;
  $isFocused: boolean;
  $hasError: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--color-background, #f3f4f6);
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: ${props => (props.$variant === 'pill' ? '9999px' : '6px')};
  overflow: hidden;
  transition: all 0.15s ease;
  ${props =>
    props.$isFocused &&
    css`
      border-color: var(--color-primary, #3b82f6);
      box-shadow: 0 0 0 2px var(--color-primary-light, #93c5fd);
    `}
  ${props =>
    props.$hasError &&
    css`
      border-color: var(--color-error, #ef4444);
      box-shadow: 0 0 0 2px var(--color-error-light, #fecaca);
    `}
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`
          height: 32px;
        `;
      case 'lg':
        return css`
          height: 48px;
        `;
      default:
        return css`
          height: 40px;
        `;
    }
  }}
  ${props =>
    props.$variant === 'minimal' &&
    css`
      background-color: transparent;
      border: none;
      border-bottom: 1px solid var(--color-border, #d1d5db);
      border-radius: 0;
    `}
`;

const SearchIconWrapper = styled.div<{
  $size: SearchSize;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  color: var(--color-text-muted, #6b7280);
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`
          font-size: 14px;
        `;
      case 'lg':
        return css`
          font-size: 20px;
        `;
      default:
        return css`
          font-size: 16px;
        `;
    }
  }}
`;

const StyledInput = styled(Primitive.Primitive.input)<{
  $size: SearchSize;
}>`
  flex: 1;
  border: none;
  background: transparent;
  padding: 0 8px;
  outline: none;
  color: var(--color-text, #111827);
  width: 100%;
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`
          font-size: 14px;
        `;
      case 'lg':
        return css`
          font-size: 18px;
        `;
      default:
        return css`
          font-size: 16px;
        `;
    }
  }}
  &::placeholder {
    color: var(--color-text-muted, #6b7280);
  }
`;

const ActionButton = styled.button<{
  $size: SearchSize;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 8px;
  color: var(--color-text-muted, #6b7280);
  transition: color 0.15s ease;
  &:hover {
    color: var(--color-text, #111827);
  }
  ${props => {
    switch (props.$size) {
      case 'sm':
        return css`
          font-size: 14px;
        `;
      case 'lg':
        return css`
          font-size: 20px;
        `;
      default:
        return css`
          font-size: 16px;
        `;
    }
  }}
`;

const FilterContainer = styled.div<{
  $animate: boolean;
}>`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  ${props =>
    props.$animate &&
    css`
      animation: ${fadeIn} 0.2s ease-in-out;
    `}
`;

const FilterButton = styled.button<{
  $size: SearchSize;
  $isActive: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props =>
    props.$size === 'sm' ? '4px 8px' : props.$size === 'lg' ? '8px 16px' : '6px 12px'};
  border-radius: 9999px;
  font-size: ${props => (props.$size === 'sm' ? '12px' : props.$size === 'lg' ? '16px' : '14px')};
  background-color: ${props =>
    props.$isActive ? 'var(--color-primary, #3b82f6)' : 'var(--color-background, #f3f4f6)'};
  color: ${props => (props.$isActive ? 'white' : 'var(--color-text, #111827)')};
  border: 1px solid
    ${props => (props.$isActive ? 'var(--color-primary, #3b82f6)' : 'var(--color-border, #d1d5db)')};
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    background-color: ${props =>
      props.$isActive
        ? 'var(--color-primary-dark, #2563eb)'
        : 'var(--color-background-hover, #e5e7eb)'};
  }
`;

const ResultsContainer = styled.div<{
  $size: SearchSize;
  $animate: boolean;
}>`
  position: absolute;
  top: ${props => {
    switch (props.$size) {
      case 'sm':
        return '40px';
      case 'lg':
        return '56px';
      default:
        return '48px';
    }
  }};
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background-color: var(--color-background, white);
  border: 1px solid var(--color-border, #d1d5db);
  border-radius: 6px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  ${props =>
    props.$animate &&
    css`
      animation: ${fadeIn} 0.2s ease-in-out;
    `}
`;

const ResultItem = styled.div<{
  $size: SearchSize;
}>`
  display: flex;
  align-items: center;
  padding: ${props => (props.$size === 'sm' ? '8px' : props.$size === 'lg' ? '12px' : '10px')};
  cursor: pointer;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: var(--color-background-hover, #f3f4f6);
  }
`;

const ResultImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 12px;
`;

const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultTitle = styled.div`
  font-weight: 500;
  color: var(--color-text, #111827);
`;

const ResultSubtitle = styled.div`
  font-size: 12px;
  color: var(--color-text-muted, #6b7280);
`;

const ResultType = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  color: var(--color-primary, #3b82f6);
  margin-left: auto;
  padding: 2px 6px;
  border-radius: 9999px;
  background-color: var(--color-primary-light, #93c5fd);
  opacity: 0.7;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  color: var(--color-text-muted, #6b7280);
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-background, #f3f4f6);
  border-top-color: var(--color-primary, #3b82f6);
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`;

const ErrorMessage = styled.div`
  color: var(--color-error, #ef4444);
  font-size: 14px;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--color-error-light, #fecaca);
`;

/**
 * Search component for searching content with configurable filters and display options
 *
 * Supports various states including initial, loading, error, and empty results.
 * Can be configured to expand/collapse and includes animations.
 */
export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      size = 'md',
      variant = 'default',
      placeholder = 'Search...',
      autoFocus = false,
      isLoading = false,
      hasError = false,
      errorMessage,
      filterTypes = ['artists', 'albums', 'tracks'],
      activeFilterType,
      onFilterChange,
      onQueryChange,
      onSearch,
      onCustomSearch,
      results = [],
      onResultSelect,
      showSearchIcon = true,
      showClearButton = true,
      expandOnFocus = false,
      collapseOnBlurIfEmpty = false,
      showFilterButtons = true,
      animate = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isExpanded, setIsExpanded] = useState(!expandOnFocus);
    const [showResults, setShowResults] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<SearchFilterType>(
      activeFilterType || filterTypes[0]
    );
    const [searchResults, setSearchResults] = useState<SearchResult[]>(results);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle outside clicks to close results
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowResults(false);
          if (collapseOnBlurIfEmpty && !query) {
            setIsExpanded(false);
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [collapseOnBlurIfEmpty, query]);

    // Update results when props change
    useEffect(() => {
      setSearchResults(results);
    }, [results]);

    // Update selected filter when activeFilterType changes
    useEffect(() => {
      if (activeFilterType) {
        setSelectedFilter(activeFilterType);
      }
    }, [activeFilterType]);

    // Handle query change
    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);

      if (onQueryChange) {
        onQueryChange(newQuery);
      }

      // Show results container when typing
      if (newQuery) {
        setShowResults(true);
      }
    };

    // Handle search submission
    const handleSearch = async () => {
      if (!query.trim()) return;

      if (onSearch) {
        onSearch(query, selectedFilter);
      }

      if (onCustomSearch) {
        try {
          setIsSearching(true);
          setSearchError(null);
          const results = await onCustomSearch(query, selectedFilter);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          setSearchError(
            error instanceof Error ? error.message : 'An error occurred during search'
          );
        } finally {
          setIsSearching(false);
        }
      }
    };

    // Handle key press (Enter to search)
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    // Handle input focus
    const handleFocus = () => {
      setIsFocused(true);
      if (expandOnFocus) {
        setIsExpanded(true);
      }
      if (query) {
        setShowResults(true);
      }
    };

    // Handle input blur
    const handleBlur = () => {
      setIsFocused(false);
    };

    // Handle filter change
    const handleFilterChange = (filterType: SearchFilterType) => {
      setSelectedFilter(filterType);
      if (onFilterChange) {
        onFilterChange(filterType);
      }
    };

    // Handle result selection
    const handleResultClick = (result: SearchResult) => {
      if (onResultSelect) {
        onResultSelect(result);
      }
      setShowResults(false);
    };

    // Clear search input
    const handleClear = () => {
      setQuery('');
      setShowResults(false);
      if (onQueryChange) {
        onQueryChange('');
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Handle search icon click
    const handleSearchIconClick = () => {
      if (!isExpanded) {
        setIsExpanded(true);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 200);
      } else {
        handleSearch();
      }
    };

    // Render search icon
    const renderSearchIcon = () => (
      <SearchIconWrapper $size={size} onClick={handleSearchIconClick}>
        {/* Search icon (can be replaced with an actual icon component) */}
        🔍
      </SearchIconWrapper>
    );

    // Render clear button
    const renderClearButton = () =>
      query &&
      showClearButton && (
        <ActionButton $size={size} onClick={handleClear} aria-label="Clear search">
          {/* Clear icon (can be replaced with an actual icon component) */}✕
        </ActionButton>
      );

    // Render loading indicator
    const renderLoadingIndicator = () =>
      (isLoading || isSearching) && (
        <ActionButton $size={size} aria-label="Loading" style={{ cursor: 'default' }}>
          <LoadingSpinner />
        </ActionButton>
      );

    // Render filter buttons
    const renderFilterButtons = () =>
      showFilterButtons &&
      filterTypes.length > 0 && (
        <FilterContainer $animate={animate}>
          {filterTypes.map(filterType => (
            <FilterButton
              key={filterType}
              $size={size}
              $isActive={selectedFilter === filterType}
              onClick={() => handleFilterChange(filterType)}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </FilterButton>
          ))}
        </FilterContainer>
      );

    // Render results
    const renderResults = () => {
      if (!showResults) return null;

      if (isSearching) {
        return (
          <ResultsContainer $size={size} $animate={animate}>
            <EmptyState>
              <LoadingSpinner />
              <div style={{ marginTop: '8px' }}>Searching...</div>
            </EmptyState>
          </ResultsContainer>
        );
      }

      if (searchError || hasError) {
        return (
          <ResultsContainer $size={size} $animate={animate}>
            <EmptyState>
              <div>⚠️</div>
              <div>{errorMessage || searchError || 'An error occurred during search'}</div>
            </EmptyState>
          </ResultsContainer>
        );
      }

      if (query && searchResults.length === 0) {
        return (
          <ResultsContainer $size={size} $animate={animate}>
            <EmptyState>
              <div>No results found for "{query}"</div>
            </EmptyState>
          </ResultsContainer>
        );
      }

      if (searchResults.length > 0) {
        return (
          <ResultsContainer $size={size} $animate={animate}>
            {searchResults.map(result => (
              <ResultItem key={result.id} $size={size} onClick={() => handleResultClick(result)}>
                {result.imageUrl && <ResultImage src={result.imageUrl} alt={result.title} />}
                <ResultInfo>
                  <ResultTitle>{result.title}</ResultTitle>
                  {result.subtitle && <ResultSubtitle>{result.subtitle}</ResultSubtitle>}
                </ResultInfo>
                <ResultType>{result.type}</ResultType>
              </ResultItem>
            ))}
          </ResultsContainer>
        );
      }

      return null;
    };

    return (
      <SearchContainer
        ref={containerRef}
        $size={size}
        $variant={variant}
        $isExpanded={isExpanded}
        $animate={animate}
        $isCollapsible={expandOnFocus || collapseOnBlurIfEmpty}
        className={className}
        style={style}
      >
        <InputWrapper
          $size={size}
          $variant={variant}
          $isFocused={isFocused}
          $hasError={hasError || !!searchError}
        >
          {showSearchIcon && renderSearchIcon()}

          {isExpanded && (
            <StyledInput
              ref={inputRef}
              as="input"
              type="text"
              $size={size}
              value={query}
              onChange={handleQueryChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              autoFocus={autoFocus}
              {...props}
            />
          )}

          {renderClearButton()}
          {renderLoadingIndicator()}
        </InputWrapper>

        {isExpanded && renderFilterButtons()}
        {renderResults()}

        {(hasError || searchError) && !showResults && (
          <ErrorMessage>{errorMessage || searchError}</ErrorMessage>
        )}
      </SearchContainer>
    );
  }
);

Search.displayName = 'Search';
