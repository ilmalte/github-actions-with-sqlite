[![add_activities_to_db](https://github.com/ilmalte/test-sqlite/actions/workflows/add_activities_to_db.yml/badge.svg)](https://github.com/ilmalte/test-sqlite/actions/workflows/add_activities_to_db.yml)
[![continuous-integration-workflow](https://github.com/ilmalte/test-sqlite/actions/workflows/continuous-integration-workflow.yml/badge.svg)](https://github.com/ilmalte/test-sqlite/actions/workflows/continuous-integration-workflow.yml)
# SIMPLE SQLITE SCRIPT SCHEDULED WITH GITHUB ACTIONS
This repo only wants to be a super simple test of sqlite, Github Actions and Github Pages!
A Github Action adds random records on a sqlite db every 6 hours. 
Then a Typescript page, compiled in WebAssembly, displays data randomly using sql.js-httpvfs (a wrapper around sql.js to provide a read-only HTTP-Range-request based virtual file system for SQLite). 
sql.js-httpvfs is amazing because allows hosting an SQLite database on a static file hoster and querying that database from the browser without fully downloading it.

## How to launch
In the package.json you can find a script to help you during the development process.
You only need to launch the following commands in your Linux terminal (WSL as well).

`
npm install     # if needed
`

`
npm run dev
`

## How to build
If you want to build this you need to run the following commands:

`
cd ./ui
`

`
npm install     # if needed
`

`
npm run build-prod
`

## CI with Github Actions
Thanks to a Github Action, every push on master launches a job that deployes a build on the branch "gh-pages".
In this way you can have a working version of this repo on the following url:
https://ilmalte.github.io/github-actions-with-sqlite/