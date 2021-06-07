var fields =  document.querySelectorAll("#form-user-create [name]");
var user = {};

var form = document.getElementById('form-user-create')
form.addEventListener('submit', formData)



function addLine(dataUser){
    
console.log(dataUser)
    
    document.getElementById('table-users').innerHTML =`
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


}


function formData(e){
    
    fields.forEach(function(field, index){

        if(field.name == "gender") {
            user[field.name] = field.value;
        } else{
            user[field.name] = field.value;
        }

    });
    var objectUser = new User(
        user.name,
        user.gender,
        user.birth,
        user.country,
        user.email,
        user.password,
        user.photo,
        user.admin)
    addLine(objectUser)
    e.preventDefault();
}






