import { W3 } from './W3';
export class TypeConverter {
    getType(type: W3.ABIDataTypes): string {
        const isArray = /\[\]/.test(type);
        let tsType = '';
        switch (type.replace(/\[\]/, '')) {
            case 'address':
            case 'string':
                tsType = 'string';
            case 'uint256':
                tsType = 'string';
            case 'boolean':
                tsType = 'boolean';
            case 'bytes':
                tsType = 'string';
            default:
                tsType = 'string';
        }
        return isArray ? tsType + '[]' : tsType;
    }
}