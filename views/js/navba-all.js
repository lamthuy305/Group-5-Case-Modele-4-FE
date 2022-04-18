getRestaurant();
getUserAdmin();

function getRestaurant() {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    if (currentUser !== null) {
        let idUser = currentUser.id;
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/users/${idUser}`,
            success: function (user) {
                let content = `<a class="nav-link" href="#">${user.name}<span class="sr-only"></span></a>\n`;
                let restaurant = '<a class="nav-link" href="/Module-4-FE/pages/restaurant/restaurant.html">Quản lý cửa hàng<span class="sr-only"></span></a>\n'
                let login_logout = '<a class="nav-link" href="/Module-4-FE/pages/auth/login.html" onclick="logout()">Đăng xuất<span class="sr-only"></span></a>'
                let msg_cart =
                    '<a class="nav-link" href="/Module-4-FE/views/detail%20food.html">\n' +
                    '<i class="fas fa-shopping-basket"></i> Giỏ hàng\n' +
                    '</a>'
                $('#login_logout').html(login_logout);
                $('#name').html(content);
                $('#id_cart').html(msg_cart);
                if (user.restaurant !== null) {
                    $('#id_restaurant').html(restaurant);
                    $('#check_restaurant').hide();
                }
            }
        });
    }
}


function getUserAdmin() {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let idUser = currentUser.id;
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/users/${idUser}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (user) {
            let roles = user.roles;
            let content = '';
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].id === 1) {
                    content += '<a class="nav-link" href="/Module-4-FE/pages/user/user.html">Quản lý tài khoản<span class="sr-only"></span></a>\n';
                    $('#id_restaurant').hide();
                }
            }
            $('#id_user').html(content);

        }
    })
}
