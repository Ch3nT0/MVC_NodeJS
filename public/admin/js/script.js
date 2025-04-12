// Button Status 
const buttonStatus = document.querySelectorAll('[button-status]');
if(buttonStatus.length>0){
    let url=new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click",()=>{
            const status=button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status",status)
            }else{
                url.searchParams.delete("status")
            }
            window.location.href=url.href;
        })
    })
}

// form search 
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url=new URL(window.location.href);
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword=e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword)
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href=url.href;
    })
}

// phân trang pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    let url=new URL(window.location.href);
    buttonPagination.forEach(button =>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page",page);
            window.location.href=url.href;
        })
    })
}

//checkbox multi 
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsID = checkboxMulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked){
            inputsID.forEach(input =>{
                input.checked=true
            })
        }else{
            inputsID.forEach(input =>{
                input.checked=false
            })
        }
    })
    inputsID.forEach(input =>{
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
            if(countChecked.length === inputsID.length){
                inputCheckAll.checked=true
            }else{
                inputCheckAll.checked=false
            }
        })
    })
}

//form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;
        if(typeChange=='delete-all'){
            const isConfirm =confirm("Bạn có muốn xóa những sản phẩm này không?")
            if(!isConfirm) return;
        }
        if(inputsChecked.length>0){
            let ids =[];
            const inputIds= formChangeMulti.querySelector("input[name='ids']")
            inputsChecked.forEach(input =>{
                const id =input.value;
                if(typeChange=='change-position'){
                    const position =input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }else{
                    ids.push(id)
                }
            })
            inputIds.value=ids.join(", ");
            formChangeMulti.submit();
        }else{
            alert("Vui lòng chọn ít nhất một bản ghi")
        }
    });
}

// delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length>0){
    buttonDelete.forEach(button =>{
        const formDeleteItem = document.querySelector("#form-delete-item")
        const patch=formDeleteItem.getAttribute("data-path")

        button.addEventListener("click", (e) => {
            const isConfirm =confirm("Bạn có chắc muốn xóa sản phẩm này");
            if(isConfirm){
                const id= button.getAttribute("data-id");
                const action = `${patch}/${id}?_method=DELETE`
                formDeleteItem.action=action
                formDeleteItem.submit();
            }
        })
    })
}

// show arlet 
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time=parseInt(showAlert.getAttribute("data-time"));
    const closeAlert= showAlert.querySelector("[close-alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time)
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })
}

// upload image
const uploadImage= document.querySelector("[upload-image]")
if(uploadImage) {
    const uploadImageInput= document.querySelector("[upload-image-input]")
    const uploadImagePreview= document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change",(e)=>{
        const file=e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
        }
    })
    const closeImg = document.querySelector("[upload-image-reset]")
    const closeImgInput= document.querySelector("[upload-image-input]");
    closeImg.addEventListener("click",()=>{
        uploadImagePreview.src=""
        closeImgInput.value="";
    })

}