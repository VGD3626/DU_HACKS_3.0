var n=4;
function print_mat(){
    var tb1 = document.getElementById('tb1');
    tb1.innerHTML='';
    n=document.getElementById('in').value;
    console.log(n);
    //tb1 = document.createElement('table');
    tb1.id = "tb1";
    for(let i=0; i<n; i++){
        var row = document.createElement('tr');
        for(let j=0; j<n; j++){
            var row = document.createElement('tr');
            for(let j=0; j<n; j++){
                var cell = document.createElement('td');
                var in_field = document.createElement('input');
                in_field.type = "text";
                cell.appendChild(in_field);
                row.appendChild(cell);
            }
            tb1.appendChild(row);
        }
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
    console.log(pjmatrix);
}
