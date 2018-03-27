#!/usr/bin/env node
import * as commander from 'commander'
import { HelloWorld } from "./helloworld"
import { HelloFhir } from "./hellofhir"
import { Uuid } from "./uuid"

commander
    .version('0.0.1')
    .description('fhir ts cmdline')

commander.command('helloworld').alias('w').description('Hello World').action(() => {
    new HelloWorld().print("hallo");
})

commander.command('hellofhir').alias('f').description('Hello Fhir').action(() => {
    new HelloFhir().testApi();
})

commander.command('createpatient').alias('c').description('Create a paitent').action(() => {
    new HelloFhir().testCreate();
})

commander.command('uuid').alias('u').description('Generate a UUID for CDA').action(() => {
    console.log(new Uuid().getUuidCda());
})

if(!process.argv.slice(2).length/* || !/[arudl]/.test(process.argv.slice(2))*/) {
    commander.outputHelp()
    process.exit()
}

commander.parse(process.argv);