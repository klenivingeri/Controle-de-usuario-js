var fields =  document.querySelectorAll("#form-user-create [name]");
var user = {};

var form = document.getElementById('form-user-create')
form.addEventListener('submit', formData)



function addLine(dataUser){
    
console.log(dataUser)
    var tr = document.createElement('tr')
    tr.innerHTML =`
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    `
    document.getElementById('tbody').appendChild(tr)

}


function formData(e){
    
    fields.forEach(function(field, index){

        if(field.name == "gender") {
            user[field.name] = field.value;
        } else{
            user[field.name] = field.value;
        }

    });
    addLine(user)
    e.preventDefault();
}






