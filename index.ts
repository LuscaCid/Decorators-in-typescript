function onlyShowNameMethod(
    target : object,
    propertyKey : string, 
    descriptor : PropertyDescriptor) {

    const childFunction = descriptor.value
    console.log(propertyKey)
    descriptor.value = function (...args : any []) {
        args.length > 0 && console.log(args, 'dentro do decorator')
        
        
        return childFunction.apply(this, args)//esta linha executa o metodo
    }
    //sem ela, é como se nao passasse o next no backend, num middleware
    return descriptor

}
interface IimplementMethod{
    nomeDoMetodo<T>(args? : T []):void
}

const valueChangerIfIsBiggerThen5Char = () => {
    return function (
        target : any,
        propertyKey : string | symbol
    ) {
        let value : string;

        const getter = () => {
            return value + "visibilidade no getter"
        }
        const setter = (newValue : string) => {
            if(newValue.length > 5){
                return value
            } else value = newValue
        }
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set : setter
        })
    }
} 

function validadorDeMetodos(){
    return (
        target : object,
        propertyKey : string ,
        descriptor : PropertyDescriptor
    ) => {
        const childFunction = descriptor.value

        descriptor.value = function (args : unknown []) {
            if(typeof args[0] === 'string')console.log(`o primeiro argumentdo do metodo: ${propertyKey} é string.`)
            else console.log('o primeiro arg nao é string')
            return childFunction.apply(this, args)
        }
        return
    }
}
function medidorDeVelocidadeDoMetodo() {
    return function (
        target : object,
        propertyKey : string,
        descriptor : PropertyDescriptor
        ) {
            const originFunction = descriptor.value
            
            descriptor.value = function (args : number []) {
                const begin = performance.now()
                
                originFunction.apply(this,args)
                const end = performance.now()

                const results = end - begin
                console.log(results.toFixed(10))
                return
            }
            return descriptor
        }
}

function decoratorThatsReceivesAnCallback( callback : (args : string) => string ) {
    return function (
        target : object,
        propertyKey : string,
        descriptor : PropertyDescriptor
    ) {
        const originFunction = descriptor.value
        descriptor.value = function (args : string) {
            console.log(callback(args))
            return originFunction.apply(this, args)
        }
        return descriptor
    }
}

function testWithoutReturnAFunction(
    target : object,
    propertyKey : string,
){
    let value : string;

    const getter = () => {
        return value + 'ta puxando no getter'
    }
    const setter = (newValue : string) => {
        value = newValue + " mudanças no setter"
    }
    Object.defineProperty(target, propertyKey, {
        get : getter,
        set : setter
    })
}

function UseOfMap(){
    return function (
        target : object, 
        propertyKey : string
    ){  
        type Keye = string | null
    
        const key : Keye = null
        
        let mapa = new Map()
        
        
    }
}

class TestDecorators implements IimplementMethod{
    @valueChangerIfIsBiggerThen5Char()
    valueToChange? : string
    
    @onlyShowNameMethod
    nomeDoMetodo<T>(args? : T []): void {
        console.log('dentro do metodo')
        args && console.log(args, 'ueee')
        
    }
    @validadorDeMetodos()
    validacaoMetodos(args? : unknown []) {
        console.log('finalizacao do metodo')
    }
    @testWithoutReturnAFunction //n precisa abrir e fechar parenteses quando nao retorna uma funcao inicialment
    name! : string

   //@medidorDeVelocidadeDoMetodo()
    tempoDeExecucao(args : number[]) : number{
            console.log('array')
            console.log(args)
            const result = args.reduce((acumulates, element) =>acumulates + Math.pow(element, 2),0) //retornar todos os valores do array ao quadrado 
            console.log(typeof result, 'result')
           
        return result
    }

}
const instance = new TestDecorators()

instance.nomeDoMetodo<string>(['dsad', 'bebe', 'amor'])
//passa de 5 caracteres, ele recebe outro valor
//instance.valueToChange = 'babyasa'
console.log(instance.valueToChange)


//instance.validacaoMetodos([2, 23, '213'])

console.log(instance.tempoDeExecucao([2,4,5,1,4]))
const valor = instance.tempoDeExecucao([2,4,5,1,4])
console.log(valor)

instance.name = 'amor-clara'
console.log(instance.name)