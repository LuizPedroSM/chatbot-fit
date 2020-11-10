const dialogFlow = require('dialogflow');
const configs = require('../dialogflow.json');

const sessionClient = new dialogFlow.SessionsClient({
    projectId: configs.client_id,
    credentials: {
        private_key: configs.private_key,
        client_email: configs.client_email
    }
});

async function sendMessage(chatId, message) {
    try {
        const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'pt-BR'
                }
            }
        }    
        const response = await sessionClient.detectIntent(request);
        const result = response[0].queryResult;
        return {
            text: result.fulfillmentText,
            intent: result.intent.displayName,
            fields: result.parameters.fields
        }
    } catch (error) {
        console.error(JSON.stringify(error, null, 2));
    }
}
module.exports.sendMessage = sendMessage;