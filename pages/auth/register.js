function register() {
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let confirmPassword = $('#comfirmPassword').val();
    let user = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/register',
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            location.href = 'login.html';
        },
        error: function () {
            showErrorMessage('Xảy ra lỗi!')
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
            email: {
                required: true,
            },
            password: {
                required: true,
                valid_password: true,
            },
            confirmPassword: {
                required: true,
                confirm_password: true,
            }
        },

        messages: {
            name: {
                required: "Nhập tên của bạn",
            },
            email: {
                required: "Nhập email",
            },
            password: {
                required: "Nhập password",
                valid_password: "Mật khẩu phải ít nhất 6 ký tự gồm 1 số và chữ cái"
            },
            confirmPassword: {
                required: "Nhập lại password",
                confirm_password: "Mật khẩu không giống nhau",
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
    $("#register").click(function () {
        if ($("#quickForm").valid()) {
            register();
        }
    });
});

jQuery.validator.addMethod('valid_password', function (value) {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return value.trim().match(regex);
});

jQuery.validator.addMethod('confirm_password', function () {
    let password = $('#password').val();
    let confirmPassword = $('#comfirmPassword').val();
    if (confirmPassword === password) {
        return true;
    }
    return false;
});


