const fs = require('fs');
const process = require('process');
const axios = require('axios');

function checkOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(error) {
            if (error) {
                console.error(`${error}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out){
    
    fs.readFile(path, 'utf8', function(error, data){
        if (error) {
            console.error(`Unable to read the folloing: ${path}; ${error}`);
            process.exit(1);
        } else {
            checkOutput(data, out);
        }
    });
}
cat(process.argv[2]);

    

async function webCat(URL, out){
    try {
        let response = await axios.get(URL);
        checkOutput(response.data, out);
    } catch (error){
        console.error(`Error fetching ${URL}: ${error}`);
        process.exit(1);
    }
}

let arguments = process.argv[2];
let path;
let out;

if (arguments === '--out') {
    path = process.argv[4];
    out = process.argv[3];
} else {
    path = arguments;
}

if (path.slice(0, 4) == 'http') {
    return webCat(path, out);
} else {
     return cat(path, out);
}





