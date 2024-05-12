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

// Task 3: Implement Chaining of Promises as a Separate Function
function chainPromises(promises) {
    return new Promise((resolve, reject) => {
        let result = "";

        promises.forEach(promise => {
            promise(result)
                .then(value => {
                    return result += value;
                })
                .catch(reason => {
                    reject(reason);
                })
                .finally(() => {
                    resolve(result);
                });
        });
    });
}

function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
    // return Promise.reject(`${arguments.callee.name} failed!`);
}

function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

chainPromises(functionsArray)
    .then(result => {
        console.log("Chained promise result:", result);
        // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
    })
    .catch(error => {
        console.error("Chained promise error:", error);
    });

// Task 4: Implement promisify Function
function promisify(callback) {
    return (arg) => {
        return new Promise((resolve, reject) => {
            callback(arg, (error, value) => {
                if (error) reject(error);
                else resolve(value);
            });
        });
    };
}

function callbackStyleFunction(value, callback) {
    setTimeout(() => {
        if (value > 0) {
            callback(null, value * 2);
        } else {
            callback("Invalid value", null);
        }
    }, 1000);
}

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
    .then(result => {
        console.log("Promised function result:", result); // Expected: 6
    })
    .catch(error => {
        console.error("Promised function error:", error);
    });