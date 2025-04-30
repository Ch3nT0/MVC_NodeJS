// Cập nhật lại số lượng sản phẩm
const inputsQuanity = document.querySelectorAll("input[name='quantity']")
if(inputsQuanity.length >0){
    inputsQuanity.forEach(input =>{
        input.addEventListener("change", (e)=>{
            const productId= input.getAttribute("product-id");
            const quantity= input.value;
            
            window.location.href = `/cart/update/${productId}/${quantity}`
        })
    })
}
// Hết cập nhật lại số lượng sản phẩm