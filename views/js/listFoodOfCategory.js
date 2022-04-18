let idCategory = new URL(location.href).searchParams.get("id");

function getAllFoodOfCategory(page) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/foods/category/${idCategory}?page=${page}`,
        success: function (data) {
            let foods = data.content;
            let content = '';
            for (let i = 0; i < foods.length; i++) {
                content += `<div class="col-md-4 col-sm-6 mb-4 pb-2">
                            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                <div class="list-card-image">
                                    <div class="star position-absolute"><span class="badge badge-success"><i
                                                class="icofont-star"></i> 4.5 (300+)</span></div>

                                    <a href="/Module-4-FE/views/detail%20food%202.html?id=${foods[i].id}">
                                        <img src="http://localhost:8080/image/${foods[i].img}" class="img-fluid item-img">
                                    </a>
                                </div>
                                <div class="p-3 position-relative">
                                    <div class="list-card-body">
                                        <h6 class="mb-1"><a href="detail.html" class="text-black">${foods[i].name}</a></h6>
                                        <p class="text-gray mb-3">${foods[i].user.restaurant.address}</p>
                                        <p class="text-gray mb-3 time"><span
                                                class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i
                                                    class="icofont-wall-clock"></i> 20–25 min</span> <span
                                                class="float-right text-black-50">${foods[i].price}</span></p>
                                    </div>
                                    <div class="list-card-badge">
                                        <span class="badge badge-success">Giảm giá</span><small>${foods[i].salePrice}</small>
                                    </div>
                                <button class="favourite-heart text-danger position-absolute" type="button" onclick="getBuyFood(${foods[i].id})"><i
                                        class="fa fa-shopping-cart"></i></button>
                                </div>
                            </div>
                        </div>
`;
            }
            $('#list-food').html(content);
        }
    })
}

getAllFoodOfCategory();
