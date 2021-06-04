# Trabalhando com o Objeto Document



```document.getElementById("pega_id") ```
Faz uma pesquisa no documento pelo ID

```document.querySelector("#busca_id")```
Faz uma pesquisa pelo documento por ID's e por Classes

# Trabalhando com Objetos Dicas

Document Object Model - É o modelo de objetos que um document HTML é escrito, por hierarquia.

objeto.método("seletor").propriedade/atributo

# Trabalhando com getElementoById("")
```document.getElementoById("id")```
getElementoById é um metodo do objeto document, quando terminar com ("") sabemos que é um metodo

```document.getElementoById("id").value```
value é uma propriedade do metodo que esta dentro do Objeto, quando terminar sem ("") sabemos que é uma propridade.
Podemos pegar ou atribuir.

# Trabalhando com querySelector("") ou querySelectorAll("")
```document.querySelector("#id [name=exemplo]")``` 
Conseguimos fazer uma busca mais especifica utilizando querySelector para buscar o id e o elemento com o atributo solicitado.

```document.querySelectorAll("#id [name=exemplo]")```
Caso queria buscar mais de 1 item como no elemento <radio> onde todos devem ter o mesmo name.

```document.querySelectorAll("#id [name=exemplo]:checked")```
Caso queria busca o elemento que foi  marcado.