require('dotenv').config()
const YouTube = require('youtube-node');
const key = process.env.GOOGLE_API_KEY;

const youTube = new YouTube();
youTube.setKey(key);

function searchVideo(message, queryText) {
    return new Promise((resolve, reject) => {
        youTube.search(`Exercícios para ${queryText}`, 2, (error, result) => {
            if (!error) {
                const videoIds = result.items.map( (item)=> item.id.videoId ).filter(item => item);
                const youTubeLinks = videoIds.map(videoId => `https://youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youTubeLinks.join(', ')}`);
            } else {
                reject(error);
            }
        });  
    })
}
module.exports.searchVideo = searchVideo;