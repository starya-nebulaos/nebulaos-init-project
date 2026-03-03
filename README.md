# NebulaOS Starter Template

AI agent project built with [NebulaOS SDK](https://docs.nebulaos.dev).

## Quick Start

```bash
# Create a new project
nebulaos init my-project
cd my-project

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Run in development
pnpm dev
```

## Getting Your API Keys

```bash
# Get client API key
nebulaos clients api-keys create <client-id>

# Get LLM Gateway key
nebulaos llm keys create --name my-key --type personal
```

## Project Structure

```
src/
├── agents/
│   └── assistant/
│       ├── assistant.agent.ts    # Agent definition
│       ├── instructions.md       # Agent instructions
│       └── tools/                # Agent-specific tools
│           ├── create-ticket.ts
│           └── search-knowledge-base.ts
├── workflows/
│   ├── support-flow.ts           # Example workflow
│   └── index.ts
└── server.ts                     # Entry point
```

## Development

```bash
# Start with hot-reload
pnpm dev

# Type-check
pnpm typecheck

# Production
pnpm start
```

## Testing with CLI

```bash
# List registered resources
nebulaos resources list

# Execute the assistant agent
nebulaos exec run assistant --input '{"message":"Hello!"}'

# Execute the support workflow
nebulaos exec run support-flow --input '{"message":"I need help"}'

# View execution logs
nebulaos exec logs <execution-id>

# Search traces
nebulaos obs traces search --agent assistant
```

## Customization

### Add a new agent

1. Create folder `src/agents/my-agent/`
2. Create `my-agent.agent.ts` with Agent definition
3. Create `instructions.md` with agent instructions
4. Add tools in `tools/` subfolder
5. Register in `src/server.ts`

### Add a new workflow

1. Create `src/workflows/my-workflow.ts`
2. Export from `src/workflows/index.ts`
3. Workflow is automatically registered via `allWorkflows`

### Add a new tool

1. Create tool in agent's `tools/` folder
2. Import and add to agent's `tools` array
3. Register standalone tools in `src/server.ts` if needed

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEBULAOS_URL` | NebulaOS server URL |
| `NEBULAOS_CLIENT_KEY` | Client API key |
| `LLM_GATEWAY_API_KEY` | LLM Gateway API key |

## Documentation

- [NebulaOS SDK Docs](https://docs.nebulaos.dev/sdk)
- [CLI Reference](https://docs.nebulaos.dev/cli)

## License

MIT
