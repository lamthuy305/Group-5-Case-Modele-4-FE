function getAllCategory() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories/foodCount',
        success: function (category) {
            let content = '';
            for (let i = 0; i < category.length; i++) {
                content += `  <div class="item">
                            <div class="osahan-category-item">
                                <a href="listFoodOfCategory.html?id=${category[i].id}">
                                    <img class="img-fluid" src="http://localhost:8080/image/${category[i].image}" alt="ảnh sản phẩm">
                                    <h6>${category[i].name}</h6>
                                    <p>${category[i].totalFood}</p>
                                </a>
                            </div>
                        </div>
`
            }
            $('#list-category').html(content);
        }

    })
}

getAllCategory();

