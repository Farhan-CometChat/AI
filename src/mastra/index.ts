// src/index.ts
import { Mastra } from "@mastra/core/mastra";
import { VercelDeployer } from "@mastra/deployer-vercel";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";

import { weatherWorkflow } from "./workflows/weather-workflow";
import { weatherAgent } from "./agents/weather-agent";
import {
  toolCallAppropriatenessScorer,
  completenessScorer,
  translationScorer
} from "./scorers/weather-scorer";

export const mastra = new Mastra({
  workflows: {
    weatherWorkflow,
  },
  agents: {
    weatherAgent,
  },
  scorers: {
    toolCallAppropriatenessScorer,
    completenessScorer,
    translationScorer,
  },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  telemetry: {
    enabled: false,
  },
  observability: {
    default: { enabled: true },
  },
  // *** Add deployer for Vercel ***
  deployer: new VercelDeployer({
    // Optional overrides:
    // maxDuration: 600,
    // memory: 1536,
    // regions: ["sfo1", "iad1"],
  }),
});

