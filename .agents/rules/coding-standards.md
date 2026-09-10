---
trigger: always_on
---

# Quantum Engineering & Agent Architecture Directives
# Target Project: Project Quantum App

> *"Clean, literate code that reads like poetry to both humans and AI."*
> Mandatory architectural directives for AI Agents operating on Project Quantum App. Strictly enforce these standards on every code generation, refactor, and review pass.

---

## 1. The Quantum-Atomic Architecture Protocol

### A. Strict Hard Line Limits & Monolith Decomposition
- **File Line Limit**: Hard ceiling of 500 lines per file. Never generate or expand files beyond this limit.
- **Molecule Capsule Limit**: Maximum 100 lines per molecule capsule file.
- **Immediate Decomposition**: When any file approaches 500 lines, immediately halt feature additions and decompose into atomic molecules, organisms, composable hooks, or dedicated stores.

### B. Table-of-Contents Views
- Top-level page views MUST NEVER contain hundreds of lines of nested DOM scaffolding.
- A view template MUST read like a clean, 10 to 20 line declarative Table of Contents assembling self-contained molecules and organisms via named slot templates (`#header`, `#default`, `#modals`).

### C. Crystalline Molecule Capsules
- Every molecule and organism lives in an isolated, self-contained directory capsule:
  ```
  m-<feature>-card/
  ├── m-<feature>-card.<ext>          (< 100 lines: declarative layout & bindings)
  ├── m-<feature>-card.controller.ts  (pure reactive state & 2-stage booleans)
  ├── _m-<feature>-card.scss          (mixin-only glass styling)
  ├── types.d.ts                      (pure Props & Emits declarations)
  └── index.ts                        (clean public entrypoint)
  ```

### D. Anti-Prop-Drilling & Domain State
- Never pass 10+ props or chained event bubbles across component tiers.
- Encapsulate shared feature state in dedicated domain composables/hooks, scoped stores, or typed provide/inject.
- Child components consume state directly from the domain composable and emit minimal, intention-revealing semantic events.

### E. Same-Name Prop Shorthand (Vue 3.4+ & Svelte 5)
- **Vue 3.4+**: Always use same-name `:prop` shorthand instead of redundant `:prop="prop"`:
  `<m-spark-kpi-strip :metrics :records :can-refresh />`
- **Svelte 5**: Always use same-name `{prop}` shorthand instead of `prop={prop}`:
  `<SparkKpiStrip {metrics} {records} {canRefresh} />`
- **React 19 (JSX)**: Explicitly bind `prop={prop}`. Never write `<Comp prop />` for variables (JSX evaluates bare attributes to boolean `true`).

---

## 2. Domain-Based Type Architecture & Data Integrity

### A. The Anti-Type-Monolith Rule & Domain-Scoped Capsules
- Strictly prohibit dumping thousands of unrelated entity types into a single monolithic `types.ts` or `global.d.ts`.
- Co-locate granular `types/*.d.ts` declaration files directly inside each molecule, organism, or feature directory capsule.
- Max 100 lines per domain type file. If a type file approaches 100 lines, decompose into granular domain files (`session.d.ts`, `auth.d.ts`, `billing.d.ts`).
- Root `types/*.d.ts` is reserved strictly for universal system primitives (`ResultTuple<T>`, `AsyncDataState<T>`, base envelopes). It never contains domain entity models.
- Zero runtime logic in type files. Zero implicit `any`.

### B. Discriminated State Unions (Zero Impossible States)
- Model component and session state as strict discriminated/disjoint unions in domain `types/*.d.ts` rather than multiple conflicting booleans:
  ```typescript
  export type SessionState =
    | { readonly status: 'idle' }
    | { readonly status: 'loading'; readonly progress: number }
    | { readonly status: 'active';  readonly sessionId: string }
    | { readonly status: 'fault';   readonly faultMessage: string };
  ```

