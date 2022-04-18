let idFood = new URL(location.href).searchParams.get("id");

function getAllImage(idFood) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/images?id=${idFood}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (images) {
            let content = ``;
            if (images.length !== 0 ){
                for (let i = 0; i < images.length; i++) {
                    content += `  
            <div class="card col-3" style="width: 18rem">
                <img src="http://localhost:8080/image/${images[i].name}" class="card-img-top" height="250px">
                <div class="card-body">
                    <button class="btn btn-danger" data-target="#delete-image" data-toggle="modal" onclick="formDeleteImage(${images[i].id})"><i class="fa fa-trash"></i></button>
                </div>
            </div>`
                }
            }else {
               content='                <div class="col-md-12 text-center pt-5 pb-5">\n' +
                   '                    <img class="img-fluid" src="../../img/404.png" alt="404">\n' +
                   '                    <h1 class="mt-2 mb-2">Không tìm thấy</h1>\n' +
                   '                    <p>Uh-oh! Nội dung bạn tìm kiếm <br>không tồn tại. Mời bạn thử lại.</p>\n' +
                   '                    <a class="btn btn-primary btn-lg" href="/Module-4-FE/pages/food/food.html">Quay lại</a>\n' +
                   '                </div>'

            }
            $('#list-image').html(content);

        }
    })
    event.preventDefault();
}


$(document).ready(function () {
    if (currentUser != null) {
        getAllImage(idFood);
    } else {
        location.href = '../auth/login.html'
    }
})


function formDeleteImage(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteImage(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
    $('#footer-delete').html(content);
}


function deleteImage(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/images/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllImage(idFood);
            showSuccessMessage('Xóa thành công!');
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function createNewImage() {
    let images = $('#images')[0].files;
    let imagesNew = new FormData();

    jQuery.each(images, function (i, file) {
        imagesNew.append('images[]', file);
    });
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/images/${idFood}`,
        data: imagesNew,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllImage(idFood);
            showSuccessMessage('Thêm thành công!');
        },
        error: function () {
            showErrorMessage('Thêm lỗi');
        }
    })
}
