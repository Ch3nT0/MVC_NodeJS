//permissions
const tablePermissions = document.querySelector("[table-permissions]")
if(tablePermissions){
    const buttonSubmit =  document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let permissions = [];
        const rows = document.querySelectorAll("[data-name]");
        rows.forEach(row =>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input")
            if(name=="id"){
                inputs.forEach(input =>{
                    const id=input.value
                    permissions.push({
                        id: id,
                        permissions:[]
                    })
                })
            } else{
                inputs.forEach((input,index) =>{
                    const checked = input.checked;
                    if(checked){
                        permissions[index].permissions.push(name)
                    }
                })
            }
        })
        if(permissions.length>0){
            const formChangPermisstions = document.querySelector("#form-change-permissions")
            const inputPermissions = formChangPermisstions.querySelector("input[name='permissions']");
            inputPermissions.value=JSON.stringify(permissions);
            formChangPermisstions.submit();
        }
        console.log(permissions)
    }) 
}

//permisstion data default
const dataRecords = document.querySelector("[data-records]")
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions = document.querySelector("[table-permissions]")
    records.forEach((record,index) =>{
        const permisstions = record.permissions;
        permisstions.forEach(permisstions =>{
            const row = tablePermissions.querySelector(`[data-name="${permisstions}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked=true;
        })
    })

}