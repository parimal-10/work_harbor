import pg from 'pg';

let dbClient;

export const getDbClient = () => {
  if (!dbClient) {
    dbClient = new pg.Client({
      user: "postgres",
      host: "localhost",
      database: "taskHarbor",
      password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD,
      port: 5432,
    });

    dbClient.connect()
      .then(() => console.log("Database connected"))
      .catch(err => console.error("Error connecting to database:", err));
  }

  return dbClient;
};
