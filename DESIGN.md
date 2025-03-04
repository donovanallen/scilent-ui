# Scilent UI Design Guidelines

- [Scilent UI Design Guidelines](#scilent-ui-design-guidelines)
  - [Introduction](#introduction)
  - [Supported Platforms](#supported-platforms)
    - [Apple Music](#apple-music)
      - [Platform Guidelines](#platform-guidelines)
    - [Spotify](#spotify)
      - [Platform Guidelines](#platform-guidelines-1)
    - [Tidal](#tidal)
      - [Platform Guidelines](#platform-guidelines-2)
  - [Scilent UI Design Principles](#scilent-ui-design-principles)
    - [Accessibility](#accessibility)
      - [Visual Accessibility](#visual-accessibility)
      - [Interaction Accessibility](#interaction-accessibility)
      - [Cognitive Accessibility](#cognitive-accessibility)
    - [Color](#color)
      - [Theming](#theming)
    - [Typography](#typography)
      - [Type Scale](#type-scale)
      - [Platform Overrides](#platform-overrides)
      - [Responsiveness](#responsiveness)
    - [Iconography \& Controls](#iconography--controls)
    - [Artwork](#artwork)
      - [Album Artwork](#album-artwork)
    - [Layout \& Navigation](#layout--navigation)
      - [Content Organization](#content-organization)
  - [References](#references)
    - [Platforms](#platforms)
    - [Design Systems](#design-systems)
    - [General](#general)
  - [Roadmap](#roadmap)
  - [Version History](#version-history)

---

## Introduction

_This document outlines an approach to designing and developing unified, consistent user interfaces integrated with multiple major music platforms. By understanding and respecting the design languages of these platforms, we can create experiences that support and feel native to each while maintaining a distinct identity._

---

## Supported Platforms

This library currently supports and explores integration with the following platforms:

- [Apple Music](https://www.apple.com/music/)
- [Spotify](https://www.spotify.com/)
- [Tidal](https://tidal.com/)

### Apple Music

ℹ️ **Why?** Included due to its significant market share, especially among iOS users, and its high-quality streaming options.

#### Platform Guidelines

Apple Music embodies Apple's premium, minimalist aesthetic with:

- Light-themed UI by default with dark mode as an option
- SF Pro typography, never substituted
- Subtle red-to-pink gradient used primarily for branding, not UI elements
  Thin, uniform icons from SF Symbols with slight rounding
- Flat, minimalist controls without excessive ornamentation
- Generous use of whitespace to create an airy, premium feel
  Strict preservation of album artwork and artist imagery

### Spotify

ℹ️ **Why?** Selected for its market dominance and robust API that allows deep integration with third-party applications.

#### Platform Guidelines

Spotify's design emphasizes discovery and accessibility through:

- Dark-themed UI by default
- Bold, minimalist icons and controls
- High-contrast green accents (#1DB954) used sparingly for highlighting actions
- Circular typeface (or system fonts as alternatives)
- Strong focus on playlist creation and music discovery
- Album artwork presented in its original form without modifications

### Tidal

ℹ️ **Why?** Chosen for its audiophile-focused approach and to ensure Scilent appeals to users who prioritize sound quality above all else.

#### Platform Guidelines

Tidal distinguishes itself with a focus on high-fidelity and premium experience through:

- Dark-themed UI by default
- Monochromatic color scheme with occasional blue highlights
- Gotham typeface providing a modern, strong presence
- Simple, geometric icons
- Emphasis on high-resolution imagery and lossless quality
- Premium feel reinforced through subtle animations
- Album-oriented browsing experience

---

## Scilent UI Design Principles

Scilent UI aims to acknowledge the unique characteristics of each platform while allowing for the creation of both fully unified and easily customizable digital music experiences.

### Accessibility

Experiencing music includes not just listening to it, but also learning about it, exploring it, and interacting with it. The entirety of that experience should be accessible to all.

Accessibilty is a core principle of every Scilent UI decision, component, tool, and implementation.

#### Visual Accessibility

- WCAG 2.1 AA compliance as a minimum standard
- Strong color contrast (minimum 4.5:1 for normal text, 3:1 for large text)
- Support for system font size adjustments
- Screen reader compatibility with appropriate ARIA labels

#### Interaction Accessibility

- Keyboard navigation support for desktop
- Touch targets sized appropriately (minimum 44×44px)
- Gesture alternatives for critical actions
- Reduced motion option for animations

#### Cognitive Accessibility

- Clear, consistent navigation patterns
- Appropriate loading states and feedback
- Error messages that suggest solutions
- Progressive disclosure of complex features

### Color

Scilent adopts a flexible approach to color that respects user preferences and platform conventions, but also allows for full customization when needed.

#### Theming

Scilent UI theme options include:

- Support for default, accent, and functional (success, error, warning, info, etc.) colors
- Default dark and light themes
- Platform-specific themes for ultimate compatibility/compliance
- A system theme option that follows the user's device settings
- Custom theming options for advanced customization

### Typography

Scilent UI supports a default set of typography options that can be customized as needed, as well as some platform-specific overrides.

#### Type Scale

Primary headings: 24px, weight 600
Secondary headings: 20px, weight 600
Tertiary headings: 16px, weight 600
Body text: 14px, weight 400
Small text/captions: 12px, weight 400

#### Platform Overrides

Apple Music: Slightly decreased font weight (default to 400 instead of 500)
Spotify: Slightly increased letter spacing (+0.2px)
Tidal: Slightly increased font weight for headings (600 instead of 500)

#### Responsiveness

- Text sizes must scale proportionally on smaller screens
- Minimum body text size of 12px to ensure readability

### Iconography & Controls

_Coming soon_

### Artwork

Preserving the integrity of music artwork is paramount across all platforms:

#### Album Artwork

- Never crop, filter, or modify album artwork
- Display at highest available resolution
- Maintain original aspect ratio (typically square)
- Optional subtle shadows to help artwork stand out against backgrounds

<!-- TODO: #### Artist Imagery
Coming soon -->

<!-- TODO: #### Collections & Playlists
Coming soon -->

### Layout & Navigation

#### Content Organization

- Adaptable grid system that adjusts density based on device and platform context

<!-- TODO: ### Interactions & Animations
Coming soon -->

<!-- TODO: ### Platform Integration
#### Components
#### Utilities
#### Tools & Resources -->

---

<!-- ## Implementation
Coming soon -->

<!-- ## Customization
Coming soon -->

<!-- ## Resources
Coming soon -->

<!-- --- -->

## References

### Platforms

[Spotify Design Guidelines](https://spotify.design/)
[Spotify Developer Documentation](https://developer.spotify.com/)

[Apple Music Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/macos/)
[Apple Music Developer Documentation](https://developer.apple.com/music/)

[Tidal Design Guidelines](https://tidal.com/design)
[Tidal Developer Documentation](https://tidal.com/developer)

### Design Systems

[Radix UI](https://www.radix-ui.com/primitives/)
[Apple Design System](https://developer.apple.com/design/human-interface-guidelines/macos/)

### General

[Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## Roadmap

_Coming soon._

---

## Version History

**1.0** - _Initial release of Scilent UI Design Guidelines_

<!-- ## License -->
