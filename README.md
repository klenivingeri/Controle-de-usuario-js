## Objetos

Document Object Model - É o modelo de objetos que um document HTML é escrito, por hierarquia.

objeto.método("seletor").propriedade/atributo

Um objeto é uma variavel que estancia/representa uma class

### Objeto Document

~~~Javascript
document.getElementById("pega_id")
~~~
Pega o elemento que tem o id
~~~Javascript
~~~

### getElementoById("")
~~~Javascript
document.getElementoById("id")
~~~
getElementoById é um metodo do objeto document, quando terminar com ("") sabemos que é um metodo

~~~Javascript
document.getElementoById("id").value
~~~
value é uma propriedade do metodo que esta dentro do Objeto, quando terminar sem ("") sabemos que é uma propridade.
Podemos pegar ou atribuir.


### querySelector("")

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

### Trabalhando com class("")
Um objeto é uma estancia ou representação de uma class.

Depois de criar a `class Exemplo{}`, passar para o metodo `constructor(name ,email, pass)` as informações que ele vai receber e passar os valores para o `this.`
Estanciamos a class com `var objectExemple new exemple(info_qo_constructor_recebe)`

Exemplo :
~~~Javascript
class ExemploUser {
    constructor(name ,email, pass)
    this.name = name;
    this.email = email
    this.pass = pass
}
var objectExemple = new ExemploUser(name, email, pass)
~~~

`objectExemple` vai receber as informações que foram tratadas e passadas para o `this.` dentro da class.


### FileReader API
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