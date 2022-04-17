function getAllFoodMaxSalePrice() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/foods/maxSale',
        success(list) {
            let content = '';
            for (let i = 0; i < list.length; i++) {
                content += `<div class="col-md-3 col-sm-6 mb-4">
                    <div class="list-card bg-white rounded overflow-hidden position-relative shadow-sm">
                        <div class="list-card-image">
                            <div class="favourite-heart text-danger position-absolute"><a href="#"><i
                                        class="icofont-heart"></i></a></div>
                            <div class="member-plan position-absolute"><span class="badge badge-dark">Promoted</span>
                            </div>
                            <a href="detail food.html?id=${list[i].id}">
                                <img src="http://localhost:8080/image/${list[i].img}" class="img-fluid item-img">
                            </a>
                        </div>
                        <div class="p-3 position-relative">
                            <div class="list-card-body">
                                <h6 class="mb-1"><a href="detail food.html?id=${list[i].id}" class="text-black">${list[i].name}</a></h6>
                                <p class="text-gray mb-2">P. Bình Trị Đông, Bình Tân, TP. HCM</p>
                                <p class="text-gray mb-3 time"><span
                                    class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i
                                        class="icofont-wall-clock"></i> 20–25 min</span> <span
                                    class="float-right text-black-50"> 250.00O</span></p>
                            </div>
                            <div class="list-card-badge">
                                <span class="badge badge-success">Giảm</span> <small>${list[i].salePrice}% | Coupon
                                    C1121G1</small>
                            </div>
                        </div>
                    </div>
                </div>`
            }
            $('#list-max-sale-price-food').html(content);
        }
    })
}

getAllFoodMaxSalePrice();

