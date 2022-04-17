let idCategory = new URL(location.href).searchParams.get("id");

function getAllFoodOfCategory() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/foods/category/${idCategory}`,
        success(listFoodOfCategory) {
            let content = '';
            for (let i = 0; i < listFoodOfCategory.length; i++) {
                content += `
                  <div class="col-md-4 col-sm-6 mb-4 pb-2">
                            <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                <div class="list-card-image">
                                    <div class="star position-absolute"><span class="badge badge-success"><i
                                                class="icofont-star"></i> 3.1 (300+)</span></div>
                                    <div class="favourite-heart text-danger position-absolute"><a href="detail.html"><i
                                                class="icofont-heart"></i></a></div>
                                    <div class="member-plan position-absolute"><span
                                            class="badge badge-dark">Promoted</span></div>
                                    <a href="detail food.html?id=${listFoodOfCategory[i].id}" onclick="detailFood()">
                                        <img src="http://localhost:8080/image/${listFoodOfCategory[i].img}">
                                    </a>
                                </div>
                                <div class="p-3 position-relative">
                                    <div class="list-card-body">
                                        <h6 class="mb-1"><a href="detail food.html?id=${listFoodOfCategory[i].id}" onclick="detailFood()" class="text-black">${listFoodOfCategory[i].name}</a></h6>
                                        <p class="text-gray mb-3">Cửa hàng: ${listFoodOfCategory[i].user?.restaurant?.name}</p>
                                        <p class="text-gray mb-3">Địa chỉ: ${listFoodOfCategory[i].user?.restaurant?.address}</p>
                                        <p class="text-gray mb-3 time"><span
                                                class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i
                                                    class="icofont-wall-clock"></i> 20–25 min</span> <span
                                                class="float-right text-black-50"> $250 FOR TWO</span></p>
                                    </div>
                                    <div class="list-card-badge">
                                        <span class="badge badge-success">OFFER</span> <small>65% off | Use Coupon
                                            OSAHAN50</small>
                                    </div>
                                </div>
                            </div>
                        </div>`
            }
            $('#list-food').html(content);
        }
    })
}
    getAllFoodOfCategory();
