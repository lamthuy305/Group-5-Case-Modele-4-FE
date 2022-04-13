let idFood = new URL(location.href).searchParams.get("id");
$(document).ready(function () {
    if (currentUser != null) {
        getAllImage(idFood);
    } else {
        location.href = '/Module-4-FE/pages/auth/login.html'
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
