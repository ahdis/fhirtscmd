import FHIRClient from 'fhir-kit-client';

export class FhirKitClientSample {


    private config: Config = {
//        baseUrl: 'https://test.ahdis.ch/hapi-fhir-jpavalidator/fhir',
baseUrl: 'http://localhost:8080/r4',
credentials: 'same-origin'
    };

    private fhirClient : FHIRClient;

    constructor() {
        this.fhirClient = new FHIRClient(this.config);
    }

    async testCreate() {

        try {
            const newPatient : fhir.Patient = {
                resourceType: 'Patient',
                active: true,
                name: [{ use: 'official', family: 'Coleman', given: ['Lisa', 'P.'] }],
                gender: 'female',
                birthDate: '1948-04-14',
              }
            
            let response = await this.fhirClient.create({
                resourceType: 'Patient',
                body: newPatient,
            })
            console.log(JSON.stringify(response));
        } catch (error) {
            console.log("error")
            console.log(JSON.stringify(error));
        }
    }

    async testTransform() {

        try {
            const qr : fhir.QuestionnaireResponse = {
                    resourceType: 'QuestionnaireResponse',
                    status: 'in-progress',
                    item: [
                      {
                        linkId: 'order',
                        item: [
                          {
                            linkId: "order.number",
                            answer: [
                              {
                                valueString: '1234'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }                  
            this.fhirClient.operation({ name: 'transform', resourceType: 'StructureMap', id: 'OrfQrToBundle', options: qr}).then(result => console.log(result)).
                catch(e => console.error(e));
        } catch (error) {
            console.log("error")
            console.log(JSON.stringify(error));
        }
    }


}