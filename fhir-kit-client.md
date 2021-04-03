Using FHIR Kit Client from Vermon
=================================

Github repository https://github.com/Vermonster/fhir-kit-client
Docs https://vermonster.github.io/fhir-kit-client/fhir-kit-client/1.6.3/index.html


npm add fhir-kit-client
npm i --save-dev @types/fhir-kit-client

tsconfig.json needs to have in compilerOptions:
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

ts-node src/fhirtscmd.ts createpatient


enable debugging osx:
export DEBUG=fhir-kit-client:*    



may for jasmine test setup check out: https://medium.com/@turhan.oz/typescript-with-jasmine-easy-project-setup-530c7cc764e8


## TODO: Operation definition is missing:

https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/fhir-kit-client
https://github.com/Vermonster/DefinitelyTyped/tree/update-fhir-kit-client


params.name	String		The name of the operation (will get prepended with $ if missing.
params.resourceType	String	<optional> Optional The resource type (e.g. "Patient", "Observation")
params.id	String	<optional> Optional FHIR id for the resource
params.method	String	<optional> Optional The HTTP method (post or get, defaults to post)
params.input	Object	<optional> Optional input object for the operation
params.options	Object	<optional> Optional options object
Name	Type	Attributes	Description headers	Object	<optional> Optional headers to add to the request


  /**
   * Run a custom FHIR operation on system, resource type or instance level.
   *
   * - To run a system-level operation, omit the resourceType and id parameters.
   * - To run a type-level operatiion, include the resourceType and omit the id parameter.
   * - To run an instance-type operation, include both the resourceType and id.
   *
   * @example
   *
   * client.operation({ resourceType: 'ConceptMap', name: '$apply' }).
   *   then(result => console.log(result).
   *   catch(e => console.error(e));
   *
   *
   * const input = {
   *  system: 'http://hl7.org/fhir/composition-status',
   *  code: 'preliminary',
   *  source: 'http://hl7.org/fhir/ValueSet/composition-status',
   *  target: 'http://hl7.org/fhir/ValueSet/v3-ActStatus'
   * };
   *
   * client.operation({resourceType: 'ConceptMap', name: 'translate', method: 'get', input}).
   *   then(result => console.log(result)).
   *   catch(e => console.error(e));
   *
   * @param {String} params.name - The name of the operation (will get
   *    prepended with $ if missing.
   * @param {String} [params.resourceType] - Optional The resource type (e.g. "Patient",
   *   "Observation")
   * @param {String} [params.id] - Optional FHIR id for the resource
   * @param {String} [params.method] - Optional The HTTP method (post or get, defaults to post)
   * @param {Object} [params.input] - Optional input object for the operation
   * @param {Object} [params.options] - Optional options object
   * @param {Object} [params.options.headers] - Optional headers to add to the
   *   request
   *
   * @return {Promise<Object>} Result of opeartion (e.g. FHIR Parameter)
   */
     operation(params: { name: string, resourceType: ResourceType, id?: string, method?:string, input?:any, options?: Options }): Promise<any>;
