let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);

getUserShopping();
getHistoryShopping();


function getUserShopping() {
    if (currentUser !== null) {
        let idUser = currentUser.id;
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/users/${idUser}`,
            success: function (user) {
                let userShopping = `
                                        <h6 class="mb-2"> Họ và tên: ${user.name}</h6>
                                        <p>Email: ${user.email}</p>`
                $('#user_shopping').html(userShopping);
            }
        })
    }
}


function getHistoryShopping() {
    if (currentUser !== null) {
        let idUser = currentUser.id;
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/orders/user/${idUser}`,
            success: function (data) {
                let orders = data.content;
                let content = '';
                for (let i = 0; i < orders.length; i++) {
                    let id_list_food = "list" + i;
                    let id_total_price = "total_price" + i;
                    content += `<div class="bg-white card mb-4 order-list shadow-sm">

                                    <div class="gold-members p-4">
                                            <div class="media">
                                                <img class="mr-4" src="../img/3.jpg" alt="Generic placeholder image">
                                                <div class="media-body">
                                                    <span class="float-right text-info">${new Date(orders[i].createDate).getHours()}:${new Date(orders[i].createDate).getMinutes()} ${new Date(orders[i].createDate).getUTCDate()}/${new Date(orders[i].createDate).getUTCMonth() + 1}/${new Date(orders[i].createDate).getUTCFullYear()}
                                                    <i class="icofont-check-circled text-success"></i></span>
                                                    <p class="text-dark" id="${id_list_food}">
                                                    </p>
                                                    <hr>
                                                     <p class="mb-0 text-black text-primary pt-2">
                                                    <span class="text-black font-weight-bold" id="${id_total_price}"></span>
                                                    </p>
                                                </div>
                                            </div>
                                    </div>
                                </div>
`;
                    $.ajax({
                        type: 'GET',
                        url: `http://localhost:8080/carts/order/${orders[i].id}`,
                        success: function (carts) {
                            let total = 0;
                            let content2 = '';
                            for (let j = 0; j < carts.length; j++) {
                                content2 += `<p>${carts[j].food.name} : ${carts[j].quantity}</p>`;
                                $(`#${id_list_food}`).html(content2)
                                total += (carts[j].food.price - carts[j].food.salePrice + carts[j].food.serviceFee) * carts[j].quantity;
                            }
                            $(`#${id_total_price}`).html(`Tổng thanh toán: ${total}`);
                        }
                    })
                }
                $('#shopping_history').html(content);
            }
        })
    }
}

