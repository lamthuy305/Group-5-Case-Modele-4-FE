function getAllTag(page) {
    let q = $('#search').val();
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/tags?q=${q}&page=${page}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let content = ``;
            let tags = data.content;
            for (let i = 0; i < tags.length; i++) {
                content += `  
        <tr>
        <td>${i + 1}</td>
        <td>${tags[i].name}</td>
        <td>${tags[i].slug}</td>
        <td>${tags[i].countViews}</td>
        <td><button class="btn btn-primary" data-target="#edit-tag" data-toggle="modal"
                                        type="button" onclick="showEditTag(${tags[i].id})"><i class="fa fa-edit"></i></button></td>
        <td><button class="btn btn-danger" data-target="#delete-tag" data-toggle="modal"
                                        type="button" onclick="showDeleteTag(${tags[i].id})"><i class="fa fa-trash"></i></button></td>
        </tr>`
            }
            $('#tableProduct').html(content);
            $('#displayPage').html(`<button class="btn btn-primary" id="first" onclick="getAllTag(0)" style="margin-right: 10px">1</button><button class="btn btn-primary" id="backup" onclick="getAllTag(${data.pageable.pageNumber}-1)"><</button>
             <span>Trang </span><span>${data.pageable.pageNumber + 1} / ${data.totalPages}</span>
                <button class="btn btn-primary" id="next" onclick="getAllTag(${data.pageable.pageNumber}+1)">></button>
                <button class="btn btn-primary" id="last" onclick="getAllTag(${data.totalPages}-1)">${data.totalPages}</button>`);
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


function createNewTag() {
    let name = $('#name').val();
    let slug = $('#slug').val();
    let tag = {
        name : name,
        slug : slug
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/tags',
        data: JSON.stringify(tag),
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllTag();
            showSuccessMessage('Tạo thành công!');
        },
        error: function () {
            showErrorMessage('Tạo lỗi');
        }
    })
}

function deleteTag(id) {
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/tags/${id}`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            getAllTag(0);
            showSuccessMessage('Xóa thành công!');
        },
        error: function () {
            showErrorMessage('Xóa lỗi');
        }
    })
}

function showDeleteTag(id) {
    let content = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                   <button class="btn btn-danger" onclick="deleteTag(${id})" type="button" aria-label="Close" class="close" data-dismiss="modal">Xóa</button>`;
    $('#footer-delete').html(content);
}

$(document).ready(function () {
    if (currentUser != null) {
        getAllTag();
    } else {
        location.href = '/Module-4-FE/pages/auth/login.html'
    }
})
function editTag(id) {
    let name = $('#editName').val();
    let slug = $('#editSlug').val();
    let tag = {
        name : name,
        slug : slug
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:8080/tags/${id}`,
        data: JSON.stringify(tag),
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
        },
        success: function () {
            getAllTag();
            showSuccessMessage('Cập nhât thành công!');
        },
        error: function () {
            showErrorMessage('Cập nhật lỗi');
        }
    })
}

function showEditTag(id) {
    // let title = 'Chỉnh sửa thông tin sản phẩm';
    let footer = `<button class="btn btn-secondary" data-dismiss="modal" type="button">Đóng</button>
                   <button class="btn btn-primary" onclick="editTag(${id})" type="button">Cập nhật</button>`;
    // $('#edit-tag-title').html(title);
    $('#edit-tag-footer').html(footer);
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/tags/${id}`,
        success: function (tag) {
            $('#editName').val(tag.name);
            $('#editSlug').val(tag.slug);
        }
    })
}

