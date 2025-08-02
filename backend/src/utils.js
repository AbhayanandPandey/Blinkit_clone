import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __filename gets the current file path (like __filename in CommonJS)
const __filename = fileURLToPath(import.meta.url);

// __dirname is the directory of the file (like __dirname in CommonJS)
const __dirname = dirname(__filename);

// Export __dirname so other files can use it
export default __dirname;
