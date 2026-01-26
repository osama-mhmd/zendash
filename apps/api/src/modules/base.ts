// Mutliple endpoints attached to the "/"

import { Controller, Get } from "@nestjs/common";
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from "@nestjs/terminus";
import { DrizzleHealthIndicator } from "./drizzle/drizzle.indicator";

@Controller()
export class BaseController {
  constructor(
    private health: HealthCheckService,
    private db: DrizzleHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  hello() {
    return "Hello there! This is the API of Zendash.";
  }

  @Get("/health")
  @HealthCheck()
  getHealth() {
    return this.health.check([
      () => this.db.checkHealth("database"),
      () => this.memory.checkHeap("memory", 150 * 1024 * 1024),
      () =>
        this.disk.checkStorage("storage", { thresholdPercent: 0.5, path: "/" }),
    ]);
  }
}
