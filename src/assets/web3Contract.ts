export const assets = ` 

export namespace W3 {
    declare type BigNumber = Object;

    export type address = string;
    export type bytes = string;

    /** Truffle Contract */
    export namespace TC {
        export interface TxParams {
            from: address;
            gas: number;
            gasPrice: number;
            value: number;
        }

        export type ContractDataType = BigNumber | number | string | boolean | BigNumber[] | number[] | string[];

        export interface TransactionResult {
            /** Transaction hash. */
            tx: string;
            receipt: TransactionReceipt;
            /** This array has decoded events, while reseipt.logs has raw logs when returned from TC transaction */
            logs: Log[];
        }

        export function txParamsDefaultDeploy(from: address): TxParams {
            return {
                from: from,
                gas: 4712388,
                gasPrice: 20000000000,
                value: 0
            };
        }

        export function txParamsDefaultSend(from: address): TxParams {
            return {
                from: from,
                gas: 50000,
                gasPrice: 20000000000,
                value: 0
            };
        }
    }

    // '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
    export interface JsonRPCRequest {
        jsonrpc: string;
        method: string;
        params: any[];
        id: number | string;
    }
    export interface JsonRPCResponse {
        jsonrpc: string;
        id: number | string;
        result?: any;
        error?: string;
    }

    export interface Provider {
        sendAsync(
            payload: JsonRPCRequest,
            callback: (err: Error, result: JsonRPCResponse) => void,
        ): void;
    }

    // export interface Provider {
    //     send(payload: JsonRPCRequest, callback: (e: Error, val: JsonRPCResponse) => void);
    // }

    export interface WebsocketProvider extends Provider { }
    export interface HttpProvider extends Provider { }
    export interface IpcProvider extends Provider { }
    export interface Providers {
        WebsocketProvider: new (host: string, timeout?: number) => WebsocketProvider;
        HttpProvider: new (host: string, timeout?: number) => HttpProvider;
        IpcProvider: new (path: string, net: any) => IpcProvider;
    }

    // tslint:disable-next-line:max-line-length
    export type Unit = 'kwei' | 'femtoether' | 'babbage' | 'mwei' | 'picoether' | 'lovelace' | 'qwei' | 'nanoether' | 'shannon' | 'microether' | 'szabo' | 'nano' | 'micro' | 'milliether' | 'finney' | 'milli' | 'ether' | 'kether' | 'grand' | 'mether' | 'gether' | 'tether';

    export type BlockType = 'latest' | 'pending' | 'genesis' | number;

    export interface BatchRequest {
        add(request: Request): void;
        execute(): void;
    }
    export interface Iban { }
    export interface Utils {
        BN: BigNumber; // TODO only static-definition
        isBN(obj: any): boolean;
        isBigNumber(obj: any): boolean;
        isAddress(obj: any): boolean;
        isHex(obj: any): boolean;
        // tslint:disable-next-line:member-ordering
        asciiToHex(val: string): string;
        hexToAscii(val: string): string;
        bytesToHex(val: number[]): string;
        numberToHex(val: number | BigNumber): string;
        checkAddressChecksum(address: string): boolean;
        fromAscii(val: string): string;
        fromDecimal(val: string | number | BigNumber): string;
        fromUtf8(val: string): string;
        fromWei(val: string | number | BigNumber, unit: Unit): string | BigNumber;
        hexToBytes(val: string): number[];
        hexToNumber(val: string | number | BigNumber): number;
        hexToNumberString(val: string | number | BigNumber): string;
        hexToString(val: string): string;
        hexToUtf8(val: string): string;
        keccak256(val: string): string;
        leftPad(str: string, chars: number, sign: string): string;
        padLeft(str: string, chars: number, sign: string): string;
        rightPad(str: string, chars: number, sign: string): string;
        padRight(str: string, chars: number, sign: string): string;
        sha3(val: string, val2?: string, val3?: string, val4?: string, val5?: string): string;
        soliditySha3(val: string): string;
        randomHex(bytes: number): string;
        stringToHex(val: string): string;
        toAscii(hex: string): string;
        toBN(obj: any): BigNumber;
        toChecksumAddress(val: string): string;
        toDecimal(val: any): number;
        toHex(val: any): string;
        toUtf8(val: any): string;
        toWei(val: string | number | BigNumber, unit: Unit): string | BigNumber;
        // tslint:disable-next-line:member-ordering
        unitMap: any;
    }
    export type Callback<T> = (error: Error, result: T) => void;
    export type ABIDataTypes = 'uint256' | 'boolean' | 'string' | 'bytes' | string; // TODO complete list

    export interface ABIDefinition {
        constant?: boolean;
        payable?: boolean;
        anonymous?: boolean;
        inputs?: Array<{ name: string, type: ABIDataTypes, indexed?: boolean }>;
        name?: string;
        outputs?: Array<{ name: string, type: ABIDataTypes }>;
        type: 'function' | 'constructor' | 'event' | 'fallback';
    }

    export interface CompileResult {
        code: string;
        info: {
            source: string;
            language: string;
            languageVersion: string;
            compilerVersion: string;
            abiDefinition: Array<ABIDefinition>;
        };
        userDoc: { methods: object };
        developerDoc: { methods: object };
    }

    export interface Transaction {
        hash: string;
        nonce: number;
        blockHash: string;
        blockNumber: number;
        transactionIndex: number;
        from: string;
        to: string;
        value: string;
        gasPrice: string;
        gas: number;
        input: string;
        v?: string;
        r?: string;
        s?: string;
    }
    export interface EventLog {
        event: string;
        address: string;
        returnValues: object;
        logIndex: number;
        transactionIndex: number;
        transactionHash: string;
        blockHash: string;
        blockNumber: number;
        raw?: { data: string, topics: any[] };
    }

    export interface TransactionReceipt {
        transactionHash: string;
        transactionIndex: number;
        blockHash: string;
        blockNumber: number;
        from: string;
        to: string;
        contractAddress: string;
        cumulativeGasUsed: number;
        gasUsed: number;
        logs?: Log[];
        events?: {
            [eventName: string]: EventLog
        };
    }
    export interface BlockHeader {
        number: number;
        hash: string;
        parentHash: string;
        nonce: string;
        sha3Uncles: string;
        logsBloom: string;
        transactionRoot: string;
        stateRoot: string;
        receiptRoot: string;
        miner: string;
        extraData: string;
        gasLimit: number;
        gasUsed: number;
        timestamp: number;
    }
    export interface Block extends BlockHeader {
        transactions: Array<Transaction>;
        size: number;
        difficulty: number;
        totalDifficulty: number;
        uncles: Array<string>;
    }

    export interface Logs {
        fromBlock?: number;
        address?: string;
        topics?: Array<string | string[]>;

    }

    /**  */
    export interface Log {
        /** true when the log was removed, due to a chain reorganization. false if its a valid log. */
        removed?: boolean;
        logIndex: number;
        transactionIndex: number;
        transactionHash: string;
        blockHash: string;
        blockNumber: number;
        address: string;
        data?: string;
        topics?: Array<string>;

        /** Truffle-contract returns this as 'mined' */
        type?: string;

        /** Event name decoded by Truffle-contract */
        event?: string;
        /** Args passed to a Truffle-contract method */
        args?: any;
    }

    export interface Subscribe<T> {
        subscription: {
            id: string;
            subscribe(callback?: Callback<Subscribe<T>>): Subscribe<T>;
            unsubscribe(callback?: Callback<boolean>): void | boolean;
            // tslint:disable-next-line:member-ordering
            arguments: object;
        };
        /*  on(type: "data" , handler:(data:Transaction)=>void): void
          on(type: "changed" , handler:(data:Logs)=>void): void
          on(type: "error" , handler:(data:Error)=>void): void
          on(type: "block" , handler:(data:BlockHeader)=>void): void
          */
        on(type: 'data', handler: (data: T) => void): void;
        on(type: 'changed', handler: (data: T) => void): void;
        on(type: 'error', handler: (data: Error) => void): void;
    }

    export interface Account {
        address: string;
        privateKey: string;
        publicKey: string;

    }

    export interface PrivateKey {
        address: string;
        Crypto: {
            cipher: string,
            ciphertext: string,
            cipherparams: {
                iv: string
            },
            kdf: string,
            kdfparams: {
                dklen: number,
                n: number,
                p: number,
                r: number,
                salt: string
            },
            mac: string
        };
        id: string;
        version: number;
    }

    export interface Signature {
        message: string;
        hash: string;
        r: string;
        s: string;
        v: string;
    }
    export interface Tx {
        nonce?: string | number;
        chainId?: string | number;
        from?: string;
        to?: string;
        data?: string;
        value?: string | number;
        gas?: string | number;
        gasPrice?: string | number;
    }

    export interface ContractOptions {
        address: string;
        jsonInterface: ABIDefinition[];
        from?: string;
        gas?: string | number | BigNumber;
        gasPrice?: number;
        data?: string;
    }

    export type PromiEventType = 'transactionHash' | 'receipt' | 'confirmation' | 'error';
    export interface PromiEvent<T> extends Promise<T> {
        once(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>;
        once(type: 'receipt', handler: (receipt: TransactionReceipt) => void): PromiEvent<T>;
        once(type: 'confirmation', handler: (confNumber: number, receipt: TransactionReceipt) => void): PromiEvent<T>;
        once(type: 'error', handler: (error: Error) => void): PromiEvent<T>;
        // tslint:disable-next-line:max-line-length
        once(type: 'error' | 'confirmation' | 'receipt' | 'transactionHash', handler: (error: Error | TransactionReceipt | string) => void): PromiEvent<T>;
        on(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>;
        on(type: 'receipt', handler: (receipt: TransactionReceipt) => void): PromiEvent<T>;
        on(type: 'confirmation', handler: (confNumber: number, receipt: TransactionReceipt) => void): PromiEvent<T>;
        on(type: 'error', handler: (error: Error) => void): PromiEvent<T>;
        // tslint:disable-next-line:max-line-length
        on(type: 'error' | 'confirmation' | 'receipt' | 'transactionHash', handler: (error: Error | TransactionReceipt | string) => void): PromiEvent<T>;
    }
    export interface EventEmitter {
        on(type: 'data', handler: (event: EventLog) => void): EventEmitter;
        on(type: 'changed', handler: (receipt: EventLog) => void): EventEmitter;
        on(type: 'error', handler: (error: Error) => void): EventEmitter;
        // tslint:disable-next-line:max-line-length
        on(type: 'error' | 'data' | 'changed', handler: (error: Error | TransactionReceipt | string) => void): EventEmitter;
    }

    export interface TransactionObject<T> {
        arguments: any[];
        call(tx?: Tx): Promise<T>;
        send(tx?: Tx): PromiEvent<T>;
        estimateGas(tx?: Tx): Promise<number>;
        encodeABI(): string;
    }

    export interface Contract {
        options: ContractOptions;
        methods: {
            [fnName: string]: (...args: any[]) => TransactionObject<any>
        };
        deploy(options: {
            data: string
            arguments: any[]
        }): TransactionObject<Contract>;
        // tslint:disable-next-line:member-ordering
        events: {
            [eventName: string]: (options?: {
                filter?: object
                fromBlock?: BlockType
                topics?: any[]
            }, cb?: Callback<EventLog>) => EventEmitter
            // tslint:disable-next-line:max-line-length
            allEvents: (options?: { filter?: object, fromBlock?: BlockType, topics?: any[] }, cb?: Callback<EventLog>) => EventEmitter
        };

    }

    export interface Eth {
        readonly defaultAccount: string;
        readonly defaultBlock: BlockType;
        BatchRequest: new () => BatchRequest;
        Iban: new (address: string) => Iban;
        Contract: new (jsonInterface: any[], address?: string, options?: {
            from?: string
            gas?: string | number | BigNumber
            gasPrice?: number
            data?: string
        }) => Contract;
        abi: {
            decodeLog(inputs: object, hexString: string, topics: string[]): object
            encodeParameter(type: string, parameter: any): string
            encodeParameters(types: string[], paramaters: any[]): string
            encodeEventSignature(name: string | object): string
            encodeFunctionCall(jsonInterface: object, parameters: any[]): string
            encodeFunctionSignature(name: string | object): string
            decodeParameter(type: string, hex: string): any
            decodeParameters(types: string[], hex: string): any
        };
        accounts: {
            'new'(entropy?: string): Account
            privateToAccount(privKey: string): Account
            publicToAddress(key: string): string
            // tslint:disable-next-line:max-line-length
            signTransaction(tx: Tx, privateKey: string, returnSignature?: boolean, cb?: (err: Error, result: string | Signature) => void): Promise<string> | Signature;
            recoverTransaction(signature: string | Signature): string
            sign(data: string, privateKey: string, returnSignature?: boolean): string | Signature
            recover(signature: string | Signature): string
            encrypt(privateKey: string, password: string): PrivateKey
            decrypt(privateKey: PrivateKey, password: string): Account
            // tslint:disable-next-line:member-ordering
            wallet: {
                'new'(numberOfAccounts: number, entropy: string): Account[]
                add(account: string | Account): any
                remove(account: string | number): any
                save(password: string, keyname?: string): string
                load(password: string, keyname: string): any
                clear(): any
            }
        };
        call(callObject: Tx, defaultBloc?: BlockType, callBack?: Callback<string>): Promise<string>;
        clearSubscriptions(): boolean;
        subscribe(type: 'logs', options?: Logs, callback?: Callback<Subscribe<Log>>): Promise<Subscribe<Log>>;
        subscribe(type: 'syncing', callback?: Callback<Subscribe<any>>): Promise<Subscribe<any>>;
        // tslint:disable-next-line:max-line-length
        subscribe(type: 'newBlockHeaders', callback?: Callback<Subscribe<BlockHeader>>): Promise<Subscribe<BlockHeader>>;
        subscribe(type: 'pendingTransactions', callback?: Callback<Subscribe<Transaction>>): Promise<Subscribe<Transaction>>;
        // tslint:disable-next-line:max-line-length
        subscribe(type: 'pendingTransactions' | 'newBlockHeaders' | 'syncing' | 'logs', options?: Logs, callback?: Callback<Subscribe<Transaction | BlockHeader | any>>): Promise<Subscribe<Transaction | BlockHeader | any>>;

        unsubscribe(callBack: Callback<boolean>): void | boolean;
        // tslint:disable-next-line:member-ordering
        compile: {
            solidity(source: string, callback?: Callback<CompileResult>): Promise<CompileResult>;
            lll(source: string, callback?: Callback<CompileResult>): Promise<CompileResult>;
            serpent(source: string, callback?: Callback<CompileResult>): Promise<CompileResult>;
        };
        // tslint:disable-next-line:member-ordering
        currentProvider: Provider;
        estimateGas(tx: Tx, callback?: Callback<number>): Promise<number>;
        getAccounts(cb?: Callback<Array<string>>): Promise<Array<string>>;
        getBalance(address: string, defaultBlock?: BlockType, cb?: Callback<number>): Promise<number>;
        // tslint:disable-next-line:variable-name
        getBlock(number: BlockType, returnTransactionObjects?: boolean, cb?: Callback<Block>): Promise<Block>;
        getBlockNumber(callback?: Callback<number>): Promise<number>;
        // tslint:disable-next-line:variable-name
        getBlockTransactionCount(number: BlockType | string, cb?: Callback<number>): Promise<number>;
        // tslint:disable-next-line:variable-name
        getBlockUncleCount(number: BlockType | string, cb?: Callback<number>): Promise<number>;
        getCode(address: string, defaultBlock?: BlockType, cb?: Callback<string>): Promise<string>;
        getCoinbase(cb?: Callback<string>): Promise<string>;
        getCompilers(cb?: Callback<string[]>): Promise<string[]>;
        getGasPrice(cb?: Callback<number>): Promise<number>;
        getHashrate(cb?: Callback<number>): Promise<number>;
        getPastLogs(options: {
            fromBlock?: BlockType
            toBlock?: BlockType
            address: string
            topics?: Array<string | Array<string>>
        }, cb?: Callback<Array<Log>>): Promise<Array<Log>>;
        getProtocolVersion(cb?: Callback<string>): Promise<string>;
        getStorageAt(address: string, defaultBlock?: BlockType, cb?: Callback<string>): Promise<string>;
        getTransactionReceipt(hash: string, cb?: Callback<TransactionReceipt>): Promise<TransactionReceipt>;
        getTransaction(hash: string, cb?: Callback<Transaction>): Promise<Transaction>;
        getTransactionCount(address: string, defaultBlock?: BlockType, cb?: Callback<number>): Promise<number>;
        getTransactionFromBlock(block: BlockType, index: number, cb?: Callback<Transaction>): Promise<Transaction>;
        // tslint:disable-next-line:max-line-length
        getUncle(blockHashOrBlockNumber: BlockType | string, uncleIndex: number, returnTransactionObjects?: boolean, cb?: Callback<Block>): Promise<Block>;
        getWork(cb?: Callback<Array<string>>): Promise<Array<string>>;
        // tslint:disable-next-line:member-ordering
        givenProvider: Provider;
        isMining(cb?: Callback<boolean>): Promise<boolean>;
        isSyncing(cb?: Callback<boolean>): Promise<boolean>;
        // tslint:disable-next-line:member-ordering
        net: Net;
        // tslint:disable-next-line:member-ordering
        sendSignedTransaction(data: string, cb?: Callback<string>): PromiEvent<TransactionReceipt>;
        sendTransaction(tx: Tx, cb?: Callback<string>): PromiEvent<TransactionReceipt>;
        submitWork(nonce: string, powHash: string, digest: string, cb?: Callback<boolean>): Promise<boolean>;
        sign(address: string, dataToSign: string, cb?: Callback<string>): Promise<string>;
    }

    export interface SyncingState {
        startingBlock: number;
        currentBlock: number;
        highestBlock: number;
    }

    export type SyncingResult = false | SyncingState;

    export interface Version0 {
        api: string;
        network: string;
        node: string;
        ethereum: string;
        whisper: string;
        getNetwork(callback: (err: Error, networkId: string) => void): void;
        getNode(callback: (err: Error, nodeVersion: string) => void): void;
        getEthereum(callback: (err: Error, ethereum: string) => void): void;
        getWhisper(callback: (err: Error, whisper: string) => void): void;
    }
    export interface Net { }

    export interface Shh { }

    export interface Bzz { }

    export const duration = {
        seconds: function (val: number) { return val; },
        minutes: function (val: number) { return val * this.seconds(60); },
        hours: function (val: number) { return val * this.minutes(60); },
        days: function (val: number) { return val * this.hours(24); },
        weeks: function (val: number) { return val * this.days(7); },
        years: function (val: number) { return val * this.days(365); }
    };
}

const contract = require('truffle-contract');
const web3 = window['web3'];

export abstract class StaticWeb3Contract {
    private contract: any;
    protected web3: Web3 = web3;

    private _instance: Promise<any>;

    constructor(contractAbi: any) {
        this.contract = contract(contractAbi);
    }

    protected init() {
        this.contract.setProvider(web3.currentProvider);
    }

    protected _getInstance(): Promise<any> {
        if (!this._instance) {
            this._instance = this.contract.deployed();
        }
        return this._instance;
    }
}

export abstract class Web3Contract {
    private contract: any;
    protected web3: Web3 = web3;

    private _instance: Promise<any>;

    constructor(private at: string, contractAbi: string) {
        this.contract = contract(contractAbi);
    }

    protected init() {
        this.contract.setProvider(web3.currentProvider);
    }

    protected _getInstance(): Promise<any> {
        if (!this._instance) {
            this._instance = this.contract.at(this.at);
        }
        return this._instance;
    }
}
`