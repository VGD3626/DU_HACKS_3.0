var pjmatrix = [];
var pq = [];
var n=0;

class Node {
    constructor(p, j, e, a) {
        this.parent = p; // Parent node (for printing solution)
        this.pathcost = 0; // Initialize actual cost (you can set an appropriate value)
        this.cost = 0; // actual cost + estimate cost (you can set an appropriate value)
        this.job = j; // Job identifier
        this.person = e; // Employee identifier
        this.assign = a; // Array of boolean values (assignment status)
    }
}

var arr = [[]];
function print(min) {
    if(min.parent == null) {
        arr = [[]];
        return;
    }
    print(min.parent);
    console.log('Employee '+ parseInt(min.person+1) + 'have ' + parseInt(min.job+1));
    arr.push([min.job, min.person]);
}

function fun(){
    var assign = new Array(n).fill(false);
    const nn = new Node(null,-1,-1,assign);
    const nn2 = new Node(nn,1,2,assign);
    const nn3 = new Node(nn2,2,1,assign);
    print(nn3);
    var a=5,b=0;
    console.log(a,b);
    var x = nn.job + 2;
    console.log(x);
    // console.log(nn);
}

async function clac_cost(j,p,assign){
    var cost = 0;
    for(let i=0;i<n;i++){
        for(let k=0;k<=j;k++){
            cell_arr[i][k].classList.add('block');
        }
        if(assign[i] == true){
            for(let k=0;k<n;k++){
                cell_arr[i][k].classList.add('block');
            }
        }
    }
    let tem = [];//for remove mincell class
    for(let i=j+1;i<n;i++){
        var min=Infinity,minidx=-1;
        for(let k=0;k<n;k++){
            if(assign[k]==false && pjmatrix[k][i] < min){
                minidx = k;
                min = pjmatrix[k][i];
                console.log(pjmatrix[k][i] + ' ' + min);
            }
        }
        cost = parseInt(cost) + parseInt(min);
        cell_arr[minidx][i].classList.add('mincell');
        tem.push(minidx);
        // await new Promise(resolve => setTimeout(resolve, ms));
        await customDelay(1000);
        
    }
    console.log('return'+cost);

    for(let i=0;i<n;i++){
        for(let k=0;k<=j;k++){
            cell_arr[i][k].classList.remove('block');
        }
        if(assign[i] == true){
            for(let k=0;k<n;k++){
                cell_arr[i][k].classList.remove('block');
            }
        }
    }
    for(let i=j+1;i<n;i++){
        cell_arr[tem[i-j-1]][i].classList.remove('mincell');
    }
    return cost;
}


async function customDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function find_min(){
    var len = pq.length;
    var ret = pq[0];
    for(let i=0;i<len;i++){
        if(pq[i].cost < ret.cost){
            ret = pq[i];
        }
    }
    return ret;
}


async function branch_and_bound(){
    const assign = new Array(n).fill(false);
    const root = new Node(null, -1, -1, assign);
    pq = [];
    pq.push(root);
    // visualizePop();
    // await new Promise(resolve=>setTimeout(resolve,2000));
    while(pq.length != 0){
        var min = find_min();
        let t = pq.indexOf(min); //get index of min
        pq.splice(t, 1); // remove a element from an array
        var i = min.job + 1;
        // visualizePop();
        // await new Promise(resolve=>setTimeout(resolve,2000));

        if(i == n){
            print(min);
            console.log(min.cost);
            return;
        }

        for(let j=0; j<n ;j++){
            if(min.assign[j] == false){
                var new_assign = new Array(n);

                // deep copy of assign
                for(let x=0; x<n; x++){
                    new_assign[x] = min.assign[x];
                }
                new_assign[j] = true;
                var Child = new Node(min, i, j, new_assign);
                Child.pathcost = parseInt(min.pathcost) + parseInt(pjmatrix[j][i]);
                Child.cost = parseInt(Child.pathcost) + parseInt(clac_cost(i, j, new_assign));
                //console.log(Child.cost);
                pq.push(Child);
                // visualizePop();
                // await new Promise(resolve=>setTimeout(resolve,2000));
            }
        }
    }
}

function extract_data(){
    const params = new URLSearchParams(window.location.search);
    const str = params.get('pjmatrix');
    var matrix = str.split(',');
    // console.log(matrix);
    n = Math.sqrt(matrix.length);
    // console.log(n);
    
    for(let i=0;i<n;i++){
        var r = [];
        for(let j=0;j<n;j++){
            r.push(parseInt(matrix[n*i + j]));
        }
        pjmatrix.push(r);
    }
}
extract_data();
console.log(pjmatrix);
console.log(n);

function visualizePop() {
    var arrayDiv = document.getElementById("array");
    arrayDiv.innerHTML = '';
    for(let i=0;i<pq.length;i++) {
      const popped = pq[i];
      const card = document.createElement('div');
      card.className = 'card shadow w-75 m-2';
      card.style.backgroundColor = 'rgb(213, 241, 255)';
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const cardRow1 = document.createElement('div');
      cardRow1.className = 'row';
      cardRow1.innerText = 'cost: ' + popped.cost;

      const cardRow2 = document.createElement('div'); 
      cardRow2.className = 'row';

      JP = document.createElement('table');
      const jobr = document.createElement('tr');
      const jobh = document.createElement('th');
      jobh.innerText = 'Job';
      jobr.appendChild(jobh);
      const personr = document.createElement('tr');
      const personh = document.createElement('th');
      personh.innerText = 'Person';
      personr.appendChild(personh);

      print(popped);

        for(let i=0;i<arr.length;i++) {
            let jo = document.createElement('td');
            if(arr[i][0] != undefined)
                jo.innerText = arr[i][0]+1;
            jobr.appendChild(jo);
        }
        
        for(let i=0;i<arr.length;i++) {
            let jo = document.createElement('td');
            if(arr[i][0] != undefined)
                jo.innerText = arr[i][1];
            personr.appendChild(jo);
            console.log(typeof(arr[i][1]));
        }
      
        JP.appendChild(jobr);
        JP.appendChild(personr);
        cardRow2.appendChild(JP);

      cardBody.appendChild(cardRow1);
      cardBody.appendChild(cardRow2);
      card.appendChild(cardBody);
      arrayDiv.appendChild(card);
    }
  }