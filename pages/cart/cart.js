let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong
function getAllCart(page) {
    // let q = $('#search').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/carts?page=${page}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let content = ``;
            let carts = data.content;
            for (let i = 0; i < carts.length; i++) {
                content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${carts[i].order.id}</td>
        <td>${carts[i].food.name}</td>
        <td>${carts[i].quantity}</td>
     
        <td><button class="btn btn-primary" data-target="#edit-cart" data-toggle="modal"
                                        type="button" onclick="showEditCart(${carts[i].id})"><i class="fa fa-edit"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-cart" data-toggle="modal"
                                        type="button" onclick="showDeleteCart(${carts[i].id})"><i class="fa fa-trash"></i></button></td>
        </tr>`
            }
            $('#tableCart').html(content);
            $('#displayPage').html(`<button class="btn btn-primary" id="first" onclick="getAllCart(0)" style="margin-right: 10px">1</button><button class="btn btn-primary" id="backup" onclick="getAllCart(${data.pageable.pageNumber}-1)">«</button>
             <span>Trang </span><span>${data.pageable.pageNumber + 1} / ${data.totalPages}</span>
                <button class="btn btn-primary" id="next" onclick="getAllCart(${data.pageable.pageNumber}+1)">»</button>
                <button class="btn btn-primary" id="last" onclick="getAllCart(${data.totalPages}-1)">${data.totalPages}</button>`);
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

function createNewCart() {
    let order = $('#order').val();
    let food = $('#food').val();
    let quantity = $('#quantity').val();
    let cart = {
        order : order,
        food: food,
        quantity: quantity
    }
    order.append('order', order);
    food.append('food', food);
    cart.append('quantity', quantity);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/carts',
        data: JSON.stringify(cart),
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllCart();
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


function deleteCart(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/carts/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllCart(0);
            showSuccessMessage('Xóa thành công!');
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteCart(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteCart(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
    $('#footer-delete').html(content);
}


$(document).ready(function () {
    if (currentUser != null) {
        getAllCart();
    } else {
        location.href = '/Module-4-FE/pages/auth/login.html'
    }
})

function editCart(id) {
    let name = $('#editName').val();
    let quantity = $('#editQuantity').val();
    let cart = {
        name: name,
        quantity: quantity
    };

    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/carts/${id}`,
        data: JSON.stringify(cart),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            showSuccessMessage('Sửa thành công!');
            getAllCart(0);
        },
        error: function () {
            showErrorMessage('Sửa lỗi');
        }
    })
}

function showEditCart(id) {

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/carts/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (cart) {
            $('#editName').val(cart.name);
            $('#editQuantiy').val(cart.quantity);
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
                    if (cart.category != null) {
                        content = `<option value="${cart.category.id}">${cart.category.name}</option>`;
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