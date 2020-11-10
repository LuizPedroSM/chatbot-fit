require('dotenv').config()
const token = process.env.TELEGRAM__BOT_TOKEN;
const TelegramBot = require('node-telegram-bot-api');
const dialogFlow = require('./dialogFlow');
const youTube = require('./youtube');

const bot = new TelegramBot(token, {polling:true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const dfResponse = await dialogFlow.sendMessage(chatId.toString(), msg.text);
    let responseText = dfResponse.text;
    if (dfResponse.intent === 'Treino específico') {
        responseText = await youTube.searchVideo(responseText, dfResponse.fields.corpo.stringValue);
    }
    bot.sendMessage(chatId, responseText);
})