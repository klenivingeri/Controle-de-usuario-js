class UserController {

    constructor(formId, tableId){
        this.formEl =  document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }

    onSubmit() {
        this.formEl.addEventListener('submit', event => {
            event.preventDefault()

            let values = this.getValues();

            this.getPhoto((content)=>{

                values.photo = content;
                this.addLine(values);

            });

        });

    } //onSubmit

    getPhoto(callback){
        let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item =>{

            if(item.name === 'photo'){
                return item;
            }

        });

        let file = elements[0].files[0];
        //console.log(elements[0].files[0])

        fileReader.onload = ()=>{

            callback(fileReader.result)

        };

        fileReader.readAsDataURL(file);

    } //getValues

    getValues(){
        let user = {};
        /*typeof(this.formEl.elements) //objeto, é uma coleção/class e dentro dela existe um erray
        utilizamos o ... spread para separar e colocar dentro do array[]
        ficando assim [...this.formEl.elements] onde o forEach consegu atuar
        */

        [...this.formEl.elements].forEach(function(field, index){

            if(field.name == "gender") {
                user[field.name] = field.value;
            } else{
                user[field.name] = field.value;
            }
    
        });
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

    } //getValues

    addLine(dataUser){
    
        console.log(dataUser)
            
            this.tableEl.innerHTML =`
                <tr>
                    <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${dataUser.admin}</td>
                    <td>${dataUser.birth}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                </tr>
            `
    } // addline

}