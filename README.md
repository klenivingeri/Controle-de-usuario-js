# Trabalhando com Objetos Dicas
Document Object Model - É o modelo de objetos que um document HTML é escrito, por hierarquia.

objeto.método("seletor").propriedade/atributo

# Trabalhando com o Objeto Document

```document.getElementById("pega_id")```
Pega o elemento que tem o id






# Trabalhando com getElementoById("")
```document.getElementoById("id")```
getElementoById é um metodo do objeto document, quando terminar com ("") sabemos que é um metodo

```document.getElementoById("id").value```
value é uma propriedade do metodo que esta dentro do Objeto, quando terminar sem ("") sabemos que é uma propridade.
Podemos pegar ou atribuir.




# Trabalhando com querySelector("")

```document.querySelector("#id [name=exemplo] .Class")```
Faz uma pesquisa pelo documento e retorna onde localizar #ID's, [Atributos] ou .Classes

```document.querySelectorAll("#id [name=exemplo]")```
Caso queria buscar todos os elementos, como <radio> onde todos devem ter o mesmo name. otilizamos o querySelectorAll

```document.querySelectorAll("#id [name=exemplo]:checked")```
Caso queria busca o elemento que foi marcado no <radio>.