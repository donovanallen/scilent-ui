import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { Timestamp } from '../Timestamp/Timestamp';
import { AlbumArtwork } from '../Artwork/AlbumArtwork';
import { MetadataLabel } from '../MetadataLabel/MetadataLabel';
import { ArtistLabel } from '../ArtistLabel/ArtistLabel';
import styled from 'styled-components';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Basic slider example
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div style={{ width: '300px' }}>
        <Slider value={value} onValueChange={setValue} min={0} max={100} step={1} />
      </div>
    );
  },
};

// Different size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>Small</p>
        <Slider value={[25]} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Medium (default)</p>
        <Slider value={[50]} size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Large</p>
        <Slider value={[75]} size="lg" />
      </div>
    </div>
  ),
};

// Different style variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>Default</p>
        <Slider value={[60]} variant="default" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Minimal</p>
        <Slider value={[60]} variant="minimal" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Gradient</p>
        <Slider value={[60]} variant="gradient" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Custom</p>
        <Slider
          value={[60]}
          variant="custom"
          colors={{
            track: '#e2e8f0',
            range: '#10b981',
            thumb: '#10b981',
          }}
        />
      </div>
    </div>
  ),
};

// Thumb variants
export const ThumbVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>Default</p>
        <Slider value={[60]} thumbVariant="default" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Dot</p>
        <Slider value={[60]} thumbVariant="dot" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Line</p>
        <Slider value={[60]} thumbVariant="line" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Square</p>
        <Slider value={[60]} thumbVariant="square" />
      </div>
    </div>
  ),
};

// Thumb visibility options
export const ThumbVisibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>Always visible (default)</p>
        <Slider value={[60]} thumbVisibility="always" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Visible on hover (hover over slider)</p>
        <Slider value={[60]} thumbVisibility="hover" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Visible when active (click or focus)</p>
        <Slider value={[60]} thumbVisibility="active" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Never visible</p>
        <Slider value={[60]} thumbVisibility="never" />
      </div>
    </div>
  ),
};

// With tooltip
export const WithTooltip: Story = {
  render: () => {
    const [value, setValue] = useState([35]);

    return (
      <div style={{ width: '300px' }}>
        <Slider
          value={value}
          onValueChange={setValue}
          showTooltip={true}
          formatTooltip={(value: number) => `${value}%`}
        />
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          Try dragging the thumb to see the tooltip
        </div>
      </div>
    );
  },
};

// With tick marks and labels
export const WithTicksAndLabels: Story = {
  render: () => {
    const [value, setValue] = useState([40]);

    return (
      <div style={{ width: '300px', marginBottom: '40px' }}>
        <Slider
          value={value}
          onValueChange={setValue}
          showTicks={true}
          tickCount={5}
          showLabels={true}
          formatLabel={(value: number) => `${value}%`}
        />
      </div>
    );
  },
};

// Vertical orientation
export const VerticalSlider: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      <Slider value={[60]} orientation="vertical" showTooltip={true} />
    </div>
  ),
};

// With buffer (e.g., for audio/video loading)
export const WithBuffer: Story = {
  render: () => {
    const [value, setValue] = useState([30]);
    const bufferValue = 70;

    return (
      <div style={{ width: '300px' }}>
        <Slider
          value={value}
          onValueChange={setValue}
          bufferValue={bufferValue}
          showBuffer={true}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
          <div>Playback: {value[0]}%</div>
          <div>Buffered: {bufferValue}%</div>
        </div>
      </div>
    );
  },
};

// Minimal slider example (like in the screenshot)
export const MinimalSlider: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div
        style={{ width: '300px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}
      >
        <Slider
          value={value}
          onValueChange={setValue}
          variant="minimal"
          thumbVariant="dot"
          colors={{
            track: 'rgba(99, 102, 241, 0.1)',
            range: '#6366f1',
            thumb: '#6366f1',
          }}
        />
      </div>
    );
  },
};

// Interactive music player example
// const MusicPlayerContainer = styled.div`
//   width: 400px;
//   padding: 20px;
//   background-color: #f8fafc;
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
// `;

// const PlayerControls = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 16px;
// `;

// const FlexRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
// `;

// const TrackInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
// `;

// export const MusicPlayerExample: Story = {
//   render: () => {
//     const [position, setPosition] = useState([45]);
//     const duration = 217; // 3:37 in seconds

