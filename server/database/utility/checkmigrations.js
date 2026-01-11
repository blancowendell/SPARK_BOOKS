const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
require('dotenv').config();
const { DecrypterString } = require('../../services/repository/cryptography');

const checkMigrations = async (label, migrationPath) => {
  const dbName = process.env._DATABASE_ADMIN;
  const dbUser = process.env._USER_ADMIN;
  const dbPass = DecrypterString(process.env._PASSWORD_ADMIN);
  const dbHost = process.env._HOST_ADMIN;

  const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'mysql',
    logging: false,
  });

  const migrator = new Umzug({
    migrations: { glob: migrationPath },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: undefined,
  });

  const executedMigrations = await migrator.executed();
  const pendingMigrations = await migrator.pending();

  const allMigrations = [
    ...executedMigrations.map((migration) => ({
      Name: migration.name,
      Status: '✅ up',
    })),
    ...pendingMigrations.map((migration) => ({
      Name: migration.name,
      Status: '⏳ down',
    })),
  ];

  console.log(`\n📂 Migration Status: ${label}`);
  console.table(allMigrations);
  await sequelize.close();
};

(async () => {
  try {
    const dbName = process.env._DATABASE_ADMIN;
    const dbUser = process.env._USER_ADMIN;
    const dbPass = DecrypterString(process.env._PASSWORD_ADMIN);
    const dbHost = process.env._HOST_ADMIN;

    const connection = await mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPass,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`✅ Database '${dbName}' created.`);

    await connection.end();

    // 🔍 Check dev and prod migration folders
    await checkMigrations('Development (migrations)', 'database/migrations/create/*.js');
    await checkMigrations('Production (migrations_prod)', 'database/migrations/alter/*.js');
  } catch (error) {
    console.error('❌ Error fetching migration status:', error);
  }
})();
