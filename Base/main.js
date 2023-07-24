'use strict'                                        // строгий режим on
const cloneDeep = require('../libs/node_modules/clone-deep');

let ApplicationName = 'Java Script - Base';



function sas1() 
{
    var num1 = 1;                                   // var - old type, visible only in function
    let num2 = 2;                                   // not const: visible only in block {}
    const num3 = num1 + num2;                       // const: --//--

    const num4 = 1 + 1;                             // 2
    const num5 = '1' + 1;                           // 11 convertation to string

    console.log(num4, num5,'\n');


    const a = 5, b = 5;
    const c = 5, d = '5';
    
    if(a == b) 
        console.log("true");                        // true
    else 
        console.log("false");

    let res1 = c == d ? true: false;    
    console.log(res1);                              // true
    let res2 = c === d ? true: false;
    console.log(res2);                              // false (types don't match)


    var typeX = '10';
    let typeY = -1;
    const typeZ = 0;

    let ItIsFunction = (val) => {                   // arrow function is not const reference!
        switch(val){
            case typeX:                             // !!! OPERATOR === !!! 
                console.log('typeX');
                break;
            case typeY:
                console.log('typeY');
                break;
            case typeZ:
                console.log('typeZ');
                break;
            default:
                console.log('typeNONE');
        }
    }

    const func = ItIsFunction;                      // not const reference to function!
    func(10);                                       // 10 === '10' <- false
    func(-1);
    func(0);
    func(false);


    // Loops

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // array
    
    console.log(numbers);

    let count1 = 0, count2 = '0';
    let res = '';

    while(count1 < numbers.length) {
        res += numbers[count1++];
    }
    console.log(res);

    numbers.length = 15;
    res = '';
    do {
        res += numbers[++count2];
    } while(count2 < numbers.length)
    console.log(res); 
    
    for(var i = 0; i < 10; ++i) {
        var var_value_epta = numbers[i];
        let let_value_epta = numbers[i];
        const const_value_epta = numbers[i];
    }
    console.log(var_value_epta);                        // var varible alive
    //console.log(let_value_epta);

    console.log(i);                                     // ---//---
    for(const i of numbers) {
        console.log(i);
    }
}

function sas2() 
{
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const copy = { ...array };                      // reference to clone of array

    console.log(array === copy);                    // false: references don't equval!
    console.log(array ==  copy);                    // false: ---//---

    const test = {                                  // immutable object
        ...array, 
        sas: false,
    }

    console.log(test.sas);                          // WTF

    const ref = array;
    array.buffer = [1, 2, 3];                       // mutation (this is const?! const is varidle)
    ref.tempData = [4, 5, 6];                       // mutation
    
    console.log(ref);
    console.log(array);
    console.log(ref === array);                     // queval references!
    console.log(ref ==  array);                     // ---//---

    //...........................................................................................................

    res();                                          // undefined function ~ var
    var crash = 666;
    res();                                          // 666
    console.log(strik);
    var strik = 6;

    function res() {
        var a = 'a';
        let b = 'b';
        console.log(crash);
        
        const auto = () => {
            console.log(a);
        }

        auto();
        func();

        function func() {
            var dead = 0;
            console.log(b);
        }

        //dead <- is dead

        (() => { console.log(1) })();               // Immediately Invoked Function Expression
    }

    const notExtensableObj = {}
    Object.preventExtensions(notExtensableObj)

    //notExtensableObj.someProp = 'Value'           // Uncaught TypeError: Can't add property someProp, object is not extensible
}

