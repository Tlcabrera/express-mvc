import { fileURLToPath } from 'url';
import path,{join} from 'path';

//middleware para archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(join(__filename,"../"));

export { __dirname };