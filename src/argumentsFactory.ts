import { TypeConverter } from './typeFactory';
import { W3 } from './W3';

export class ArgumentFactory {
    private requireAddress(functionAbi: W3.ABIDefinition) {
        return !functionAbi.constant;
    }
    public getParams(functionAbi: W3.ABIDefinition) {
        const params = [];
        if (functionAbi.inputs && Array.isArray(functionAbi.inputs)) {
            params.push(...functionAbi.inputs.map(input => `${input.name}`));
        }

        if (this.requireAddress(functionAbi)) {
            params.push('{ from: senderAddress }');
        }

        return `${params.join(', ')}`;
    }
}