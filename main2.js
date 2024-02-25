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


async function branch_and_bound(){
    const assign = new Array(n).fill(false);
    const root = new Node(null, -1, -1, assign);
    pq = [];
    pq.push(root);
    visualizeArray();

    while(pq.length != 0){
        var min = find_min();
        var i = min.person + 1;
        let t = pq.indexOf(min); //get index of min
        visualizePop(pq[t]);
        pq.splice(t, 1); // remove a element from an array
        visualizeArray();

        if(i == n){
            print(min);
            console.log(min.cost);
            return;
        }
        await new Promise(resolve=>setTimeout(resolve,2000));

        for(let j=0; j<n ;j++){
            if(min.assign[j] == false){
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
                addNode(Child);
                await new Promise(resolve=>setTimeout(resolve,2000));
            }
        }
        visualizeArray();
        let area2 = document.getElementById("childNode");
        area2.innerText = '';
        await new Promise(resolve=>setTimeout(resolve,2000));
        var area1 = document.getElementById("currentNode");
        area1.innerText = '';
        await new Promise(resolve=>setTimeout(resolve,2000));
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

function visualizeArray() {
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


function visualizePop(Node){
    var area = document.getElementById("currentNode");
    area.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card';
    card.innerText = Node.cost;
    area.appendChild(card);
}

function addNode(child){
    var area = document.getElementById("childNode");
    const card = document.createElement('div');
    card.className = 'card';
    card.innerText = child.cost;
    area.appendChild(card);
}