var n=4;
function print_mat(){
    var tbl = document.getElementById('tbl');
        tbl.innerHTML='';
    n = document.getElementById('in').value;
    console.log(n);
    tbl.id = "tbl";
    for(let i=0;i<n;i++){
        var row = document.createElement('tr');
        for(let j=0;j<n;j++){
        var cell = document.createElement('td');
        var in_field = document.createElement('input');
        in_field.type = "text";
        cell.appendChild(in_field);
        row.appendChild(cell);
        }
        tbl.appendChild(row);
    }
}
pjmatrix = [];

function insert_data(){
    const tem = tbl.querySelectorAll('input');   
    pjmatrix = []; // pj matrix shows person job data
    for(var i=0;i<n;i++){
        var r = [];
        for(var j=0;j<n;j++){
            if(tem[n*i + j].value == ''){ // if any cell is empty 
                alert("fill value");
                return;
            }
            r.push(tem[n*i + j].value);
        }
        pjmatrix.push(r);
    }
    window.location.href = "home2.html";
}

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

function clac_cost(j,p,assign){
    var cost = 0;
    for(let i=p+1;i<n;i++){  // pela p 
        var min=Infinity,minidx=-1;
        for(let k=0;k<n;k++){
            if(assign[k]==false && pjmatrix[i][k] < min){ // here i-k
                minidx = k;
                min = pjmatrix[i][k];
                console.log(pjmatrix[i][k] + ' ' + min);
            }
        }
        console.log(min);
        cost = parseInt(cost) + parseInt(min);
        console.log('sarvalo'+cost);
    }
    console.log('return'+cost);
    return cost;
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

var pq = [];
function branch_and_bound(){
    const assign = new Array(n).fill(false);
    const root = new Node(null, -1, -1, assign);
    pq = [];
    pq.push(root);
    while(pq.length != 0){
        var min = find_min();
        let t = pq.indexOf(min); //get index of min
        pq.splice(t, 1); // remove a element from an array
        var i = min.person + 1;

        if(i == n){
            print(min);
            console.log(min.cost);
            return;
        }

        for(let j=0; j<n ;j++){
            if(min.assign[j] == false) {
                var new_assign = new Array(n);

                // deep copy of assign
                for(let x=0; x<n; x++){
                    new_assign[x] = min.assign[x];
                }
                console.log(new_assign);
                console.log(min.assign);
                new_assign[j] = true;
                var Child = new Node(min, j, i, new_assign);
                Child.pathcost = parseInt(min.pathcost) + parseInt(pjmatrix[i][j]);
                Child.cost = parseInt(Child.pathcost) + parseInt(clac_cost(j, i, new_assign));
                //console.log(Child.cost);
                pq.push(Child);
            }
        }
    }
}

//this function is set delay of time
function customDelay(milliseconds) {
    const start = new Date().getTime();
    while (new Date().getTime() - start < milliseconds) {
        // Busy loop to pause execution
    }
}