### C. Result Tuple Pattern (`toResult`)
- Avoid nested `try/catch` blocks in async flows. Return Go/Rust-style `[data, error]` tuples with top-of-function early guard clauses:
  ```typescript
  const [data, fetchError] = await toResult(api.fetchEntity(id));
  if (fetchError) {
    handleError(fetchError);
    return;
  }
  initializeEntity(data);
  ```

### D. Zero Synthetic or Mock Data
- Never generate fake names, synthetic emails (`@gmail.com`), random phone numbers (`555-xxx`), mock license numbers, or fake entity arrays.
- Return genuine live API data or explicit empty states (`No records found`).

### E. Immutable State Action Boundaries
- Never mutate deep nested store properties inside child components. State transitions occur strictly through named, traceable store actions.

### F. Runtime API Boundary Guards
- External API and network payloads must be verified through pure, atomic runtime type guards before ingestion into reactive state.

---

## 3. Control Flow & Self-Documenting Logic

### A. Two-Stage Atomic Boolean Composition
- Never inline complex multi-clause comparisons (`if (a === b && c > 0 && !d)`).
- Break complex checks into atomic single-concept booleans, compose them into a unified decision variable, and use clean conditionals with early-return guard clauses:
  ```typescript
  // Stage 1: Atomic Concept Declarations (Types assumed from domain types.d.ts)
  const hasItems = items.length > 0;
  const isFormComplete = isAddressValid && hasAcceptedTerms;
  const hasSufficientFunds = userBalance >= totalCost;

  // Stage 2: Unified Final Decision Variable
  const canCheckout = computed(() => (
    hasItems && isFormComplete && hasSufficientFunds && !isProcessing
  ));

  // Stage 3: Clean Conditionals & Early-Return Guard Clauses
  const handleCheckout = () => {
    if (!canCheckout.value) return;
    processPayment();
  };
  ```
- In React, booleans are pure in-render derivations: never use `useEffect` for computed/derived state.

### B. Single-Action Command Handlers
- Event handlers are linear, unnested orchestrations of pure atomic verbs:
  ```typescript
  const handleAction = async (id: string) => {
    if (!canProceed.value) return;
    triggerHapticFeedback();
    recordTelemetryMetric('action:trigger', { id });
    await executeServiceCall(id);
    dismissActiveModal();
  };
  ```

### C. Ban on Nested Ternaries in Templates
- Never use nested ternaries in templates (`a ? (b ? 'x' : 'y') : 'z'`).
- Extract complex UI display states into dedicated computed descriptor objects returning `{ text: string, color: string }`.

---

## 4. Reactivity, Composables & Hooks

### A. The Quantum Composable Destructuring Contract
1. **Safe Destructuring**: Composables must always return plain objects containing individual `ref()`, `computed()`, and pure functions. Never return a raw `reactive()` object.
2. **The 3 to 5 Property Limit**: Strictly limit return values to State + Status + Actions (maximum 3 to 5 return properties). Multi-responsibility hooks must be split into single-purpose verbs.
3. **Standardized Aliasing**: Use standardized names (`data`, `isLoading`, `error`, `execute`) to enable clean concurrent destructuring.
4. **Autonomous Lifecycle Teardown**: Side effects (listeners, timers, observers) must be cleaned up automatically using `onScopeDispose()` or effect cleanup functions.
5. **Flexible Input Ergonomics**: Accept raw values, refs, or getters interchangeably via `toValue()` / `MaybeRefOrGetter<T>`.

### B. Clean 3-State Async Pipelines
- Every asynchronous operation follows a predictable state container (`data`, `isLoading`, `error`, `execute`):
  ```typescript
  const { data: items, isLoading, error, execute: loadItems } = useAsyncData(fetchItemsApi);
  const hasItems = computed(() => items.value.length > 0);
  const shouldShowEmptyState = computed(() => !isLoading.value && !hasItems.value && !error.value);
  const shouldShowErrorState = computed(() => !isLoading.value && Boolean(error.value));
  ```

