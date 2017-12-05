#!/usr/bin/env node

import { W3 } from './W3';
const path = require('path');

import { FunctionFactory } from './functions/functionFactory';
import { EventFactory } from './events/eventFactory';
import { assets } from './assets/web3Contract';

class AbiParser {

    private functionFactory = new FunctionFactory();
    private eventFactory = new EventFactory();

    private _getBaseClass(abi: any) {
        return abi.networks == {} ? 'Web3Contract' : 'StaticWeb3Contract';
    }

    public generate(abi: any) {

        const myAbi = abi as {
            contractName: string,
            abi: W3.ABIDefinition[],
            networks: {},
        }

        const contractName = abi.contractName;
        const abiProp = abi.abi;
        const networks = abi.networks;


        let contract = `
            export class ${myAbi.contractName} extends ${this._getBaseClass(abi)} {    
                constructor() {
                    super(${JSON.stringify({contractName, networks, abi: abiProp}).replace(/\s/g, '')})    
                }
        `

        const filteredAbi = myAbi.abi.filter(x => x.name && !x.name.startsWith('__'));
        
        const grouped = Array.from(filteredAbi.map(element => {
            return {
                name: element.name,
                type: element.type,
                items: [element]
            }
        }).reduce((prev, current) => {
            const key = current.name + '_' + current.type;
            if(!prev.has(key)) {
                prev.set(key, {name: current.name, type: current.type, items: []});
            }
            const old = prev.get(key);
            old.items.push(...current.items);
            prev.set(key, old);
            return prev;
        }, new Map()).values());
        console.log(grouped);
        for (const prop of grouped) {
            console.log(prop);
            const val = prop;
            switch (val.type) {
                case 'function':
                    contract += this.functionFactory.generateFunction(prop.items);
                case 'event':
                    contract += this.eventFactory.generateEvent(prop.items);
                default:
            }
        }
        contract += '}';
        return contract;
    }
}

declare var require: any;
declare var console: any;
const fs = require('fs');
const program = require('commander');

const outputFile = (file: any, output: any) => {
    fs.readFile(file, function read(err: any, data: any) {
        if (err) {
            throw err;
        }
        const content = (new AbiParser()).generate(JSON.parse(data));
        fs.appendFile(output, content, function (err: any) {
            if (err) {
                return console.log(err);
            }

            console.log("Files transpiled successfully");
        });
    });
}

program
    .version('0.0.1')
    .description('Truffle Contract Typescript - transform your contract definition into class');

program
    .command('build <file> <output>')
    .alias('b')
    .description('Transpile file or folder')
    .action((file: any, output: any) => {
        const stat = fs.lstatSync(file);
        fs.writeFile(output, assets, function (err: any) {
            if (stat.isDirectory()) {
                fs.readdir(file, (err: any, files: any) => {
                    files.forEach((subFile: any) => {
                        outputFile(file + '/' + subFile, output)
                    });
                });
            } else {
                outputFile(file, output);
            }
        });
    });

program.parse(process.argv);