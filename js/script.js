var productName = document.getElementById("pName");
var productPrice = document.getElementById("pPrice");
var productCompany = document.getElementById("pCompany");
var productDescription = document.getElementById("pDesc");
var btn = document.getElementById("btn");//used for both adding and updating
var rowProducts = document.getElementById("productsBody");
var inputs = document.getElementsByClassName("form-control"); //used for clearForm function
var currentProduct; //used for updating the product in setForm function to know the index of the product
var products;
var searchInput = document.getElementById("searchInput");
var searchBody = document.getElementById("searchBody");

if(localStorage.getItem('products') == null)
{
    products = [];
}
else
{
    products = JSON.parse(localStorage.getItem('products'));
    displayProducts();
}

btn.addEventListener("click" , function(){

    if(btn.innerHTML == "Add product")
    {
        addProduct();
    }
    else
    {
        updateProduct();
    }
    displayProducts();
    clearForm();
})
searchInput.addEventListener("keyup",function(){ //real-time search

    search(searchInput.value);

})

function addProduct()
{
    var product = {name:productName.value , price:productPrice.value , company:productCompany.value , description:productDescription.value};
    products.push(product);
    localStorage.setItem('products',JSON.stringify(products));
}
function displayProducts()
{
    var row = "";
    for(var i = 0; i<products.length; i++)
    {
        row += `<div class=" col-lg-3 col-md-6 text-center">
        <div>
            <h3>`+products[i].name+`</h3>
            <p class=" text-dark">`+products[i].company+`</p>
            <p class="text-danger">`+products[i].price+`</p>
            <p class="text-info">`+products[i].description+`</p>
            <button onclick="deleteProduct(`+i+`)" class=" btn btn-outline-danger">delete</button>
            <a href="#formBeg" onclick="setForm(`+i+`)" class=" btn btn-outline-info">update</a>
        </div>
    </div>`
    }
    rowProducts.innerHTML = row;
}

function clearForm()
{
    for(var i = 0; i<inputs.length; i++)
    {
        inputs[i].value = "";
    }
}

function deleteProduct(id)
{
    products.splice(id);
    displayProducts();
    localStorage.setItem('products',JSON.stringify(products));
}

function setForm(id) //filling our inputs with products' values that user wants to update
{
    productName.value = products[id].name;
    productPrice.value = products[id].price;
    productCompany.value = products[id].company;
    productDescription.value = products[id].description;
    currentProduct = id;
    btn.innerHTML = "Update product";

}

function updateProduct()
{
    products[currentProduct].name = productName.value;
    products[currentProduct].price = productPrice.value;
    products[currentProduct].company = productCompany.value;
    products[currentProduct].description = productDescription.value;
    localStorage.setItem('products',JSON.stringify(products));
    btn.innerHTML = "Add product";
}

function search(term)
{
    var searchCols="";
    for(var i = 0; i<products.length; i++)
    {
        if(products[i].name.includes(term))
        {
            searchCols+= `<div class=" col-lg-3 col-md-6 text-center">
            <div>
                <h3>`+products[i].name+`</h3>
                <p class=" text-dark">`+products[i].company+`</p>
                <p class="text-danger">`+products[i].price+`</p>
                <p class="text-info">`+products[i].description+`</p>
            </div>
        </div>`
        }
    }
    if(term == "")
    {
        searchCols = "";
    }
    searchBody.innerHTML = searchCols;
}