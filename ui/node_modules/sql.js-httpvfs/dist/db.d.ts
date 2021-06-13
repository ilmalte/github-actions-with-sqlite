/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import * as Comlink from "comlink";
import { LazyHttpDatabase, SplitFileConfig, SqliteComlinkMod } from "./sqlite.worker";
export declare type SqliteWorker = Comlink.Remote<SqliteComlinkMod>;
export interface WorkerHttpvfs {
    db: Comlink.Remote<LazyHttpDatabase>;
    worker: Comlink.Remote<SqliteComlinkMod>;
    configs: SplitFileConfig[];
}
export declare function createDbWorker(configs: SplitFileConfig[], workerUrl: string, wasmUrl: string): Promise<WorkerHttpvfs>;
