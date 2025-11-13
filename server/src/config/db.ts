import chalk from 'chalk'
import { MongoClient } from 'mongodb';

class Database {
  client: any;
  db: any;
  collection: any;

  constructor() {
    this.client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017');
    this.db = process.env.DATABASE;
    this.collection = null;
  }

  async connect(dbName = 'library', collectionName = 'books') {
    try {
      await this.client.connect();
      this.db = this.client.db(dbName);
      this.collection = this.db.collection(collectionName);
      console.log(chalk.green('Banco de dados conectado com sucesso!'));
    } catch (error) {
      console.error(chalk.red('Falha ao conectar ao banco de dados.', error));
      throw error;
    }
  }

  async disconnect() {
    await this.client.close();
    console.log('Conexão fechada');
  }
}

export default new Database();
