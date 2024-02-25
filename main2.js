var pjmatrix = [];
var pq = [];
var n=0;
var cell_arr = [];

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

function print(min){
    if(min.parent == null)
        return;
    print(min.parent);
    console.log('Employee '+ parseInt(min.person+1) + 'have ' + parseInt(min.job+1));
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
    for(let i=0;i<=j;i++){
        for(let k=0;k<n;k++){
            cell_arr[k][i].classList.add('block');
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
    
    /// sli kreli
    for(let i=0;i<=j;i++){
        for(let k=0;k<n;k++){
            cell_arr[k][i].classList.remove('block');
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

print_matrix();

//table mate na functions
function print_matrix(){
    var tbl = document.getElementById('tbl');
    //first row for j1 j2 j3
    let row = document.createElement('tr');
    row.appendChild(document.createElement('th'));//khali box mate
    for(let k=1;k<=n;k++){
        let Th = document.createElement('th');
        Th.innerHTML = 'J'+k;
        row.appendChild(Th);
    }
    tbl.appendChild(row);

    var arr =  [];
    for(let i=0;i<n;i++){
        let row = document.createElement('tr');
        let Th = document.createElement('th');
        Th.innerHTML = 'W'+ parseInt(i+1);
        row.appendChild(Th);

        var row2 = []// for addig cell dont confuse
        for(let j=0;j<n;j++){
            let data = document.createElement('td');
            data.innerHTML = pjmatrix[i][j];
            row.appendChild(data);
            row2.push(data);
        }
        cell_arr.push(row2);
        tbl.appendChild(row);
    }
    
}

function visualizePop() {
    var arrayDiv = document.getElementById("array");
    arrayDiv.innerHTML = '';
    for(let i=0;i<pq.length;i++){
      const popped = pq[i];
      const card = document.createElement('div');
      card.className = 'card';
      card.innerText = popped.cost;
      arrayDiv.appendChild(card);
    }
  }