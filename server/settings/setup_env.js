const fs = require('fs');
const readline = require('readline');
const { EncrypterString, DecrypterString } = require("../services/repository/cryptography");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, (answer) => resolve(answer)));

function parseEnv(fileContent) {
  const lines = fileContent.split('\n');
  const env = {};

  for (const line of lines) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^'|"|'|"$/g, '');
      env[key] = val;
    }
  }

  return env;
}

async function main() {
  const DefaultPass = 'admin5ldev';

  console.log("🛠️  Updating .env configuration...\n");

  let existingEnv = {};
  if (fs.existsSync('.env')) {
    const content = fs.readFileSync('.env', 'utf-8');
    existingEnv = parseEnv(content);
  }

  // Decrypt existing sensitive fields
  const decryptedDbPassword = existingEnv._PASSWORD_ADMIN ? await DecrypterString(existingEnv._PASSWORD_ADMIN) : '';
  const decryptedEmailPassword = existingEnv._EMAIL_PASSWORD ? await DecrypterString(existingEnv._EMAIL_PASSWORD) : '';
  const decryptedSecretKey = existingEnv._SECRET_KEY ? await DecrypterString(existingEnv._SECRET_KEY) : '';
  const decryptedSwaggerPassword = existingEnv._SWAGGER_PASS ? await DecrypterString(existingEnv._SWAGGER_PASS) : '';

  // MySQL
  const host = await ask(`MySQL Host [${existingEnv._HOST_ADMIN || 'localhost'}]: `) || existingEnv._HOST_ADMIN || 'localhost';
  const user = await ask(`MySQL User [${existingEnv._USER_ADMIN || 'root'}]: `) || existingEnv._USER_ADMIN || 'root';
  const password = await ask(`MySQL Password [default: ${DefaultPass}]: `) || decryptedDbPassword || DefaultPass;
  const database = await ask(`MySQL Database Name [${existingEnv._DATABASE_ADMIN || ''}]: `) || existingEnv._DATABASE_ADMIN || '';
  const port = await ask(`MySQL Port [${existingEnv._PORT || '5020'}]: `) || existingEnv._PORT || '5020';

  // MongoDB
  const mongoUri = await ask(`MongoDB URI [${existingEnv._MONGO_URI || 'mongodb://localhost:27017/SERVICELINK'}]: `) || existingEnv._MONGO_URI || 'mongodb://localhost:27017/SERVICELINK';
  const mongoSession = await ask(`MongoDB Session Collection [${existingEnv._SESSION_COLLECTION || 'SERVICELINKSessions'}]: `) || existingEnv._SESSION_COLLECTION || 'SERVICELINKSessions';

  // Email
  const emailHost = await ask(`Email Host [${existingEnv._EMAIL_HOST || ''}]: `) || existingEnv._EMAIL_HOST || '';
  const emailPort = await ask(`Email Port [${existingEnv._EMAIL_PORT || '587'}]: `) || existingEnv._EMAIL_PORT || '587';
  const emailUser = await ask(`Email User [${existingEnv._EMAIL_USER || ''}]: `) || existingEnv._EMAIL_USER || '';
  const emailPass = await ask(`Email Password [default: ${DefaultPass}]: `) || decryptedEmailPassword || DefaultPass;
  const emailFrom = await ask(`Email From [${existingEnv._EMAIL_FROM || ''}]: `) || existingEnv._EMAIL_FROM || '';

  // Secret Key
  const secretKey = await ask(`Secret Key [default: ${DefaultPass}]: `) || decryptedSecretKey || DefaultPass;

  // Swagger
  const swaggerUser = await ask(`Swagger Username [${existingEnv._SWAGGER_USER || 'admin'}]: `) || existingEnv._SWAGGER_USER || 'admin';
  const swaggerPass = await ask(`Swagger Password [default: ${DefaultPass}]: `) || decryptedSwaggerPassword || DefaultPass;

  // CORS
  const corsOrigins = await ask(`CORS Origins [${existingEnv._CORS_ORIGINS || 'http://localhost:5021,http://localhost:5020'}]: `) || existingEnv._CORS_ORIGINS || 'http://localhost:5021,http://localhost:5020';

  // Encrypt sensitive data
  const encryptedDbPassword = await EncrypterString(password);
  const encryptedEmailPassword = await EncrypterString(emailPass);
  const encryptedSwaggerPassword = await EncrypterString(swaggerPass);
  const encryptedSecretKey = await EncrypterString(secretKey);

  // Final content
  const finalContent = `
#Mysql Connections
_HOST_ADMIN='${host}'
_USER_ADMIN='${user}'
_PASSWORD_ADMIN='${encryptedDbPassword}'
_DATABASE_ADMIN='${database}'
_PORT='${port}'

#MonggoDB Connections
_MONGO_URI="${mongoUri}"
_SESSION_COLLECTION="${mongoSession}"

#Secret Key
_SECRET_KEY='${encryptedSecretKey}'

#Swagger Auth
_SWAGGER_USER='${swaggerUser}'
_SWAGGER_PASS='${encryptedSwaggerPassword}'

#Email Configuration
_EMAIL_HOST='${emailHost}'
_EMAIL_PORT=${emailPort}
_EMAIL_USER='${emailUser}'
_EMAIL_PASSWORD='${encryptedEmailPassword}'
_EMAIL_FROM='${emailFrom}'

#FRONTEND PORT
_CORS_ORIGINS=${corsOrigins}
`.trim();

  fs.writeFileSync('.env', finalContent, 'utf-8');
  console.log('\n✅ .env file updated successfully!');
  rl.close();
}

main();
