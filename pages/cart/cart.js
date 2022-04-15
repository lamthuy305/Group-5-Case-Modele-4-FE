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
     
       
        <td style="text-align: center"><button class="btn btn-danger" data-target="#delete-cart" data-toggle="modal"
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
        getAllCart(0);
    } else {
        location.href = '/Module-4-FE/pages/auth/login.html'
    }
})

function logout() {
    localStorage.removeItem("currentUser")
}
