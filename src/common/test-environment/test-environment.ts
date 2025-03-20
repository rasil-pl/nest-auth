import { INestApplication, ModuleMetadata, Provider } from '@nestjs/common';
import {
  getModelToken,
  ModelDefinition,
  MongooseModule,
} from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { Model } from 'mongoose';

export abstract class MongoDbTestEnvironment {
  protected module!: TestingModule;
  protected app!: INestApplication;
  protected mongoContainer!: StartedMongoDBContainer;
  async beforeAll({
    imports = [],
    providers,
    models,
  }: {
    imports?: ModuleMetadata['imports'];
    providers: Provider[];
    models: ModelDefinition[];
  }) {
    this.mongoContainer = await new MongoDBContainer('mongo:6.0')
      .withReuse()
      .start();
    const mongoUri = `${this.mongoContainer.getConnectionString()}?directConnection=true`;
    this.module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature(models),
        ...imports,
      ],
      providers,
    }).compile();
    this.app = this.module.createNestApplication();
    await this.app.init();
    await this.ensureIndexes(models);
  }
  async afterAll() {
    await this.module.close();
    await this.app.close();
    await this.mongoContainer.stop();
  }

  private async ensureIndexes(models: ModelDefinition[]) {
    for (const model of models) {
      const modelToken = getModelToken(model.name);
      const modelInstance = this.module.get<Model<unknown>>(modelToken);
      await modelInstance.ensureIndexes();
    }
  }

  seedData<T>(model: { name: string }, data: T[]) {
    const modelToken = getModelToken(model.name);
    const modelInstance = this.module.get<Model<T>>(modelToken);
    return modelInstance.insertMany(data);
  }
}
