function getBuyFood(id) {
    let currentUser = localStorage.getItem('currentUser');
    currentUser = JSON.parse(currentUser);
    let idUser = currentUser.id;
    let cartForm = {
        user: idUser,
        food: id,
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/cartForm',
        data: JSON.stringify(cartForm),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            showSuccessMessage('Thêm thành công vào giỏ hàng')
        },
        error:function (){
            showErrorMessage('Thêm lỗi')
        }
    })
}