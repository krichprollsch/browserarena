import type { ProviderClient, ProviderSession } from "../types.js";
import { requireEnv } from "../utils/env.js";

export class LightpandaProvider implements ProviderClient {
  readonly name = "LIGHTPANDA";
  private apiKey: string | null = null;
  private cdpUrl: string;

  computeCost(seconds: number): number {
    const perHour = 0.002;
    return Math.round((seconds / 3600) * perHour * 1e8) / 1e8;
  }

  constructor() {
    this.cdpUrl = process.env.LIGHTPANDA_CDP_URL || "wss://uswest.cloud.lightpanda.io/ws";
  }

  private getApiKey(): string {
    if (!this.apiKey) {
      this.apiKey = requireEnv("LIGHTPANDA_API_KEY");
    }
    return this.apiKey;
  }

  async create(): Promise<ProviderSession> {
    return { id: "", cdpUrl: `${this.cdpUrl}?token=${this.getApiKey()}` };
  }

  async release(id: string): Promise<void> {}
}
