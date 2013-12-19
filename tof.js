function FFT()
{
	this.quoteNode = null;
	this.sentenceNode = null;
};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

FFT.prototype.quotes = {
    tactics: [
        "FFT is a tactical role-playing game developed and published by Square (now Square Enix) for the Sony PlayStation video game console.",
        "FFT is set in a fictional medieval-inspired kingdom called Ivalice created by Yasumi Matsuno.",
        "The gameplay of FFT differs in several key areas from other titles in the Final Fantasy series.",
        "FFT uses a 3D, isometric, rotatable playing field, with bitmap sprite characters.",
        "An enhanced port of FFT, FFT: The War of the Lions, was released in 2007 as part of Square Enix's Ivalice Alliance project.",
        "However, in FFT, random battles only occur in pre-set locations, marked in green on the world map.",
        "Like several installments in the series, FFT features a character class system, which allows players to customize characters into various roles.",
        "The characters were designed by Akihiko Yoshida, who was also in charge of the illustration and character designs of games such as Tactics Ogre, FFT Advance, Final Fantasy XII, and Vagrant Story.",
        "FFT begins with Ivalice just recovering from the Fifty Year War against Ordalia.",
        "FFT was produced mostly by the team that made Ogre Battle and Tactics Ogre, and was Yasumi Matsuno's first project with Square following his departure from Quest in 1995.",
        "In an interview with Akito Inoue, an assistant professor at the International University of Japan, Inoue mentions that FFT was made because of how casual gamers are usually put off by games with branching storylines found in other Matsuno's titles such as Tactics Ogre.",
        "FFT sold 824,671 copies in Japan in the first half of 1997.",
        "FFT received universal acclaim upon its release, and critical opinion of the game has improved further over time."
    ],
    fourier: [
        "The first step in interpreting FFT results is to compute the FFT bin centers.",
        "When using the radix-2 FFT, if we don't have control over the length of our time-domain data sequence, and that sequence length is not an integral power of two, we have two options.",
        "The basic ideas were popularized in 1965, but some FFTs had been previously known as early as 1805.",
        "There are many different FFT algorithms involving a wide range of mathematics, from simple complex-number arithmetic to group theory and number theory.",
        "Computing the DFT of N points in the naive way, using the definition, takes O(N^2) arithmetical operations, while a FFT can compute the same DFT in only O(N log N) operations.",
        "FFTs are of great importance to a wide variety of applications, from digital signal processing and solving partial differential equations to algorithms for quick multiplication of large integers.",
        "The best-known FFT algorithms depend upon the factorization of N, but there are FFTs with O(N log N) complexity for all N, even for prime N.",
        "Since the inverse DFT is the same as the DFT, but with the opposite sign in the exponent and a 1/N factor, any FFT algorithm can easily be adapted for it.",
        "An FFT computes the DFT and produces exactly the same result as evaluating the DFT definition directly; the only difference is that an FFT is much faster.",
        "In the presence of round-off error, many FFT algorithms are also much more accurate than evaluating the DFT definition directly.",
        "By far the most commonly used FFT is the Cooley–Tukey algorithm.",
        "Cornelius Lanczos did pioneering work on the FFS and FFT with G.C. Danielson (1940).",
        "Rader's algorithm, exploiting the existence of a generator for the multiplicative group modulo prime N, expresses a DFT of prime size n as a cyclic convolution of (composite) size N−1, which can then be computed by a pair of ordinary FFTs via the convolution theorem.",
    ],
};

FFT.prototype.init = function () {
	this.quoteNode = $("blockquote")
	this.quoteNode.popover({content: "Wrong, asshole."});
	this.sentenceNode = $("#sentence");
	this.sentenceNode.popover({content: "Yeeeah, boy!"});

	$("#tactics").click(function() {
		window.brian.tacticsOrFourier(true);
		this.blur();
	});
	$("#fourier").click(function() {
		window.brian.tacticsOrFourier(false);
		this.blur();
	});

	this.populateScreen(false);
};

FFT.prototype.isTacticsQuote = function(sentence) {
	return (this.quotes.tactics.indexOf(sentence) > -1);
};

FFT.prototype.isFourierQuote = function(sentence) {
	return (this.quotes.fourier.indexOf(sentence) > -1);
};


FFT.prototype.isCorrect = function(isTactics, sentence) {
	return isTactics && this.isTacticsQuote(sentence) ||
				 !isTactics && this.isFourierQuote(sentence)
};

FFT.prototype.randomQuote =  function() {
	var types = ["tactics", "fourier"];
	var typeIndex = randomInt(0, 1);
	var quotesSubset = this.quotes[types[typeIndex]];
	var quoteIndex = randomInt(0, quotesSubset.length - 1);
	return quotesSubset[quoteIndex];
};

FFT.prototype.setRandomQuote = function() {
	this.sentenceNode.text(this.randomQuote());
};

FFT.prototype.hidePopovers = function() {
	this.quoteNode.popover("hide");
	this.sentenceNode.popover("hide");
};

FFT.prototype.populateScreen = function(animate) {
	if (animate) {
		var fadeDuration = 400;
		this.sentenceNode.fadeOut(fadeDuration, $.proxy(this.setRandomQuote, this))
										 .fadeIn(fadeDuration, $.proxy(this.hidePopovers, this));
	} else {
		this.setRandomQuote();
	}
};

FFT.prototype.tacticsOrFourier = function (isTactics) {
	if (this.isCorrect(isTactics, this.sentenceNode.text())) {
		this.sentenceNode.popover("show");
	} else {
		this.quoteNode.popover("show");
	}

	this.populateScreen(true);
};

$(function () {window.brian = new FFT(); window.brian.init();});

