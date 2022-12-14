const { json } = require('body-parser');
const { log } = require('console');
var file = require('fs');

/**
 * Fetching data & sending from json file 
 */
const getDatas = (req, res) => {
    
   var data = getDataFromFile();
   if(data) {
    res.status(200).send({'msg': "Data found", data});
   } else {
    res.status(204).send({'msg': "Data not found"});
   }
}

const pushData = (req, res) => {
    let name = req.body.name;
    let address = req.body.address;
    let date = getUTCDate(); //getting current timestamp in utc format
    let getData = getDataFromFile();

    let newElement = {
        "name":name,
        "address":address,
        "time": date
    }

    //pushing new node
    const data = getData.findIndex(item => item.name === name);

    if (data > -1) {
        res.status(200).send({'msg': "Duplicate Data"});
    } else {
        getData.push(newElement);
    }
    
    console.log(getData);

    try {
        file.writeFileSync('data.json', JSON.stringify(getData),{encoding:'utf8'});
    } catch (error) {
        console.log(error)
    }

    res.status(200).send({'msg': "Data inserted"});
}

const del = (req, res) => {
    let name = req.body.name;
    let getData = getDataFromFile();

    const data = getData.findIndex(item => item.name === name);

    if (data > -1) {
        getData.splice(data, 1);
    }


    // getData.forEach((element, index) => {
    //     if(element.name === name)
    //         delete getData[index];
    // });

    try {
        file.writeFileSync('data.json', JSON.stringify(getData),{encoding:'utf8'});
    } catch (error) {
        console.log(error)
    }

    console.log({getData})
    res.status(200).send({'msg': "Data inserted"});
}

/**
 * For Fetching datas from files
 */
const getDataFromFile = () => {
    let jsonData = file.readFileSync('data.json', {encoding:'utf8', flag:'r'});
    let jsonObj = JSON.parse(jsonData);

    return (jsonObj?jsonObj:{});
}


const getUTCDate = () => {
    currentDate = new Date();
    return currentDate.toUTCString();
} 

module.exports = {
    getDatas,
    pushData,
    del
};
