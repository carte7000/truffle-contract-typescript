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
            params.push(...functionAbi.inputs.map(input => `${input.name}: ${this.typeConverter.getType(input.type)}`));
        }

        if (this.requireAddress(functionAbi)) {
            params.push('senderAddress: string');
        }

        return `(${params.join(', ')})`;
    }
}