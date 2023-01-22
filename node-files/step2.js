const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    
    fs.readFile(path, 'utf8', function(error, data){
        if (error) {
            console.error(`Unable to read the folloing: ${path}; ${error}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}
cat(process.argv[2]);

    

async function webCat(URL){
    try {
        let response = await axios.get(URL);
        console.log(response.data);
    } catch (error){
        console.error(`Error fetching ${URL}: ${error}`);
        process.exit(1);
    }
}

let arguments = process.argv[2];

if (arguments.slice(0, 4) == 'http') {
    webCat(arguments);
} else {
    cat(path);
}