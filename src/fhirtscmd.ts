#!/usr/bin/env node
import { Command } from 'commander';
import { HelloWorld } from "./helloworld"
import { HelloFhir } from "./hellofhir"
import { FhirKitClientSample } from "./FhirKitClientSample"
import { Uuid } from "./uuid"

const program = new Command();

program
    .version('0.0.1')
    .description('fhir ts cmdline')

program.command('helloworld').alias('w').description('Hello World').action(() => {
    new HelloWorld().print("hallo");
})

program.command('hellofhir').alias('f').description('Hello Fhir').action(() => {
    new HelloFhir().testApi();
})

program.command('createpatient').alias('c').description('Create a patient').action(() => {
    new FhirKitClientSample().testCreate();
})

program.command('transform').alias('c').description('Transforrm').action(() => {
    new FhirKitClientSample().testTransform();
})

program.command('uuid').alias('u').description('Generate a UUID for CDA').action(() => {
    console.log(new Uuid().getUuidCda());
})

if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
    program.outputHelp()
    process.exit()
}

program.parse(process.argv);