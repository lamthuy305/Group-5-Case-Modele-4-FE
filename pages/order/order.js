function getAllOrder(page) {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let idUser = currentUser.id;
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/orders/userid/${idUser}?&page=${page}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let orders = data.content;
            let content = ``;
            if (orders.length === 0 && q !== null) {
                content = '                <div class="col-md-12 text-center pt-5 pb-5">\n' +
                    '                    <img class="img-fluid" src="../../img/404.png" alt="404">\n' +
                    '                    <h1 class="mt-2 mb-2">Không tìm thấy</h1>\n' +
                    '                    <p>Uh-oh! Nội dung bạn tìm kiếm <br>không tồn tại. Mời bạn thử lại.</p>\n' +
                    '                    <a class="btn btn-primary btn-lg" href="/Module-4-FE/pages/order/order.html">Quay lại</a>\n' +
                    '                </div>'
                $('#table_order').hide();
                $('#error-404').html(content);

            } else {
                for (let i = 0; i < orders.length; i++) {
                    content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${orders[i].user.name}</td>
        <td>${orders[i].user.email}</td>
        <td>${new Date(orders[i].createDate).getHours()}:${new Date(orders[i].createDate).getMinutes()} ${new Date(orders[i].createDate).getUTCDate()}/${new Date(orders[i].createDate).getUTCMonth() + 1}/${new Date(orders[i].createDate).getUTCFullYear()}</td>
        <td><a href="/Module-4-FE/pages/cart/cart.html?id=${orders[i].id}">Xem chi tiết</a></td>
        <td><button class="btn btn-danger" data-target="#delete-order" data-toggle="modal"
                                        type="button" onclick="showDeleteOrder(${orders[i].id})"><i class="fa fa-trash"></i></button></td>
        </tr>`
                }
                $('#tableProduct').html(content);
                $('#displayPage').html(`<button class="btn btn-primary" id="first" onclick="getAllOrder(0)" style="margin-right: 10px">1</button><button class="btn btn-primary" id="backup" onclick="getAllOrder(${data.pageable.pageNumber}-1)"><</button>
             <span>Trang </span><span>${data.pageable.pageNumber + 1} / ${data.totalPages}</span>
                <button class="btn btn-primary" id="next" onclick="getAllOrder(${data.pageable.pageNumber}+1)">></button>
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
        }
    })
    event.preventDefault();
}

function deleteProduct(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/orders/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllOrder(0);
            showSuccessMessage('Xóa thành công!');
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteOrder(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
    $('#footer-delete').html(content);
}

$(document).ready(function () {
    if (currentUser != null) {
        getAllOrder();
    } else {
        location.href = '../auth/login.html'
    }
})
