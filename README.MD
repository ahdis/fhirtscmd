FHIRTSCMD 
=========

A FHIR Command Line utility using the [![npm version](https://badge.fury.io/js/fhir.js.svg)](https://badge.fury.io/js/fhir.js) library from the Command Line  with Node and Typescript (ts-node)

## Goals:

- Build Typedefinitions for the fhir.js library to use it in Node with Typescript
- Basic Command Line Client API for interacting with FHIR Test servers
- Develop an Angular Adaptor
- Integrate Typedefinitions for ST3
- Serialize/Deserialize FHIR Resources
- Incorporate Smart-On-FHIR in Typescript
- Incorporate FHIRPath
- Basic Angular App showcasing above funtionality 

## Development

`Node.js` is required for build.

Build & test:

```
git clone https://github.com/ahdis/fhirtscmd
cd fhirtscmd
npm install

```

## API


### Using the Command Line interface

```
$ts-node src/fhirtscmd.ts hellofhir

hello fhir with http://fhirtest.uhn.ca/baseDstu3
200
nginx/1.10.3 (Ubuntu)
HAPI FHIR 3.1.0 REST Server (FHIR Server; FHIR 3.0.1/DSTU3)

```

## License

Apache License Version 2.0, January 2004
