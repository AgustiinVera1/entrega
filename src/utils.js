// __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));
//app.use(express.static(__dirname + '/public'));






//metodo como esta en el pdf:
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
//export default __dirname;
