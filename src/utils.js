// __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public'));