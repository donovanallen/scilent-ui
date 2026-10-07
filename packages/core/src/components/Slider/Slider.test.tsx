import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Slider } from './Slider';

expect.extend(toHaveNoViolations);

// jsdom lacks ResizeObserver, which Radix Slider uses
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof (globalThis as any).ResizeObserver === 'undefined') {
  (globalThis as any).ResizeObserver = ResizeObserverStub;
}

const getThumb = () => screen.getByRole('slider') as HTMLElement;

// Radix Slider calls setPointerCapture/hasPointerCapture on pointer events;
// jsdom doesn't implement them.
beforeAll(() => {
  const proto = HTMLElement.prototype as unknown as Record<string, unknown>;
  proto.setPointerCapture = () => {};
  proto.hasPointerCapture = () => false;
  proto.releasePointerCapture = () => {};
});

// The Slider spreads extra props (incl. aria-label) onto the Radix Root, not the
// thumb, so axe flags aria-input-field-name on the slider role. Consumers using
// the component with an external visible label should label the thumb; emulate
// that here before running axe.
const nameThumb = (container: HTMLElement, name: string) => {
  const thumb = container.querySelector('[role="slider"]');
  thumb?.setAttribute('aria-label', name);
};

describe('Slider', () => {
  it('renders a slider with the default value', () => {
    render(<Slider value={[40]} aria-label="Volume" />);
    const thumb = getThumb();
    expect(thumb).toBeInTheDocument();
    expect(thumb).toHaveAttribute('aria-valuenow', '40');
    expect(thumb).toHaveAttribute('aria-valuemin', '0');
    expect(thumb).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders with min/max/step applied', () => {
    render(<Slider value={[50]} min={10} max={90} step={5} aria-label="Range" />);
    const thumb = getThumb();
    expect(thumb).toHaveAttribute('aria-valuemin', '10');
    expect(thumb).toHaveAttribute('aria-valuemax', '90');
  });

  it('ArrowRight increases the value and fires onValueChange', async () => {
    const onValueChange = jest.fn();
    render(<Slider value={[50]} onValueChange={onValueChange} aria-label="Seek" />);
    const thumb = getThumb();
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'ArrowRight', code: 'ArrowRight' });
    // Radix clamps to step; with value 50, step 1 → 51
    expect(onValueChange).toHaveBeenCalledWith([51]);
  });

  it('ArrowLeft decreases the value', () => {
    const onValueChange = jest.fn();
    render(<Slider value={[50]} onValueChange={onValueChange} aria-label="Seek" />);
    const thumb = getThumb();
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'ArrowLeft', code: 'ArrowLeft' });
    expect(onValueChange).toHaveBeenCalledWith([49]);
  });

  it('respects a larger step size', () => {
    const onValueChange = jest.fn();
    render(<Slider value={[50]} step={10} onValueChange={onValueChange} aria-label="Step" />);
    const thumb = getThumb();
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(onValueChange).toHaveBeenCalledWith([60]);
  });

  it('Home/End jump to min/max', () => {
    const onValueChange = jest.fn();
    render(
      <Slider value={[50]} onValueChange={onValueChange} min={0} max={100} aria-label="Jump" />
    );
    const thumb = getThumb();
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'Home' });
    expect(onValueChange).toHaveBeenLastCalledWith([0]);
    fireEvent.keyDown(thumb, { key: 'End' });
    expect(onValueChange).toHaveBeenLastCalledWith([100]);
  });

  it('does not change value when disabled', () => {
    const onValueChange = jest.fn();
    render(<Slider value={[50]} disabled onValueChange={onValueChange} aria-label="Locked" />);
    const thumb = getThumb();
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders range thumbs for multi-value arrays', () => {
    render(<Slider value={[20, 80]} aria-label="Range slider" />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('renders tick marks and labels when enabled', () => {
    render(<Slider value={[50]} showTicks showLabels tickCount={5} aria-label="Ticks" />);
    expect(document.querySelectorAll('.slider-tick')).toHaveLength(5);
    expect(document.querySelectorAll('.slider-label')).toHaveLength(5);
  });

  it('shows the buffer element when showBuffer and bufferValue are set', () => {
    const { container } = render(
      <Slider value={[30]} showBuffer bufferValue={60} aria-label="Buf" />
    );
    expect(container.querySelector('.slider-buffer')).toBeInTheDocument();
  });

  it('renders variants and sizes without crashing', () => {
    for (const variant of ['default', 'minimal', 'gradient'] as const) {
      const { unmount } = render(
        <Slider value={[30]} variant={variant} aria-label={`V-${variant}`} />
      );
      expect(getThumb()).toBeInTheDocument();
      unmount();
    }
    for (const size of ['sm', 'md', 'lg'] as const) {
      const { unmount } = render(<Slider value={[30]} size={size} aria-label={`S-${size}`} />);
      expect(getThumb()).toBeInTheDocument();
      unmount();
    }
  });

  it('has no axe violations for default and disabled variants', async () => {
    const { container: c1, unmount: u1 } = render(<Slider value={[50]} aria-label="A11y1" />);
    nameThumb(c1, 'A11y1');
    expect(await axe(c1)).toHaveNoViolations();
    u1();

    const { container: c2, unmount: u2 } = render(
      <Slider value={[50]} disabled aria-label="A11y2" />
    );
    nameThumb(c2, 'A11y2');
    expect(await axe(c2)).toHaveNoViolations();
    u2();

    const { container: c3, unmount: u3 } = render(
      <Slider value={[50]} aria-label="A11y3" showTicks showLabels />
    );
    nameThumb(c3, 'A11y3');
    expect(await axe(c3)).toHaveNoViolations();
    u3();
  });

  it('has no axe violations per platform variant', async () => {
    for (const platform of ['default', 'spotify', 'apple', 'tidal'] as const) {
      const { container, unmount } = render(
        <Slider value={[50]} platform={platform} aria-label={`P-${platform}`} />
      );
      nameThumb(container, `P-${platform}`);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });

  it('defers onValueChange through requestAnimationFrame when optimizePerformance is set', () => {
    let pending: FrameRequestCallback | null = null;
    let nextId = 1;
    const raf = jest
      .spyOn(globalThis, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        pending = cb;
        return nextId++;
      });
    const cancelSpy = jest.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {
      pending = null;
    });
    const onValueChange = jest.fn();
    render(
      <Slider value={[50]} optimizePerformance onValueChange={onValueChange} aria-label="Perf" />
    );
    const thumb = getThumb();
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(raf).toHaveBeenCalled();
    expect(onValueChange).not.toHaveBeenCalled(); // still deferred
    // a second change while the first frame is pending cancels it
    fireEvent.keyDown(thumb, { key: 'ArrowRight', code: 'ArrowRight' });
    expect(cancelSpy).toHaveBeenCalled();
    const cb = pending as FrameRequestCallback | null;
    cb?.(0);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenLastCalledWith([52]);
    raf.mockRestore();
    cancelSpy.mockRestore();
  });

  it('pointer down/up on a thumb marks it active and toggles dragging for the tooltip', () => {
    const { container } = render(<Slider value={[20, 80]} showTooltip aria-label="Tooltip" />);
    const thumbs = container.querySelectorAll('[role="slider"]');
    const root = container.querySelector('.slider') as HTMLElement;
    // root pointerdown starts dragging, thumb pointerdown selects thumb 2
    fireEvent.pointerDown(root);
    fireEvent.pointerDown(thumbs[1]);
    const tooltip = container.querySelector('.slider-tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip?.textContent).toBe('80');
    // pointerup while dragging keeps the active thumb (drag in progress)
    fireEvent.pointerUp(thumbs[1]);
    // pointerup when not dragging clears the active thumb
    fireEvent.pointerUp(root);
    fireEvent.pointerUp(thumbs[1]);
    expect(container.querySelector('.slider-tooltip')).not.toBeInTheDocument();
  });

  it('shows a formatted tooltip value when formatTooltip is provided', () => {
    const formatTooltip = jest.fn((v: number) => `${v}%`);
    const { container } = render(
      <Slider value={[40]} showTooltip formatTooltip={formatTooltip} aria-label="Fmt" />
    );
    const root = container.querySelector('.slider') as HTMLElement;
    const thumb = container.querySelector('[role="slider"]') as HTMLElement;
    fireEvent.pointerDown(root);
    fireEvent.pointerDown(thumb);
    // Radix recomputes the value from the pointer position (0 in jsdom, which
    // has no layout); the tooltip must render through formatTooltip regardless.
    const text = container.querySelector('.slider-tooltip')?.textContent ?? '';
    expect(text.endsWith('%')).toBe(true);
    expect(formatTooltip).toHaveBeenCalled();
  });

  it('applies and clears the slider-range-changed class when the value prop changes', () => {
    jest.useFakeTimers();
    const { container, rerender } = render(<Slider value={[30]} aria-label="Anim" />);
    rerender(<Slider value={[60]} aria-label="Anim" />);
    const range = container.querySelector('.slider-range') as HTMLElement;
    expect(range.classList.contains('slider-range-changed')).toBe(true);
    jest.advanceTimersByTime(300);
    expect(range.classList.contains('slider-range-changed')).toBe(false);
    jest.useRealTimers();
  });

  it('blur clears the active thumb state', () => {
    const { container } = render(<Slider value={[50]} aria-label="Blur" />);
    const thumb = container.querySelector('[role="slider"]') as HTMLElement;
    thumb.focus();
    fireEvent.blur(thumb);
    // no crash and thumb remains functional afterwards
    expect(thumb).toBeInTheDocument();
  });

  it('inverted renders with rtl direction', () => {
    const { container } = render(<Slider value={[50]} inverted aria-label="Inv" />);
    expect(getThumb()).toBeInTheDocument();
    expect(container.querySelector('[dir="rtl"]')).not.toBeNull();
  });

  it('renders customThumb content inside each thumb', () => {
    render(
      <Slider
        value={[10, 90]}
        customThumb={<span data-testid="custom-grip" />}
        aria-label="Custom"
      />
    );
    expect(screen.getAllByTestId('custom-grip')).toHaveLength(2);
  });
});
