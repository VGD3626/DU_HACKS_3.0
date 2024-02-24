var n=4;
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