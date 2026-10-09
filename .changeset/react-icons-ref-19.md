---
'@scilent/icons': minor
---

Add `withIconRef` / `IconWithRef` helpers: react-icons icons typed to accept a `ref` under @types/react 19 (ref-as-prop), where react-icons 5.x's `IconBaseProps` does not declare one. Fixes forwardRef-through-icon compile errors under React 19 types.