//     return (
//       <MusicPlayerContainer>
//         <FlexRow>
//           <AlbumArtwork
//             image="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFsYnVtJTIwY292ZXJ8ZW58MHx8MHx8fDA%3D"
//             name="Album Title"
//             size="sm"
//           />
//           <TrackInfo>
//             <MetadataLabel
//               text="Track Title"
//               style={{ fontWeight: 'bold', fontSize: '16px' }}
//             />
//             <ArtistLabel
//               artists={["Artist Name"]}
//               style={{ fontSize: '14px', color: '#6b7280' }}
//             />
//           </TrackInfo>
//         </FlexRow>

//         <div style={{ margin: '20px 0 8px' }}>
//           <Slider
//             value={position}
//             onValueChange={setPosition}
//             max={duration}
//             bufferValue={duration * 0.8}
//             showBuffer={true}
//             variant="minimal"
//             thumbVariant="dot"
//             thumbVisibility="hover"
//             optimizePerformance={true}
//           />
//         </div>

//         <PlayerControls>
//           <Timestamp
//             value={position[0]}
//             format="duration"
//             variant="muted"
//             size="sm"
//           />
//           <Timestamp
//             value={duration}
//             format="duration"
//             variant="muted"
//             size="sm"
//           />
//         </PlayerControls>
//       </MusicPlayerContainer>
//     );
//   },
// };

// Advanced themed player example
// const ThemedPlayerContainer = styled.div`
//   width: 450px;
//   padding: 24px;
//   background: linear-gradient(135deg, #1e293b, #0f172a);
//   border-radius: 16px;
//   color: white;
// `;

// const AlbumContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   margin-bottom: 24px;
// `;

// const TrackDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 8px;
// `;

// const ProgressContainer = styled.div`
//   margin-bottom: 8px;
// `;

// const TimeDisplay = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 24px;
// `;

// const ControlsContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 24px;
//   align-items: center;
// `;

// const PlayButton = styled.button`
//   width: 48px;
//   height: 48px;
//   border-radius: 50%;
//   background-color: #3b82f6;
//   color: white;
//   border: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: #2563eb;
//     transform: scale(1.05);
//   }
// `;

// const ControlButton = styled.button`
//   background: none;
//   border: none;
//   color: #94a3b8;
//   cursor: pointer;
//   transition: color 0.2s ease;

//   &:hover {
//     color: white;
//   }
// `;

// export const ThemedMusicPlayer: Story = {
//   render: () => {
//     const [position, setPosition] = useState([125]);
//     const duration = 248; // 4:08 in seconds

//     return (
//       <ThemedPlayerContainer>
//         <AlbumContainer>
//           <AlbumArtwork
//             image="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFsYnVtJTIwY292ZXJ8ZW58MHx8MHx8fDA%3D"
//             name="Album Title"
//             size="base"
//             shadow={true}
//             platform="default"
//           />
//           <TrackDetails>
//             <MetadataLabel
//               text="Midnight Serenade"
//               style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}
//             />
//             <ArtistLabel
//               artists={["Luna Eclipse", "Stellar Waves"]}
//               style={{ fontSize: '16px', color: '#94a3b8' }}
//             />
//             <MetadataLabel
//               text="Cosmic Journey"
//               style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}
//             />
//           </TrackDetails>
//         </AlbumContainer>

//         <ProgressContainer>
//           <Slider
//             value={position}
//             onValueChange={setPosition}
//             max={duration}
//             bufferValue={duration * 0.9}
//             showBuffer={true}
//             variant="gradient"
//             thumbVariant="square"
//             colors={{
//               track: 'rgba(255, 255, 255, 0.1)',
//               range: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
//               thumb: '#8b5cf6',
//             }}
//             showTooltip={true}
//             formatTooltip={(value: number) => {
//               const minutes = Math.floor(value / 60);
//               const seconds = Math.floor(value % 60);
//               return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//             }}
//           />
//         </ProgressContainer>

//         <TimeDisplay>
//           <Timestamp
//             value={position[0]}
//             format="duration"
//             variant="contrast"
//             size="sm"
//           />
//           <Timestamp
//             value={duration}
//             format="duration"
//             variant="muted"
//             size="sm"
//           />
//         </TimeDisplay>

