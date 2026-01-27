import { Module } from "@nestjs/common";
import { AuthModule } from "@modules/auth/auth.module";
import { ProjectsModule } from "@modules/projects/projects.module";
import { EventsModule } from "@modules/events/events.module";
import { BaseController } from "@modules/base";
import { TerminusModule } from "@nestjs/terminus";
import { DrizzleHealthIndicator } from "@modules/drizzle/drizzle.indicator";
import { IssuesModule } from "@modules/issues/issues.module";

@Module({
  imports: [
    AuthModule,
    ProjectsModule,
    EventsModule,
    TerminusModule,
    IssuesModule,
  ],
  controllers: [BaseController],
  providers: [DrizzleHealthIndicator],
})
export class AppModule {}
