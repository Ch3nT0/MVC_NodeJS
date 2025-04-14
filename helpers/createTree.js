let count =0;
createTree = (arr,parentID="") => {
    const tree=[]
    arr.forEach(item=>{
        if(item.parent_id===parentID){
            count ++;
            const newItem= item ;
            newItem.index=count;
            const children = createTree(arr,item.id);
            if(children.length>0){
                newItem.children=children;
            }
            tree.push(newItem);
        }
    })
    return tree;
}
module.exports.tree=createTree;