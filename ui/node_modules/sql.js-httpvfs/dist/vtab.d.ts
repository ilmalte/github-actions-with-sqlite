/// <reference types="emscripten" />
/// <reference lib="webworker" />
import { Database } from "sql.js";
declare type Ptr<T> = number;
declare type int = number;
interface sqlite3_vtab {
    pModule: Ptr<sqlite3_module>;
    nRef: int;
    zErrMsg: Ptr<string>;
}
declare type SqliteStatus = int;
interface sqlite3_index_info {
}
interface sqlite3_vtab_cursor {
    pVtab: Ptr<sqlite3_vtab>;
}
interface sqlite3_context {
}
interface sqlite3_value {
}
export interface sqlite3_module {
    iVersion: int;
    xCreate?(conn: Ptr<"sqliteconn">, pAux: Ptr<void>, argc: int, argv: Ptr<string[]>, ppVTab: Ptr<sqlite3_vtab>, pzErr: Ptr<string>): SqliteStatus;
    xConnect(conn: Ptr<"sqliteconn">, pAux: Ptr<void>, argc: int, argv: Ptr<string[]>, ppVTab: Ptr<sqlite3_vtab[]>, pzErr: Ptr<string[]>): SqliteStatus;
    xBestIndex(pVTab: Ptr<sqlite3_vtab>, sqlite3_index_info: Ptr<sqlite3_index_info>): SqliteStatus;
    xDisconnect(pVTab: Ptr<sqlite3_vtab>): SqliteStatus;
    xDestroy?(pVTab: Ptr<sqlite3_vtab>): SqliteStatus;
    xOpen(pVTab: Ptr<sqlite3_vtab>, ppCursor: Ptr<sqlite3_vtab_cursor>): SqliteStatus;
    xClose(sqlite3_vtab_cursor: Ptr<sqlite3_vtab_cursor>): SqliteStatus;
    xFilter(sqlite3_vtab_cursor: Ptr<sqlite3_vtab_cursor>, idxNum: int, idxStr: Ptr<string>, argc: int, argv: Ptr<sqlite3_value[]>): SqliteStatus;
    xNext(sqlite3_vtab_cursor: Ptr<sqlite3_vtab_cursor>): SqliteStatus;
    xEof(sqlite3_vtab_cursor: Ptr<sqlite3_vtab_cursor>): SqliteStatus;
    xColumn(sqlite3_vtab_cursor: Ptr<sqlite3_vtab_cursor>, sqlite3_context: Ptr<sqlite3_context[]>, int: int): SqliteStatus;
    xRowid(sqlite3_vtab_cursor: Ptr<sqlite3_vtab_cursor>, pRowid: Ptr<int>): SqliteStatus;
    xUpdate?(vtab: Ptr<sqlite3_vtab>, argc: int, argv: Ptr<sqlite3_value[]>, pRowid: Ptr<int>): SqliteStatus;
    xBegin?(pVTab: Ptr<sqlite3_vtab>): SqliteStatus;
    xSync?(pVTab: Ptr<sqlite3_vtab>): SqliteStatus;
    xCommit?(pVTab: Ptr<sqlite3_vtab>): SqliteStatus;
    xRollback?(pVTab: Ptr<sqlite3_vtab>): SqliteStatus;
    xFindFunction?(pVtab: Ptr<sqlite3_vtab>, nArg: int, zName: Ptr<string>, pxFunc: Ptr<(sqlite3_context: Ptr<sqlite3_context[]>, argc: int, argv: Ptr<sqlite3_value[]>) => void>, ppArg: Ptr<void>): SqliteStatus;
    xRename?(pVtab: Ptr<sqlite3_vtab>, zNew: Ptr<string>): SqliteStatus;
    xSavepoint?(pVTab: Ptr<sqlite3_vtab>, int: int): SqliteStatus;
    xRelease?(pVTab: Ptr<sqlite3_vtab>, int: int): SqliteStatus;
    xRollbackTo?(pVTab: Ptr<sqlite3_vtab>, int: int): SqliteStatus;
    xShadowName?(str: Ptr<string>): SqliteStatus;
}
export interface SqljsEmscriptenModuleType extends EmscriptenModule {
    ccall: typeof ccall;
    setValue: typeof setValue;
    getValue: typeof getValue;
    UTF8ToString: typeof UTF8ToString;
    stringToUTF8: typeof stringToUTF8;
    lengthBytesUTF8: typeof lengthBytesUTF8;
    addFunction: typeof addFunction;
    extract_value: (ptr: Ptr<sqlite3_value>) => null | string | number;
    set_return_value: (ptr: Ptr<sqlite3_context>, value: string | number | boolean | null) => void;
    sqlite3_malloc: (size: int) => Ptr<void>;
}
declare type Cursor = {
    elements: ArrayLike<Element>;
    querySelector: string;
    index: number;
};
export interface DomRow {
    idx: number;
    id: string | null;
    tagName: string;
    textContent: string;
    innerHTML: string;
    outerHTML: string;
    className: string | null;
    parent: string | null;
    selector: string;
}
export declare type MainThreadRequest = {
    type: "select";
    selector: string;
    columns: (keyof DomRow)[];
} | {
    type: "delete";
    selector: string;
} | {
    type: "update";
    value: Partial<DomRow>;
} | {
    type: "insert";
    value: Partial<DomRow>;
};
export declare class SeriesVtab implements sqlite3_module {
    private module;
    private db;
    name: string;
    iVersion: number;
    cursors: Map<number, Cursor>;
    constructor(module: SqljsEmscriptenModuleType, db: Database);
    getCursor(cursor: Ptr<sqlite3_vtab_cursor>): Cursor;
    xConnect(conn: Ptr<"sqliteconn">, pAux: Ptr<void>, argc: int, argv: Ptr<string[]>, ppVTab: Ptr<Ptr<sqlite3_vtab>>, pzErr: Ptr<string[]>): SqliteStatus;
    xDisconnect(pVTab: Ptr<sqlite3_vtab>): SqliteStatus;
    xOpen(pVTab: Ptr<sqlite3_vtab>, ppCursor: Ptr<Ptr<sqlite3_vtab_cursor>>): SqliteStatus;
    xClose(sqlite3_vtab_cursor: Ptr<sqlite3_vtab_cursor>): SqliteStatus;
    xBestIndex(pVTab: Ptr<sqlite3_vtab>, info: Ptr<sqlite3_index_info>): SqliteStatus;
    xFilter(cursorPtr: Ptr<sqlite3_vtab_cursor>, idxNum: int, idxStr: Ptr<string>, argc: int, argv: Ptr<sqlite3_value[]>): SqliteStatus;
    xNext(cursorPtr: Ptr<sqlite3_vtab_cursor>): SqliteStatus;
    xEof(cursorPtr: Ptr<sqlite3_vtab_cursor>): SqliteStatus;
    xColumn(cursorPtr: Ptr<sqlite3_vtab_cursor>, ctx: Ptr<sqlite3_context[]>, column: int): SqliteStatus;
    setVtabError(vtab: Ptr<sqlite3_vtab>, err: string): void;
    xUpdate(vtab: Ptr<sqlite3_vtab>, argc: int, argv: Ptr<sqlite3_value[]>, pRowid: Ptr<int>): SqliteStatus;
    xRowid(sqlite3_vtab_cursor: Ptr<sqlite3_vtab_cursor>, pRowid: Ptr<int>): SqliteStatus;
    xFindFunction(pVtab: Ptr<sqlite3_vtab>, nArg: int, zName: Ptr<string>, pxFunc: Ptr<(sqlite3_context: Ptr<sqlite3_context>, argc: int, argv: Ptr<sqlite3_value[]>) => void>, ppArg: Ptr<void>): SqliteStatus;
}
export {};
