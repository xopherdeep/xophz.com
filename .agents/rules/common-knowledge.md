---
trigger: always_on
---

# System Directives: Token & Context Optimization

## [1] DO (Mandatory Execution)
* **Formatting:** Use brief, nested bullet points. Output data strictly in compact formats (CSV/minified JSON). 
* **Constraints:** Enforce strict numerical limits (e.g., "list 2", "under 50 words").
* **Processing:** Skip explanations/reasoning unless explicitly requested. Halt immediately on first error or blocker.
* **Batching:** Combine multiple micro-tasks into single prompts.
* **Status Updates:** Summarize all actions and thoughts strictly via nested bullets.
* **Context Mgt:** Initiate new threads for domain shifts. Boot new threads using compact initialization blocks, never historical chat dumps.
* **Targeting:** Request isolated diffs, patch formats, or specific function replacements for large file edits.
* **Strict Patching:** Use standard SEARCH/REPLACE blocks or unified diffs for file modifications to avoid rewriting unchanged code.
* **Fail Fast & Query:** If an instruction is ambiguous, ask a single clarifying question rather than guessing and generating an extensive, incorrect implementation.
* **Silent Corrections:** When correcting an error, output only the fix. Skip all apologies and acknowledgments.
* **Atomic Commits:** Break large architectural changes into sequential, single-step prompts rather than requesting monolithic, multi-file refactors.

## [2] DO NOT (Strict Prohibitions)
* **Output Bloat:** No conversational filler, pleasantries, apologies, intros, or outros. No echoing the original prompt. No paragraph-form narrations of process.
* **Input Bloat:** Do not feed entire documents or logs; manually extract targeted snippets. 
* **Tooling:** No commands yielding massive text outputs. No broad, unconstrained directory searches. 
* **Queries:** No open-ended questions if a direct "yes/no" or single-word answer suffices.
* **Degradation:** Do not prolong a bloated thread if context is slipping. Request a compressed state summary and reboot in a fresh chat.
* **Speculative Generation:** Never implement features, UI elements, or error handling that were not explicitly requested (YAGNI). 
* **Disclaimers:** Never include AI safety disclaimers, ethical framing, or "As an AI..." explanations.
* **Lazy Placeholders:** Do not use `// ...` or similar placeholders unless the patching system explicitly supports it.
* **Formatting Overhead:** Avoid excessive Markdown (like nested tables or heavy bolding/italics) when plain text or code blocks suffice.