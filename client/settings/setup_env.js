import fs from 'fs';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

const ask = async (question) => {
  return await rl.question(question);
};

async function main() {
  console.log("🌐 Setting up frontend .env for Vite...\n");

  const defaultApiUrl = 'http://localhost:5020';
  const apiUrl = await ask(`VITE_API_BASE_URL [${defaultApiUrl}]: `) || defaultApiUrl;

  const finalContent = `VITE_API_BASE_URL=${apiUrl}`;
  fs.writeFileSync('.env', finalContent, 'utf-8');

  console.log('\n✅ Frontend .env file created/updated successfully!');
  rl.close();
}

main();
