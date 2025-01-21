let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discunt = document.getElementById('discunt');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tem;

// get total
// that + in the get total to convert the string to a number
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discunt.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = 'rgb(255, 0, 0)';
    }
}

// create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []; // array to add new the product
}


submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discunt:discunt.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    
    if(title.value != ''&& price.value != ''&&category.value != ''&&newPro.count < 100){// this line condition for empty box 
        if(mood === 'create'){
        if(newPro.count > 1){
        for(let i = 0; i < newPro.count;i++){
            dataPro.push(newPro); // this to add any new product
        }
    }else{
        dataPro.push(newPro);
    }
    }else{
        dataPro[    tem    ] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    clearData();
    }
    
    
    
    localStorage.setItem('product',  JSON.stringify(dataPro)  )
    
    showData()
}
// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discunt.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}

// read data

function showData()
{
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discunt}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick ='updateData(${i})' id="update">update</button></td>
            <td><button onclick ='deletData(${i})' id="delete">delete</button></td>
        </tr> 
        `
    }
    
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick='deleteAll()'>delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData();

// delet
function deletData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// updata
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discunt.value = dataPro[i].discunt;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tem = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

// search
let searchMood = 'title';

function getsearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search by Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search by Category';
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){
    let table = '';
    if(searchMood == 'title'){
    for(let i = 0; i < dataPro.length;i++){
        if(dataPro[i].title.includes(value.toLowerCase())){
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discunt}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick ='updateData(${i})' id="update">update</button></td>
                <td><button onclick ='deletData(${i})' id="delete">delete</button></td>
            </tr> 
            `;
            }
    }
    
    }else{
        for(let i = 0; i < dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discunt}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick ='updateData(${i})' id="update">update</button></td>
                    <td><button onclick ='deletData(${i})' id="delete">delete</button></td>
                </tr> 
                `;
                }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}




