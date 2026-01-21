import { Module } from "@nestjs/common";
import { AuthModule } from "@modules/auth/auth.module";
import { ProjectsModule } from "./projects/projects.module";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [AuthModule, ProjectsModule, EventsModule],
})
export class AppModule {}
