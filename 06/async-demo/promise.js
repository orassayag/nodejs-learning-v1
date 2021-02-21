const p = new Promise((res, rej) => {

    setTimeout(() => {
        //res(1);
        rej(new Error('message'))
    }, 2000);
});

p.then((result) => {
    console.log('Result', result);
}).catch((error) => {
    console.log('Error', error.message);
});