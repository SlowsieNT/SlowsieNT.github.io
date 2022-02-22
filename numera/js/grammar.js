/* That's right modern js devs, tremble in fear
 * Only through pain can you gain
 * Behold the Legacy JS
 */
// Cast "class" into static "class"
var GrammarUtils = new function () {
	// "_" will shorten code.
	var _ = this;
	_.StrHasHalfVowels = function (aText, aAdditionalVowels) {
		for (var vC=0, vLL="aeiou" + (aAdditionalVowels||""), vI = 0; vI < aText.length; vI++)
			vC += -1 != vLL.indexOf(aText[vI].toLowerCase());
		return vC >= aText.length/2;
	};
	_.StrHasRepetitiveLetters = function (aText, aIgnoreLetters) {
		for (var vI = 0; vI < aText.length; vI++) {
			var vCurrentLetter = aText.charAt(vI),
				vNextLetter = aText.charAt(1 + vI),
				vIgnoreLetter = aIgnoreLetters ? -1 != aIgnoreLetters.indexOf(vCurrentLetter) : 0;
			if (vCurrentLetter == vNextLetter && !vIgnoreLetter)
				return true;
		}
		return false;
	};
	_.StrRandom = function RandomString(aLength, aLetters) {
		for (var vR = "", vLL = aLetters.length, vI = 0; vI < aLength; vI++)
			vR += aLetters[Math.random() * vLL >> 0];
		return vR;
	};
	_.StrCanPronounce_Decent = function (aText, aMaxConsonants, aMaxVowels) {
		aMaxConsonants = aMaxConsonants||3;
		aMaxVowels = aMaxVowels||3;
		aText = aText.toLowerCase();
		var vVowels = {a:1,e:1,i:1,o:1,u:1,y:1}, vDuals = {
			"ll":1, "rh":1, "th":"r", "ch":"r"
		}, vTempConsonantCount = 0,
			vTempVowelCount = 0;
		for (var vI = 0; vI < aText.length; vI++) {
			var vCurrentLetter = aText.charAt(vI),
				vNextLetter = aText.charAt(1 + vI),
				vDual = vCurrentLetter + vNextLetter, vIV, vTemp;
			if (vDuals[vDual]) {
				vTempConsonantCount++;
				vI++;
				continue;
			}
			vIV = vVowels[vCurrentLetter] >> 0;
			if (vIV) vTempConsonantCount = 0;
			if (!vIV) vTempVowelCount = 0;
			vTempVowelCount += vIV;
			vTempConsonantCount += !vIV;
			if (vTempConsonantCount > aMaxConsonants || vTempVowelCount > aMaxVowels)
				return false;
		}
		return true;
	};
	_.GetReadableStrings_Decent = function (aArray) {
		for (var vR = [], vI = 0; vI < aArray.length; vI++) {
			var vItem = aArray[vI].toUpperCase();
			if (!_.StrHasRepetitiveLetters(vItem) && _.StrHasHalfVowels(vItem) && _.StrCanPronounce_Decent(vItem))
				vR.push(vItem[0] + vItem.slice(1).toLowerCase());
		}
		return vR;
	};
};