'use strict'
const cloneDeep = require('../libs/node_modules/clone-deep');



function sas1()
{
    const obj = {
        name: "None",
        aliase1: "Alexxxium",
        aliase2: "Cz-medium",
        'nikname id': 0x12,
        toString() {
            return `${this.name} - ${this.aliase1} - ${this.aliase2} - ${this['nikname id']}`;
        }
    }

    console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
    console.log(Object.getOwnPropertyDescriptors(obj));

    Object.defineProperty(obj, 'name', {
        writable: false,
        value: 'Alex',
    });
    console.log(Object.getOwnPropertyDescriptor(obj, 'name'));
    //obj.name = 'sas';                                                 // writable: false - can't edit name!

    console.log('');
    for(let prop in obj) console.log(prop);                             // toString here!

    Object.defineProperties(obj, {
        name: {
            configurable: false,                                        // can`t delete, edit this object! (recreate or delete property)
        },
        aliase1: {
            writable: false,
        },
        toString: {
            enumerable: false,                                          // 'for in' can`t find this property!
        },
    });

    console.log('');                                                    
    for(let prop in obj) console.log(prop);                             // toString don`t here!

    const copy = cloneDeep(obj);                                        // he can't sow toString, because enumerabel = false!
    console.log(JSON.stringify(
        Object.getOwnPropertyDescriptors(copy), 
        null, 4)
    );

    const clone = Object.defineProperties(obj, Object.getOwnPropertyDescriptors(obj));      // more good copy!
    console.log(JSON.stringify(
        Object.getOwnPropertyDescriptors(clone), 
        null, 4)
    );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const student = {
        name: 'Alex',
        aliase: 'Alexxxium',
        age: 20,
        _const_data: 'data',

        get info() {                                                                        // getter
            return `Name:\t${this.name}\nAliase:\t${this.aliase}\nAge:\t${this.age}`;       
        },

        set info(val) {                                                                     // setter
            [this.name, this.aliase, this.age] = val.split(' ');
        },

        get data() {
            return this._const_data;
        },

        set data(data) {
            this._const_data = data;
        }
    }  

    Object.defineProperty(student, '_const_data', {
        configurable: false,
        writable: false,
    })
    //student.data = "new data";                                                    edit member: _const_data whos property writable: false!
    console.log(JSON.stringify(
        Object.getOwnPropertyDescriptors(student), null, 4
    ));
}

function sas2()
{
/*                     NULL
                        |
                Object.prototype
                        |
                       / \
                    Prototypes:
              Arrays, Sets, Numbers ...
               /        |         \
            [...]    { set }     1, 2, 3
*/
    const array = [1, 2, 3, 4, 5];                              // ~~ new Array -> using array prototype:
    console.log(
        array,                                                  // Array.prototype.toString()
        array.__proto__ === Array.prototype,                    // Object prototypes:
        array.__proto__.__proto__ === Object.prototype,
        array.__proto__.__proto__.__proto__ === null,           // <-- There isn't Object how numbers, strings and boolean varibles!
    );                                                          //     And there isn't 'undefined.prototype' how String.prototype, Number.prototype ...

    
    if (!String.prototype.sas)                                  // if method not exists -> create! Also you can recreate method!
        String.prototype.sas = function () {
            console.log("This is sas method:\t", this);
            return new String(this);
        }
    console.log('str'.sas());                                   // All strings have method sas()!

    let numbers = {
        0: 2,
        1: '12',
        2: '33',
        3: '100',
        length: 4,
    };

    numbers.join = Array.prototype.join;                        // you can sleel method!
    console.log(numbers.join(', '));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const animal = {
        stomach: new Array,
        'base name': 'Animal',
        alive: true,

        get isAlive() { return this.alive; },
        get mealArr() { return this.stomach; },
        set isAlive(st) { this.alive = st; },

        fly() { console.log('this:\t', this, "\tFlyyyyyyy!"); },

        feederMeal: (() => {
            let static_count = 0;                                                       // varible capture (closure)
            return function () { this.stomach.push('Meal: ' + ++static_count); };       // animal.stomach ...
        })(),                                                                           // create and call

        personalCurrentMeal() { this.stomach = ['Personal animal eating...']; },        // create stomach for invoker
    }

    const bird = {
        __proto__: animal,                                                  // setter for prototype
        name: 'Bird',
        fly() { console.log('this:\t', this, "\tFlyyyyyyy!"); },
    }

    const colibri = {
        __proto__: bird,
        name: "Colibri",
        now() { console.log('this:\t', this, "\tkylik-kyrlik"); },
    }

    console.log(colibri.isAlive);                                           // get animal live status
    colibri.now();                                                          // colibri method
    colibri.fly();                                                          // bird method

    animal.isAlive = false;                                                 // set animal live status
    console.log(bird.isAlive);                                              // bird -> animal live status: dead!
    bird.fly();                                                             // bird method
    console.log(bird['base name']);                                         // animal method


    const sparrow = {
        __proto__: bird,
        name: 'Sparrow',
        now() { console.log("chirik-chik-chik"); },
    }

    console.log('');

    sparrow.feederMeal();                                                   // Pushing in animal array
    colibri.feederMeal();                                                   // ----//----
    console.log(
        "Colibri:\t", colibri.mealArr, 
        "\nSparrow:\t", sparrow.mealArr, 
        "\nEqueival:\t", colibri.mealArr === sparrow.mealArr                // Colobri and sparrow has general stomach...
    );

    sparrow.personalCurrentMeal();                                          // Create stomach for this (sparrow)
    console.log(
        "Colibri:\t", colibri.mealArr, 
        "\nSparrow:\t", sparrow.mealArr, 
        "\nEqueival:\t", colibri.mealArr === sparrow.mealArr                // Sparrow has mine stomach!
    );

    console.log('');////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    const parent = {
        name: 'parent',
        year: 2023,
    }

    function Creator(val) {
        if(!new.target) {
            return new Creator(val);
        }
        this.name = val;
        this.status = 'created';
    }
    
    let obj1 = new Creator('first'); 
    Creator.prototype = parent;
    let obj2 = Creator('second');

    console.log(obj1.constructor === Creator, obj2.constructor === Creator);

    console.log(obj1.year, obj2.year);
    obj2 = new obj1.constructor(obj2.name);

    console.log(obj2.year);
}

