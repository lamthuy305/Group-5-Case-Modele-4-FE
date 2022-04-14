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
                required: "nhập đê",
            },
            address: {
                required: "nhập đê",
            },
            openTime:{
                required:"nhập đê",
            },
            closeTime: {
                required:"nhập đê",
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
