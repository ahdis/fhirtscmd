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

Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
