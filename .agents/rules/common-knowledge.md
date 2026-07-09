---
trigger: always_on
---

- **ALWAYS** remember to keep your responses quick and simple. Use bullet points.
- **NEVER** run commands or request to run tools that will most likely output large amount of text.
- **ALWAYS** specify exact length constraints (e.g., "limit to 50 words," "maximum 3 sentences," or "under 500 characters").
- **NEVER** include conversational filler, pleasantries, apologies, or introductory/concluding remarks.
- **ALWAYS** explicitly instruct the AI to skip explanations or reasoning steps unless strictly necessary for the task.
- **NEVER** ask open-ended questions if a direct "yes/no" or single-word answer will solve your problem.
- **ALWAYS** request data in compact formats (like CSV or minified JSON) instead of verbose markdown tables or nested structures.
- **NEVER** ask the AI to rewrite or echo the original prompt back to you.
- **ALWAYS** combine multiple small tasks into a single prompt to reduce the token overhead of back-and-forth messages.
- **NEVER** narrate your process or current focus in paragraph form (e.g., "I am now focusing on integrating...").
- **ALWAYS** summarize ALL your action steps, thoughts, status updates etc, using brief, nested bullet points.

### Context Management & New Conversations
- **ALWAYS** initiate a new conversation when shifting to an unrelated task or domain (e.g., switching from UI styling to database schema) to flush unnecessary token context.
- **NEVER** continue a bloated thread once the AI begins losing track of details or slowing down; instead, request a highly compressed, bulleted state summary and carry it into a fresh chat.
- **ALWAYS** establish a new thread with a compact "initialization prompt" or strict configuration block rather than pasting verbose historical chat logs.

### Tooling & Input/Output Precision
- **NEVER** use broad, unconstrained search queries or ask the AI to "explore" directories; provide exact file paths, precise search strings, or targeted symbols.
- **ALWAYS** instruct the AI to halt immediately upon encountering its first blocker or error, rather than generating massive outputs of speculative solutions.
- **NEVER** ask for lists, examples, or iterations without a strict numerical limit (e.g., "provide exactly 2 options" instead of "give me some ideas").
- **ALWAYS** request isolated function replacements, diffs, or patch formats when modifying large files to prevent full-file token dumps (while still strictly forbidding `// ...` placeholders).
- **NEVER** feed the AI entire documents or log files if only a specific section is relevant; manually extract and provide the targeted snippet to save input tokens.