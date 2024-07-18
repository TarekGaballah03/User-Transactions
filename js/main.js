let data = document.getElementById("data");
let customersData = [];
    async function getCustomers(){
        try {
        let response = await fetch ('http://localhost:3000/customers',{ method: 'GET' , headers: {'Content-Type': 'application/json'}} ) ;
        let data = await response.json();
        customersData = data;
        displayCustomers(customersData);
     }
    catch (error) {
    console.log(error);
}
}
async function getTransactions(customerId,CustomerName) {
    try {
        let response = await fetch(`http://localhost:3000/transactions?customer_id=${customerId}`, { method: 'GET' });
        let data = await response.json();
        let customerTransactions = data.filter(transaction => transaction.customer_id === customerId);
        displayTransactions(customerTransactions,CustomerName);
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}
async function displayCustomers(customersData){
    let string =`
    <h1 class="text-center text-success">Users List</h1>
    <div class="text-center bg-light p-2 border-bottom"> 
         <div  class="row gy-2">
    <div class="col-4">
                        <h6 class="fw-bold fs-5">ID</h6>
                    </div>
                    <div class="col-4">
                        <h6 class="fw-bold fs-5">Name</h6>
                    </div>
                    <div class="col-4">
                        <h6 class="fw-bold fs-5">More Details</h6>
                    </div></div></div>
    `;
    for(let i =0 ; i<customersData.length;i++){
        string+=`
        <div class="text-center bg-light p-2 border-bottom"> 
         <div  class="row gy-2">
        <div class="col-4">
                        <h6 class="">${customersData[i].id}</h6>
                    </div>
                    <div class="col-4">
                        <h6 class="">${customersData[i].name}</h6>
                    </div>
                    <div class="col-4">
                    <button onclick="getTransactions(${customersData[i].id},  '${customersData[i].name}')" class="btn btn-success">User Details</button>
                    </div></div></div>
        
        `;
    }
    data.innerHTML = string;
}
async function displayTransactions(transactions, customerName) {
    let string = `
        <h1 class="text-center text-success">User Transactions for ${customerName}</h1>
        <i onclick="getCustomers()" class="back fas fa-chevron-left position-fixed pointer top-0 start-0 p-4 fs-4 "> Back</i>
    `;
    transactions.forEach(transaction => {
        string += `
            <div class="row gy-2">
                <div class="col-4">
                    <h6>Transaction ID: ${transaction.id}</h6>
                </div>
                <div class="col-4">
                    <h6>Amount: ${transaction.amount}</h6>
                </div>
                <div class="col-4">
                    <h6>Date: ${transaction.date}</h6>
                </div>
            </div>
            <hr>
        `;
    });
        data.innerHTML = string;

}
getCustomers();

