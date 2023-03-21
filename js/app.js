(function () {
    var productRoot = document.querySelector('.items-container');
    var currentPageNumber = 1;
    var availableFilters = {
        mostViewed: app.Repository.getMostViewedProductsByPage,
        mostSold: app.Repository.getMostSoldProductsByPage,
        mostFavorite: app.Repository.getMostFavoriteProductsByPage,
        mostInexpensive: app.Repository.getMostInexpensiveProductsByPage,
        mostExpensive: app.Repository.getMostExpensiveProductsByPage,
    };
    var currentActiveFilter = "mostViewed";
    var filterFunction = availableFilters[currentActiveFilter];


    /** render all items in page (products, pagination, filters) */
    function renderProductRoot(){
        productRoot.innerHTML = "";
        filterFunction(currentPageNumber).forEach(item => {
            productRoot.insertBefore(app.View.renderProduct(
                item.title, 
                item.img, 
                item.price,
                item.rankAverage,
                item.rankCount
                // fonte yekan khodesh adadaro be farsi tabdil mikone tarhe behtri dre
                // app.Utils.toPersianNumber(item.price), 
                // app.Utils.toPersianNumber(item.rankAverage),
                // app.Utils.toPersianNumber(item.rankCount)),
                ),
                productRoot.querySelector('.clearfix')
            );
        });
        app.View.renderPagination(app.products.length, 36, currentPageNumber);
        app.View.renderFilters(currentActiveFilter);
    }




    // get all products
    fetch('https://6419621129e7e36438fc113c.mockapi.io/shop/products')
        .then(response => response.json())
        .then(response => {
            app.products = response;
            renderProductRoot();
            app.View.renderProductLength(app.products.length);
    });
    
    // sort by filters
    document.querySelector('.rate-elements').addEventListener('click', function(e) {
        if(e.target.tagName.toLowerCase() === "li"){
            currentActiveFilter = e.target.dataset.filter;
            currentPageNumber = 1;
            filterFunction = availableFilters[currentActiveFilter];
            renderProductRoot();
        }
    });


    // change pages
    document.querySelector('.pages').addEventListener('click', function(e) {
        // e.preventDefault();
        if(e.target.tagName.toLowerCase() === 'a') {
            currentPageNumber = +e.target.dataset.page;
            renderProductRoot();
        }
    });
    document.querySelector('.pages-container').addEventListener('click', function(e) {
        // e.preventDefault();
        if(e.target.parentElement.classList.contains('page-start')){
            currentPageNumber = 1;
            renderProductRoot();
        }
        else if(e.target.parentElement.classList.contains('page-end')){
            currentPageNumber = Math.ceil(app.products.length / 36);
            renderProductRoot();
        }
    });


})();