// sort products
(function () {
	window.app = window.app || {};

	window.app.products = [];

	window.app.Repository = {
		getMostViewedProductsByPage: getMostViewedProductsByPage,
		getMostSoldProductsByPage: getMostSoldProductsByPage,
		getMostFavoriteProductsByPage: getMostFavoriteProductsByPage,
		getMostExpensiveProductsByPage: getMostExpensiveProductsByPage,
		getMostInexpensiveProductsByPage: getMostInexpensiveProductsByPage,
	};

	function getMostViewedProductsByPage(pageNumber) {
		return app.products.sort((a, b) => b.views - a.views).slice((pageNumber - 1) * 36, pageNumber * 36);
	}

	function getMostSoldProductsByPage(pageNumber) {
		return app.products.sort((a, b) => b.sold - a.sold).slice((pageNumber - 1) * 36, pageNumber * 36);
	}

	function getMostFavoriteProductsByPage(pageNumber) {
		return app.products.sort((a, b) => b.rankAverage - a.rankAverage).slice((pageNumber - 1) * 36, pageNumber * 36);
	}

	function getMostExpensiveProductsByPage(pageNumber) {
		return app.products.sort((a, b) => b.price - a.price).slice((pageNumber - 1) * 36, pageNumber * 36);
	}

	function getMostInexpensiveProductsByPage(pageNumber) {
		return app.products.sort((a, b) => a.price - b.price).slice((pageNumber - 1) * 36, pageNumber * 36);
	}
})();
