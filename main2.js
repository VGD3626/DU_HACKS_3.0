var pjmatrix = [];
var pq = [];
var n=0;
var cell_arr =[];
var cost = 0;

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
    // console.log('Employee '+ parseInt(min.person+1) + 'have ' + parseInt(min.job+1));
    arr.push([min.job, min.person]);
    }

async function clac_cost(j,p,assign){
    cost = 0;
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
            }
        }
        cost = parseInt(cost) + parseInt(min);
        cell_arr[minidx][i].classList.add('mincell');
        tem.push(minidx);
        await new Promise(resolve=>setTimeout(resolve,1000));
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
    visualizeArray();

    while(pq.length != 0){
        var min = find_min();
        var i = min.job + 1;
        let t = pq.indexOf(min); //get index of min
        visualizePop(pq[t]);
        pq.splice(t, 1); // remove a element from an array
        visualizeArray();

        if(i == n){
            print(min);
            console.log(min.cost);
            return;
        }
        // await new Promise(resolve=>setTimeout(resolve,2000));

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
                clac_cost(i,j,new_assign);
                await new Promise(resolve=>setTimeout(resolve,1000*n));
                Child.cost = parseInt(Child.pathcost) + parseInt(cost);
                console.log('it is cost of child ' + Child.cost);
                pq.push(Child);
                await new Promise(resolve=>setTimeout(resolve,4000));
                addNode(Child);
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
    n = Math.sqrt(matrix.length);

    
    for(let i=0;i<n;i++){
        var r = [];
        for(let j=0;j<n;j++){
            r.push(parseInt(matrix[n*i + j]));
        }
        pjmatrix.push(r);
    }
}

function visualizeArray() {
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
      cardRow1.innerText = 'Cost: ' + popped.cost;
      cardRow1.style.fontWeight = 'bold';
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
                jo.innerText = arr[i][1]+1;
            personr.appendChild(jo);
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

  function visualizePop(popped){
      var area = document.getElementById("currentNode");
      area.innerHTML = '';
      const card = document.createElement('div');
      card.className = 'card shadow w-50 m-2';
      card.style.backgroundColor = 'rgb(213, 241, 255)';
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const cardRow1 = document.createElement('div');
      cardRow1.className = 'row';
      cardRow1.innerText = 'Cost: ' + popped.cost;
      cardRow1.style.fontWeight = 'bold';

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
                jo.innerText = arr[i][1]+1;
            personr.appendChild(jo);
        }
      
        JP.appendChild(jobr);
        JP.appendChild(personr);
        cardRow2.appendChild(JP);

      cardBody.appendChild(cardRow1);
      cardBody.appendChild(cardRow2);
      card.appendChild(cardBody);
    area.appendChild(card);
  }

  function addNode(popped){
    var area = document.getElementById("childNode");
    const card = document.createElement('div');
    card.className = 'card shadow w-50 m-2';
      card.style.backgroundColor = 'rgb(213, 241, 255)';
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const cardRow1 = document.createElement('div');
      cardRow1.className = 'row';
      cardRow1.innerText = 'Cost: ' + popped.cost;
      cardRow1.style.fontWeight = 'bold';

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
                jo.innerText = arr[i][1]+1;
            personr.appendChild(jo);
            console.log(typeof(arr[i][1]));
        }
      
        JP.appendChild(jobr);
        JP.appendChild(personr);
        cardRow2.appendChild(JP);

      cardBody.appendChild(cardRow1);
      cardBody.appendChild(cardRow2);
      card.appendChild(cardBody);
    area.appendChild(card);
}

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
extract_data();
console.log(pjmatrix);
console.log(n);
print_matrix();
branch_and_bound();
