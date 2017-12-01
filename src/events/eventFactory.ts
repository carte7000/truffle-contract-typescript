import { TypeConverter } from './../typeFactory';
import { ParameterFactory } from './../parameterFactory';
import { ArgumentFactory } from './../argumentsFactory';
import { W3 } from './../W3';

export class EventFactory {

    private typeConverter = new TypeConverter();
    private parameterFactory = new ParameterFactory();
    private argumentFactory = new ArgumentFactory();

    public generateEvent(eventAbi: W3.ABIDefinition) {
        const inputs = eventAbi.inputs && Array.isArray(eventAbi.inputs) ? eventAbi.inputs : [];
        const params = inputs.map((input) => { return `${input.name}: ${this.typeConverter.getType(input.type)}`});
        const result = 
        `
            private _${eventAbi.name}Watcher = {
                watch: async (cb: (args: {${params.join(';')}}) => void) => {
                    const instance = await this._getInstance();
                    instance.${eventAbi.name}('latest').watch((error: Error, result: any) => {
                        cb(result.args);
                    });
                }
            }

            public get ${eventAbi.name}() {
                return this._${eventAbi.name}Watcher;
            }
        `;
        return result;
    }
} 