// let idFood = new URL(location.href).searchParams.get("id");
//
// function detailFood() {
//     $.ajax({
//         type: 'GET',
//         url: `http://localhost:8080/images?id=${idFood}`,
//         success(image) {
//             let imageRestaurant = '';
//             for (let a = 0; a < 1; a++) {
//                 imageRestaurant = `<a href="detail restaurant.html?id=${image[a].food?.user?.restaurant?.id}"><img class="img-fluid mr-3 float-left" alt="osahan" src="http://localhost:8080/image/${image[a].food?.user?.restaurant?.img}"></a>`
//             }
//
//
//             let address = '';
//             for (let b = 0; b < 1; b++) {
//                 address = `<i class="icofont-location-pin">${image[b].food?.user?.restaurant?.address}</i> `
//             }
//
//
//             let timeOpen$timeClose = '';
//             for (let c = 0; c < 1; c++) {
//                 timeOpen$timeClose = `<button class="btn btn-success" type="button"><i class="icofont-clock-time"></i>Thời gian mở cửa: ${image[c].food?.user?.restaurant?.openTime}-${image[c].food?.user?.restaurant?.closeTime}
//                             </button>`
//             }
//
//             let address2 = '';
//             for (let d = 0; d < 1; d++) {
//                 address2 = `<p class="mb-3">
//                                         <span class="fa fa-location-arrow locationicon"></span>
//                                    ${image[d].food?.user?.restaurant?.address}</p>`
//             }
//
//             let price = '';
//             for (let e = 0; e < 1; e++) {
//                 price = `<p class="mb-2 text-black"><i class="icofont-email text-primary mr-2"></i> <a
//                                             href="https://thaotrinh.info/cdn-cgi/l/email-protection"
//                                             class="__cf_email__"
//                                             data-cfemail="97fef6faf8e4f6fff6f9d7f0faf6fefbb9f4f8fa">Giá: ${image[e].food?.price}VNĐ</a>
//                                     </p>`
//             }
//
//             let salePrice = ''
//             for (let f = 0; f < 1; f++) {
//                 salePrice = ` <a class="border-btn text-success mr-2" href="#"><i
//                                                 class="icofont-check-circled"></i>${image[f].food?.salePrice}% món ăn</a>`
//             }
//
//             let vat = '';
//             for (let g = 0; g < 1; g++) {
//                 vat = `<a class="border-btn text-success mr-2" href="#"><i
//                                                 class="icofont-check-circled"></i>${image[g].food?.serviceFee}%</a>`
//             }
//
//             let foodName = '';
//             for (let h = 0; h < 1; h++) {
//                 foodName += `${image[h].food?.name}`
//             }
//
//             let restaurantName = '';
//             for (let i = 0; i < 1; i++) {
//                 restaurantName = `<a href="detail restaurant.html?id=${image[i].food?.user?.restaurant?.id}">${image[i].food?.user?.restaurant?.name}</a>`
//             }
//
//
//             let imageFood = '';
//             for (let k = 0; k < 1; k++) {
//                 imageFood = `<img width="300" height="170" class="img-fluid" src="http://localhost:8080/image/${image[k].food?.img}">`
//             }
//
//             let otherImageFood = '';
//             for (let l = 0; l < image.length; l++) {
//                 otherImageFood += `<div class="item">
//                                             <div class="mall-category-item">
//                                                     <img class="img-fluid" src="http://localhost:8080/image/${image[l].name}">
//                                             </div>
//                                         </div>`
//             }
//
//
//             $('#image-restaurant').html(imageRestaurant);
//             $('#address').html(address);
//             $('#time').html(timeOpen$timeClose);
//             $('#restaurant-name').html(restaurantName);
//             $('#address2').html(address2);
//             $('#food-name').html(foodName);
//             $('#image-food').html(imageFood);
//             $('#other-image-food').html(otherImageFood);
//             $('#price').html(price);
//             $('#salePrice').html(salePrice);
//             $('#vat').html(vat);
//         }
//
//     })
// }

