let idFood = new URL(location.href).searchParams.get("id");

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
            if (foods.length !== 0 && q !== null) {
                for (let i = 0; i < foods.length; i++) {
                    content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${foods[i].name}</td>
            <td><a href="/Module-4-FE/pages/image/image.html?id=${foods[i].id}" ><img src="http://localhost:8080/image/${foods[i].img}" height="140px" width="150px"></a></td>
        <td>${foods[i].description}</td>
        <td>${foods[i].category == null ? '' : foods[i].category.name}</td>
        <td>${foods[i].price}</td>
        <td>${foods[i].salePrice}</td>
        <td>${foods[i].serviceFee}</td>
        <td>${new Date(foods[i].dayCreate).getUTCDate()}/${new Date(foods[i].dayCreate).getUTCMonth() + 1}/${new Date(foods[i].dayCreate).getUTCFullYear()}</td>
        <td>${new Date(foods[i].dayChange).getUTCDate()}/${new Date(foods[i].dayChange).getUTCMonth() + 1}/${new Date(foods[i].dayChange).getUTCFullYear()}</td>
        <td><button class="btn btn-primary" data-target="#edit-product" data-toggle="modal"
                                        type="button" onclick="showEditFood(${foods[i].id})"><i class="fa fa-edit"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-product" data-toggle="modal"
                                        type="button" onclick="showDeleteProduct(${foods[i].id})"><i class="fa fa-trash"></i></button></td>
        </tr>`
                }
                $('#tableProduct').html(content);
                $('#displayPage').html(`<button class="btn btn-primary" id="first" onclick="getAllFood(0)" style="margin-right: 10px">1</button><button class="btn btn-primary" id="backup" onclick="getAllFood(${data.pageable.pageNumber}-1)"><</button>
             <span>Trang </span><span>${data.pageable.pageNumber + 1} / ${data.totalPages}</span>
                <button class="btn btn-primary" id="next" onclick="getAllFood(${data.pageable.pageNumber}+1)">></button>
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
            } else {
                location.href = '/Module-4-FE/pages/food/food-error-404.html'
            }
        }
    })
    event.preventDefault();
}


function createNewProduct() {
    let food = new FormData();
    let name = $('#name').val();
    let description = $('#description').val();
    let img = $('#img');
    let price = $('#price').val();
    let salePrice = $('#salePrice').val();
    let serviceFee = $('#serviceFee').val();
    let images = $('#images')[0].files;
    let user = currentUser.id;
    let category = $('#category').val();

    let checkbox = document.getElementsByName('tag');
    let tag = '';
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {
            tag += checkbox[i].value;
            if (i !== checkbox.length - 1) {
                tag += ',';
            }
        }
    }

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
    food.append('tags', tag);
    // food.append('tag', tag)
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
        location.href = '../auth/login.html'
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
            $('#editName').val(food.name);
            $('#editDescription').val(food.description);
            $('#imgFood').html(`<img src="http://localhost:8080/image/${food.img}" height="140px" width="150px">`);
            $('#editPrice').val(food.price);
            $('#editSalePrice').val(food.salePrice);
            $('#editServiceFee').val(food.serviceFee);
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/categories',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.token
                },
                success: function (categories) {
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
