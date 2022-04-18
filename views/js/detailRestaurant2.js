let idRestaurant = new URL(location.href).searchParams.get("id");

function detailRestaurant() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/restaurants/${idRestaurant}`,
        success (infoRestaurant) {
           let informationRestaurant  = ` <div class="container">
                <div class="row d-flex align-items-end">
                    <div class="col-md-8">
                        <div class="restaurant-detailed-header-left">
                            <img class="img-fluid mr-3 float-left" alt="osahan" src="http://localhost:8080/image/${infoRestaurant.img}">
                            <h2 class="text-white">${infoRestaurant.name}</h2>
                            <p class="text-white mb-1"><i class="icofont-location-pin"></i>${infoRestaurant.address}</p>
                            <p class="text-white mb-0"><i class="icofont-food-cart"></i> #banhtrang, #thitheo</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="restaurant-detailed-header-right text-right">
                            <button class="btn btn-success" type="button"><i class="icofont-clock-time">Thời gian mở cửa: ${infoRestaurant.openTime}-${infoRestaurant.closeTime}</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
            $('#infoRestaurant').html(informationRestaurant);
        }

    })

}

detailRestaurant(idRestaurant);