### C. Strict Lexical Declaration Order (TDZ Prevention)
To eliminate Temporal Dead Zone (TDZ) ReferenceErrors, `<script setup>` and controllers strictly follow this lexical declaration order:
1. Composables & Stores (`useRouter()`, `useStore()`)
2. Reactive Primitives (`ref()`, `reactive()`)
3. Computed State (`computed()`)
4. Helper Methods & Actions (`const handleClick = () => { ... }`)
5. Watchers (`watch()`, `watchEffect()`)
6. Lifecycle Hooks (`onMounted()`, `onUnmounted()`)
*Mandatory Rule*: Never reference a reactive value, computed property, or helper in an immediate watcher callback before its declaration.

---

## 5. Design System, Styling & UI Performance

### A. The 4-Tier Zero-Inline-Style Rule
Raw inline `style="..."` attributes are strictly prohibited. Visual styling flows through the standardized 4-tier hierarchy:
1. **Level 1 (Atom Props)**: Semantic props on atoms (`:color="brandColor"`, `variant="glass"`, `size="lg"`).
2. **Level 2 (Mixins & Utilities)**: Centralized SCSS mixins (`@include glass;`, `@include glass-hover;`) and utility classes.
3. **Level 3 (Scoped BEM Classes)**: Scoped classes in component stylesheets referencing design tokens.
4. **Level 4 (Dynamic Root Variables)**: Dynamic runtime coordinates passed exclusively as root CSS custom properties (`:style="{ '--win-x': \`${x}px\`, '--win-y': \`${y}px\` }"`).

### B. Wrapper Atoms & Explicit Slot Forwarding
- Never use dynamic slot iteration with `v-for="(_, slot) in $slots"` in wrapper components.
- Explicitly forward named slots: `<template #<slot-name>="scope"><slot :name="<slot-name>" v-bind="scope || {}" /></template>`.
- Always wrap default slot in `<template #default="scope"><slot v-bind="scope || {}" /></template>`.

### C. Flat CSS Specificity & Icon Safety
- Single-depth BEM semantic class naming. Never use `!important` overrides.
- **FontAwesome SVG Compliance**: Never attach `text-*` utility classes to FontAwesome icons (breaks SVG rendering). Use native `:color` prop or inline CSS.

### D. 60 FPS Non-Blocking UI Offloading
- Heavy computational operations (parsing, sorting, cryptographic hashing) must be offloaded to Web Workers or chunked micro-batches via `requestIdleCallback`.

---

## 6. Timer & Macro-Task Discipline

### A. Zero `setInterval` in Component & Business Logic
- Polling with `setInterval` is strictly prohibited.
- Use `requestAnimationFrame` for animations and physics.
- Use `videoElement.requestVideoFrameCallback()` for camera/video streams.
- Use a single shared system clock composable (`useSystemClock()`) for time displays.
- Use Server-Sent Events or WebSockets for server state sync.

### B. Zero Render-Hack `setTimeout` (Mandatory `nextTick`)
- Never use `setTimeout(() => { ... }, 0)` to wait for DOM elements to render. Use `await nextTick()` or `watch(..., { flush: 'post' })`.

### C. Self-Cleaning Timer Composables
- Timers for real-world delays must be managed through self-cleaning composables (`useTimeoutFn`, `useDebounceFn`) that cancel automatically on component unmount via `onScopeDispose` or effect teardown.

---

## 7. Infrastructure, Extensibility & Global Hygiene

### A. Zero-Conditional `debug.log` Proxy
- Never use `if (import.meta.env.DEV)` or `if (isProd)` checks around logging statements. Use a central `debug` proxy that automatically silences in production while preserving errors.

### B. Typography Hygiene
- Never use em dashes anywhere in code, copy, markdown, or documentation. Use standard hyphens or colons.
