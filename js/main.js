// проверко на мобильные устройства
isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	},
};
window.onload = function () {
	document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth >= 320 && isMobile.any()) {
			if (targetElement.classList.contains("menu__arrow") || targetElement.classList.contains("menu__link")) {
				targetElement.closest(".menu__item").classList.toggle("hover");
			}

			if (!targetElement.closest(".menu__item") && document.querySelectorAll(".menu__item.hover").length > 0) {
				document.querySelectorAll(".menu__item.hover").forEach((el) => {
					el.classList.remove("hover");
				});
			}
		}
		if (targetElement.classList.contains("search-form__icon")) {
			document.querySelector(".search-form").classList.toggle("active");
			console.log("11`1");
		}
		if (!targetElement.closest(".search-form") && document.querySelector(".search-form.active")) {
			document.querySelector(".search-form.active").classList.remove("active");
			console.log("222");
		}
		if (targetElement.closest(".btn-menu") ) {
			document.querySelector(".btn-menu").classList.toggle("active");
			document.querySelector(".menu__body").classList.toggle("menu__body--active");
			console.log("23332");
		}
	}
};

// ! спойлер
// const spollers = document.querySelectorAll("[data-spollers]");
// if (spollers.length > 0) {
// 	// ? Получение обычных спойлеров
// 	const spollerRegular = Array.from(spollers).filter(function (item) {
// 		// console.log(item.dataset.spollers);
// 		return !item.dataset.spollers.split(",")[0];
// 	});
// 	// ? Инициализация обычных спойлеров
// 	if (spollerRegular.length > 0) {
// 		initSpollers(spollerRegular);
// 	}
// 	// ? Получение  спойлеров с медиа запросами
// 	const spollerMedia = Array.from(spollers).filter(function (item) {
// 		// console.log(item.dataset.spollers);
// 		return item.dataset.spollers.split(",")[0];
// 	});
// 	// ? инициализация спойлеров с медиа запросами
// 	if (spollerMedia.length > 0) {
// 		const breakpointsArray = [];
// 		spollerMedia.forEach((item) => {
// 			const params = item.dataset.spollers;
// 			const breakpoint = {};
// 			const paramsArray = params.split(",");
// 			breakpoint.value = paramsArray[0];
// 			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
// 			breakpoint.item = item;
// 			breakpointsArray.push(breakpoint);
// 		});

// 		// ? Получаем уникальные бррейкпоинты
// 		let mediaQueries = breakpointsArray.map((item) => {
// 			return `( ${item.type}-width: ${item.value}px),${item.value},${item.type}`;
// 		});
// 		mediaQueries = mediaQueries.filter((item, index, self) => {
// 			// console.log(index,item);
// 			//  console.log(self.indexOf(item));
// 			return self.indexOf(item) === index;
// 		});
// 		//? Работаем с каждым брейкпоинтом
// 		mediaQueries.forEach((breakpoint) => {
// 			const paramsArray = breakpoint.split(",");
// 			const mediaBreakpoint = paramsArray[1];
// 			const mediaType = paramsArray[2];
// 			const matchMedia = window.matchMedia(paramsArray[0]);
// 			//? Обьекты с нужными условиями
// 			const spollersArray = breakpointsArray.filter((item) => {
// 				if (item.value === mediaBreakpoint && item.type === mediaType) {
// 					return true;
// 				}
// 			});
// 			//? событие
// 			matchMedia.addEventListener("change", () => {
// 				initSpollers(spollersArray, matchMedia);
// 			});
// 			initSpollers(spollersArray, matchMedia);
// 		});
// 	}
// 	//? Инициализация
// 	function initSpollers(spollersArray, matchMedia = false) {
// 		// spollersArray = [1, 2, 3, 4, 5];
// 		spollersArray.foreach(spollersBlock => {
// 			console.log(spollersBlock);
			
// 			// spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
// 			// if (matchMedia.matches || !matchMedia) {
// 			// 	spollersBlock.classList.add("init");
// 			// 	initSpollerBody(spollersBlock);
// 			// 	spollersBlock.addEventListener("click", setSpollerAction);
// 			// } else {
// 			// 	spollersBlock.classList.remove("init");
// 			// 	initSpollerBody(spollersBlock, false);
// 			// 	spollersBlock.removeEventListener("click", setSpollerAction);
// 			// }
// 		});
// 	}
// }
// //? Работа с компонентом
// function initSpollerBody(spollersBlock, hideSpollerBody = true) {
// 	const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
// 	if (spollerTitles.length > 0) {
// 		spollerTitles.forEach((spollerTitle) => {
// 			if (hideSpollerBody) {
// 				spollerTitle.removeAttribute("tabindex");
// 				if (!spollerTitles.classList.contains("active")) {
// 					spollerTitle.nextElementSibling.hidden = true;
// 				} else {
// 					spollerTitle.setAttribute("tabindex", "-1");
// 					spollerTitle.nextElementSibling.hidden = false;
// 				}
// 			}
// 		});
// 	}
// }
