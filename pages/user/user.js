function getAllUser() {
    // let q = $('#search').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/users`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (users) {
            let content = ``;
            for (let i = 0; i < users.length; i++) {
                let idUnlock = "unlock" + i;
                let idLock = "lock" + i;
                content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${users[i].name}</td>
        <td>${users[i].email}</td>
        <td><button class="btn btn-primary"
                                        type="button" onclick="lockUser(${users[i].id})" id="${idUnlock}"><i class="fa fa-unlock"></i></button>
            <button class="btn btn-danger" 
                                        type="button" onclick="lockUser(${users[i].id})" id="${idLock}"><i class="fa fa-lock"></i></button></td>
        </tr>`


            }
            $('#tableUser').html(content);

            for (let i = 0; i < users.length; i++) {
                let idUnlock = "#unlock" + i;
                let idLock = "#lock" + i;
                if (users[i].active) {
                    $(`${idLock}`).hide();
                } else {
                    $(`${idUnlock}`).hide();
                }
            }
        }
    })
    event.preventDefault();
}


function lockUser(id) {
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/users/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllUser();
            showSuccessMessage('Thành công!');
        },
        error: function () {
            showErrorMessage('Lỗi');
        }
    })
}


$(document).ready(function () {
    if (currentUser != null) {
        getAllUser();
    } else {
        location.href = '../auth/login.html'
    }
})

function logout() {
    localStorage.removeItem("currentUser")
}

function getUserManagement() {
    if (currentUser !== null) {
        let idUser = currentUser.id;
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/users/${idUser}`,
            success: function (user) {
                let content = '                        <a href="/Module-4-FE/pages/user/user.html" class="nav-link">\n' +
                    '                            <i class="nav-icon fas fa-th"></i>\n' +
                    '                            <p>\n' +
                    '                                Quản lý người dùng\n' +
                    '                            </p>\n' +
                    '                        </a>'
                let roles = user.roles;
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].id === 1) {
                        $('#user_management').html(content);
                    }
                }
            }
        });
    }
}
getUserManagement();