//         <ControlsContainer>
//           <ControlButton>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M19 6L9 12L19 18V6Z" fill="currentColor" />
//               <path d="M5 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//             </svg>
//           </ControlButton>

//           <PlayButton>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
//             </svg>
//           </PlayButton>

//           <ControlButton>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M5 6L15 12L5 18V6Z" fill="currentColor" />
//               <path d="M19 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//             </svg>
//           </ControlButton>
//         </ControlsContainer>
//       </ThemedPlayerContainer>
//     );
//   },
// };

// Podcast player example
// const PodcastPlayerContainer = styled.div`
//   width: 500px;
//   padding: 20px;
//   background-color: white;
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//   font-family: system-ui, -apple-system, sans-serif;
// `;

// const PodcastHeader = styled.div`
//   display: flex;
//   gap: 16px;
//   margin-bottom: 20px;
// `;

// const PodcastInfo = styled.div`
//   flex: 1;
// `;

// const PodcastTitle = styled.h3`
//   margin: 0 0 8px 0;
//   font-size: 18px;
//   font-weight: 600;
// `;

// const PodcastMeta = styled.div`
//   color: #6b7280;
//   font-size: 14px;
//   margin-bottom: 4px;
// `;

// const TimeInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 20px;
//   font-family: monospace;
// `;

// const TimeValue = styled.div<{ $align?: 'left' | 'right' }>`
//   min-width: 60px;
//   text-align: ${props => props.$align || 'left'};
// `;

// const SpeedControl = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-top: 16px;
// `;

// const SpeedButton = styled.button<{ $active?: boolean }>`
//   padding: 4px 8px;
//   border-radius: 4px;
//   border: 1px solid ${props => props.$active ? '#3b82f6' : '#e5e7eb'};
//   background-color: ${props => props.$active ? '#eff6ff' : 'white'};
//   color: ${props => props.$active ? '#3b82f6' : '#6b7280'};
//   font-size: 12px;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover {
//     border-color: #3b82f6;
//     color: #3b82f6;
//   }
// `;

// export const PodcastPlayer: Story = {
//   render: () => {
//     const [position, setPosition] = useState([1800]); // 30 minutes in
//     const duration = 3600; // 1 hour in seconds

//     return (
//       <PodcastPlayerContainer>
//         <PodcastHeader>
//           <AlbumArtwork
//             image="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBvZGNhc3R8ZW58MHx8MHx8fDA%3D"
//             name="Podcast Cover"
//             size="sm"
//             borderRadius="8px"
//           />
//           <PodcastInfo>
//             <PodcastTitle>The Future of Technology</PodcastTitle>
//             <PodcastMeta>Tech Insights Podcast • Episode 42</PodcastMeta>
//             <PodcastMeta>
//               <Timestamp
//                 value={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
//                 format="relative"
//                 variant="muted"
//                 size="sm"
//               />
//             </PodcastMeta>
//           </PodcastInfo>
//         </PodcastHeader>

//         <div style={{ marginBottom: '12px' }}>
//           <Slider
//             value={position}
//             onValueChange={setPosition}
//             max={duration}
//             bufferValue={duration * 0.6}
//             showBuffer={true}
//             showTicks={true}
//             tickCount={7}
//             variant="minimal"
//             thumbVariant="dot"
//             colors={{
//               track: '#f3f4f6',
//               range: '#6366f1',
//               thumb: '#6366f1',
//             }}
//             showTooltip={true}
//             formatTooltip={(value: number) => {
//               const hours = Math.floor(value / 3600);
//               const minutes = Math.floor((value % 3600) / 60);
//               const seconds = Math.floor(value % 60);
//               return hours > 0
//                 ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
//                 : `${minutes}:${seconds.toString().padStart(2, '0')}`;
//             }}
//           />
//         </div>

//         <TimeInfo>
//           <TimeValue>
//             <Timestamp
//               value={position[0]}
//               format="duration"
//               variant="default"
//               size="sm"
//             />
//           </TimeValue>
//           <TimeValue $align="right">
//             <Timestamp
//               value={duration - position[0]}
//               format="duration"
//               variant="muted"
//               size="sm"
//             />
//           </TimeValue>
//         </TimeInfo>

//       </PodcastPlayerContainer>
//     );
//   },
// };
