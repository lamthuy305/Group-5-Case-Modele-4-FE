let idFood = new URL(location.href).searchParams.get("id");

function detailFood() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/images?id=${idFood}`,
        success(image) {
            let imageRestaurant = '';
            for (let a = 0; a < 1; a++) {
                imageRestaurant = `<a href="detail restaurant2.html?id=${image[a].food?.user?.restaurant?.id}"><img class="img-fluid mr-3 float-left" alt="osahan" src="http://localhost:8080/image/${image[a].food?.user?.restaurant?.img}"></a>`
            }


            let address = '';
            for (let b = 0; b < 1; b++) {
                address = `<i class="icofont-location-pin">${image[b].food?.user?.restaurant?.address}</i> `
            }


            let timeOpen$timeClose = '';
            for (let c = 0; c < 1; c++) {
                timeOpen$timeClose = `<button class="btn btn-success" type="button"><i class="icofont-clock-time"></i>Thời gian mở cửa: ${image[c].food?.user?.restaurant?.openTime}-${image[c].food?.user?.restaurant?.closeTime}
                            </button>`
            }

            let address2 = '';
            for (let d = 0; d < 1; d++) {
                address2 = `<p class="mb-3">
                                        <span class="fa fa-location-arrow locationicon"></span>
                                   ${image[d].food?.user?.restaurant?.address}</p>`
            }

            let price = '';
            for (let e = 0; e < 1; e++) {
                price = `<p class="mb-2 text-black"><i class="icofont-email text-primary mr-2"></i> <a
                                            href="https://thaotrinh.info/cdn-cgi/l/email-protection"
                                            class="__cf_email__"
                                            data-cfemail="97fef6faf8e4f6fff6f9d7f0faf6fefbb9f4f8fa">Giá: ${image[e].food?.price}VNĐ</a>
                                    </p>`
            }

            let salePrice = ''
            for (let f = 0; f < 1; f++) {
                salePrice = ` <a class="border-btn text-success mr-2" href="#"><i
                                                class="icofont-check-circled"></i>${image[f].food?.salePrice}% món ăn</a>`
            }

            let vat = '';
            for (let g = 0; g < 1; g++) {
                vat = `<a class="border-btn text-success mr-2" href="#"><i
                                                class="icofont-check-circled"></i>${image[g].food?.serviceFee}%</a>`
            }

            let foodName = '';
            for (let h = 0; h < 1; h++) {
                foodName += `${image[h].food?.name}`
            }

            let restaurantName = '';
            for (let i = 0; i < 1; i++) {
                restaurantName = `<a href="detail restaurant2.html?id=${image[i].food?.user?.restaurant?.id}">${image[i].food?.user?.restaurant?.name}</a>`
            }


            let imageFood = '';
            for (let k = 0; k < 1; k++) {
                imageFood = `<img width="300" height="170" class="img-fluid" src="http://localhost:8080/image/${image[k].food?.img}">`
            }

            let otherImageFood = '';
            for (let l = 0; l < image.length; l++) {
                otherImageFood += `<div class="item">
                                            <div class="mall-category-item">
                                                    <img class="img-fluid" src="http://localhost:8080/image/${image[l].name}">                                           
                                            </div>
                                        </div>`
            }




            $('#image-restaurant').html(imageRestaurant);
            $('#address').html(address);
            $('#time').html(timeOpen$timeClose);
            $('#restaurant-name').html(restaurantName);
            $('#address2').html(address2);
            $('#food-name').html(foodName);
            $('#image-food').html(imageFood);
            $('#other-image-food').html(otherImageFood);
            $('#price').html(price);
            $('#salePrice').html(salePrice);
            $('#vat').html(vat);
        }

    })
}

detailFood();