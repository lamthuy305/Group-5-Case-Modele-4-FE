let idFood = new URL(location.href).searchParams.get("id");

function createNewProduct() {
    let name = $('#name').val();
    let description = $('#description').val();
    let img = $('#img');
    let price = $('#price').val();
    let salePrice = $('#salePrice').val();
    let serviceFee = $('#serviceFee').val();
    let images = $('#images')[0].files;
    let user = currentUser.id;
    let category = $('#category').val();
    let food = new FormData();
    food.append('name', name);
    food.append('description', description);
    food.append('img', img.prop('files')[0]);
    food.append('price', price);
    food.append('salePrice', salePrice);
    food.append('serviceFee', serviceFee);
    jQuery.each(images, function (i, file) {
        food.append('images[]', file);
    });
    food.append('user', user);
    food.append('category', category);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/foods',
        data: food,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllFood();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi');
        }
    })
}


function deleteProduct(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/foods/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllFood(0);
            showSuccessMessage('Xóa thành công!');
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteProduct(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
    $('#footer-delete').html(content);
}


$(document).ready(function () {
    if (currentUser != null) {
        getAllFood();
    } else {
        location.href = '/Module-4-FE/pages/auth/login.html'
    }
})


function editFood(id) {
    let name = $('#editName').val();
    let description = $('#editDescription').val();
    let img = $('#editImg')[0].files;
    let price = $('#editPrice').val();
    let salePrice = $('#editSalePrice').val();
    let serviceFee = $('#editServiceFee').val();
    let user = currentUser.id;
    let category = $('#editCategory').val();
    let food = new FormData();
    food.append('name', name);
    food.append('description', description);
    if (img.length != 0) {
        jQuery.each(img, function (i, file) {
            food.append('img[]', file);
        });
    }
    food.append('price', price);
    food.append('salePrice', salePrice);
    food.append('serviceFee', serviceFee);
    food.append('user', user);
    food.append('category', category);
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/foods/${id}`,
        data: food,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllFood();
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('sửa lỗi');
        }
    })
}

function showEditFood(id) {

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/foods/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (food) {
            let name = $('#editName').val(food.name);
            let description = $('#editDescription').val(food.description);
            $('#imgFood').html(`<img src="http://localhost:8080/image/${food.img}" height="140px" width="150px">`);
            let price = $('#editPrice').val(food.price);
            let salePrice = $('#editSalePrice').val(food.salePrice);
            let serviceFee = $('#editServiceFee').val(food.serviceFee);
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/categories',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.token
                },
                success: function (data) {
                    categories = data.content;
                    let content = '';
                    if (food.category != null) {
                        content = `<option value="${food.category.id}">${food.category.name}</option>`;
                    } else {
                        content = `<option>Chọn danh mục sản phẩm</option>`;
                    }
                    for (let category of categories) {
                        content += `<option value="${category.id}">${category.name}</option>`
                    }
                    $('#editCategory').html(content);
                }
            })

            let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editFood(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Chỉnh sửa</button>`;
            $('#edit-form').html(content);

        }
    })
}

function logout() {
    localStorage.removeItem("currentUser")
}