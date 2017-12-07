/// <reference path="types/fhir.js/src/adapters/native/index.d.ts" />
/// <reference path="types/fhir.js/index.d.ts" />
import { IFhir, Config, ResponseObj, Entry, IResource, ResourceType, ReadObj, VReadObj } from 'fhir.js';
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
        //        baseUrl: 'http://fhirtest.uhn.ca/baseDstu3',
        baseUrl: 'http://localhost:8080/baseDstu3/',
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
            let patientId: string = "";
            let patientVersionId: string = "";
            let patientGiven: string = "Fälix";
            let patientFamily: string = "Müster";
            let debug: boolean = true;
            //            let response: ResponseObj = await this.client.conformance({ "debug": true});

            console.log("Step 1: Calling conformance statement")
            let response: ResponseObj = await this.client.conformance({});
            if (response.headers != undefined) {
                console.log(response.status);
                console.log(response.headers.get("server"))
                console.log(response.headers.get("x-powered-by"))
            }

            console.log("Step 2: Creating the patient" + patientGiven + " " + patientFamily);
            let entry: Entry =
                {
                    resource: {
                        "resourceType": "Patient",
                        "text": {
                            "status": "generated",
                            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">" + patientGiven + " " + patientFamily + "</div>"
                        },
                        "name": [
                            {
                                "family": patientFamily,
                                "given": [patientGiven]
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

            let createdPatient: IResource = response.data;

            if (response.headers != undefined) {
                console.log(response.status);
                console.log(response.headers.get("location"))
                console.log("id:" + response.data.id);
                console.log("versionId:" + response.data.meta.versionId);
                if (response.data.id != undefined) {
                    patientId = response.data.id;
                    patientVersionId = response.data.meta.versionId;
                }
            }
            console.log("Step 3: Reading patient" + patientGiven + " " + patientFamily + " with id back");
            let read: ReadObj = { id: patientId, type: "Patient" };
            response = await this.client.read(read)

            if (response.headers != undefined) {
                console.log(response.status);
                console.log("id: " + response.data.id);

                // astonished that this here works in typescript, name and family is not tpyed
                if (response.data.name[0].family == patientFamily) {
                    console.log("family name matches")
                }
                if (response.data.name[0].given[0] == patientGiven) {
                    console.log("given name matches")
                }
            }

            console.log("Step 4: Retrieve the change history for all resources");
            response = await this.client.history({});
            if (response.headers != undefined) {
                console.log(response.status);
                console.log("total entries: " + response.data.total);
            }

            console.log("Step 5: Retrieve the change history for a particular resource type ");
            response = await this.client.typeHistory({ type: "Patient" });
            if (response.headers != undefined) {
                console.log(response.status);
                console.log("total entries: " + response.data.total);
            }

            console.log("Step 6: Update an existing resource by its id");
            createdPatient.name[0].family = "Muster";
            response = await this.client.update({ resource: createdPatient });
            let updatedPatent: IResource = response.data;
            if (response.headers != undefined) {
                console.log(response.status);
                if ("Muster" == response.data.name[0].family) {
                    console.log("name updated");
                } else {
                    console.log("ERROR: name not updated");
                }
            }

            console.log("Step 7: Read the state of a specific version of the resource");
            response = await this.client.vread({ id: patientId, versionId: patientVersionId, type: "Patient" });
            if (response.headers != undefined) {
                console.log(response.status);

                if (patientId == response.data.id) {
                    console.log("patient id matches");
                }
                else {
                    console.log("ERROR: patient id does not match");
                }
                if (patientVersionId == response.data.meta.versionId) {
                    console.log("versionId matches");
                }
                else {
                    console.log("ERROR: version Id does not match");
                }
                if ("Müster" == response.data.name[0].family) {
                    console.log("name matches");
                } else {
                    console.log("ERROR: name does not match");
                }
            }

            console.log("Step 8: Retrieve the change history for a particular resource");
            response = await this.client.resourceHistory({ id: patientId, type: "Patient" });
            if (response.headers != undefined) {
                console.log(response.status);
                console.log("total entries: " + response.data.total);
            }

            let bundle: Entry =
                {
                    resource: {
                        "resourceType": "Bundle",
                        "id": "bundle-transaction",
                        "meta": {
                            "lastUpdated": "2014-08-18T01:43:30Z"
                        },
                        "type": "transaction",
                        "entry": [
                            {
                                "fullUrl": "urn:uuid:61ebe359-bfdc-4613-8bf2-c5e300945f0a",
                                "resource": {
                                    "resourceType": "Patient",
                                    "text": {
                                        "status": "generated",
                                        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Some narrative</div>"
                                    },
                                    "active": true,
                                    "name": [
                                        {
                                            "use": "official",
                                            "family": "Muster",
                                            "given": [
                                                "Felix",
                                                "Ulrich"
                                            ]
                                        }
                                    ],
                                    "gender": "male",
                                    "birthDate": "1974-12-25"
                                },
                                "request": {
                                    "method": "POST",
                                    "url": "Patient"
                                }
                            }
                        ]
                    }
                }
            console.log("Step 9: Perform a transaction");
            response = await this.client.transaction(bundle);
            if (response.headers != undefined) {
                console.log(response.status);
                console.log("Entry 0 status:" + response.data.entry[0].response.status);
                console.log("Entry 0 location:" + response.data.entry[0].response.location);
            }

            console.log("Step 10: Search for birthdate");
            response = await this.client.search({ type: "Patient", query: { birthdate: 1974 } });
            if (response.headers != undefined) {
                console.log(response.status);
                console.log("total entries: " + response.data.total);
                console.log();
            }

            console.log("Step 11: Search for exact name");
            response = await this.client.search({ type: "Patient", query: { name: { $and: [{ $exact: 'Muster' }, { $exact: 'Felix' }] } } });
            if (response.headers != undefined) {
                console.log(response.status);
                console.log("total entries: " + response.data.total);
                console.log();
            }

            console.log("Step 12: Create 200 observations for patientId ");
            
            let observation: Entry =
            {
                resource: {
                    "resourceType": "Observation",
                    "meta": {
                        "profile": [
                            "http://hl7.org/fhir/StructureDefinition/bodyweight"
                        ]
                    },
                    "text": {
                        "status": "generated",
                        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">72 kg</div>"
                    },
                    "status": "final",
                    "category": [
                        {
                            "coding": [
                                {
                                    "system": "http://hl7.org/fhir/observation-category",
                                    "code": "vital-signs",
                                    "display": "Vital Signs"
                                }
                            ]
                        }
                    ],
                    "code": {
                        "coding": [
                            {
                                "system": "http://loinc.org",
                                "code": "29463-7",
                                "display": "Body Weight"
                            },
                            {
                                "system": "http://loinc.org",
                                "code": "3141-9",
                                "display": "Body weight Measured"
                            },
                            {
                                "system": "http://snomed.info/sct",
                                "code": "27113001",
                                "display": "Body weight"
                            }
                        ]
                    },
                    "subject": {
                        "reference": "Patient/"+patientId
                    },
                    "effectiveDateTime": "2017-12-01",
                    "valueQuantity": {
                        "value": 72,
                        "unit": "kg",
                        "system": "http://unitsofmeasure.org",
                        "code": "kg"
                    }
                }
            }
            for (let i:number = 0; i < 200; i++) {
                // could be made async, we make it easier sequential
                response = await this.client.create(observation);
            }
            console.log("200 observations created for patient "+patientId," one of this "+response.data.id);

            console.log("Step 13: Search for patient observations name");
            response = await this.client.search({ "type": "Observation", query: { "subject": "Patient/"+patientId }});
            if (response.headers != undefined) {
                console.log(response.status);
                console.log("total entries: " + response.data.total);
                console.log(response.data.link);
                console.log();
            }

            response = await this.client.nextPage({bundle: response.data});
            if (response.headers != undefined) {
                console.log(response.status);
                console.log("total entries: " + response.data.total);
                console.log(response.data.link);
                console.log();
            }

            // https://github.com/FHIR/fhir.js/issues/105
            // RFC Mandates previous https://tools.ietf.org/html/rfc5005
            // response = await this.client.prevPage({bundle: response.data});
            // if (response.headers != undefined) {
            //     console.log(response.status);
            //     console.log("total entries: " + response.data.total);
            //     console.log(response.data.link);
            //     console.log();
            // }
            
            console.log("Step 14: Creating one more patient" + patientGiven + " " + patientFamily);
            response = await this.client.create(entry);

            console.log("Step 15: Delete a resource just created before");
//                        response = await this.client.delete({ resource: updatedPatent, debug: true });
            response = await this.client.delete({ resource: response.data });
            if (response.headers != undefined) {
                console.log(response.status);
            }
        } catch (error) {
            console.log("error" + error)
        }

    }

}