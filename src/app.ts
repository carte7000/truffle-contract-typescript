// import * as data from './abi.json';
import { W3 } from './W3';
const path = require('path');

import { FunctionFactory } from './functions/functionFactory';
import { assets } from './assets/web3Contract';

class AbiParser {

    private functionFactory = new FunctionFactory();

    private _getBaseClass(abi: any) {
        return abi.networks == {} ? 'Web3Contract' : 'StaticWeb3Contract';
    }

    public generate(abi: any) {

        const myAbi = abi as {
            contractName: string,
            abi: W3.ABIDefinition[]
        }

        let contract = `
            export class ${myAbi.contractName} extends ${this._getBaseClass(abi)} {    
                constructor() {
                    const abi = ${JSON.stringify(abi).replace(/\s/g, '')};
                    super(abi)    
                }
        `

        for (const prop of myAbi.abi) {
            switch (prop.type) {
                case 'function':
                    contract += this.functionFactory.generateFunction(prop);
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
        fs.appendFile(output, assets, function (err: any) {
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