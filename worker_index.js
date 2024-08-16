self.addEventListener('unhandledrejection', (e) => {
    console.log(e)
});

setTimeout(() => {
    importScripts('https://cdn.jsdelivr.net/gh/lvivski/worker-cdn-test@v1/worker_import.js')
}, 100)

setTimeout(() => {
    Promise.resolve().then(() => { throw new Error('Error from worker_index.js') });
}, 500)