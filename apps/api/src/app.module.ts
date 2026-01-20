import { Module } from "@nestjs/common";
import { AuthModule } from "@modules/auth/auth.module";
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [AuthModule, ProjectsModule],
})
export class AppModule {}
