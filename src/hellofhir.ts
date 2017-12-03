/// <reference path="types/fhir.js/src/adapters/native/index.d.ts" />
/// <reference path="types/fhir.js/index.d.ts" />
import { IFhir, Config, ResponseObj, Entry, IResource, ReadObj } from 'fhir.js';
import nativeFhir = require('fhir.js/src/adapters/native');

export class HelloFhir {

    private client: IFhir;

    private conformance: any = {};
    private history: any = {};
    private resourceHistory: any = {};
    private patients: any[] = [];
    private condition: any = {};
    private createResponse: any = {};

    private config: Config = {
        baseUrl: 'http://fhirtest.uhn.ca/baseDstu3',
        credentials: 'same-origin'
    };

    constructor() {
        this.client = nativeFhir(this.config);
    }

    async testApi() {
        console.log("hello fhir with " + this.config.baseUrl)

        // this.client.conformance({}).then((response:ResponseObj) => {
        //                if (response.headers != undefined) {
        //        console.log(response.headers.get("server"))
        //    }
        // -> to convert add async to this and use await syntac

        try {
            let patientId:string = "";
            let patientGiven:string = "Fälix";
            let patientFamily:string = "Müster";

            let response: ResponseObj = await this.client.conformance({});

            console.log("Step 1: Calling conformance statement")
            if (response.headers != undefined) {
                console.log(response.status);
                console.log(response.headers.get("server"))
                console.log(response.headers.get("x-powered-by"))
            }

            console.log("Step 2: Creating the patient" +patientGiven+" "+ patientFamily);
            let entry: Entry = 
            {
                resource: {
                    "resourceType": "Patient",
                        "text": {
                        "status": "generated",
                            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">"+patientGiven+" "+ patientFamily +"</div>"
                    },
                    "name": [
                        {
                            "family": ""+ patientFamily+"",
                            "given": [ ""+ patientGiven + ""]
                        }
                    ],
                        "gender": "male",
                            "birthDate": "1971-12-04",
                                "address": [
                                    {
                                        "line": [
                                            "Leidensweg 10"
                                        ],
                                        "city": "Specimendorf",
                                        "postalCode": "9876"
                                    }
                                ]
                }
            }            
            
            response = await this.client.create(entry);
            if (response.headers != undefined) {
                console.log("success");
                console.log(response.status);
                console.log(response.headers.get("location"))
                console.log("id:"+response.data.id);
                if (response.data.id!=undefined) {
                    patientId = response.data.id;
                }
            }

            
            console.log("Step 3: Reading patient" +patientGiven+" "+ patientFamily+" with id back");
            let read : ReadObj = {
                type: 'Patient'
            };
            read.id = patientId;
            response = await this.client.read(read)

            if (response.headers != undefined) {
                console.log("success");
                console.log(response.status);
                console.log(response.headers.get("location"))
                console.log("id: "+response.data.id);
                console.log(response || [])
                console.log("name :"+response.data.name[0]);
                console.log("family :"+response.data.name[0].family);
                console.log("given :"+response.data.name[0].given[0]);
                if (response.data.name[0].family == patientFamily) {
                    console.log("family name matches")
                }
                if (response.data.name.given == patientGiven) {
                    console.log("given name matches")
                }
                
            }



        } catch (error) {
            console.log("error" + error)
        }

       //  console.log(response || []);
        
        //            console.log(response.status);
        //            console.log(response.headers);
        //            if (response.data) {
        //                this.conformance = (response.data || []);
        //                console.log("success");
        //                console.log(response || []);
        //           }
        //       }, (err) => {
        //           console.log(err);
        //       });

        /*
        this.client.history({}).then((response) => {
            if (response.data) {
                this.history = (response.data || []);
            }
        }, (err) => {
            console.log(err);
        });
 
        this.client.resourceHistory({ type: 'Patient', id: '1707' }).then((response) => {
            if (response.data) {
                this.resourceHistory = (response.data || []);
            }
        }, (err) => {
            console.log(err);
        });
 
        this.client.search({ type: 'Patient', query: {} }).then((response) => {
            if (response.data) {
                this.patients = (response.data.entry || []);
            }
        }, (err) => {
            console.log(err);
        });
 
        this.client.read({ type: 'Condition', id: "2277" }).then((response) => {
            if (response.data) {
                this.condition = (response.data || {});
            }
        }, (err) => {
            console.log(err);
        });
 
        this.client.create(
            {
                resource: {
                    "resourceType": "Observation",
                    "meta": {
                        "profile": ["http://www.example.ex/fhir/StructureDefinition/ExamplePersonalBelief"]
                    },
                    "identifier": [{
                        "value": "b001"
                    }],
                    "status": "final",
                    "category": [{
                        "coding": [{
                            "system": "http://hl7.org/fhir/observation-category",
                            "code": "social-history",
                            "display": "Social History"
                        }]
                    }],
                    "code": {
                        "coding": [{
                            "system": "http://loinc.org",
                            "code": "75281-6",
                            "display": "Personal belief"
                        }]
                    },
                    "subject": {
                        "reference": "Patient/1707"
                    },
                    "effectiveDateTime": "2009-07-21T10:22:00+02:00",
                    "performer": [{
                        "reference": "Practitioner/3165"
                    }],
                    "valueString": "Patient refuses all blood transfusion and administration of primary blood components and minor fractions"
                }
            }).then((response) => {
                this.createResponse = response;
            }, (err) => {
                console.log(err);
            });
 
 
*/


    }


    // Include the adapter
    //var nativeFhir = require('fhir.js/src/adapters/native');

    // Create fhir instance
    // var fhir = nativeFhir({
    //     baseUrl: 'https://ci-api.fhir.me',
    //     auth: {user: 'client', pass: 'secret'}
    //});

    // Execute the search
    // fhir.search({type: 'Patient', query: {name: 'maud'}}).then(function(response){
    //     //manipulate your data here.
    // });
}