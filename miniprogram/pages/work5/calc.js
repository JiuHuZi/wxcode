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

function mul(a,b){
    let t3 = a.toString();
    let t4 = b.toString();
    let m = 0;

    if(t3.indexOf('.') > -1){
        m += t3.split('.')[1].length;
    }
    if(t4.indexOf('.') > -1){
        m += t4.split('.')[1].length;
    }

    let result = Number(t3.replace('.','')) * Number(t4.replace('.','')) / Math.pow(10,m);
    return result;

}

function sub(a,b){
    let t1 = 0;
    let t2 = 0;

    if(a.toString().indexOf('.') > -1){
        t1 = a.toString().split('.')[1].length;
    }
    if(b.toString().indexOf('.') > -1){
        t2 = b.toString().split('.')[1].length;
    }

    let m = Math.pow(10,Math.max(t1,t2));
    let result = (mul(a,m) - mul(b,m)) / m;
    return result;
}

function div(a,b){
    let t1 = 0;
    let t2 = 0;
    let a1 = a.toString();
    let a2 = b.toString();

    if(a1.indexOf('.') > -1){
        t1 = a1.split('.')[1].length;
    }
    if(a2.indexOf('.') > -1){
        t2 = a2.split('.')[1].length;
    }

    let r1 = Number(a1.replace('.',''));
    let r2 = Number(a2.replace('.',''));
    let result = mul(r1/r2,Math.pow(10,t2 - t1))
    return result;
}

module.exports ={
    add,mul,sub,div
}