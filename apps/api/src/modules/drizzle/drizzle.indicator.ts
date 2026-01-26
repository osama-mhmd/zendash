import { sql } from "drizzle-orm";

import { Injectable } from "@nestjs/common";
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";
import db from "@db";

@Injectable()
export class DrizzleHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  async checkHealth(key: string): Promise<HealthIndicatorResult> {
    try {
      await db.execute(sql`SELECT 1`);
      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError("Drizzle check failed", e);
    }
  }
}