function sas3()
{
    class Person {
        static id = 0;
        unique = 'sas';
        #private_member = 'private'
        _name;
        _surname;
        _age;
        
        constructor(name, surname, age) {
            this._name = name;
            this._surname = surname;
            this._age = age;
            this._id = this._generateId();                                  // USING CHILD METHOD!!!        !!!MEGA WTF!!!
            console.log("Parent ...", this.unique);                         // USING PARENT MEMBER!!!       
        }

        get name()       { return this._name;    }
        get surname()    { return this._surname; }
        get age()        { return this._age;     }

        set name(nm)     { this._name = nm;      }
        set surname(snm) { this._surname = snm;  }
        set age(ag)      { this._age = ag;       }

        log() { 
            console.log(
                `Name:\t\t${this._name}\n` +
                `Surname:\t${this._surname}\n` +
                `Age:\t\t${this._age}\n` +
                `ID:\t\t${this._id}`
            );
        }

        _generateId() { return Person.id++;}
    }

    class Alex extends Person {
        unique = 'sys';
        _salary;
        aliase;

        constructor(name, surname, age, salary, aliase_) {
            super(name, surname, age);                                      // parent constructor calling first!                                  
            this._salary = salary;                                          // then create or edit members
            this.aliase = aliase_;
        }

        get salary() { return this._salary; }
        get aliase() { return this.aliase;  }

        _generateId(){ return '00022800 - ' + super._generateId(); }        // call parent method whith super. [[HomeObject]]

        //get private() { return this.#private_member; }                    // dont`t inhrithed!
    }

    let me1 = new Alex('Alex', "Sas", 20, 2000, 'Alexxxium');
    let me2 = new Alex('Alex', "Sas", 20, 2000, 'Alexxxium');

    me1.log();
    me2.log();
    console.log(me1 instanceof Alex, me2 instanceof Person);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class Singleton {
        static _singleton = null;
        static _created = false;

        _data;

        constructor(data) { 
            if(Singleton._created) {
                throw new Error('Access violation!');
            }
            this._data = data;
            this._created = true;
         }

        static getInstance(data) {
            if(!this._singleton) {
                this._singleton = new Singleton(data);
            }
            return this._singleton;
        }

        static get exist() { return Boolean(this._created); }
    }

    const obj1 = Singleton.getInstance(12);
    const obj2 = Singleton.getInstance(13);
    console.log(obj1, obj2);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const admixture = {
        nik: 'admixture',
        add() { console.log(`Add to ${this._name} from ${this.nik}`); },
        set() { console.log(`Set to ${this._name} from ${this.nik}`); },
    }

    class Example {
        _name = 'Example';
    }

    const ex = new Example();

    Object.assign(ex, admixture);                                           // Example has: nik, add(), set() whith Example`s this.'...'

    ex.add();
    ex.set();
    console.log(ex.nik)
}

function sas4()
{
    let error_invoker = {
        throw_error() {
            throw new Error('Error constructor');
        },
        name: 'name'
    }

    class ErrorModul extends Error {
        constructor(message) {
            super(message);
            this.name = 'sas';
        }
    }

    const invok_error = function(err) {
        let [name, str] = err.split(' ');
        switch(name) {
            case 'type':
                throw new TypeError(str);
                break;
            case 'run-time':
                throw new Error(str);
                break;
            default:
                throw new Error(str);
        }
    }

    try {
        //error_invoker.sas;
        //invok_error('type Error_type');
        //invok_error('run-time Run_time_error');
        //invok_error('anything Unknown_error!');
        throw new ErrorModul('bad alloc!');
        throw 1;
    } 
    catch(err) {
        console.log(err.name, err.message);
    }
    finally {
        console.log('Finally section after error/catch');
    }

    try {
        error_invoker.throw_error();
    }
    catch {
        console.log('Empty catch section!');
    }
    
}


sas4();