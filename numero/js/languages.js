/* That's right modern js devs, tremble in fear
 * Only through pain can you gain
 * Behold the Legacy JS
 */
// Cast "class" into static "class"
var NumeroUtils = new function () {
	// "_" will shorten code.
	var _ = this;
	_.Vowels = "AEIOUÄÖÜÀÂÄÈÉÊÊÎÏÔÖÙÛÜ";
	_.EN_Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	_.DE_Letters = _.EN_Letters + "ÄÖÜß";
	_.ES_Letters = _.EN_Letters + "Ñ";
	_.FR_Letters = _.EN_Letters + "ÀÂÄÇÈÉÊÊÎÏÔÖÙÛÜ";
	_.SlavicBase0_Letters = "A,B,C,Č,Ć,D,DŽ,Đ,E,F,G,H,I,J,K,L,LJ,M,N,NJ,O,P,R,S,Š,T,U,V,Z,Ž".split(",");
	_.ResolveNumber = function (aNumber) {
		aNumber += "";
		while (aNumber > 9) {
			for (var vR = 0, vI = 0; vI < aNumber.length; vI++)
				vR += +aNumber[vI];
			aNumber = "" + vR;
		}
		return aNumber;
	};
	_.ResolveNumberOnce = function (aNumber) {
		aNumber += "";
		for (var vR = 0, vI = 0; vI < aNumber.length; vI++)
			vR += +aNumber[vI];
		return vR;
	};
	_.MonoTable_GetNumberFromLettersF = function (aLetters, aTable) {
		aLetters = aLetters.toUpperCase();
		for (var vR = 0, vI = 0; vI < aLetters.length; vI++) {
			for (var vN in aTable)
				if (-1 < aTable[vN].indexOf(aLetters.charAt(vI))) {
					vR += +vN;
					break;
				}
		}
		return vR;
	};
	_.BiTable_GetNumberFromLettersF = function (aLetters, aTableArray, aTableType) {
		var vTable = aTableArray[(aTableType >> 0) % aTableArray.length];
		aLetters = aLetters.toUpperCase();
		for (var vR = 0, vI = 0; vI < aLetters.length; vI++) {
			var vCurrentLetter = aLetters.charAt(vI),
				vNextLetter = aLetters.charAt(1 + vI),
				vDual = vCurrentLetter + vNextLetter,
				vIdx = vTable[0][0].indexOf(vDual);
			if (-1 < vIdx && vDual.length > 1) {
				vR += +vTable[0][1][vIdx/2];
				vI++;
			}
			else for (var vN in vTable) {
				if (!+vN) continue;
				if (-1 < vTable[vN].indexOf(vCurrentLetter)) {
					vR += +vN;
					break;
				}
			}
		}
		return vR;
	};
	_.EnBasic_GetNumberFromLetters = function (aLetters) {
		aLetters = aLetters.toUpperCase();
		for (var vR = 0, vI = 0; vI < aLetters.length; vI++) {
			var vCC = aLetters.charCodeAt(vI)-65;
			if (vCC > -1 && vCC < 26)
				vR += 1 + vCC % 9;
		}
		return vR;
	};
	function MultiLangOldReliable_Chaldean(aLetters) {
		/* Languages use this reliably */
		return _.MonoTable_GetNumberFromLettersF(aLetters, {
			1: "AIJQY", 2: "BKR", 3: "CGLS", 4: "DMT",
			5: "EHNX", 6: "UVW", 7: "OZ", 8: "FP"
		});
	};
	/* Let for do its job */
	for (var vArr = ["Chaldean","EN","JP","IT","CN","KR"],vI = 0; vI < vArr.length; vI++)
		_[vArr[vI] + "_GetNumberFromLetters"] = MultiLangOldReliable_Chaldean;
	_.ES_GetNumberFromLetters = function (aLetters) {
		return _.MonoTable_GetNumberFromLettersF(aLetters, {
			1: "AJS", 2: "BKT", 3: "CLU", 4: "DMV",
			5: "ENÑW", 6: "FOX", 7: "GPY", 8: "HQZ", 9: "IR"
		});
	};
	_.DE_GetNumberFromLetters = function (aLetters) {
		return _.MonoTable_GetNumberFromLettersF(aLetters, {
			1: "AJS", 2: "BKTÖß", 3: "CLU", 4: "DMV",
			5: "ENW", 6: "FOXÄ", 7: "GPY", 8: "HQZÜ", 9: "IR"
		});
	};
	_.FR_GetNumberFromLetters = function (aLetters) {
		return _.MonoTable_GetNumberFromLettersF(aLetters, {
			1: "AJSÉÈÊÇ", 2: "BKTÖ", 3: "CLUÙÛ", 4: "DMV", 5: "ENWÊÎ", 6: "FOXÄÔ",
			7: "GPY", 8: "HQZÜ", 9: "IRÀÂÏ"
		});
	};
	_.SlavicBaseNoSound_GetNumberFromLetters = function (aLetters) {
		aLetters = aLetters.toUpperCase();
		for (var vR = 0, vI = 0; vI < aLetters.length; vI++) {
			var vIdx = _.SlavicBase0_Letters.indexOf(aLetters[vI]);
			if (-1 < vIdx)
				vR += 1 + vIdx % 9;
		}
		return vR;
	};
	_.SlavicBase_GetNumberFromLetters = function (aLetters, aTableType) {
		/* 5th table is the most reliable, thus default */
		if (void 0 === aTableType) aTableType = 4;
		return _.BiTable_GetNumberFromLettersF(aLetters, [{
			0: ["DŽLJNJ", "782"],
			1: "AFNV", 2: "BGZ", 3: "CHOŽ", 4: "ČIP", 5: "ĆJR", 6: "DKS",
			7: "LŠ", 8: "ĐT", 9: "EMU"
		}, {
			0: ["DŽLJNJ", "435"],
			1: "AJSŠ", 2: "BKT", 3: "CČĆLU", 4: "DĐMV", 5: "EN", 6: "FOH",
			7: "GP", 8: "HZŽ", 9: "IR"
		}, {
			0: ["DŽLJNJ", "445"],
			1: "AIJ", 2: "BKRSŠ", 3: "CGLĆĐ", 4: "DMTČ", 5: "EHN", 6: "UV",
			7: "OZŽ", 8: "FP"
		}, {
			0: ["DŽLJNJ", "172"],
			1: "AIJ", 2: "BKR", 3: "CGLŠ", 4: "DM", 5: "N", 6: "SUV",
			7: "OZŽ", 8: "ĐFHP", 9: "ĆČET"
		}, {
			0: ["DŽLJNJ", "488"],
			1: 'A', 3: 'O', 5: 'E', 7: 'I', 9: 'U',
			2: 'BJTFPGDHMŽ', 4: 'ĐCKVZ', 6: 'NŠLČRS', 8: 'Ć'
		}], aTableType);
	};
	_.BruteForceReadableLetters_Decent = function (aLangOrLangIndex, aUnrefinedNumber, aLength, aLettersArrayOrString, aStartWith, aEndWith, aTableType) {
		if (null === aLangOrLangIndex || void 0 === aLangOrLangIndex || (aLangOrLangIndex && aLangOrLangIndex.length && "default" === aLangOrLangIndex.toLowerCase()))
			aLangOrLangIndex = "Chaldean";
		var vTypes = _.FromLetters.Types;
		return {
			Type: aLangOrLangIndex >= 0 && aLangOrLangIndex in vTypes ? vTypes[aLangOrLangIndex] : aLangOrLangIndex,
			Result: _.BruteForceNumber(_.FromLetters[aLangOrLangIndex], aTableType, aUnrefinedNumber, aLettersArrayOrString, 1, aLength, aStartWith, aEndWith)
		};
	};
	_.FromLetters = function (aLang, aLetters, aTableType) {
		if (null === aLang || void 0 === aLang || (aLang && aLang.length && "default" === aLang.toLowerCase()))
			aLang = "Chaldean";
		if (aLang in _.FromLetters)
			return _.FromLetters[aLang](aLetters, aTableType);
		return null;
	};
	_.BruteForceNumber = function BruteForceNumber(aLettersToNumFunc, aLettersToNumFuncArg2, aUnrefinedNumber, aLetters, aNoRepetition, aLength, aStartWith, aEndWith) {
		aStartWith=aStartWith||"";
		aEndWith=aEndWith||"";
		var vMaxIterations=0xFFFFF, vR = {};
		while (--vMaxIterations) {
			var vString = aStartWith + GrammarUtils.StrRandom(aLength, aLetters) + aEndWith;
			if (vString in vR) continue;
			if (aUnrefinedNumber == aLettersToNumFunc(vString, aLettersToNumFuncArg2))
				vR[vString]=1;
		}
		vR = Object.keys(vR);
		if (aNoRepetition)
			return GrammarUtils.GetReadableStrings_Decent(vR);
		return vR;
	};
	/* This must be at the of "class." */
	if (1) {
		/* This will allocate callbacks etc */
		var vI = 0, vNeedle = "_GetNumberFromLetters", vNeedleLen = vNeedle.length;
		_.FromLetters.Types = {};
		for (var vN in _) {
			/* This checks if string ends with vNeedle */
			if (vNeedleLen == vN.length - vN.indexOf(vNeedle)) {
				var vName = vN.slice(0, -vNeedleLen);
				_.FromLetters.Types[vI] = vName;
				_.FromLetters[vI++] = _[vN];
				_.FromLetters[vName] = _[vN];
			}
		}
	}
};