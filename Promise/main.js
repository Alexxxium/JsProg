'use strict'


function sas1() 
{
    // let promise = new Promise((resolve, reject) => {
    //     console.log('starting promise');
    //     //setTimeout(resolve("done"), 1000);
    //     setTimeout(reject(new Error('Error')), 500);            // ignore
    // })
    // .finally(() => console.log('finally cleaning'));            // ignore result how try - catch

    // promise.then(
    //     (good) => console.log('operation is', good),            // all right handler
    //     (bad) => console.log('operation is', bad.name)          // some problem handler
    // );
    // promise.catch(() => { console.log('catch handler') });      // ---//--- problem hander

    // console.log('.................................................\n');
    
    
    // new Promise(function (res, rej) {
    //     console.log('starting promise 1');
    //     setTimeout(res("done 1"), 1000);
    // })
    //     .then(function(res, rej) {                              // return Promise
    //         console.log('starting promise 2');
    //         setTimeout(res('done 2'), 1200);
    //     })
    //     .then(function(res, rej) {                              // return Promise
    //         console.log('starting promise 3');
    //         setTimeout(rej('done 3'), 1000);                    // rej - implicit throw 
    //     })
    //     .catch(function(error) {                                // Catch block - implicit catch         
    //         console.log('Error name: ', error.name);
    //     })
    //     .then(function(res, rej) {                              // Who is res now???  to catch ignoring then
    //         console.log('starting promise 4');
    //         setTimeout(res("done 4"), 5000);
    //     })
    //     .catch(function(error) {                                // Catch again
    //         console.log('Error name: ', error.name);
    //     })
    //     .finally(function() { console.log('clearning...'); });


console.clear(); /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

//     let promises_res1 = Promise.all([
//         new Promise(res => setTimeout(() => res(1), 1000)),
//         new Promise(res => setTimeout(() => res(2), 2000)),
//         new Promise(res => setTimeout(() => res(new Error('bad promise')), 3000)),      // break with error
//         '_______________________________________________4',         
//         new Promise(res => setTimeout(() => res(4), 4000)),
//     ])
//     .then(console.log)
//     .catch(() => {
//         console.log('Some error... All promises breaked!');
//     })
//     .finally(() => {
//         console.log('Finally clearning...');
//     })

console.clear(); /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    // const promises_res2 = Promise.allSettled([
    //     new Promise(res => setTimeout(() => res(1), 1000)).then(console.log),
    //     new Promise(res => setTimeout(() => res(2), 2000)).then(console.log),
    //     new Promise(res => setTimeout(() => res(new Error('bad promise')), 3000)),           // ignoring error and continue
    //     '_______________________________________________4',         
    //     new Promise(res => setTimeout(() => res(4), 4000)).then(console.log),
    // ]);

console.clear(); ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Promise.race([
    //     new Promise(res => setTimeout(() => res(1), 3000)),
    //     new Promise(res => setTimeout(() => res(2), 2000)),                                  // take first complited promise (2)
    // ])
    // .then(console.log);

console.clear(); ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Promise.any([
    //     new Promise((res, rej) => setTimeout(() => res(1), 3000)),
    //     new Promise((res, rej) => setTimeout(() => rej(new Error('bad promise')), 1000)),   // ignore this first complete promise whith error
    //     new Promise((res, rej) => setTimeout(() => res(3), 2000)),                          // take next good promise          
        
    // ])
    // .then(console.log);

console.clear(); ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let buffer = new Set();
    let err_buffer = new Set();

    function promiseInstancer(url) {
        if(buffer.has(url)) {
            console.log('in kash');
            return Promise.resolve(url);
        }
        else if(err_buffer.has(url)) {
            console.log('in kash (errors)');
            return Promise.reject(new Error(url));
        }
        else {
            return new Promise((res, rej) => {
                Math.random().toFixed(0) % 2 === 0 ? res('good bit') : rej(new Error('bad bit'));
            })
            .then(() => {
                buffer.add(url);                                            // *
                console.log('good status');
            })
            .catch(() => {
                err_buffer.add(url);                                        // *
                console.log('bad status');
            })
            .finally(() => {
                // ....                                                     // * local varibles out of visible area <- problem
            });
        }
    }

    const urls = ['sas', 'sys', 'sus', 'sas', 'sys', 'sis', 'sas', 'sys', 'sis', 'sus'];

    for(let url of urls) {
        setTimeout(() => promiseInstancer(url), 1000);
        console.log(url);
    }
}

function sas2()
{
    async function generate(args) {
        const local_object = {
            name: 'generate',
            status: NaN,
        };

        const res = await Promise.all([args.map(
            async (item) => 
                await new Promise(
                    (res, rej) => item.status ? res(item.message) : rej(item.message))
                    .then((message) => {
                        console.log(message);
                        local_object.status = 'Good';
                    })
                    .catch((error) => {
                        console.log(error.name);
                        local_object.status = 'Bad';
                    })
                    .finally(() => {
                        console.log('finally bloc')
                    })
            )
        ]);
            
        console.log(local_object);

        return res[res.length - 1];
    }

    const good_obj = { status: true, message: 'good' };
    const bad_obj = { status: false, message: new Error('bad') };
    generate([good_obj, good_obj, bad_obj, good_obj, bad_obj]);
}

function sas3()
{
    function* sequence() {
        yield 0; yield 1; yield 2; yield 3; yield 4;
        yield 5; yield 6; yield 7; yield 8; yield 9;
        return 10;
    }

    console.log(...sequence());
    const numbers = sequence();

    for(let it of numbers) {
        console.log(it);
    }
    console.log(numbers.next());


    class Range {
        _from;
        _to;

        constructor(from, to) {
            this._from = from;
            this._to = to;
        }

        *[Symbol.iterator](step = 1) {
            let it = this._from;
            while(it < this._to) {
                yield it;
                it += step;
            }
        }
    }

    class Rand extends Range {
        constructor(from, to) {
            super(from, to);
        }

        *[Symbol.iterator](count, min = this._from, max = this._to) {
            for(let it = 0; it < count; ++it)
                yield* this.rand(min, max);
        }

        *rand(min = this._from, max = this._to) {
            while(true) {
                yield Math.random() * (max - min) + min;
            }
        }
    }

    let sas = new Range(1, 7)
    console.log(...sas);
    let sys = new Rand();
    console.log(sys.rand(1, 10));
}

function sas4()
{

}



sas4();
//sas3();
//sas2();
//sas1();