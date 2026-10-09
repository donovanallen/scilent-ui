/**
 * react-icons × @types/react 19 compatibility helper.
 *
 * FRICTION (react-icons 5.x under @types/react >= 19):
 * React 19 requires function components to declare `ref` in their props type
 * ("ref as a prop"). react-icons types its icons as `FC<IconBaseProps>` and
 * `IconBaseProps` does NOT declare `ref`, so forwarding a ref through a
 * react-icons icon fails to compile under React 19 types:
 *
 *   const RefForwarder = forwardRef<SVGSVGElement, { icon: IconType }>(
 *     ({ icon: I }, ref) => <I ref={ref} /> // TS2322: 'ref' does not exist on
 *   );                                      // type 'IntrinsicAttributes & IconBaseProps'
 *
 * WORKAROUND: this module widens the props type to include an optional ref and
 * casts once, in one audited place. Cast through `unknown` because the types
 * overlap but are not assignable in either direction.
 */

import React from 'react';
import type { IconType } from 'react-icons';

export type IconWithRefProps = React.ComponentProps<IconType> & {
  ref?: React.Ref<SVGSVGElement>;
};

/** A react-icons icon that accepts a ref (usable directly with forwardRef). */
export type IconWithRef = React.FC<IconWithRefProps>;

/**
 * Widen a react-icons component so it accepts a ref under React 19 types.
 * Runtime behavior is unchanged — react-icons passes props straight to its
 * <svg>, which receives the ref normally.
 *
 *   const PlayRef = withIconRef(FiPlay);
 *   const El = forwardRef<SVGSVGElement, {}>((_, ref) => <PlayRef ref={ref} />);
 */
export function withIconRef(icon: IconType): IconWithRef {
  return icon as unknown as IconWithRef;
}
