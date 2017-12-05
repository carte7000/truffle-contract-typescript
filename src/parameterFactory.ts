import { TypeConverter } from './typeFactory';
import { W3 } from './W3';

export class ParameterFactory {

    private typeConverter = new TypeConverter();

    private requireAddress(functionAbi: W3.ABIDefinition) {
        return !functionAbi.constant;
    }

    public getParameters(functionAbi: W3.ABIDefinition) {
        const params = [];
        if (functionAbi.inputs && Array.isArray(functionAbi.inputs)) {
            params.push(...functionAbi.inputs.map((input, index) => `${input.name || 'param' + index}: ${this.typeConverter.getType(input.type)}`));
        }

        if (this.requireAddress(functionAbi)) {
            params.push('senderAddress: string');
        }

        return `{${params.join(';\n')}}`;
    }

    public getGuards(functionAbi: W3.ABIDefinition, name: string) {
        const params = [];
        if (functionAbi.inputs && Array.isArray(functionAbi.inputs)) {
            params.push(...functionAbi.inputs.map((input, index) => `${input.name || 'param' + index}`));
        }

        if (this.requireAddress(functionAbi)) {
            params.push('senderAddress');
        }

        if(params.length === 0) {
          return `
            private $${name}(params: any): params is ${this.getParameters(functionAbi)} {
                return true;
            }`  
        }

        return `
            private $${name}(params: any): params is ${this.getParameters(functionAbi)} {
                return ${params.map(value => `'${value}' in params` ).join(' && ')}
            }
        `
    }
}