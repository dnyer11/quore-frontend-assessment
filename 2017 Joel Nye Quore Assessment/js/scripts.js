(function($) {
	var page = {
		listItems: $('.tasks > .task'),
		viewItems: $('.task-content'),
		imageOverlay: $('.image-overlay'),

		/**
		 * Handle Task Click Events
		 */
		initEventListeners: function() {
			// Handle Task Click from List
			page.listItems.on('click', 'a', function(e) {
				e.preventDefault();
				var self = $(this),
					li = self.closest('li'),
					idx = page.listItems.index(li);

				li.siblings('.active').removeClass('active');
				li.addClass('active');
				$('.no-tasks').hide();
				page.viewItems.hide();
				$(page.viewItems.get(idx)).show();
			});

			// Handle Task Close for Mobile
			page.viewItems.on('click', 'a.close', function(e) {
				e.preventDefault();
				var self = $(this),
					taskContent = self.closest('.task-content');

				taskContent.hide();
			});

			// Handle Task Image Enlarge
			$('.photos').on('click', 'a', function() {
				var self = $(this),
					image = self.find('img'),
					newImage = image.clone(false);

				newImage.removeAttr('height');
				page.imageOverlay.find('.image').html(newImage);
				page.imageOverlay.show();
			});

			// Handle Task Image Close
			page.imageOverlay.on('click', 'a.close', function() {
				page.imageOverlay.hide();
			});
		},

		/**
		 * Handle Searching for Tasks
		 */
		initSearchEvent: function() {
			$('input[name="search"]').on('keyup', function() {
				var self = $(this),
					value = self.val().toLowerCase();

				page.listItems.each(function(i) {
					var self = $(this),
						title = self.find('.task').text().toLowerCase();

					if (!title.includes(value)) {
						self.hide();
					} else {
						self.show();
					}
				});
			});
		},

		init: function() {
			page.initEventListeners();
			page.initSearchEvent();
		}
	};

	page.init();
})(jQuery);