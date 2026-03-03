import "dotenv/config";
import { NebulaClient } from "@nebulaos/client";
import { assistantAgent } from "./agents/assistant/assistant.agent.js";
import { createTicketTool } from "./agents/assistant/tools/create-ticket.js";
import { searchKnowledgeBaseTool } from "./agents/assistant/tools/search-knowledge-base.js";
import { allWorkflows } from "./workflows/index.js";

async function main() {
  const client = new NebulaClient({
    agents: [ assistantAgent ],
    tools: [ createTicketTool, searchKnowledgeBaseTool ],
    workflows: allWorkflows,
    server: {
      url: process.env.NEBULAOS_URL!,
      apiKey: process.env.NEBULAOS_CLIENT_KEY!,
    },
  });

  await client.start();
}

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n👋 Shutting down...");
  process.exit(0);
});

main().catch((error) => {
  console.error("Error starting:", error);
  process.exit(1);
});
