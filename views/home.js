getRestaurant();
getAllCategory();

function getAllCategory() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories/foodCount',
        success: function (category) {
            let content = '';
            for (let i = 0; i < category.length; i++) {
                content += `  <div class="item">
                            <div class="osahan-category-item">
                                <a href="listFoodOfCategory.html?id=${category[i].id}">
                                    <img class="img-fluid" src="http://localhost:8080/image/${category[i].image}" alt="ảnh sản phẩm">
                                    <h6>${category[i].name}</h6>
                                    <p>${category[i].totalFood}</p>
                                </a>
                            </div>
                        </div>
`
            }
            $('#list-category').html(content);
        }

    })
}


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
                let restaurant = '<a class="nav-link" href="/Module-4-FE/pages/restaurant/restaurant.html">Restaurant<span class="sr-only"></span></a>\n'
                let login_logout = '<a class="nav-link" href="/Module-4-FE/pages/auth/login.html" onclick="logout()">Đăng xuất<span class="sr-only"></span></a>'
                let msg_cart = '<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"\n' +
                    '                           aria-haspopup="true" aria-expanded="false">\n' +
                    '                            <i class="fas fa-shopping-basket"></i> Giỏ hàng\n' +
                    '                            <span class="badge badge-success">5</span>\n' +
                    '                        </a>\n' +
                    '                        <div class="dropdown-menu dropdown-cart-top p-0 dropdown-menu-right shadow-sm border-0">\n' +
                    '                            <div class="dropdown-cart-top-body border-top p-4">\n' +
                    '                                <p class="mb-2"><i class="icofont-ui-press text-danger food-item"></i> Chicken Tikka\n' +
                    '                                    Sub\n' +
                    '                                    12" (30 cm) x 1 <span class="float-right text-secondary">314.000</span></p>\n' +
                    '                                <p class="mb-2"><i class="icofont-ui-press text-success food-item"></i> Corn & Peas\n' +
                    '                                    Salad x 1 <span class="float-right text-secondary">209.000</span></p>\n' +
                    '                                <p class="mb-2"><i class="icofont-ui-press text-success food-item"></i> Veg Seekh\n' +
                    '                                    Sub 6"\n' +
                    '                                    (15 cm) x 1 <span class="float-right text-secondary">133.000</span></p>\n' +
                    '                                <p class="mb-2"><i class="icofont-ui-press text-danger food-item"></i> Chicken Tikka\n' +
                    '                                    Sub\n' +
                    '                                    12" (30 cm) x 1 <span class="float-right text-secondary">314.000</span></p>\n' +
                    '                                <p class="mb-2"><i class="icofont-ui-press text-danger food-item"></i> Corn & Peas\n' +
                    '                                    Salad\n' +
                    '                                    x 1 <span class="float-right text-secondary">209.000</span></p>\n' +
                    '                            </div>\n' +
                    '                            <div class="dropdown-cart-top-footer border-top p-4">\n' +
                    '                                <p class="mb-0 font-weight-bold text-secondary">Tổng tiền <span\n' +
                    '                                        class="float-right text-dark">499.000</span></p>\n' +
                    '                                <!-- <small class="text-info">Extra charges may apply</small> -->\n' +
                    '                            </div>\n' +
                    '                            <div class="dropdown-cart-top-footer border-top p-2">\n' +
                    '                                <a class="btn btn-success btn-block btn-lg" href="checkout.html"> Thanh toán</a>\n' +
                    '                            </div>\n' +
                    '                        </div>'
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


