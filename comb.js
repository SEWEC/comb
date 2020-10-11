window.onload = (event) => {
    let listy = [... Array(arrayLength = 100)].map((a,index) => 5 - Math.abs(5-index%10));
    console.log(listy);
    document.getElementById('n').value = 9;
    document.getElementById('k').value = 3;
    document.getElementById("calc").onclick = (event) => {
        n = Number(document.getElementById('n').value);
        k = Number(document.getElementById('k').value);
        let seqL = generateEquation1(n,k);
        let seqR = generateEquation2(n,k);
        seqL.sort((a,b) => a.reduce((a,b) => a*b) > b.reduce((a,b) => a*b));
        seqR.sort((a,b) => a.reduce((a,b) => a*b) < b.reduce((a,b) => a*b));
        if(n > 0){
            let innerHTML = '<div class="out">LHS = (<br>';
            let nList = [];
            let aList = [];
            for(let i = 0; i < n; i++){
                nList.push(n-i);
            }
            let a = n - k;
            for(let i = 0; i < a; i++){
                aList.push(n-i);
            }
            for(let i = 0; i < seqL.length; i++){
                innerHTML += "(" + multStr(aList) + ") / (" + multStr(seqL[i]) + ") + <br>";
            }
            output2 = document.getElementById("output2");
            let map = seqL.map(a => 1/(a.reduce((a,b) => a*b))).reduce((a,b) => a+b);
            output2.innerHTML = innerHTML + ") = " + (Math.round(map*factorial(n)/factorial(k))) + "</div>";
            innerHTML = '<div class="out">RHS = (<br>';
            for(let i = 0; i < seqR.length; i++){
                innerHTML += "(" + multStr(seqR[i]) + ") + <br>";
            }
            map = seqR.map(a => a.reduce((a,b) => a*b)).reduce((a,b) => a+b);
            output2.innerHTML += innerHTML + ") = " + (Math.round(map)) + "</div>";
            map = seqR.map(a => nList.filter(b => !a.includes(b)));
            console.log(map);
        }
    }
};



function multStr(list){
    let map = list.map(a => a + " * ");
    map.splice(list.length-1, 1, list[list.length-1]);
    return map.reduce((a,b) => a + b);
}

function generateEquation1(n,k){
    let sequences = [];
    let innerHtml = '<div class="out">LHS = ( <br> ';
    let IToK = [];
    IToK.push(n-k+1);
    for(let i = 1; i < k; i++){
        IToK.push(1);
    }
    let invSum = 0;
    let mult = IToK.reduce((a,b) => a*b,1);
    sequences.push([... IToK]);
    invSum += 1/mult;
    let map = IToK.map(a => a + " * ");
    map.splice(k-1,1, IToK[k-1] + ")");
    innerHtml += "1/(" + map.reduce((a,b) => a + b);
    for(let i = 1; i < k; i++){
        if(IToK[i-1] > 1){
            let j = IToK[i-1] - 1;
            IToK[i-1] = 1;
            IToK[i] = IToK[i] + 1;
            IToK[0] = j;
            i = 0;
            sequences.push([... IToK]);
            mult = IToK.reduce((a,b) => a*b,1);
            invSum += 1/mult;
            map = IToK.map(a => a + " * ");
            map.splice(k-1,1, IToK[k-1] + ")");
            innerHtml += " + <br> 1/(" + map.reduce((a,b) => a + b);
        }
    }
    let ans1 = Math.round(invSum*factorial(n));
    innerHtml += "<br>) * " + n + "! = " + ans1 + "</div>";
    output = document.getElementById('output');
    output.innerHTML = innerHtml;
    return sequences;
}

function generateEquation2(n,k){
    let sequences = [];
    let innerHtml = '<div class="out">RHS = (<br>';
    let map;
    let mult = 1;
    let sum = 0;
    let a = n - k;
    let IToA = [];
    for(let i = 0; i < a; i++){
        IToA.push(a-i);
    }
    while(IToA[a-1] < n-a+1){
        sequences.push([... IToA]);
        mult = IToA.reduce((a,b) => a*b,1);
        sum += mult;
        map = IToA.map(a => a + " * ");
        if(IToA[a-1] == n-a){
            map.splice(a-1,1, IToA[a-1]);
            
        } else{
            map.splice(a-1,1, IToA[a-1] + " +<br>");
        }
        innerHtml += map.reduce((a,b) => a + b);
        while(IToA[0] < n-1){
            IToA[0] += 1;
            sequences.push([... IToA]);
            mult = IToA.reduce((a,b) => a*b,1);
            sum += mult;
            map = IToA.map(a => a + " * ");
            map.splice(a-1,1, IToA[a-1] + " +<br>");
            innerHtml += map.reduce((a,b) => a + b);
        }
        let i;
        for(i = 1; i < a; i++){
            if(IToA[i] < IToA[i-1] - 1){
                break;
            }
        }
        IToA[i] += 1;
        for(let j = i - 1; j > -1; j--){
            IToA[j] = IToA[j + 1] + 1;
        }
    }
    let ans2 = sum*factorial(k);
    innerHtml += "<br>) * " + k + "! = " + ans2 + "</div>";
    output = document.getElementById('output');
    output.innerHTML += innerHtml;  
    return sequences;
}

function factorial(n){
    if (n == 0){
        return 1;
    } else {
        return n * factorial(n-1);
    }
}