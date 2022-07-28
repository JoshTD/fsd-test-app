import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TodoModule } from './todo/todo.module';

const modules = [
  ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', './.env'] }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    url: process.env.DB_URL,
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
  }),
  CategoryModule,
  TodoModule,
];

if (process.env.NODE_ENV !== 'development') {
  modules.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'build'),
    }),
  );
}

@Module({
  imports: modules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
