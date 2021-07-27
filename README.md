## Objetos

Document Object Model - É o modelo de objetos que um document HTML é escrito, por hierarquia.

objeto.método("seletor").propriedade/atributo

Um objeto é uma variavel que estancia/representa uma class

## Objeto Document

~~~Javascript
document.getElementById("pega_id")
~~~
Pega o elemento que tem o id

## getElementoById("")

~~~Javascript
document.getElementoById("id")
~~~
getElementoById é um metodo do objeto document, quando terminar com ("") sabemos que é um metodo

~~~Javascript
document.getElementoById("id").value
~~~

`value` é uma propriedade do metodo que esta dentro do Objeto, quando terminar sem ("") sabemos que é uma propridade.
Podemos pegar ou atribuir.


## querySelector("")

~~~Javascript
document.querySelector("#id [name=exemplo] .class")
~~~

Faz uma pesquisa pelo documento e retorna onde localizar #ID's, Atributos ou .Classes

~~~Javascript
document.querySelectorAll("#id [name]")
~~~

Caso queria buscar todos os elementos, como form onde todos tem um atributo name. utilizamos o querySelectorAll

~~~Javascript
document.querySelectorAll("#id [name=exemplo]:checked")
~~~

Caso queria busca o elemento que foi marcado no form.

## Trabalhando com class("")
Um objeto é uma estancia ou representação de uma class.

Depois de criar a `class Exemplo{}`, passar para o metodo `constructor(name ,email, pass)` as informações que ele vai receber e passar os valores para o `this.`
Estanciamos a class com `var objectExemple new exemple(info_qo_constructor_recebe)`

Exemplo :
~~~Javascript
class ExemploUser {
    constructor(name ,email, pass)
    this.name = name;
    this.email = email;
    this.pass = pass;
}
var objectExemple = new ExemploUser(name, email, pass)
~~~

`objectExemple` vai receber as informações que foram tratadas e passadas para o `this.` dentro da class.


## FileReader API
 Mais informações sobre [FileReader](https://developer.mozilla.org/pt-BR/docs/Web/API/FileReader)
~~~Javascript
    return new Promise((resolve,reject)=>{
        let fileReader = new FileReader();

        let file = Blob_objeto_do_arquivo

        fileReader.onload = ()=>{
            resolve(fileReader.result) //base64
        };
        fileReader.onerror = (e)=>{
            reject(e) //event error
        };

        fileReader.readAsDataURL(file);
    } 
~~~

## Dataset API e JSON
~~~Javascript
 gerDataset(dataUser){ /* Recebemos um objeto */
       
        let tr =  document.getElementById('tr-user')
        /* Pegando o elemento tr para inserir o dataset */

        /* Dataset só aceita string , por isso usamos o JSON.stringify() para converter o objeto em string*/
        tr.dataset.user = JSON.stringify(dataUser)
        /* Recebe a string dentro da variavel user*/
        
        /*  Depois podemos recuperar e converter o objeto usando JSON.parse() */  
        let trUser = JSON.parse(tr.dataset.user))
}
~~~

## Object.assign
    Copia o valor de atributos de um objeto.
    Cria um objeto destino, retornando este objeto.
    todo objeto que vão ficando a direita, ele sobrescreve o que estão a esquerda.
~~~Javascript

    let valuesOld = {name: 'Maria', age:23, sex:'F'}
    let valuesNew = {name: 'Maria João', age:24}

    let result = Object.assign({}, userOld, valueNew)
    //console(result) {name: 'Maria João', age:24, sex:'F'}

~~~
