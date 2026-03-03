import { Workflow } from "@nebulaos/core";
import { z } from "zod";
import { assistantAgent } from "../agents/assistant/assistant.agent.js";

const inputSchema = z.object({
  message: z.string().describe("The user's question or support request"),
  userId: z.string().optional().describe("Optional user ID for tracking"),
  sessionId: z.string().optional().describe("Optional session ID for conversation context"),
});

const outputSchema = z.object({
  response: z.string().describe("The assistant's response"),
  ticketCreated: z.boolean().describe("Whether a support ticket was created"),
  metadata: z.object({
    agentId: z.string(),
    executionTime: z.number(),
  }),
});

type SupportInput = z.infer<typeof inputSchema>;
type SupportOutput = z.infer<typeof outputSchema>;

export const supportFlow = new Workflow<SupportInput, SupportOutput>({
  id: "support-flow",
  name: "Customer Support Flow",
  description: "Handles customer support requests using the assistant agent",
  inputSchema,
  outputSchema,
})
  .start("receive-request", async ({ input }) => {
    // Log and prepare the request
    console.log(`[support-flow] Received request from user: ${input.userId ?? "anonymous"}`);
    return {
      ...input,
      startTime: Date.now(),
    };
  })
  .agent("assistant", assistantAgent, {
    toInput: (input: any) => input.message,
  })
  .finish("format-response", async ({ input, state }) => {
    const startTime = state["receive-request"]?.startTime ?? Date.now();
    const agentResponse = input as string;

    // Check if agent created a ticket by looking at the response
    const ticketCreated = agentResponse.toLowerCase().includes("ticket") &&
                          agentResponse.toLowerCase().includes("created");

    return {
      response: agentResponse,
      ticketCreated,
      metadata: {
        agentId: "assistant",
        executionTime: Date.now() - startTime,
      },
    };
  });
