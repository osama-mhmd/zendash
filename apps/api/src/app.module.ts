import { Module } from "@nestjs/common";
import { AuthModule } from "@modules/auth/auth.module";
import { ProjectsModule } from './modules/projects/projects.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [AuthModule, ProjectsModule, EventsModule],
})
export class AppModule {}
