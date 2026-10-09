# @scilent/icons

## 1.2.0

### Minor Changes

- 9e23d70: Add `withIconRef` / `IconWithRef` helpers: react-icons icons typed to accept a `ref` under @types/react 19 (ref-as-prop), where react-icons 5.x's `IconBaseProps` does not declare one. Fixes forwardRef-through-icon compile errors under React 19 types.

## 1.1.1

### Patch Changes

- cf22751: AccessibleIcon: labelled mode now sets role="img" so aria-label is valid (fixes axe
  aria-prohibited-attr violation).

## 1.1.0

### Minor Changes

- Publishing icons package and initializes in core components (IconButton, to start)
