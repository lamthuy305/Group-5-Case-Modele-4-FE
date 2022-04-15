$(document).ready(function () {
    if (currentUser != null) {
        getRestaurant();
    } else {
        location.href = '../auth/login.html'
    }
})

function getRestaurant() {
    let id = currentUser.id;
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/restaurants/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (restaurant) {
            let content = ``;
            content += `  
        <tr>
        <td>${restaurant.name}</td>
        <td><img src="http://localhost:8080/image/${restaurant.img}" height="140px" width="150px"></a></td>
        <td>${restaurant.address}</td>
        <td>${new Date(restaurant.openTime).getUTCDate()}/${new Date(restaurant.openTime).getUTCMonth() + 1}/${new Date(restaurant.openTime).getUTCFullYear()}</td>
        <td>${new Date(restaurant.closeTime).getUTCDate()}/${new Date(restaurant.closeTime).getUTCMonth() + 1}/${new Date(restaurant.closeTime).getUTCFullYear()}</td>`
            $('#tableRestaurant').html(content);
        },
    })
}

function editFormRestaurant() {
    let id = currentUser.id;
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/restaurants/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (restaurant) {
            $('#name').val(restaurant.name);
            $('#imgRestaurant').html(`<img src="http://localhost:8080/image/${restaurant.img}" height="140px" width="150px">`);
            $('#address').val(restaurant.address);
            $('#openTime').val(restaurant.openTime);
            $('#closeTime').val(restaurant.closeTime);

            let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editRestaurant(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Chỉnh sửa</button>`;
            $('#edit-form').html(content);
        }
    })
}

function editRestaurant(id) {
    let name = $("#name").val();
    let address = $("#address").val();
    let openTime = $("#openTime").val();
    let closeTime = $("#closeTime").val();
    let img = $('#img')[0].files;
    let restaurant = new FormData();
    restaurant.append('name', name);
    restaurant.append('address', address);
    restaurant.append('openTime', openTime);
    restaurant.append('closeTime', closeTime);
    if (img.length != 0) {
        jQuery.each(img, function (i, file) {
            restaurant.append('img[]', file);
        });
    }
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/restaurants/${id}`,
        data: restaurant,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getRestaurant();
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('Sửa lỗi');
        }
    })
    event.preventDefault();

}