function registerCTV() {
    let id = currentUser.id;
    let name = $("#name").val();
    let address = $("#address").val();
    let openTime = $("#openTime").val();
    let closeTime = $("#closeTime").val();
    let img = $('#image');
    let restaurant = new FormData();
    restaurant.append('name',name);
    restaurant.append('address',address);
    restaurant.append('openTime',openTime);
    restaurant.append('closeTime', closeTime);
    restaurant.append('img',img.prop('files')[0]);
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/registerCTV?id=${id}`,
        data:restaurant,
        enctype: 'multipart/form-data',
        processData: false,
        contentType:false,
        headers: {
            'Authorization': 'Bearer ' + currentUser.token
        },
        success: function () {
            showSuccessMessage('Đăng ký thành công thành CTV!');
            location.href="/Module-4-FE/views/home.html";
        },
        error: function () {
            showErrorMessage('Đăng ký lỗi');
        }
    })
    event.preventDefault();

}


$(document).ready(function () {
    $('#quickForm').validate({
        rules: {
            name: {
                required: true,
            },
            address: {
                required: true,
            },
            openTime:{
                required:true,
            },
            closeTime: {
                required:true,
            }
        },

        messages: {
            name: {
                required: "vui lòng nhập tên",
            },
            address: {
                required: "vui lòng nhập địa chỉ",
            },
            openTime:{
                required:"vui lòng nhập giờ mở bán",
            },
            closeTime: {
                required:"vui lòng nhập giờ đóng cửa",
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
    $("#registerCTV").click(function () {
        if ($("#quickForm").valid()) {
            registerCTV();
        }
    });
});


