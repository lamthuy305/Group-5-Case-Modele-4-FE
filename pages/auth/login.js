function login() {
    let email = $('#email').val();
    let password = $('#password').val();
    let user = {
        email: email,
        password: password
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/login',
        data: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            location.href = '/Module-4-FE/pages/food/food.html'
        },
        error: function () {
            $("#error").html('Tài khoản hoặc mật khẩu không chính xác')
        }
    });
    event.preventDefault();
}

$(document).ready(function () {
    $('#quickForm').validate({
        rules: {
            email: {
                required: true,
            },
            password: {
                required: true,
                valid_password: true
            },
        },

        messages: {
            email: {
                required: "Nhập email đăng nhập",
            },
            password: {
                required: "Nhập password",
                valid_password: "Mật khẩu phải ít nhất 6 ký tự gồm 1 số và chữ cái"
            },
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
    $("#login").click(function () {
        if ($("#quickForm").valid()) {
            login();
        }
    });
});

jQuery.validator.addMethod('valid_password', function (value) {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return value.trim().match(regex);
});