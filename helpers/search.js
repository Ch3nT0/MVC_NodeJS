module.exports =(query)=>{
    let ojectSearch={
        keyword:"",
    }

    if(query.keyword){
        ojectSearch.keyword = query.keyword;
        const regex = new RegExp(ojectSearch.keyword,"i");
        ojectSearch.regex = regex;
    }
    
    return ojectSearch;
}