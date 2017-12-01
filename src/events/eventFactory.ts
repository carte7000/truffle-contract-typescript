import { TypeConverter } from './../typeFactory';
import { ParameterFactory } from './../parameterFactory';
import { ArgumentFactory } from './../argumentsFactory';
import { W3 } from './../W3';

export class EventFactory {

    private typeConverter = new TypeConverter();
    private parameterFactory = new ParameterFactory();
    private argumentFactory = new ArgumentFactory();

    public generateEvent(eventAbi: W3.ABIDefinition) {
        // const outputType = functionAbi.outputs && Array.isArray(functionAbi.outputs) && functionAbi.outputs.length > 0 ? this.typeConverter.getType(functionAbi.outputs[0].type) : 'void';
        // const result = `
        //     public async ${functionAbi.name}${this.parameterFactory.getParameters(functionAbi)}: Promise<${outputType}> {
        //         const instance = await this._getInstance();
        //         return await instance.${functionAbi.name}.call(${this.argumentFactory.getParams(functionAbi)});
        //     }
        // `
        // return result;
    }
} 