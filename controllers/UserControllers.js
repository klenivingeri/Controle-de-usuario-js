class UserController {

    constructor(formId, tableId){
        this.formEl =  document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
    }

    onEdit() {
        document.querySelector("#box-user-update .btn-cancel").addEventListener('click', e => {
            this.showPanelCancel();
        })

    }

    onSubmit() {
        this.formEl.addEventListener('submit', event => {

            event.preventDefault()

            let btn = this.formEl.querySelector('[type=submit]')

            btn.disabled = true;

            let values = this.getValues();

            if(!values) {
                btn.disabled = false;
                return false
            }
            
            this.getPhoto().then(
                (content) => {
                    values.photo = content;
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disabled = false;  
                },
                (e) => {
                    console.log(e)
                }
            );

        });

    } //onSubmit

    getPhoto(){
        return new Promise((resolve,reject)=>{

        let fileReader = new FileReader();

        let elements = [...this.formEl.elements].filter(item =>{

            if(item.name === 'photo'){
                return item;
            }

        });

        let file = elements[0].files[0];
        //file recebe um objeto Blob, representação de um objeto do tipo arquivo

        fileReader.onload = ()=>{

            resolve(fileReader.result);

        };
        fileReader.onerror = (e)=>{

            reject(e);

        };

        if(file){
            fileReader.readAsDataURL(file);
            /*Inicia a leitura do conteúdo do Blob especificado, uma vez finalizado, o 
            atributo result conterá um data: URL representando os dados do arquivo. */    
        }else{
            resolve('dist/img/boxed-bg.jpg');
        }


        });
    } //getPhoto

    getValues(){
        let user = {};
        let isValid = true;

        /*
        typeof(this.formEl.elements) //objeto, é uma coleção/class e dentro dela 
        existe um erray utilizamos o ... spread para separar e colocar dentro do array[]
        ficando assim [...this.formEl.elements] onde o forEach consegue atuar
        */
        [...this.formEl.elements].forEach(function(field, index){ //Collection

            if(['name','email','password'].indexOf(field.name) > -1  && !field.value){
                
                field.parentElement.classList.add('has-error');
                isValid = false
      
            }

            if(isValid) field.parentElement.classList.remove('has-error');

            if(field.name == "gender") {

                if(field.checked){
                    user[field.name] = field.value;
                }
                
            }else if(field.name =='admin'){

                user[field.name] = field.checked

            }else{

                user[field.name] = field.value;

            }
    
        });

        if(!isValid){
            return false
        }

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
    
        //console.log(dataUser)
        let tr =  document.createElement('tr')

        tr.dataset.user = JSON.stringify(dataUser)

        tr.innerHTML =`
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `

        tr.querySelector(".btn-edit").addEventListener('click', e=>{

            let json = JSON.parse(tr.dataset.user) //objeto
            let form =  document.getElementById('box-user-update')
            for( let name in json ) {
                let field = form.querySelector("[name=" + name.replace("_","") + "]")
                
                

                if(field){ // se existir o campo, pq nem todos os atributos da class tem campo
                    if(field.type == 'file') continue; //evitar erro como register
                    field.value = json[name];
                }
            }

            this.showPanelCreate();
        })



        this.tableEl.appendChild(tr)

        this.updateCount();

    } // addline

    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        // console.dir(this.tableEl);

        [...this.tableEl.children].forEach(tr =>{ //Collection
            numberUsers++
            
            
            let user = JSON.parse(tr.dataset.user);
           // console.log(user)

            if(user._admin){
                numberAdmin++
            }
        })


        document.getElementById('number-users').innerHTML =  numberUsers
        document.getElementById('number-admin').innerHTML =  numberAdmin
    } // updateCount

    showPanelCreate() {

        document.getElementById('box-user-create').style.display = 'none'
        document.getElementById('box-user-update').style.display = 'block'
   
    } // showPanelCreate

    showPanelCancel() {

        document.getElementById("box-user-create").style.display = 'block'
        document.getElementById("box-user-update").style.display = 'none'

    } // showPanelCancel


}