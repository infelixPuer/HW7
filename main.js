// Task 1: Implement promiseAll Function
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let completedPromises = 0;

        promises.forEach(promise => {
            Promise.resolve(promise)
                .then(result => {
                    results.push(result);
                    completedPromises++;

                    if (completedPromises === promises.length) resolve(results);
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}

const promisesAll = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];

promiseAll(promisesAll)
    .then(results => {
        console.log("All promises resolved:", results); // Expected: [1, 2, 3]
    })
    .catch(error => {
        console.error("At least one promise rejected:", error);
    });

// Task 2: Implement promiseAllSettled Function
function promiseAllSettled(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let settledPromises = 0;

        promises.forEach(promise => {
            Promise.resolve(promise)
                .then(value=> results.push({ status: "fulfilled", value: value }),
                    reason => results.push({ status: "rejected", reason: reason })
                )
                .finally(() => {
                    settledPromises++;

                    if (settledPromises === promises.length) resolve(results);
                });
        });
    });
}

const promisesAllSettled = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3)
];

promiseAllSettled(promisesAllSettled)
    .then(results => {
        console.log("All promises settled:", results);
        // Expected: [{ status: 'fulfilled', value: 1 },
        //            { status: 'rejected', reason: 'Error occurred' },
        //            { status: 'fulfilled', value: 3 }]
    });