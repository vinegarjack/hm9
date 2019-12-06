(function (){
    "use strict";

    const bodyTable = document.getElementById('data-table'); 
    const sortTable = document.getElementById('table-head');
    const modalTarget = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal');

    //console.log(modalTarget);

    async  function dataFromServer(sortFieldDefault = 'id', order = 1) {        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const userInfo = await response.json();
        const arrUserInfo = Array.from(userInfo).sort((a,b)=>{ // sort array from json by parametr
            if (a[sortFieldDefault] > b[sortFieldDefault]) {return order}
            if (a[sortFieldDefault] < b[sortFieldDefault]) {return -(order)}
            return 0;
        });

        bodyTable.innerHTML = arrUserInfo.reduce((html, user) => 
                        html + `<tr id="${user.id}">
                                <td> ${user.name}</td>
                                <td> ${user.username}</td>
                                <td> ${user.email}</td>
                                <td> ${user.website}</td>
                            </tr>`,'');  
    }   

    dataFromServer();
    
    //console.log(sortTable);
    sortTable.addEventListener('click', sortByField);
    bodyTable.addEventListener('click', showModalWindow);
    modalClose.addEventListener('click',() =>{
        modalTarget.style.opacity = 0;
        modalTarget.style.zIndex = 10;
    })

    function sortByField(event){
        event.preventDefault();
        const sortField = event.target.getAttribute('class');
        //console.log(sortField);
        event.target.dataset.order = -(event.target.dataset.order);
        dataFromServer(sortField, event.target.dataset.order);
    }
    
    async function showModalWindow(event){
        event.preventDefault();
        const userId = event.target.parentNode.getAttribute('id');
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const userInfo = await response.json();
        const arrUserInfo = Array.from(userInfo).filter(user => user.id == userId); // как сделать чтобы сравниение было через ===
        const modalUserInfo = arrUserInfo[0];
        console.log(modalUserInfo);
        modalTarget.innerHTML = arrUserInfo.reduce((html, user) => 
                        html + `<p> Name : ${user.name} </p>
                                <p> Username : ${user.username} </p>
                                <p> Email : ${user.email} </p>
                                <p> Website : ${user.website} </p>
                                <p> Phone : ${user.phone} </p>
                                <p> Address:</p> 
                                <ul><li> City: ${user.address.city} </li>
                                <li> street: ${user.address.street} </li>
                                <li> suite: ${user.address.suite} </li>
                                <li> geo: lat :${user.address.geo.lat}, lng: ${user.address.geo.lng}</li>
                                <li> zipcode: ${user.address.zipcode} </li></ul>
                                <p> Company:</p>
                                <ul><li> name: ${user.company.name} </li>
                                <li> bs: ${user.company.bs} </li>
                                <li> catchPhrase: ${user.company.catchPhrase} </li></ul>
                                `,'');
                            
        modalTarget.style.opacity = 1;
        modalTarget.style.zIndex = 30;
    }

    
})();