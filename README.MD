FHIRTSCMD 
=========

A  Command Line utility using the [![npm version](https://badge.fury.io/js/fhir.js.svg)](https://badge.fury.io/js/fhir.js) library from the Command Line  with Node and Typescript (ts-node)

## Development

`Node.js` is required for build.

prerequisites, install node-ts and typescript:

```
npm install -g ts-node
npm install -g typescript
```

Build & test:

```
git clone https://github.com/ahdis/fhirtscmd
cd fhirtscmd
npm install

```

Using a local hapi fhir server, download, install from http://hapifhir.io/doc_cli.html

```
cd /Applications/hapi-fhir-3.1.0-cli
./hapi-fhir-cli run-server
```

- UUID
npm install uuid
npm install --save @types/uuid


## API


### Using the Command Line interface

```
$ts-node src/fhirtscmd.ts hellofhir

hello fhir with http://fhirtest.uhn.ca/baseDstu3
200
nginx/1.10.3 (Ubuntu)
HAPI FHIR 3.1.0 REST Server (FHIR Server; FHIR 3.0.1/DSTU3)

```

### EDQM utility

https://standardterms.edqm.eu
ts-node src/edqm.ts --login oliver.egger@ahdis.ch --secretkey .... --valueset  3lettersbelow

SOM state of matter
BDF basic dose form
RCA release characteristics
TRA transformation
ISI intended site
AME administration method
PDF pharmaceutical dose form
UOP unit of presentation
ROA route of administration
PAC packaging category
CON container
CLO closure
DEV administration device
CDF combined pharmaceutical dose form
PFT patient-friendly term
CMT combined term
CMP combination pack
MAP mapping
FIL Filter label

curl --request GET -i --url 'https://standardterms.edqm.eu:443/standardterms/api/v1/basic_data_by_class/ROA/1/1' --header 'Date: todo' --header 'X-STAPI-KEY:todo' --header 'Accept: application/json' --http1.1


## License

Apache License Version 2.0, January 2004
