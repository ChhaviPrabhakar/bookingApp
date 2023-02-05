const form = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const mobInput = document.getElementById('mob');
const emailInput = document.getElementById('email');
const userList = document.getElementById('userList');

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    const obj = {
        name: nameInput.value,
        mob: mobInput.value,
        email: emailInput.value
    }
    try {
        const res = await axios
            .post('http://localhost:4000/user/add-user', obj)
        addUserOnScreen(res.data.newUserDetail);
        console.log(res);
    } catch(err) {
        document.body.innerHTML += "<h4> Something went wrong! </h4>";
        console.log(err);
    }

    nameInput.value = '';
    mobInput.value = '';
    emailInput.value = '';
}

function addUserOnScreen(user) {
    let parentNode= document.getElementById('userList');
    let childHTML= `<li id=${user.id}> ${user.name} : ${user.email} 
    <button onclick= deleteUser('${user.id}')> Delete </button>
    <button onclick= editUser('${user.name}','${user.mob}','${user.email}','${user.id}')> Edit </button>
    </li>`;
    parentNode.innerHTML += childHTML;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios
            .get('http://localhost:4000/user/get-user')
        console.log(res);
        for (var i = 0; i < res.data.allUsers.length; i++) {
            addUserOnScreen(res.data.allUsers[i]);
        }
    } catch(err) {
        console.log(err);
    }
});

async function deleteUser(userId) {
    try {
        const res = await axios
            .delete(`http://localhost:4000/user/delete-user/${userId}`)
        removeUserFromScreen(userId);
        document.body.innerHTML += "<h4> User Destroyed! </h4>";
    } catch(err) {
        console.log(err);
    }
}

function removeUserFromScreen(userId)
{
    let parentNode= document.getElementById('userList');
    childNodeToBedeleted= document.getElementById(userId);
    if(childNodeToBedeleted)
    {
        parentNode.removeChild(childNodeToBedeleted);
    }
}

// function editUser(name, mob, emailID, userId) {
//     document.getElementById('name').value = name;
//     document.getElementById('mob').value = mob;
//     document.getElementById('email').value = emailID;
//     deleteUser(userId);
// }