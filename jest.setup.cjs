// Add any global test setup here
require('@testing-library/jest-dom');

// Mock matchMedia for components that use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// ---- Audio / media mocks (jsdom lacks both) -------------------------------
// HTMLMediaElement: enough surface for components using <audio>/<video>.
class MockHTMLMediaElement {
  constructor() {
    this.paused = true;
    this.currentTime = 0;
    this.duration = NaN;
    this.volume = 1;
    this.muted = false;
    this.playbackRate = 1;
    this.readyState = 4;
    this._listeners = {};
  }
  addEventListener(type, fn) {
    (this._listeners[type] ||= []).push(fn);
  }
  removeEventListener(type, fn) {
    this._listeners[type] = (this._listeners[type] || []).filter(f => f !== fn);
  }
  _emit(type) {
    (this._listeners[type] || []).forEach(fn => fn.call(this, { type }));
  }
  play() {
    this.paused = false;
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
  load() {}
  canPlayType() {
    return 'probably';
  }
}

Object.defineProperty(window, 'HTMLMediaElement', {
  writable: true,
  value: MockHTMLMediaElement,
});

// AudioContext (Web Audio) — a minimal but callable stub; individual tests can
// mock their component's audio module with jest.spyOn for finer control.
class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.destination = {};
    this.state = 'running';
    this.sampleRate = 44100;
  }
  createGain() {
    return {
      gain: { value: 1, setValueAtTime: jest.fn(), linearRampToValueAtTime: jest.fn() },
      connect: jest.fn(),
      disconnect: jest.fn(),
    };
  }
  createOscillator() {
    return {
      frequency: { value: 440, setValueAtTime: jest.fn(), linearRampToValueAtTime: jest.fn() },
      type: 'sine',
      connect: jest.fn(),
      disconnect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
    };
  }
  createAnalyser() {
    return {
      fftSize: 2048,
      frequencyBinCount: 1024,
      getByteFrequencyData: jest.fn(),
      getByteTimeDomainData: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
    };
  }
  createBuffer() {
    return { getChannelData: () => new Float32Array(1) };
  }
  createBufferSource() {
    return { connect: jest.fn(), disconnect: jest.fn(), start: jest.fn(), stop: jest.fn() };
  }
  decodeAudioData() {
    return Promise.resolve(this.createBuffer());
  }
  resume() {
    return Promise.resolve();
  }
  close() {
    return Promise.resolve();
  }
}

Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: MockAudioContext,
});
Object.defineProperty(window, 'webkitAudioContext', {
  writable: true,
  value: MockAudioContext,
});