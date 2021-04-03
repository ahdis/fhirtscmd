#!/usr/bin/env node
import * as commander from 'commander'

/// <reference path="../node_modules/@types/node/index.d.ts" />
import crypto = require('crypto');
import https = require('https')

export class Edqm {

    // https://standardterms.edqm.eu:443/standardterms/api/v1/basic_data_by_class/ROA/1/1

    //StringToSign = HTTP-Verb + "&" + URI + "&" + HOST + "&" + Date;

    getSignature(secretkey: string, httpVerb: string, uri: string, host: string, date: string): string {
        let stringToSing = httpVerb + "&" + uri + "&" + host + "&" + date;
        let hmac = crypto.createHmac("sha512", secretkey);
        let signed = hmac.update(new Buffer(stringToSing, 'utf-8')).digest("base64");
        return signed
    }

    getDateHeader(date: Date) {
        return "Date: " + date.toUTCString();
    }

    getAuthorizationHeader(login: string, signature: string): string {
        return login + "|" + signature.substr(signature.length - 22);
    }

}

commander
    .version('0.0.1')
    .description('edqm')
    .option('-l, --login [email]', 'email necessary for api')
    .option('-s, --secretkey [secretkey]', 'secretkey necessary for api')
    .option('-v, --valueset [valueset]', 'ROA|')
    .description('access to the api from the standardterms.edqm.eu').parse(process.argv);

let edqm = new Edqm();
let date = new Date();
let valueset:string = commander.valueset;
let uri = "/standardterms/api/v1/basic_data_by_class/"+valueset+"/1/1";

// console.log(edqm.getDateHeader(date));
let sig = edqm.getSignature(commander.secretkey, "GET", uri, "standardterms.edqm.eu", date.toUTCString());
let autheader = edqm.getAuthorizationHeader(commander.login, sig);
// console.log(autheader);

var options = {
    hostname: 'standardterms.edqm.eu',
    port: 443,
    path: uri,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Date': date.toUTCString(),
        'X-STAPI-KEY': autheader
    }
};

//console.log('starting call to' + uri);
// console.log(options);

const req = https.request(options, (res) => {
    let body = "";
    res.on('data', (data) => {
        body += data;
    })
    res.on('end', () => {
        let bodyJson: any = JSON.parse(body);
//        console.log(body);
        const items = bodyJson.content;
        if (items.length>0) {

        const replacer = (key:string, value:any) => value === null ? '' : value;

        const header = ["class","code","domain","status","creation_date","modification_date","english","definition","version","version_date","de_de","fr_fr","it_it"];

//        const header = Object.keys(items[0]);
        let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        csv = csv.join('\r\n');

        console.log(csv);
        }
    });
});


req.on('error', (e) => {
    console.error(e);
});

req.end();