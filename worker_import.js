setTimeout(() => {
    Promise.resolve().then(() => { throw new Error('Error from worker_import.js') });
}, 500)