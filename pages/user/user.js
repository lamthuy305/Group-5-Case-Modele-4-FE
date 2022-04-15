function getAllUser() {
    // let q = $('#search').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/users`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (users) {
            let content = ``;
            for (let i = 0; i < users.length; i++) {
                content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${users[i].name}</td>
        <td>${users[i].email}</td>
        <td><button class="btn btn-primary"
                                        type="button" onclick="unlockUser(${users[i].id})"><i class="fa fa-unlock"></i></button>
            <button class="btn btn-danger" 
                                        type="button" onclick="lockUser(${users[i].id})"><i class="fa fa-lock"></i></button></td>
        </tr>`
            }
            $('#tableUser').html(content);
        }
    })
    event.preventDefault();
}


// function deleteCategory(id) {
//     $.ajax({
//         type: 'DELETE',
//         url: `http://localhost:8080/categories/${id}`,
//         headers: {
//             'Authorization': 'Bearer ' + currentUser.token
//         },
//         success: function () {
//             getAllCategory(0);
//             showSuccessMessage('Xóa thành công!');
//         },
//         error: function () {
//             showErrorMessage('Xóa lỗi');
//         }
//     })
// }
//
// function showDeleteCategory(id) {
//     let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
//                     <button class="btn btn-danger" onclick="deleteCategory(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
//     $('#delete-category-button').html(content);
// }

$(document).ready(function () {
    if (currentUser != null) {
        getAllUser();
    } else {
        location.href = '../auth/login.html'
    }
})

function logout() {
    localStorage.removeItem("currentUser")
}

// function createNewProduct() {
//     let name = $('#name').val();
//     let image = $('#image');
//     let category = new FormData();
//     category.append('image', image.prop('files')[0]);
//     category.append('name', name);
//     $.ajax({
//         type: 'POST',
//         url: 'http://localhost:8080/categories',
//         data: category,
//         enctype: 'multipart/form-data',
//         processData: false,
//         contentType: false,
//         headers: {
//             'Authorization': 'Bearer ' + currentUser.token
//         },
//         success: function () {
//             getAllCategory();
//             showSuccessMessage('Tạo thành công!');
//         },
//         error: function () {
//             showErrorMessage('Tạo lỗi');
//         }
//     })
// }
//
// function showEditCategory(id) {
//
//     $.ajax({
//         type: "GET",
//         url: `http://localhost:8080/categories/${id}`,
//         headers: {
//             'Authorization': 'Bearer ' + currentUser.token
//         },
//         success: function (category) {
//             let name = $('#editName').val(category.name);
//             $('#imageCategory').html(`<img src="http://localhost:8080/image/${category.image}" height="140px" width="150px">`);
//
//             let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
//                     <button class="btn btn-primary" onclick="editCategory(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Chỉnh sửa</button>`;
//             $('#edit-form').html(content);
//
//         }
//     })
// }
//
// function editCategory(id) {
//     let name = $('#editName').val();
//     let image = $('#editImage')[0].files;
//     let category = new FormData();
//
//     if (image.length != 0) {
//         jQuery.each(image, function (i, file) {
//             category.append('image[]', file);
//         })
//     }
//     category.append('name', name);
//     $.ajax({
//         type: 'POST',
//         url: `http://localhost:8080/categories/${id}`,
//         data: category,
//         enctype: 'multipart/form-data',
//         processData: false,
//         contentType: false,
//         headers: {
//             'Authorization': 'Bearer ' + currentUser.token
//         },
//         success: function () {
//             getAllCategory();
//             showSuccessMessage('Sửa thành công!');
//         },
//         error: function () {
//             showErrorMessage('Sửa lỗi');
//         }
//     })
// }
