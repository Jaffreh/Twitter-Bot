import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

const handleTweet = () => {
    const twitterClient = new TwitterApi({
        appKey: process.env.CONSUMER_KEY ?? '',
        appSecret: process.env.CONSUMER_SECRET ?? '',
        accessToken: process.env.ACCESS_TOKEN ?? '',
        accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
    });

    const tweetClient = twitterClient.readWrite;

    let top_activites = ["🐳", "🌊", "🚣‍♂️", "🏄‍♂️", "🤽‍♂️", "🛥️"]
    let fishies = ["🐟", "🐡", "🐠"];
    let rare_fishies = ["🐙", "🐬", "🦑", "🦈", "🐋", "🐳"];
    let plants = ["🌱", "🌾", "🌿", "🍀", "☘️"];
    let items = ["🐌", "🏰", "🦀","🐚","⚓️"];
    let rare_items = ["🎱", "🎲", "🎮", "🗿", "🔱", "🎷", "🗽", "💎", "💰", "🔔", "💀", "💩"]

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function randomizeLine(itemList){
        let rows = 6;
        let cols = 11;
        let matrix = [];

        for(let i=0; i<rows; i++){
            matrix[i] = [];
            for(let j=0; j<cols; j++){
                matrix[i][j] = "\u3000";
            }
        }

        matrix[0][0] = "🌊";

        let num_of_top_activites = getRandomInt(1, 4);
        while(num_of_top_activites != 0){
            let randomIndex = Math.floor(Math.random() * cols);
            if(matrix[0][randomIndex] == "\u3000"){
                matrix[0][randomIndex] = top_activites[Math.floor(Math.random() * top_activites.length)];
                num_of_top_activites--;
            }
        }

        let num_of_regular_fish = getRandomInt(3, 8);
        while(num_of_regular_fish != 0){
            let randomRow = getRandomInt(1, rows-2);
            let randomCol = getRandomInt(0, cols);
            if(matrix[randomRow][randomCol] == "\u3000"){
                matrix[randomRow][randomCol] = fishies[Math.floor(Math.random() * fishies.length)];
                num_of_regular_fish--;
            }
        }

        let num_of_rare_fish = getRandomInt(0, 4);
        while(num_of_rare_fish != 0){
            let randomRow = getRandomInt(1, rows-2);
            let randomCol = getRandomInt(0, cols);
            if(matrix[randomRow][randomCol] == "\u3000"){
                matrix[randomRow][randomCol] = rare_fishies[Math.floor(Math.random() * rare_fishies.length)];
                num_of_rare_fish--;
            }
        }


        let num_of_plants = getRandomInt(1, 7);
        while(num_of_plants != 0){
            let randomCol = getRandomInt(0, cols);
            if(matrix[rows-1][randomCol] == "\u3000"){
                matrix[rows-1][randomCol] = plants[Math.floor(Math.random() * plants.length)];
                num_of_plants--;
            }
        }

        if(getRandomInt(0, 12) == 0){
            let num_of_rare_items = 1;
            while(num_of_rare_items != 0){
                let randomCol = getRandomInt(0, cols);
                if(matrix[rows-1][randomCol] == "\u3000"){
                    matrix[rows-1][randomCol] = rare_items[Math.floor(Math.random() * rare_items.length)];
                    num_of_rare_items--;
                }
            }
        } else{
            let num_of_items = getRandomInt(0, 2);
            while(num_of_items != 0){
                let randomCol = getRandomInt(0, cols);
                if(matrix[rows-1][randomCol] == "\u3000"){
                    matrix[rows-1][randomCol] = items[Math.floor(Math.random() * items.length)];
                    num_of_items--;
                }
            }
        }

        let line = "";
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                line += matrix[i][j];
            }
            line += "\n";
        }

        return line;
    }

    tweetClient.v2.tweet(`${randomizeLine(top_activites)}`);
};

handleTweet();