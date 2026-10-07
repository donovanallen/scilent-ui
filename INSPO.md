# UI Inspo Backlog

Append one entry per item — never overwrite prior entries.

## 2026-10-06 — AudioUI by Cutoff (cutoff.dev + github.com/cutoff/audio-ui)

- **Source:** https://cutoff.dev · https://github.com/cutoff/audio-ui
- **What it is:** tool — direct competitor/peer: React audio/MIDI UI library (Knob, Slider, Button, CycleButton, Keys, film-strip/bitmap controls, low-level control primitives), framework-agnostic core (`@cutoff/audio-ui-core`) + React wrapper, dev-preview stage.
- **Why it's interesting:** it's scilent-ui's closest mirror — same niche, same hybrid architecture instinct, and it proves the "audio parameter model" framing (log/exp scaling, bipolar, step quantization, MIDI) sells a component library.
- **Fit verdict:** strong fit — squarely in-lane; treat as competitive benchmark, not code source (GPL-3.0 + commercial dual license — zero code/registry-content reuse, patterns and docs ideas only).
- **Recommendation:** docs/site-inspo (primary) + roadmap signal
  - Borrow for Phase 2 docs: llms.txt index + `.md`-per-page docs (LLM-consumable docs is a cheap, high-signal differentiator to match), CDN sandbox template for one-file demos, Discord/Discussions-driven community setup.
  - Architecture signal: their core/react split + `AudioControlEvent` value model + CSS-var theming (`--audioui-unit`, `.dark` class) validate our npm + registry hybrid; note their "primitives + opinionated components" two-tier API as prior art for our Slider/transport roadmap.
  - Licensing signal: dual GPL/commercial is one monetization path; our MIT + pro-blocks plan remains distinct — worth a one-line positioning note vs. them in PLAN.md later.
  - Deps weight n/a (not a registry-candidate; do not depend on it).
- **Effort:** S (docs-site ideas only; no build from this intake)
- **Status:** backlog
