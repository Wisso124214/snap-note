import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from '../../config/config.js';

const app = express();

/*app.use(cors({
  origin: '*',  // Allows requests from all domains. Specify actual domain in production for security.
  optionsSuccessStatus: 200 // Ensure compatibility by setting OPTIONS success status to 200 OK.
}));*/
app.use(cors());
app.use(bodyParser.json());

/*app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

export { app };
