import { Module } from '@nestjs/common';
import { BookModule } from '@/modules/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/modules/book/entities/book.entity';
import { AppController } from '@/modules/app/app.controller';
import { AppService } from '@/modules/app/app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: '123456',
      username: 'root',
      entities: [Book],
      database: 'nest-learn',
      synchronize: true,
      logging: true,
    }),
    BookModule,
  ],
})
export class AppModule {}