function sas3()
{
    const arr0 = [{"array": [1, 2, 3]}, {"size": 3}, -1, -2, -3],
    arr1 = [...arr0],
    arr2 = cloneDeep(arr0);                         // deep copy

    arr0[1].size = NaN;
    arr0[2] = null;

    console.log(arr0[0], arr0[1], '\t', arr0);      // changes in size and arr[2]
    console.log(arr1[0], arr1[1], '\t', arr1);      // changes in size, arr[2] is't reference
    console.log(arr2[0], arr2[1], '\t', arr2);      // no changes


// OBJECT:

    let obj = {"name": "Dh\'oine"};                 // object, equival:
    obj = new Object({"name": "Bluode dh\'oine"});  // cunstructor of object

    obj.belonging = "Skoataeles";                    // new .val
    obj.age = 512;
    obj['sas and sys'] = 'sas';                     // new ['str ... str']
    delete obj['sas and sys'];                      // delete val

    for (const key in obj) {
        console.log(`${key} - ${obj[key]}`);
    }


// ARRAY:

    let arr = new Array(
        1, 2, 3, obj, ['sas', 'sys', 'sus']         // obj here it is reference, converting to string '[object Object]'
    );
    arr = [1, 2, 3, obj, [null, undefined, NaN]];
    const array = cloneDeep(arr);                   // using deep copy

    array['new key'] = 'key sas';                   // this is index! (new key) 

    for(const key in array) {
        console.log(`${key} - ${array[key]} - ${array}`);
    }
    delete array['new key'];
    delete array[3];
    delete array[4];
    delete array[1];
    console.log(array);

    array.push(4, 5, 6, 7, 0);                      // more fast then unshift (push front)
    array.unshift(-2, -1, 0);
    console.log(array);

    const results = [];
    results.push(array.indexOf(0, 1));
    results.push(array.includes(-2));
    console.log(results);


// FUNCTIONS HOW OBJECTS:

    const sum = (a, b) => { 
        return a + b 
    };
    const dec = (a, b) => {
        console.log(a, b);
        return sum(a, b);
    }

    dec(1, 3);
    doOut(console.log, 1, 2, 3);

    function doOut(funct, ...args) {
        funct(args);
        funct(...args);
        funct(arguments);                   // all args
    }
}

function sas4()
{
// SET:                                             HASH SET

    const set = new Set(
        [5, 1, -8, 'sas', [1, 2],                   // only iteration struct!
        {'key': 228 }, 1, 1, 1, 1]                  // unique val (1)
    );
    set.name = "SET";
    console.log(set);
    for(let key in set) {                           // only name
        console.log(key);
    }

    set.add(3);
    set.add([1, 2, 3]);                             // it is reference
    set.add([1, 2, 3]);                             // this refs don`t match!
    set.add(-1);
    set.delete(1);

    console.table(set);
    console.log('3:', set.has(3));
    console.log('5:', set.has(5));
    console.log('[1, 2, 3]', set.has([1, 2, 3]));   // new don't matching ref!
    set.clear();

    for(let i = 0; i < 10; ++i)
        set.add((Math.random() * 9 + 1).toFixed(0));
        
    console.table(set);
    set.forEach((val) => { console.log(val); });


// MAP:                                             HASH MAP

    const map = new Map(                            // initsialization only whith iterations objects!
        [[1, 1], ["sas", "sys"], 
        {"s": 2}, [3, 1, 2]]
        );
    map.name = "Map";
    console.table(map);
    map.delete(undefined);

    const results = new Array;

    map.set('sas', 1);
    map.set('sys', 2);
    map.set(2, 'sas');
    results.push(map.has(1));
    results.push(map.has(-1));
    results.push(map.get(1));
    results.push(map.get(-1));

    console.table(map);
    console.log(results);

    for(let key in map) {                           // only name
        console.log(key);
    }

    for(let [key, val] of map) {
        console.log(key, '\t-\t', val);
    }

    const 
        vals = map.values(),
        keys = map.keys(),
        pairs = map.entries();
    let arr = [];

    for(const val of vals) {
        arr.push(val);
    }
    console.log(arr);
    arr = [];
    for(const key of keys) {
        arr.push(key);
    }
    console.log(arr);
    arr = [];
    for(const [key, val] of pairs) {
        arr.push([key, val]);
    }
    console.log(arr);
    arr = [];


//WEAKSET:

    const weak_set = new WeakSet();
    {
        let
            obj1 = { "sas1": 1 },
            obj2 = { "sas2": 2 },
            obj3 = { "sas3": 3 },
            obj4 = { "sas3": 4 };

        weak_set.add(obj1).add(obj2).add(obj3).add(obj4);
        console.log(weak_set);
        console.log(weak_set.has(obj1));      
    }
    console.log(weak_set);
}

function sas5() 
{
    var count = 0;

    function asyncFunc(callback, key, val) {
        console.log('Entrase to async function...\nCalling callback!');
        setTimeout(() => {
            callback(count++);
            console.log(key, val);
        }, 2500);
        console.log('\n');
    }

    function callBack(num) {
        console.log('Callback working:\t', num);
    }

    const map = new Map([[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]]);
    map.forEach((val, key) => { asyncFunc(callBack, key, val); });
    console.log("----------------------------------------------");
}

