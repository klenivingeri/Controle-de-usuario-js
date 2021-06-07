var fields =  document.querySelectorAll("#form-user-create [name]");
var user = {};

var form = document.getElementById('form-user-create')
form.addEventListener('submit', formData)

function formData(e){
    
    fields.forEach(function(field, index){

        if(field.name == "gender") {
            user[field.name] = field.value;
        } else{
            user[field.name] = field.value;
        }

    });
    console.log(user);
    e.preventDefault()
}




