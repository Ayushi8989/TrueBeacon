import fs from 'fs';
import path from 'path';

export const readJSON = (file) => {
    try {
        const filePath = path.join('/home/ayu/Desktop/truebeacon/server/mock_data', file);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file ${file}:`, error.message);
        return null;
    }
};
