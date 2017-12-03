// Type definitions fhir.js 
// Project: https://github.com/FHIR/fhir.js
// Definitions by: oliver egger, https://github.com/oliveregger

/** resource interface */
interface IResource {
    resourceType: string;
    id? : string;
    meta? : any;
    text? : any;
    [others: string]: any;
}

type Auth = { bearer?: string; user?: string; pass?: string }
type Config = { baseUrl: string; auth?: Auth; credentials: string; headers?: Map<string, any> }
// method could be refined to (GET|POST|PUT|DELETE)
type RequestObj = { method: string; url: string, headers?: Map<string, string[]> }
type ResponseObj = { status: number; headers?: Map<string, string[]>; config: any; data: IResource }
type ReadObj = { "type": string; id?: string}

/** create objects */
type Tag = { term: string; schema: string; label: string }

type Entry = { resource: IResource; category?: Tag[] }

declare function http(requestObj: RequestObj): Promise<IFhir>;

// to declard headerFn function to get header, i.e. headerFn('Content')
declare function succes(data: any, status: any, headerFn: any, config: Config): void;
declare function error(data: any, status: any, headerFn: any, config: Config): void;


export interface IFhir {

    /** gets the capability statement */
    conformance(query: any): Promise<ResponseObj>;

    /** creates a resource on the server */
    create(entry: Entry): Promise<ResponseObj>;

    /** reads a resource from server */
    read(read: ReadObj): Promise<ResponseObj>;
    


    document(query: any): any;
    profile(query: any): any;
    transaction(query: any): any;
    history(query: any): any;
    typeHistory(query: any): any;
    resourceHistory(query: any): any;
    read(query: any): any;
    vread(query: any): any;
    delete(query: any): any;
    validate(query: any): any;
    search(query: any): any;
    update(query: any): any;
    nextPage(query: any): any;
    prevPage(query: any): any;
    resolve(query: any): any;
}