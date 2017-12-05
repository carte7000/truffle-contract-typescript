import { TypeConverter } from './../typeFactory';
import { ParameterFactory } from './../parameterFactory';
import { ArgumentFactory } from './../argumentsFactory';
import { W3 } from './../W3';

export class FunctionFactory {

    private typeConverter = new TypeConverter();
    private parameterFactory = new ParameterFactory();
    private argumentFactory = new ArgumentFactory();

    private wayToCall(functionAbi: W3.ABIDefinition) {
        return functionAbi.constant ? `.call` : '';
    }

    private getOutputType(functionAbi: W3.ABIDefinition) {
        return functionAbi.outputs && Array.isArray(functionAbi.outputs) && functionAbi.outputs.length > 0 ? this.typeConverter.getType(functionAbi.outputs[0].type) : 'void';
    }

    public generateFunction(functionAbi: W3.ABIDefinition[]) {
        const name = functionAbi[0].name;
        const outputTypes = Array.from(functionAbi.map(x => this.getOutputType(x)).reduce((prev, current) => {
            prev.add(current);
            return prev;
        }, new Set()));

        const parameters = functionAbi.map(abi => this.parameterFactory.getParameters(abi));

        const guards = functionAbi.length === 1 ? [] : functionAbi.map((abi, index) => this.parameterFactory.getGuards(abi, name+'Guard'+index));

        const calls = functionAbi.length === 1 ? [`return await instance.${name}${this.wayToCall(functionAbi[0])}(${this.argumentFactory.getParams(functionAbi[0])})`] : functionAbi.map((abi, index) => {           
            return `
                if(this.$${name+'Guard'+index}(params)) {
                    return await instance.${name}${this.wayToCall(abi)}(${this.argumentFactory.getParams(abi)})
                }
            `;
        })

        if(functionAbi.length !== 1) {
            calls.push('return null');
        }

        const result = `

            ${guards.join('\n')}

            public async ${name}(params: ${parameters.join(' | ')}): Promise<${outputTypes.join(' | ')} | null> {
                const instance = await this._getInstance();
                ${calls.join('\n')}
            }
        `
        return result;
    }
} 