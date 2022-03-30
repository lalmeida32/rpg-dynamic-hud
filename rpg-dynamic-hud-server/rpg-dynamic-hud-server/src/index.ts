import 'util/libs/server_settings_config';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
// import debug from 'debug';

// import { serverSettings } from 'util/constants/server_settings';

// debug('app:setup')(`Starting ${serverSettings.env} environment debug`);

const app = express();
// const port = +serverSettings.port;

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

// app.listen(port, () =>
// debug('app:setup')(`Server is running at http://localhost:${port}`)
// );
