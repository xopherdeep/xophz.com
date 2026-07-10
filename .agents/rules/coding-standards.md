# Engineering Standards & Principles

Welcome to our core operational and architectural guidelines. This document serves as the single source of truth for coding standards, architectural hierarchy, and interactions with AI coding assistants. These principles are designed to ensure code readability, maintainability, scalability, and optimal execution efficiency.

---

## 1. Architectural Hierarchy & Component Design

We enforce strict boundaries for component complexity. Files must remain lean (max 300-500 lines). Break down logic and UI into clear structural tiers:

* **Atoms / Foundations:** Single, foundational UI elements. This is the **ONLY** tier where raw DOM/HTML elements are permitted.
* **Molecules / Blocks:** Groups of foundational elements. **(NO raw elements)**.
* **Organisms / Modules:** Complex groupings of components. **(NO raw elements)**.
* **Templates / Layouts:** Structural blueprints for pages. **(NO raw elements)**.
* **Views / Pages:** High-level components that implement layouts and inject state.

## 2. State Management & Data Flow

* **Single Source of Truth:** Rely strictly on the project's primary state management architecture or engine. **NEVER** duplicate global state or core business logic locally.
* **Direct Rendering:** Render directly from the established state objects, stores, or context providers.
* **No Mirroring:** Do not create custom hooks or local variables that store, mirror, or mutate data that is already handled by the core data engine.

## 3. Code Syntax & Formatting Patterns

* **Self-Documenting Code:** Code must explain itself. Minimize inline comments; rely on explicit, readable variable naming.
* **Precise Naming Conventions:** Use adjective and verb-nouns. Keep names precise and quick to read.
* **Explicit Conditionals:** Always abstract complex logic into named boolean variables before evaluation.
* **Deconstruct & Extract:** Avoid repeating long constant paths or common arrays. 
    * Destructure primitives at the top of the scope if used more than twice.
    * Extract common groups of values into shared arrays or constants.
    * Use the spread operator to compose complex structures from shared patterns.
* **Named Callbacks:** Extract anonymous functions into named variables before passing them as arguments.
* **Zero-Lag Derivation:** Avoid unnecessary memoization (e.g., `useMemo`, `useCallback`) for simple object mappings or derivations from stable references unless addressing a proven performance bottleneck.

### Example: Readable Conditionals & Named Functions
Always name conditionals and anonymous functions into readable variables to minimize confusion.

```typescript
// ❌ Bad: Anonymous functions and inline complex logic
const activeAdmins = users.filter(user => user.status === 'active' && user.role === 'admin' && user.lastLogin > Date.now() - 86400000);

// ✅ Good: Named callbacks and extracted logic
const isRecentlyActive = (user) => user.lastLogin > Date.now() - 86400000;
const isActiveAdmin = (user) => user.status === 'active' && user.role === 'admin' && isRecentlyActive(user);

const activeAdmins = users.filter(isActiveAdmin);
```

## 4. Environment & Tooling

* **Package & Runtime Management:** Always utilize the project's standardized package manager and runtime environment.
* **Styling & Theming:** Exclusively use the project's established styling framework (e.g., utility classes, CSS-in-JS, or global modules) to keep styles reusable and instantly recognizable. Avoid rogue inline styles.

## 5. Documentation Strategy

* **Docs-First Engineering:** The `docs/` directory is the project's library and primary resource. Always consult it to understand established patterns.
* **Continuous Integration:** After implementing new features or making architectural changes, comprehensively document them. 
* **Knowledge Gap Protocol:** If unsure about a concept or logic, check the docs or ask directly. Afterward, document the resolution as a FAQ.
* **File Naming Convention:** Enforce a strict, hierarchical naming convention for all documentation files (e.g., `category_folder_file.md`).

---

## 6. AI Interaction Protocol & System Directives

When pairing with AI agents, strict adherence to the following directives is mandatory to optimize context, token usage, and system integrity.

### 6.1 Token Conservation & Collaboration

* **Collaborative Pausing:** Do not attempt to answer every question or resolve every architecture decision autonomously. Pause and keep the engineer involved.
* **No Rogue Tasks:** Do NOT waste tokens running off on autonomous background tasks (such as checking lint, type definitions, or build errors) unless explicitly instructed to do so. Rely on the user to handle building and steering the verification process.
* **Minimal Verification:** Keep any requested verification plans minimal and lean to conserve tokens.
* **Surgical Precision:** NEVER use placeholders like `// ...` in tool calls or code generation. Changes must preserve the full functional integrity of the file. Verify all symbols, variables, imports, and exports remain intact.

### 6.2 DO (Mandatory Execution)

* **Formatting:** Use brief, nested bullet points. Output data strictly in compact formats (CSV/minified JSON). 
* **Constraints:** Enforce strict numerical limits (e.g., "list 2", "under 50 words").
* **Processing:** Skip explanations/reasoning unless explicitly requested. Halt immediately on first error or blocker.
* **Batching:** Combine multiple micro-tasks into single prompts.
* **Status Updates:** Summarize all actions and thoughts strictly via nested bullets.
* **Context Management:** Initiate new threads for domain shifts. Boot new threads using compact initialization blocks, never historical chat dumps.
* **Targeting:** Request isolated diffs, patch formats, or specific function replacements for large file edits.
* **Strict Patching:** Use standard SEARCH/REPLACE blocks or unified diffs for file modifications to avoid rewriting unchanged code.
* **Fail Fast & Query:** If an instruction is ambiguous, ask a single clarifying question rather than guessing and generating an extensive, incorrect implementation.
* **Silent Corrections:** When correcting an error, output only the fix. Skip all apologies and acknowledgments.
* **Atomic Commits:** Break large architectural changes into sequential, single-step prompts rather than requesting monolithic, multi-file refactors.

### 6.3 DO NOT (Strict Prohibitions)

* **Output Bloat:** No conversational filler, pleasantries, apologies, intros, or outros. No echoing the original prompt. No paragraph-form narrations of process.
* **Input Bloat:** Do not feed entire documents or logs; manually extract targeted snippets. 
* **Tooling:** No commands yielding massive text outputs. No broad, unconstrained directory searches. 
* **Queries:** No open-ended questions if a direct "yes/no" or single-word answer suffices.
* **Degradation:** Do not prolong a bloated thread if context is slipping. Request a compressed state summary and reboot in a fresh chat.
* **Speculative Generation:** Never implement features, UI elements, or error handling that were not explicitly requested (YAGNI). 
* **Disclaimers:** Never include AI safety disclaimers, ethical framing, or "As an AI..." explanations.
* **Lazy Placeholders:** Do not use `// ...` or similar placeholders unless the patching system explicitly supports it.
* **Formatting Overhead:** Avoid excessive Markdown (like nested tables or heavy bolding/italics) when plain text or code blocks suffice.
