let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
function getAllFood(page) {
    let q = $('#search').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/foods?q=${q}&page=${page}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let content = ``;
            let foods = data.content;
            for (let i = 0; i < foods.length; i++) {
                content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${foods[i].name}</td>
        <td><img src="http://localhost:8080/image/${foods[i].img}" height="140px" width="150px"></td>
        <td>${foods[i].description}</td>
        <td>${foods[i].price}</td>
        <td>${foods[i].salePrice}</td>
        <td>${foods[i].serviceFee}</td>
        <td>${foods[i].dayCreate}</td>
        <td>${foods[i].dayChange}</td>
        <td><button class="btn btn-primary" data-target="#edit-product" data-toggle="modal"
                                        type="button" onclick="showEditProduct(${foods[i].id})"><i class="fa fa-edit"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-product" data-toggle="modal"
                                        type="button" onclick="showDeleteProduct(${foods[i].id})"><i class="fa fa-trash"></i></button></td>
        </tr>`
            }
            $('#tableProduct').html(content);
            $('#displayPage').html(`<button class="btn btn-primary" id="first" onclick="getAllFood(0)" style="margin-right: 10px">1</button><button class="btn btn-primary" id="backup" onclick="getAllFood(${data.pageable.pageNumber}-1)">«</button>
             <span>Trang </span><span>${data.pageable.pageNumber + 1} / ${data.totalPages}</span>
                <button class="btn btn-primary" id="next" onclick="getAllFood(${data.pageable.pageNumber}+1)">»</button>
                <button class="btn btn-primary" id="last" onclick="getAllFood(${data.totalPages}-1)">${data.totalPages}</button>`);
            //điều kiện bỏ nút previous
            if (data.pageable.pageNumber === 0) {
                $("#backup").hide();
                $("#first").hide();
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                $("#next").hide();
                $("#last").hide();
            }
        }
    })
    event.preventDefault();
}

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
            // $('#editImage').val(product.image);

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