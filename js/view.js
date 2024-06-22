(function () {
	window.app = window.app || {};
	window.app.View = {
		renderProduct: renderProduct,
		renderPagination: renderPagination,
		renderProductLength: renderProductLength,
		renderFilters: renderFilters,
	};

	/** create elements
	 *
	 * @param {String} tagname
	 * @param {Object} attribute
	 * @param {String | Array | Undefined} content
	 */
	function createElement(tagname, attribute, content) {
		var el = document.createElement(tagname);
		if (Object.keys(attribute).length !== 0) {
			for (var key in attribute) {
				el.setAttribute(key, attribute[key]);
			}
		}
		if (typeof content !== "undefined") {
			if (Array.isArray(content)) {
				for (var item of content) {
					if (item instanceof HTMLElement) {
						el.appendChild(item);
					} else {
						el.innerHTML += item;
					}
				}
			} else {
				if (content instanceof HTMLElement) {
					el.appendChild(content);
				} else {
					el.innerText = content;
				}
			}
		}
		return el;
	}

	/** render all products
	 *
	 * @param {String} productTitle
	 * @param {String} imgSrc
	 * @param {Number} price
	 * @param {Number} rankAverage
	 * @param {Number} rankCount
	 */
	function renderProduct(productTitle, imgSrc, price, rankAverage, rankCount) {
		return createElement("section", { class: "product" }, [
			createElement("div", { class: "cover-container" }, createElement("img", { class: "cover", src: imgSrc })),
			createElement("h3", { class: "title" }, productTitle),
			createElement("h5", { class: "rank" }, [
				createElement("i", { class: "rank-star fas fa-star" }),
				rankAverage,
				createElement("span", { class: "amount" }, `(${rankCount})`),
			]),
			createElement("h4", { class: "price" }, [price, createElement("span", { class: "unit" }, " تومان")]),
		]);
	}

	/** render pagination
	 *
	 * @param {number} totalItems
	 * @param {number} itemPerPage
	 * @param {number} currentActivePage
	 */
	function renderPagination(totalItems, itemPerPage, currentActivePage) {
		var pages = Math.ceil(totalItems / itemPerPage);
		var pageInsertionNode = document.querySelector(".pages");
		pageInsertionNode.innerHTML = "";
		for (var i = 0; i < pages; i++) {
			if (i + 1 === currentActivePage) {
				pageInsertionNode.appendChild(createElement("li", { class: "page-active" }, createElement("a", { href: "#", "data-page": i + 1 }, i + 1)));
			} else {
				pageInsertionNode.appendChild(createElement("li", {}, createElement("a", { href: "#", "data-page": i + 1 }, i + 1)));
			}
		}
	}

	/** count product length
	 *
	 * @param {number} totalItems
	 */
	function renderProductLength(totalItems) {
		document.querySelector(".products-count").innerText = `${totalItems} کالا`;
	}

	/** render filters (to sort)
	 *
	 * @param {String} activeFilter
	 */
	function renderFilters(activeFilter) {
		var filters = {
			mostViewed: "پربازدیدترین",
			mostSold: "پرفروش‌ترین",
			mostFavorite: "محبوب‌ترین",
			mostInexpensive: "ارزان‌ترین",
			mostExpensive: "گران‌ترین",
		};

		var filterListElement = document.querySelector(".rate-elements");
		filterListElement.innerHTML = "";

		for (var key in filters) {
			filterListElement.appendChild(
				createElement(
					"li",
					{
						class: activeFilter === key ? "rate-active" : "",
						"data-filter": key,
					},
					filters[key]
				)
			);
		}
	}
})();
