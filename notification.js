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

function drawCategory() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/categories`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (categories) {
            // let categories = data.content;
            let content = `<option>Chọn danh mục sản phẩm</option>`
            for (let category of categories) {
                content += `<option value="${category.id}">${category.name}</option>`
            }
            $('#category').html(content);
        }
    })
}

function drawTag() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/tags`,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function (data) {
            let tags = data.content;
            let content = ``
            for (let i = 0; i < tags.length; i++) {
                let a = i + 1;
                let id = "tag" + a;
                let name = tags[i].name;
                let value = tags[i].id;
                content += `
                        <div class="form-check col-4">
                            <input class="form-check-input" type="checkbox" name="tag" value="${value}">
                            <label class="form-check-label">
                                ${name}
                            </label>
                        </div>`
            }
            $('#checkTag').html(content);
        }
    })

}