function sas6()
{
    function Sas() {                                                    // constructor-function
        let obj;
        if(!new.target) {
            obj = new Sas();
        }
        else {
            this.name = "sas";
            this.surname = "-";
            this['test sas'];
        }
        return obj;
    }

    let obj1 = Sas();
    let obj2 = new Sas();
    console.log(obj1, obj2);

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];                          // destructurization array, ...ost - 4 - 9
    let [ val1, val2, val3 ] = array;
    let [ val4 = 'default value', val5, val6, ...ost ] = array;       
    console.log(
        val1, val2, val3, val4, val5, val6, ...ost                      // extentions, opening ...ost
    );

    let { name, non, surname } = new Sas();                             // use correct names in object
    console.log(name, non, surname);

    let { 'name': n, 'test sas': nons = 'default', surname: s } = new Sas;      // 'aliases' and default value + can use ...ost
    console.log(n, nons, s);
}

function sas7()
{
    const funcs = new Function('val', 'console.log(val/*, ApplicationName*/)');     // <-- global varible in this script! (error)
    funcs(1);

    const person = {
        name: "Alex",
        surname: "Sas",
        metrix: {
            width: 175,
            mass: 60
        },
        age: 20,
        'input array': [1, 2, 3, 4, 5],
        method() {
            console.log('method');
        },
        none: undefined,
        rubish: NaN,
        [Symbol('sas')]: "sys",

        // toJSON() {                               // this metod return JSON string
        //     return `{${this.name},${this.surname},${this.age},${this['input array']}}`;
        // }
    }
    const error_invoker = {                         // referenсe to person
        ref: person
    }

    let str = JSON.stringify(person);
    let unparse = JSON.parse(str); 
    console.log(str, ' - ', unparse);

    person.ref = error_invoker;                     // reference to error_invoker: person <--> error_invoker
    //JSON.stringify(person))                          error!      
    console.log(JSON.stringify(
        person, ['name', 'surname', 'metrix', 'width', 'mass', 'age', 'input array']
    ));
    console.log(JSON.stringify(
        person, (key, val) => key == 'ref' || key == 'rubish' ? undefined : val, 2
    ));
    
    let message = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
    console.log(JSON.parse(message,
        (key, val) => key == 'date' ? new Date(val) : val
    ));
}

function sas8()
{
    const worker = {
        name: "sasers",
        trigger() {                                             
            return 0; 
        },
        sum(...args) {
            this.trigger();                                     // call depended on context method
            console.log("Args:\t", ...args);
            let res = '';
            args.forEach((item) => res += item + ',');
            return res;
        },
        context() {
            console.log(this);
            this.trigger();
        }
    }

    function hash(...args) {
        return args.join(' ');
    }

    function hashDecorator(func) {
        let buff = new Map();
        return function () {
            let key = hash(...arguments);
            if(buff.has(key)) {
                return buff.get(key);
            }
            let res = func.call(this, ...arguments);            // add context
            buff.set(key, res);
            return res;                                         // buff saves in this context
        }
    }
 
    worker.sum = hashDecorator(worker.sum);
    console.log(worker.sum(1, 2, 3, 4));
    console.log(worker.sum(1, 2, 3, 5));
    console.log(worker.sum(1, 2, 3, 6));
    console.log(worker.sum(1, 2, 3, 7));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                                                                                                                                                //
    function context(f) {                                                                                                                                       //
        console.log(1, this);                                   // (1) контекст вызова undefined                                                                //
        return function() {                                     // (2) создается функция (пока контекст неопределен) -> (3), -> (4), -> (8)                     //
            console.log(2, this);                               // (5) наш переданный контекст                                                                  //
            //f.call(this);                                     // (6) передаем контекст для функции f(), если только он правильный                             //
        };                                                                                                                                                      //
    }                                                                                                                                                           //
                                                                                                                                                                //
    let temp = context(worker.context);                         // (3) тут мы лишь создаем функцию, которой потом будем передавать контекст -> (2)              //
    temp();                                                     // (4) передается контекст undefined!!! -> (5)                                                  //
                                                                                                                                                                //
    worker.context = context(worker.context);                   // (7) тут мы лишь создаем функцию, которой потом будем передавать контекст -> (2)              //
    worker.context();                                           // (8) при вызове через worker. контекст становится worker!!! -> (5)                            //
                                                                                                                                                                //
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    function bound(bool, func1, func2, arg1, arg2) {
        console.log(this.name);
        bool ? func1(arg1) : func2(arg2);
    }

    function func1(val) { console.log("Arg:\t", val, "\nName:\t", this.name); }
    function func2(val) { console.log("Arg:\t", val, "\nName:\t", this.name); }

    const 
        f0 = bound.bind(worker),
        f1 = func1.bind(worker),
        f2 = func2.bind(worker);
    f0(false, f1, f2, true, false);
}



sas8();