import { createDbWorker } from "sql.js-httpvfs";

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

async function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function load() {
  const worker = await createDbWorker(
    [
      {
        from: "inline",
        config: {
          serverMode: "full",
          url: "./db/running_activities.sqlite3",
          requestChunkSize: 4096,
        },
      },
    ],
    workerUrl.toString(),
    wasmUrl.toString()
  );

  const maxIdResult = await worker.db.exec(`select max(id) from activities`);
  const max = maxIdResult[0].values[0][0];
  console.log("max id in db: ", max);

  const randomId = await randomInteger(1, max);
  console.log("random id to select: ", randomId);
  const activityResult = await worker.db.exec(`select * from activities where id = ?`, [randomId]);

  document.body.textContent = JSON.stringify(activityResult);
}

load();
