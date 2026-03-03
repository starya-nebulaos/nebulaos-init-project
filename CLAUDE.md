# NebulaOS Project Context

This is an AI agent project built with NebulaOS SDK.

## Project Structure

- `src/agents/` - Agent definitions with instructions and tools colocated
  - `src/agents/<agent-name>/` - Each agent has its own folder
  - `src/agents/<agent-name>/<agent-name>.agent.ts` - Agent definition
  - `src/agents/<agent-name>/instructions.md` - Agent instructions
  - `src/agents/<agent-name>/tools/` - Agent-specific tools
- `src/workflows/` - Multi-step workflows
- `src/server.ts` - Entry point that registers everything with NebulaOS

## Conventions

### IDs
- Agents: `snake_case` (e.g., `customer_support`)
- Tools: `snake_case`, verb + noun (e.g., `search_products`)
- Workflows: `kebab-case` (e.g., `onboarding-flow`)

### Tools
- Always use Zod schemas with `.describe()` on each field
- Description must explain WHEN and HOW to use the tool
- Never throw exceptions in handlers - return error objects

### Instructions
- Keep in `instructions.md` file inside the agent's folder
- Use `Instruction.fromFile()` to load
- Structure: Mission → Strategy → Rules → Examples

## CLI Commands

```bash
# Development
pnpm dev                                    # Start with hot-reload

# CLI
nebulaos resources list                     # See registered resources
nebulaos exec run <id> --input '{...}'      # Execute agent/workflow
nebulaos exec logs <id>                     # View execution logs
nebulaos obs traces search --agent <name>   # Search traces
```

## Environment Variables

Required in `.env`:
- `NEBULAOS_URL` - NebulaOS server URL
- `NEBULAOS_CLIENT_KEY` - Client API key
- `LLM_GATEWAY_API_KEY` - LLM Gateway key

## Claude Code Skills

For AI-assisted development, install the NebulaOS skills:
```
/plugin marketplace add nebulaos/claude-code-skills
```
