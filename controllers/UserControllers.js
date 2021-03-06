class UserController {

    constructor(formIdCreate, formIdUpdate, tableId){
        this.formEl =  document.getElementById(formIdCreate);
        this.formUpdateEl =  document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
        this.selectAll()
    }

    onEdit() {
        
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {
        
            this.showPanelCreate();
        
        })

        this.formUpdateEl.addEventListener('submit', event => {

            event.preventDefault()

            let btn = this.formUpdateEl.querySelector('[type=submit]');

            let values = this.getValues(this.formUpdateEl);
        
            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);
            
            let result =  Object.assign({}, userOld, values)

            this.getPhoto(this.formUpdateEl).then(
                (content) => {

                    if(!values.photo){
                        result._photo = userOld._photo;
                    } else{
                        result._photo = content;
                    }

                    let user = new User();

                    user.loadFronJSON(result)

                    user.save();
        
                    this.getTr(user, tr);

                    this.updateCount();

                    this.formUpdateEl.reset();

                    btn.disabled = false;  

                    this.showPanelCancel();
                },
                (e) => {
                    console.log(e)
                }
            );
            
            
        })

        

    }

    onSubmit() {
        this.formEl.addEventListener('submit', event => {

            event.preventDefault()

            let btn = this.formEl.querySelector('[type=submit]')


            let values = this.getValues(this.formEl);

            if(!values) {
                btn.disabled = false;
                return false
            }
            
            this.getPhoto(this.formEl).then(
                (content) => {
                    values.photo = content;
                    values.save();
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

    getPhoto(formEl){
        return new Promise((resolve,reject)=>{

        let fileReader = new FileReader();

        let elements = [...formEl.elements].filter(item =>{

            if(item.name === 'photo'){
                return item;
            }

        });

        let file = elements[0].files[0];
        //file recebe um objeto Blob, representa????o de um objeto do tipo arquivo

        fileReader.onload = ()=>{

            resolve(fileReader.result);

        };
        fileReader.onerror = (e)=>{

            reject(e);

        };

        if(file){
            fileReader.readAsDataURL(file);
            /*Inicia a leitura do conte??do do Blob especificado, uma vez finalizado, o 
            atributo result conter?? um data: URL representando os dados do arquivo. */    
        }else{
            resolve('dist/img/boxed-bg.jpg');
        }


        });
    } //getPhoto

    getValues(formEl){
        let user = {};
        let isValid = true;

        /*
        typeof(this.formEl.elements) //objeto, ?? uma cole????o/class e dentro dela 
        existe um erray utilizamos o ... spread para separar e colocar dentro do array[]
        ficando assim [...this.formEl.elements] onde o forEach consegue atuar
        */
        [...formEl.elements].forEach(function(field, index){ //Collection

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



    selectAll(){

        let users = User.getUsersStorage();

        users.forEach(dataUser =>{

            let user = new User();

            user.loadFronJSON(dataUser);

            this.addLine(user)

        })

    }

    addLine(dataUser){
    
        let tr = this.getTr(dataUser)

        this.tableEl.appendChild(tr)

        this.updateCount();

    } // addline

    getTr(dataUser, tr = null){

        if (tr === null) tr =  document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser)

        tr.innerHTML =`
            <tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'N??o'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;

        this.addEventsTr(tr);

        return tr
    }

    addEventsTr(tr){

        tr.querySelector(".btn-delete").addEventListener('click', e =>{
            
            if(confirm("Deseja realmente excluir?")){

                let user = new User();

                user.loadFronJSON(JSON.parse(tr.dataset.user))

                user.remove()

                tr.remove();

                this.updateCount()
            }

        })

        tr.querySelector(".btn-edit").addEventListener('click', e => {

            let json = JSON.parse(tr.dataset.user) //objeto
 
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex
            /**  sectionRowIndex, um index a tr */

            for( let name in json ) {
                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_","") + "]")
                
                if(field){ // se existir o campo, pq nem todos os atributos da class tem campo
                    
                    switch(field.type){
                        case 'file':
                            continue; //evitar erro com o register que n??o existe no form
                            break;

                        case 'radio':
                            
                            field = this.formUpdateEl.querySelector(`[name=${name.replace("_","")}][value=${json[name]}]`)
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        
                        default:
                            field.value = json[name];
                    }
                    
                }
            }

            this.formUpdateEl.querySelector(".photo").src = json._photo
            this.showPanelCreate();
        })

    } // addEventsTs

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

