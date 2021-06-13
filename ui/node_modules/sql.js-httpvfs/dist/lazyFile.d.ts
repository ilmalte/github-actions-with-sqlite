export declare type RangeMapper = (fromByte: number, toByte: number) => {
    url: string;
    fromByte: number;
    toByte: number;
};
export declare type LazyFileConfig = {
    /** function to map a read request to an url with read request  */
    rangeMapper: RangeMapper;
    /** must be known beforehand if there's multiple server chunks (i.e. rangeMapper returns different urls) */
    fileLength?: number;
    /** chunk size for random access requests (should be same as sqlite page size) */
    requestChunkSize: number;
    /** number of virtual read heads. default: 3 */
    maxReadHeads?: number;
    /** max read speed for sequential access. default: 5 MiB */
    maxReadSpeed?: number;
    /** if true, log all read pages into the `readPages` field for debugging */
    logPageReads?: boolean;
};
export declare type PageReadLog = {
    pageno: number;
    wasCached: boolean;
    prefetch: number;
};
export declare class LazyUint8Array {
    private serverChecked;
    private readonly chunks;
    totalFetchedBytes: number;
    totalRequests: number;
    readPages: PageReadLog[];
    private _length?;
    private readonly readHeads;
    private readonly _chunkSize;
    private readonly rangeMapper;
    private readonly maxSpeed;
    private readonly maxReadHeads;
    private readonly logPageReads;
    constructor(config: LazyFileConfig);
    /**
     * efficiently copy the range [start, start + length) from the http file into the
     * output buffer at position [outOffset, outOffest + length)
     * reads from cache or synchronously fetches via HTTP if needed
     */
    copyInto(buffer: Uint8Array, outOffset: number, length: number, start: number): number;
    private lastGet;
    private moveReadHead;
    /** get the given chunk from cache or fetch it from remote */
    private getChunk;
    /** verify the server supports range requests and find out file length */
    private checkServer;
    get length(): number;
    get chunkSize(): number;
    private doXHR;
}
/** create the actual file object for the emscripten file system */
export declare function createLazyFile(FS: any, parent: string, name: string, canRead: boolean, canWrite: boolean, lazyFileConfig: LazyFileConfig): any;
