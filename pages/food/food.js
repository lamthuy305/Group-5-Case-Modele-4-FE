function createNewProduct() {
    let name = $('#name').val();
    let description = $('#description').val();
    let img = $('#img');
    let price = $('#price').val();
    let salePrice = $('#salePrice').val();
    let serviceFee = $('#serviceFee').val();
    let images = $('#images')[0].files;
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


// function showCreateFood() {
//     $.ajax({
//         type: 'GET',
//         url: 'http://localhost:8080/categories',
//         headers: {
//             'Authorization': 'Bearer ' + currentUser.token
//         },
//         success: function (categories) {
//             categories = categories.content;
//             let content = `<option>Chọn danh mục sản phẩm</option>`
//             for (let category of categories) {
//                 content += `<option value="${category.id}">${category.name}</option>`
//             }
//             $('#category').html(content);
//         }
//     })
// }


function deleteProduct(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/products/${id}`,
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

function editProduct(id) {
    let name = $('#editName').val();
    let price = $('#editPrice').val();
    let description = $('#editDescription').val();
    let image = $('#editImage');
    let category = $('#editCategory').val();
    let product = new FormData();
    product.append('name', name);
    product.append('price', price);
    product.append('description', description);
    product.append('category', category);
    product.append('image', image.prop('files')[0]);

    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/products/${id}`,
        data: product,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllFood(0);
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('Sửa lỗi');
        }
    })
}

function showEditProduct(id) {

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (product) {
            $('#editName').val(product.name);
            $('#editPrice').val(product.price);
            $('#editDescription').val(product.description);
            // $('#editImage').val(food.image);

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/categories',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.token
                },
                success: function (categories) {
                    categories = categories.content;
                    let content = '';
                    if (product.category != null) {
                        content = `<option value="${product.category.id}">${product.category.name}</option>`;
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
                    <button class="btn btn-primary" onclick="editProduct(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Chỉnh sửa</button>`;
            $('#edit-form').html(content);

        }
    })
}

function logout() {
    localStorage.removeItem("currentUser")
}