// detailFood();


function getCartFoods() {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let idUser = currentUser.id;
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/cartForm/${idUser}`,
        success: function (foods) {
            let content = `<h5 class="mb-1 text-white">Giỏ hàng</h5>
                    <p class="mb-4 text-white">${foods.length} sản phẩm</p>
                    <div class="bg-white rounded shadow-sm mb-2" id="id_cart_foods">`;
            let content2 = '';
            for (let i = 0; i < foods.length; i++) {
                let id = "food_" + i;

                content2 += `<div class="gold-members p-2 border-bottom row">
                            <div class="media col-6">
                                <div class="mr-2"><i class="icofont-ui-press text-danger food-item"></i></div>
                                <div class="media-body">
                                    <p class="mt-1 mb-0 text-black">${foods[i].food.name}</p>
                                </div>
                            </div>
                            <span class="count-number col-4">
                                    <button class="btn btn-outline-secondary  btn-sm left dec" onclick="getDownQuantityFoods(${foods[i].id})"> <i
                                            class="icofont-minus"></i> </button>
                                    <input class="count-number-input" type="text" value="${foods[i].quantity}" readonly="" id="${id}">
                                    <button class="btn btn-outline-secondary btn-sm right inc" onclick="getUpQuantityFoods(${foods[i].id})"> <i
                                            class="icofont-plus"></i> </button>
                                </span>
                            <p class="text-gray mb-0 col-2" >${foods[i].food.price}</p>
                        </div>`;
            }
            content += `</div>
                    <div class="mb-2 bg-white rounded p-2 clearfix">
                        <img class="img-fluid float-left" src="../img/wallet-icon.png">
                        <h6 class="font-weight-bold text-right mb-2">Tổng đơn: <span
                                class="text-danger" id="total_price"></span> vnđ</h6>
                        <h6 class="font-weight-bold text-right mb-2">Giảm giá: <span
                                class="text-danger" id="total_sale"></span> vnđ</h6>
                        <h6 class="font-weight-bold text-right mb-2">Thanh toán: <span
                                class="text-danger" id="price_sale"></span> vnđ</h6>
                    </div>
                    <a  class="btn btn-success btn-block btn-lg" onclick="getOrderFoods()">Đặt hàng <i
                            class="icofont-long-arrow-right"></i></a>`;
            $('#id_cart_total').html(content);
            $('#id_cart_foods').html(content2);


        }
    })
}

function getDownQuantityFoods(id) {
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/cartForm/down/${id}`,
        success: function () {
            getCartFoods();
            getTotalPrice();
        },
    })
}

function getUpQuantityFoods(id) {
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/cartForm/up/${id}`,
        success: function () {
            getCartFoods();
            getTotalPrice();
        }
    })
}

function getTotalPrice() {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let idUser = currentUser.id;
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/cartForm/${idUser}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (foods) {
            let quantity = 0;
            let totalPrice = 0;
            let totalSale = 0;
            for (let i = 0; i < foods.length; i++) {
                let id = "food_" + i;
                quantity = $(`#${id}`).val();
                totalPrice += foods[i].food.price * quantity;
                totalSale += foods[i].food.salePrice * quantity;
            }
            $('#total_price').html(totalPrice);
            $('#total_sale').html(totalSale);
            $('#price_sale').html(totalPrice - totalSale);
        }
    })
}

getCartFoods();
getTotalPrice();


function getOrderFoods() {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let idUser = currentUser.id;
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/orders/create?id=${idUser}`,
        success: function (order) {
            let idOrder = order.id;
            $.ajax({
                type: 'POST',
                url: `http://localhost:8080/carts/create?id=${idOrder}`,
                success: function () {
                    location.href = '/Module-4-FE/views/thanks.html';

                }
            })
        }
    })
}