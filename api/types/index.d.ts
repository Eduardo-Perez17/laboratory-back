// node.JS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    ROOT_APLICATION: string;
    PORT_APLICATION: number;
    TODO_DB_HOST: string;
    TODO_DB_PORT: number;
    TODO_DB_USERNAME: string;
    TODO_DB_PASSWORD: string;
    TODO_DB_DATABASE: string;
    HASH_SALT: number;
    JWT_SECRET: string;

    LABORATORY_DB_MYSQL_HOST: string;
    LABORATORY_DB_MYSQL_PORT: number;
    LABORATORY_DB_MYSQL_USERNAME: string;
    LABORATORY_DB_MYSQL_PASSWORD: string;
    LABORATORY_DB_MYSQL_DATABASE: any;
  }
}
