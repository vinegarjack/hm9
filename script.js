(function (){
    "use strict";
    const bodyTable = document.getElementById('data-table'); 
    const sortTable = document.getElementById('table-head');
    async  function dataFrom() {        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const userInfo = await response.json();
        bodyTable.innerHTML = userInfo.reduce((html, user) => 
                        html + `<tr id="${user.id}">
                                <td> ${user.name}</td>
                                <td> ${user.username}</td>
                                <td> ${user.email}</td>
                                <td> ${user.website}</td>
                            </tr>`,'');  
    }   

    dataFrom();
    
    console.log(sortTable);
    sortTable.addEventListener('click', sortByField);

    function sortByField(event){
        event.preventDefault();
        const sortField = event.target.getAttribute('class');
        console.log(sortField);
    }
})();