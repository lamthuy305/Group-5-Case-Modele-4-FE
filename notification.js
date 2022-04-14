let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);// ep chuoi ve doi tuong

function showSuccessMessage(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        Toast.fire({
            icon: 'success',
            title: message
        })
    });
}

function showErrorMessage(message) {
    $(function () {
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        Toast.fire({
            icon: 'error',
            title: message
        })
    });
}

function logout() {
    localStorage.removeItem("currentUser")
}

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

function getAllOrder(page) {
    let q = $('#search').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/orders?q=${q}&page=${page}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let content = ``;
            let orders = data.content;
            for (let i = 0; i < orders.length; i++) {
                content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${orders[i].user.name}</td>
        <td>${orders[i].user.email}</td>
        <td>${orders[i].createDate}</td>
        <td><button class="btn btn-danger" data-target="#delete-order" data-toggle="modal"
                                        type="button" onclick="showDeleteOrder(${orders[i].id})"><i class="fa fa-trash"></i></button></td>
        </tr>`
            }
            $('#tableProduct').html(content);
            $('#displayPage').html(`<button class="btn btn-primary" id="first" onclick="getAllOrder(0)" style="margin-right: 10px">1</button><button class="btn btn-primary" id="backup" onclick="getAllOrder(${data.pageable.pageNumber}-1)">«</button>
             <span>Trang </span><span>${data.pageable.pageNumber + 1} / ${data.totalPages}</span>
                <button class="btn btn-primary" id="next" onclick="getAllOrder(${data.pageable.pageNumber}+1)">»</button>
                <button class="btn btn-primary" id="last" onclick="getAllOrder(${data.totalPages}-1)">${data.totalPages}</button>`);
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

function getAllImage(idFood) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/images?id=${idFood}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let content = ``;
            let images = data.content;
            for (let i = 0; i < images.length; i++) {
                content += `  
            <div class="card col-3" style="width: 18rem">
                <img src="http://localhost:8080/image/${images[i].name}" class="card-img-top" height="250px">
                <div class="card-body">
                    <button class="btn btn-danger" data-target="#delete-image" data-toggle="modal" onclick="formDeleteImage(${images[i].id})"><i class="fa fa-trash"></i></button>
                </div>
            </div>`
            }
            $('#list-image').html(content);
        }
    })
    event.preventDefault();
}

function getAllCategory() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/categories`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let categories = data.content;
            let content = `<option>Chọn danh mục sản phẩm</option>`
            for (let category of categories) {
                content += `<option value="${category.id}">${category.name}</option>`
            }
            $('#category').html(content);
        }
    })
}

