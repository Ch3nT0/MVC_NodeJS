module.exports =(ojectPagination,query,countProducts)=>{

    if(query.page){
        ojectPagination.currentPage=parseInt(query.page);
    }
    ojectPagination.skip=(ojectPagination.currentPage-1)*ojectPagination.limitItem;
    const totalPage = Math.ceil(countProducts/ojectPagination.limitItem);
    ojectPagination.totalPage=totalPage;
    return ojectPagination;
}