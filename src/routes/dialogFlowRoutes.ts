import dialogflow from '@google-cloud/dialogflow';
import { Express } from 'express';
import { dialogFlowSettings } from '../config/key';

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(
  dialogFlowSettings.googleProjectID,
  dialogFlowSettings.dialogFlowSessionID
);

export const useDialogFlowRoutes = (app: Express) => {
  app.post('/api/df_text_query', async (req, res) => {
    res.send({ do: 'text query' });
  });

  app.post('/api/event', async (req, res) => {
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: dialogFlowSettings.dialogFlowSessionLanguageCode
        }
      }
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    if (!result) {
      return res.send('no results');
    }
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log('  No intent matched.');
    }

    res.send({ do: 'event query' });
  });
};
