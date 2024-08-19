const script = 'https://cdn.jsdelivr.net/gh/lvivski/worker-cdn-test2@v5/worker_index.js';

const workerTemplate = (script) => {
    self.onunhandledrejection = (e) => {
        e.preventDefault()
        throw e.reason?.stack 
            ? e.reason.name + ': ' + e.reason.message + '\n' + e.reason.stack
            : e.reason
    }
    importScripts(script)

    setTimeout(() => {
        Promise.resolve().then(() => { throw new Error('loader error') });
    }, 1000)
}

const blob = new Blob([`(${workerTemplate.toString()})('${script}')`], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

worker.onerror = (e) => {
    console.info('Worker error:', e)
}