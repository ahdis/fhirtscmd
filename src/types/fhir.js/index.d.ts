// Type definitions fhir.js 
// Project: https://github.com/FHIR/fhir.js
// Definitions by: oliver egger, https://github.com/oliveregger

/** resource interface */
interface IResource {
    resourceType: string;
    id?: string;
    meta?: any;
    text?: any;
    [others: string]: any;
}

type Auth = { bearer?: string; user?: string; pass?: string }
type Config = { baseUrl: string; auth?: Auth; credentials: string; headers?: Map<string, any> }
// method could be refined to (GET|POST|PUT|DELETE)
type RequestObj = { method: string; url: string, headers?: Map<string, string[]> }
type ResponseObj = { status: number; headers?: Map<string, string[]>; config: any; data: IResource }

/** set the debug property property to true to get console logging activated */
type Minimal = { debug?: boolean }

/** FHIR Resource Type */
type ResourceType = { "type": string } & Minimal
type ReferenceObj = { "reference" : string } & Minimal
type BundleObj = { bundle: any } & Minimal;
type ReadObj = { id: string } & ResourceType;
type QueryObj = { query: any } & ResourceType;
type VReadObj = { versionId: string } & ReadObj;

/** Create Objects */
type Tag = { term: string; schema: string; label: string }
type Entry = { resource: IResource; category?: Tag[] } & Minimal

declare function http(requestObj: RequestObj): Promise<IFhir>;

// to declard headerFn function to get header, i.e. headerFn('Content')
declare function succes(data: any, status: any, headerFn: any, config: Config): void;
declare function error(data: any, status: any, headerFn: any, config: Config): void;

/** Interface defintion to fhir.js */
export interface IFhir {

    /** Get a capability statement for the system */
    conformance(empty: Minimal): Promise<ResponseObj>;

    /** Create a new resource with a server assigned id */
    create(entry: Entry): Promise<ResponseObj>;

    /** Read the current state of the resource */
    read(resource: ReadObj): Promise<ResponseObj>;

    /** Retrieve the change history for all resources */
    history(empty: Minimal): Promise<ResponseObj>;

    /** Retrieve the change history for a particular resource type */
    typeHistory(query: ResourceType): Promise<ResponseObj>;

    /** Retrieve the change history for a particular resource */
    resourceHistory(query: ReadObj): Promise<ResponseObj>;

    /** Read the state of a specific version of the resource */
    vread(query: VReadObj): Promise<ResponseObj>;

    /** Update an existing resource by its id (or create it if it is new) */
    update(entry: Entry): Promise<ResponseObj>;

    /** Delete a resource */
    delete(query: Entry): Promise<ResponseObj>;

    /** The transaction interactions submit a set of actions to perform on a server in a single HTTP request/response. */
    transaction(bundle: Entry): Promise<ResponseObj>;
    
    /** searches a set of resources based on some filter criteria */
    search(query: QueryObj): Promise<ResponseObj>;

     /** returns the next results in a series of pages */
    nextPage(query: BundleObj): Promise<ResponseObj>;

     /** returns the previous results in a series of pages */
    prevPage(query: BundleObj): Promise<ResponseObj>;


    /** These functions below are not yet typescripted because the exact funticionality is not clear */

    /** Validate a resource, but see see issue here first: https://github.com/FHIR/fhir.js/issues/93 */
    validate(query: any): any;

    /** POST on /Document ? */
    document(query: any): any;

    /** GET on /Profile/:type ? */
    profile(query: any): any;    

    /** resolves a referenced resources, don't now how ho pass in the defer() function */
    resolve( ref: ReferenceObj): Promise<ResponseObj>;
        
}