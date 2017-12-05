import { TypeConverter } from './../typeFactory';
import { ParameterFactory } from './../parameterFactory';
import { ArgumentFactory } from './../argumentsFactory';
import { W3 } from './../W3';

export class EventFactory {

    private typeConverter = new TypeConverter();
    private parameterFactory = new ParameterFactory();
    private argumentFactory = new ArgumentFactory();

    public generateEvent(eventAbi: W3.ABIDefinition[]) {
        const argsType = eventAbi.map((val, index) => {
            const inputs = val.inputs && Array.isArray(val.inputs) ? val.inputs : [];
            const params = inputs.map((input, index) => { return `${input.name || 'param' + index}: ${this.typeConverter.getType(input.type)}`});
            return `{${params.join(';')}}`;
        });
        const result = 
        `
            private _${eventAbi[0].name}Watcher = {
                watch: async (cb: (args: ${argsType.join(' | ')}) => void) => {
                    const instance = await this._getInstance();
                    instance.${eventAbi[0].name}('latest').watch((error: Error, result: any) => {
                        cb(result.args);
                    });
                }
            }

            public get ${eventAbi[0].name}Event() {
                return this._${eventAbi[0].name}Watcher;
            }
        `;
        return result;
    }
} 