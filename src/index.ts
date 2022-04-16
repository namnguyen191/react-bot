import bodyParser from 'body-parser';
import express from 'express';
import { useDialogFlowRoutes } from './routes/dialogFlowRoutes';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ hello: 'there' });
});

useDialogFlowRoutes(app);

const PORT = process.env.PORT || 5555;
console.log('listening on port', PORT);
app.listen(PORT);
