module.exports = function(input, callback) {

	if (!input || !input.nodeName || input.nodeName.toLowerCase() !== 'input') {
		throw new Error('Specified argument is not an input');
	}

	var mask = '+7 (ddd) ddd-dd-dd';
	var maskArr = mask.split('');

	var lastString = '';

	var maskValue = function(eventType) {

		var finalString = '';

		var inputValue = this.value;
		var inputValueArr = inputValue.split('');
		var decreasing;

		if (inputValue.length < lastString.length) {
			decreasing = true;
		} else {
			decreasing = false;
		}

		var start = this.selectionStart;
		var end = this.selectionEnd;
		var insertedSymbols = 0;

		var j = 0;

		for (var i in mask) {
			i = parseInt(i, 10);

			if (typeof inputValue[j] === 'undefined') {
				if (mask[i] === 'd') {
					// console.log('encountered "%s", exiting', mask[i])
					break;
				} else if (!decreasing) {
					finalString += mask[i];
					// console.log('auto inserted', mask[i])
					if (i <= start) {
						insertedSymbols++;
						// console.warn('adding inserted symbol at', i, 'with start at', start)
					}
				}
			} else {
				if (mask[i] === 'd') {
					while (typeof inputValue[j] !== 'undefined') {
						if (inputValue[j].match(/\d/)) {
							finalString += inputValue[j];
							// console.log('good symbol encountered', inputValue[j])
							j++;
							break;
						}
						// console.log('wrong symbol encountered', inputValue[j])
						j++;
					}
				} else {
					if (inputValue[j] === mask[i]) {
						// console.log('matches mask');
						finalString += inputValue[j];
						j++;
					} else {
						// console.log('doesn\'t match mask');
						finalString += mask[i];
						if (i <= start) {
							// console.warn('adding inserted symbol at', i, 'with start at', start)
							insertedSymbols++;
						}
					}
				}
			}
		}

		console.log('start %s, inserted %s, fs %s, ls %s, os %s, decreasing %s', start, insertedSymbols, finalString.length, lastString.length, inputValue.length, decreasing)

		this.value = finalString;

		if (!inputValue) {
			this.setSelectionRange(finalString.length, finalString.length)
		} else {
			this.setSelectionRange(start + (decreasing ? 0 : insertedSymbols), end + (decreasing ? 0 : insertedSymbols));
		}

		lastString = finalString;

		if (callback && typeof callback === 'function') {
			callback.call(this);
		}
	};

	input.addEventListener('focus', function() {
		maskValue.call(this);
	});

	input.addEventListener('input', function() {
		maskValue.call(this);
	});
};