// Basic: Iterating by Number
deft([0, 3], function (Next, aItem, aIndex, aArray, aMaxIndex) {
	if ("undefined" !== typeof console)
		console.log("value:", aItem);
	Next();
});

// Basic: Iterating an Array:
deft([0, [1, 3, 4]], function (Next, aItem, aIndex, aArray, aMaxIndex) {
	if ("undefined" !== typeof console)
		console.log("index:", aIndex, "value:", aItem);
	Next();
});

// --- Now using callback to tell iterating is finished ---

// Iterating an Array:
deft([0, [1, 3, 4]], function (Next, aItem, aIndex, aArray, aMaxIndex) {
	if ("undefined" !== typeof console)
		console.log("index:", aIndex, "value:", aItem);
	Next();
}, function Done() {
	if ("undefined" !== typeof console)
		console.log("deft: done iterating.");
	else alert("deft: done iterating.");
});

// Iterating an Array, negative start index -3:
deft([-3, [1, 3, 4]], function (Next, aItem, aIndex, aArray, aMaxIndex) {
	if ("undefined" !== typeof console)
		console.log("index:", aIndex, "value:", aItem);
	Next();
}, function Done() {
	if ("undefined" !== typeof console)
		console.log("deft: done iterating.");
	else alert("deft: done iterating.");
});

// Iterating by Number
deft([0, 3], function (Next, aItem, aIndex, aArray, aMaxIndex) {
	if ("undefined" !== typeof console)
		console.log("value:", aItem);
	Next();
}, function Done() {
	if ("undefined" !== typeof console)
		console.log("deft: done iterating.");
	else alert("deft: done iterating.");
});
