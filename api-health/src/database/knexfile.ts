import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import path from 'path';

const knexFile = {
  development: {
    client: process.env.TYPE_DB || 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'seeds'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: process.env.TYPE_DB || 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'database.sqlite'),
    },
    migrations: {
      loadExtensions: ['.js'],
      extension: 'js',
      directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
      loadExtensions: ['.js'],
      extension: 'js',
      directory: path.resolve(__dirname, 'seeds'),
    },
    useNullAsDefault: true,
  },
};

export default knexFile;
