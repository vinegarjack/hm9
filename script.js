(function (){
    "use strict";

    const bodyTable = document.getElementById('data-table'); 
    const sortTable = document.getElementById('table-head');
    const modalTarget = document.querySelector('.modal');
    //const modalClose = document.querySelector('.modal');
    const table = document.querySelector('.container');

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

    dataFromServer(); //render table with data from server
    
    //console.log(sortTable);
    sortTable.addEventListener('click', sortByField);
    bodyTable.addEventListener('click', showModalWindow);

    modalTarget.addEventListener('click',() =>{
        modalTarget.style.opacity = 0;
        modalTarget.style.zIndex = 10;
        table.style.pointerEvents = 'all';
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
        modalTarget.innerHTML =`<p> Name : ${modalUserInfo.name} </p>
                                <p> Username : ${modalUserInfo.username} </p>
                                <p> Email : ${modalUserInfo.email} </p>
                                <p> Website : ${modalUserInfo.website} </p>
                                <p> Phone : ${modalUserInfo.phone} </p>
                                <p> Address:</p> 
                                <ul><li> City: ${modalUserInfo.address.city} </li>
                                <li> street: ${modalUserInfo.address.street} </li>
                                <li> suite: ${modalUserInfo.address.suite} </li>
                                <li> geo: lat :${modalUserInfo.address.geo.lat}, lng: ${modalUserInfo.address.geo.lng}</li>
                                <li> zipcode: ${modalUserInfo.address.zipcode} </li></ul>
                                <p> Company:</p>
                                <ul><li> name: ${modalUserInfo.company.name} </li>
                                <li> bs: ${modalUserInfo.company.bs} </li>
                                <li> catchPhrase: ${modalUserInfo.company.catchPhrase} </li></ul>
                                `;
                            
        modalTarget.style.opacity = 1;
        modalTarget.style.zIndex = 30;
        table.style.pointerEvents = 'none';
    }

    
})();