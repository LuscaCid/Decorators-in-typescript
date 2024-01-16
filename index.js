"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function onlyShowNameMethod(target, propertyKey, descriptor) {
    const childFunction = descriptor.value;
    console.log(propertyKey);
    descriptor.value = function (...args) {
        args.length > 0 && console.log(args, 'dentro do decorator');
        return childFunction.apply(this, args); //esta linha executa o metodo
    };
    //sem ela, é como se nao passasse o next no backend, num middleware
    return descriptor;
}
const valueChangerIfIsBiggerThen5Char = () => {
    return function (target, propertyKey) {
        let value;
        const getter = () => {
            return value + "visibilidade no getter";
        };
        const setter = (newValue) => {
            if (newValue.length > 5) {
                return value;
            }
            else
                value = newValue;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    };
};
function validadorDeMetodos() {
    return (target, propertyKey, descriptor) => {
        const childFunction = descriptor.value;
        descriptor.value = function (args) {
            if (typeof args[0] === 'string')
                console.log(`o primeiro argumentdo do metodo: ${propertyKey} é string.`);
            else
                console.log('o primeiro arg nao é string');
            return childFunction.apply(this, args);
        };
        return;
    };
}
function medidorDeVelocidadeDoMetodo() {
    return function (target, propertyKey, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = function (args) {
            const begin = performance.now();
            originFunction.apply(this, args);
            const end = performance.now();
            const results = end - begin;
            console.log(results.toFixed(10));
            return;
        };
        return descriptor;
    };
}
function decoratorThatsReceivesAnCallback(callback) {
    return function (target, propertyKey, descriptor) {
        const originFunction = descriptor.value;
        descriptor.value = function (args) {
            console.log(callback());
        };
    };
}
function testWithoutReturnAFunction(target, propertyKey) {
    let value;
    const getter = () => {
        return value + 'ta puxando no getter';
    };
    const setter = (newValue) => {
        value = newValue + " mudanças no setter";
    };
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    });
}
class TestDecorators {
    nomeDoMetodo(args) {
        console.log('dentro do metodo');
        args && console.log(args, 'ueee');
    }
    validacaoMetodos(args) {
        console.log('finalizacao do metodo');
    }
    //@medidorDeVelocidadeDoMetodo()
    tempoDeExecucao(args) {
        console.log('array');
        console.log(args);
        const result = args.reduce((acumulates, element) => acumulates + Math.pow(element, 2), 0); //retornar todos os valores do array ao quadrado 
        console.log(typeof result, 'result');
        return result;
    }
}
__decorate([
    valueChangerIfIsBiggerThen5Char()
], TestDecorators.prototype, "valueToChange", void 0);
__decorate([
    onlyShowNameMethod
], TestDecorators.prototype, "nomeDoMetodo", null);
__decorate([
    validadorDeMetodos()
], TestDecorators.prototype, "validacaoMetodos", null);
__decorate([
    testWithoutReturnAFunction //n precisa abrir e fechar parenteses quando nao retorna uma funcao inicialment
], TestDecorators.prototype, "name", void 0);
const instance = new TestDecorators();
instance.nomeDoMetodo(['dsad', 'bebe', 'amor']);
//passa de 5 caracteres, ele recebe outro valor
//instance.valueToChange = 'babyasa'
console.log(instance.valueToChange);
//instance.validacaoMetodos([2, 23, '213'])
console.log(instance.tempoDeExecucao([2, 4, 5, 1, 4]));
const valor = instance.tempoDeExecucao([2, 4, 5, 1, 4]);
console.log(valor);
instance.name = 'amor-clara';
console.log(instance.name);
