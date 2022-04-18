getAllCategory();
getFoodTopBuy();
getFoodTopSale();

function getAllCategory() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories/foodCount',
        success: function (categories) {
            let content = '';
            for (let i = 0; i < categories.length; i++) {
                content += `  <div class="item">
                            <div class="osahan-category-item">
                                <a href="listFoodOfCategory.html?id=${categories[i].category_id}">
                                    <img class="img-fluid" src="http://localhost:8080/image/${categories[i].image}" alt="ảnh sản phẩm">
                                    <h6>${categories[i].name}</h6>
                                    <p>${categories[i].totalFood}</p>
                                </a>
                            </div>
                        </div>
`
            }
            $('#list-category').html(content);
        }

    })
}

function getFoodTopBuy() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/foods/topbuy',
        success: function (foods) {
            let content = ''
            for (let i = 0; i < foods.length; i++) {
                let address = foods[i].user.restaurant.address;
                let img = foods[i].img;
                let name = foods[i].name;
                let price = foods[i].price;
                let salePrice = foods[i].salePrice;
                content += `<div class="item">
                            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                            <div class="list-card-image">
                                <a href="#">
                                    <img src="http://localhost:8080/image/${img}" class="img-fluid item-img">
                                </a>
                            </div>
                            <div class="p-3 position-relative">
                                <div class="list-card-body">
                                    <h6 class="mb-1"><a href="detail.html" class="text-black">${name}</a></h6>
                                    <p class="text-gray mb-3">${address}</p>
                                    <p class="text-gray mb-3 time"><span
                                            class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i
                                            class="icofont-wall-clock"></i> 20–25 min</span> <span
                                            class="float-right text-black-50">${price}</span></p>
                                </div>
                                <div class="list-card-badge">
                                    <span class="badge badge-success">Giảm</span> <small>${salePrice}</small>
                                </div>
                                <button class="favourite-heart text-danger position-absolute" type="button" onclick="getBuyFood(${foods[i].id})"><i
                                        class="fa fa-shopping-cart"></i></button>
                            </div>
                            </div>
                        </div>`;
            }
            $('#id_top_buy_food').html(content);
        }
    })
}


function getFoodTopSale() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/foods/topsale',
        success: function (foods) {
            let content = ''
            for (let i = 0; i < foods.length; i++) {
                let address = foods[i].user.restaurant.address;
                let img = foods[i].img;
                let name = foods[i].name;
                let price = foods[i].price;
                let salePrice = foods[i].salePrice;
                content += `<div class="item">
                            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                            <div class="list-card-image">
                                <a href="#">
                                    <img src="http://localhost:8080/image/${img}" class="img-fluid item-img">
                                </a>
                            </div>
                            <div class="p-3 position-relative">
                                <div class="list-card-body">
                                    <h6 class="mb-1"><a href="detail.html" class="text-black">${name}</a></h6>
                                    <p class="text-gray mb-3">${address}</p>
                                    <p class="text-gray mb-3 time"><span
                                            class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i
                                            class="icofont-wall-clock"></i> 20–25 min</span> <span
                                            class="float-right text-black-50">${price}</span></p>
                                </div>
                                <div class="list-card-badge">
                                    <span class="badge badge-success">Giảm</span> <small>${salePrice}</small>
                                </div>
                                <button class="favourite-heart text-danger position-absolute" type="button" onclick="getBuyFood(${foods[i].id})"><i
                                        class="fa fa-shopping-cart"></i></button>
                            </div>
                            </div>
                        </div>`;
            }
            $('#id_top_sale_food').html(content);
        }
    })
}


function findAllFoodByName() {
    let q = $('#search').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/foods?q=${q}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let foods = data.content
            let content = `
    <div class="container">
        <div class="section-header text-center">
            <h2>Kết quả tìm kiếm</h2>
            <p>Những món ngon nhất, nhiều ưu đãi đang được mọi người quan tâm</p>
            <span class="line"></span>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="owl-carousel owl-carousel-four owl-theme" id="id_search_food">

                </div>
            </div>
        </div>
    </div>`;
            let content2 = '';
            for (let i = 0; i < foods.length; i++) {
                let address = foods[i].user.restaurant.address;
                let img = foods[i].img;
                let name = foods[i].name;
                let price = foods[i].price;
                let salePrice = foods[i].salePrice;
                content += `<div class="item">
                            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                            <div class="list-card-image">
                                <a href="#">
                                    <img src="http://localhost:8080/image/${img}" class="img-fluid item-img">
                                </a>
                            </div>
                            <div class="p-3 position-relative">
                                <div class="list-card-body">
                                    <h6 class="mb-1"><a href="detail.html" class="text-black">${name}</a></h6>
                                    <p class="text-gray mb-3">${address}</p>
                                    <p class="text-gray mb-3 time"><span
                                            class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i
                                            class="icofont-wall-clock"></i> 20–25 min</span> <span
                                            class="float-right text-black-50">${price}</span></p>
                                </div>
                                <div class="list-card-badge">
                                    <span class="badge badge-success">Giảm</span> <small>${salePrice}</small>
                                </div>
                            </div>
                            </div>
                        </div>`;
            }
            $('#id_search_food').html(content2);
            $('#id_search').html(content);
        }
    })
}

$(document).ready(() => {
    $('#btn-search-food').click(() => {
        findAllFoodByName();
    });
});


