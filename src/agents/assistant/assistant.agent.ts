import { Agent, InMemory, Instruction } from "@nebulaos/core";
import { LLMGateway } from "@nebulaos/llm-gateway";
import { searchKnowledgeBaseTool } from "./tools/search-knowledge-base.js";
import { createTicketTool } from "./tools/create-ticket.js";

const instructions = await Instruction.fromFile(
  "./src/agents/assistant/instructions.md"
);

export const assistantAgent = new Agent({
  id: "assistant",
  name: "assistant",
  model: new LLMGateway({
    apiKey: process.env.LLM_GATEWAY_API_KEY!,
    baseUrl: process.env.NEBULAOS_URL!,
    model: "gemini",
  }),
  memory: new InMemory({ maxMessages: 50 }),
  instructions,
  tools: [searchKnowledgeBaseTool, createTicketTool],
  maxSteps: 10,
});
