function getAllCategory() {
    let q = $('#search').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/categories?q=${q}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (categories) {
            let content = ``;
            if (categories.length === 0 && q !== null) {
                content = '                <div class="col-md-12 text-center pt-5 pb-5">\n' +
                    '                    <img class="img-fluid" src="../../img/404.png" alt="404">\n' +
                    '                    <h1 class="mt-2 mb-2">Không tìm thấy</h1>\n' +
                    '                    <p>Uh-oh! Nội dung bạn tìm kiếm <br>không tồn tại. Mời bạn thử lại.</p>\n' +
                    '                    <a class="btn btn-primary btn-lg" href="/Module-4-FE/pages/category/category.html">Quay lại</a>\n' +
                    '                </div>'

                $('#table_category').hide();
                $('#error-404').html(content);

            } else {
                for (let i = 0; i < categories.length; i++) {
                    content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${categories[i].name}</td>
        <td><img src="http://localhost:8080/image/${categories[i].image}" height="140px" width="150px"></a></td>
        <td><button class="btn btn-primary" data-target="#edit-category" data-toggle="modal"
                                        type="button" onclick="showEditCategory(${categories[i].id})"><i class="fa fa-edit"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-category" data-toggle="modal"
                                        type="button" onclick="showDeleteCategory(${categories[i].id})"><i class="fa fa-trash"></i></button></td>
        </tr>`
                }
                $('#tableCategory').html(content);
            }
        }
    })
    event.preventDefault();
}


function deleteCategory(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/categories/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllCategory(0);
            showSuccessMessage('Xóa thành công!');
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteCategory(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-danger" onclick="deleteCategory(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
    $('#delete-category-button').html(content);
}

$(document).ready(function () {
    if (currentUser != null) {
        getAllCategory();
    } else {
        location.href = '../auth/login.html'
    }
})

function logout() {
    localStorage.removeItem("currentUser")
}

function createNewProduct() {
    let name = $('#name').val();
    let image = $('#image');
    let category = new FormData();
    category.append('image', image.prop('files')[0]);
    category.append('name', name);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/categories',
        data: category,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllCategory();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi');
        }
    })
}

function showEditCategory(id) {

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/categories/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (category) {
            let name = $('#editName').val(category.name);
            $('#imageCategory').html(`<img src="http://localhost:8080/image/${category.image}" height="140px" width="150px">`);

            let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                    <button class="btn btn-primary" onclick="editCategory(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Chỉnh sửa</button>`;
            $('#edit-form').html(content);

        }
    })
}

function editCategory(id) {
    let name = $('#editName').val();
    let image = $('#editImage')[0].files;
    let category = new FormData();

    if (image.length != 0) {
        jQuery.each(image, function (i, file) {
            category.append('image[]', file);
        })
    }
    category.append('name', name);
    $.ajax({
        type: 'POST',
        url: `http://localhost:8080/categories/${id}`,
        data: category,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllCategory();
            showSuccessMessage('Sửa thành công!');
        },
        error: function () {
            showErrorMessage('Sửa lỗi');
        }
    })
}
