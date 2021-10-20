function add(a,b){
    let t1 = 0;
    let t2 = 0;
    
    if(a.toString().indexOf('.') > -1){
        t1 = a.toString().split('.')[1].length;
    }
    if(b.toString().indexOf('.') > -1){
        t2 = b.toString().split('.')[1].length;
    }

    let m = Math.pow(10,Math.max(t1,t2));
    let result = (a * m + b * m) / m;
    return result;
}

module.exports ={
    add
}