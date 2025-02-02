import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readJSON = (file) => {
    try {
        const filePath = path.join(__dirname, `../mock_data/${file}`);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file ${file}:`, error.message);
        return null;
    }
};
