/// <reference path="../src/types.d.ts" />
import { LazyUint8Array, PageReadLog } from "./lazyFile";
import { Database, QueryExecResult } from "sql.js";
import { sqlite3_module, SqljsEmscriptenModuleType } from "./vtab";
export declare function toObjects<T>(res: QueryExecResult[]): T[];
export declare type SplitFileConfig = SplitFileConfigPure | {
    virtualFilename?: string;
    from: "jsonconfig";
    configUrl: string;
};
export declare type SplitFileConfigPure = {
    virtualFilename?: string;
    from: "inline";
    config: SplitFileConfigInner;
};
export declare type SplitFileConfigInner = {
    requestChunkSize: number;
} & ({
    serverMode: "chunked";
    urlPrefix: string;
    serverChunkSize: number;
    databaseLengthBytes: number;
} | {
    serverMode: "full";
    url: string;
});
export interface LazyHttpDatabase extends Database {
    lazyFiles: Map<string, {
        contents: LazyUint8Array;
    }>;
    filename: string;
    query: <T = any>(query: string, ...params: any[]) => T[];
    create_vtab: (cons: {
        new (sqljs: SqljsEmscriptenModuleType, db: Database): sqlite3_module;
    }) => void;
}
export declare type SqliteStats = {
    filename: string;
    totalBytes: number;
    totalFetchedBytes: number;
    totalRequests: number;
};
declare const mod: {
    db: LazyHttpDatabase | null;
    inited: boolean;
    sqljs: Promise<any> | null;
    SplitFileHttpDatabase(wasmUrl: string, configs: SplitFileConfig[], mainVirtualFilename?: string | undefined): Promise<LazyHttpDatabase>;
    getResetAccessedPages(virtualFilename?: string | undefined): PageReadLog[];
    getStats(virtualFilename?: string | undefined): SqliteStats | null;
    evalCode(code: string): Promise<any>;
};
export declare type SqliteComlinkMod = typeof mod;
export {};
