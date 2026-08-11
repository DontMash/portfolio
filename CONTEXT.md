# Frontend interaction context

This context defines the vocabulary for the portfolio's browser interactions and their migration boundaries.

## UI architecture

**Visual component**:
The user-facing presentation and interaction contract for a reusable interface element.
_Avoid_: widget, control

**Primitive layer**:
The lower-level interaction and accessibility foundation from which visual components are composed.
_Avoid_: component library, design system

**Interactive surface**:
A user-visible region whose behavior and state form one coherent interaction, such as an accordion, dropdown, theme selector, or captcha.
_Avoid_: page, frontend feature

**Frontend interaction layer**:
The complete set of browser-side behavior that makes the portfolio's interactive surfaces respond to users.
_Avoid_: frontend runtime, client application

**Behavior parity**:
Preservation of an interactive surface's observable behavior during migration, except for an explicitly reviewed improvement.
_Avoid_: implementation parity

**Visual language**:
The portfolio's shared vocabulary of appearance and composition, including its visual treatment, semantic colors, spacing, typography, and interaction states.
_Avoid_: theme, styling system

**Shared interaction state**:
Browser-side state that must remain consistent across independently interactive surfaces, such as the user's theme preference.
_Avoid_: global state, application state

**Theme preference**:
The user's selected display mode: Light, Dark, or Auto.
_Avoid_: effective theme

**Effective theme**:
The actual Light or Dark display mode resolved from the theme preference and, for Auto, the operating system preference.
_Avoid_: theme setting
