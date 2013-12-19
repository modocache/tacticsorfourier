function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var quoteNode = $("blockquote")
quoteNode.popover({content: "Wrong, asshole."});

var sentenceNode = $("#sentence");
sentenceNode.popover({content: "Yeeeah, boy!"});

var quotes = {
    tactics: [
        "FFT is a tactical role-playing game developed and published by Square (now Square Enix) for the Sony PlayStation video game console.",
        "FFT is set in a fictional medieval-inspired kingdom called Ivalice created by Yasumi Matsuno.",
        "The gameplay of FFT differs in several key areas from other titles in the Final Fantasy series.",
        "Orlandu is definitely the most powerful character in FFT."
    ],
    fourier: [
        "The first step in interpreting FFT results is to compute the FFT bin centers.",
        "When using the radix-2 FFT, if we don't have control over the length of our time-domain data sequence, and that sequence length is not an integral power of two, we have two options.",
        "When using the radix-2 FFT, if we don't have control over the length of our time-domain data sequence, and that sequence length is not an integral power of two, we have two options.",
        "When using the radix-2 FFT, if we don't have control over the length of our time-domain data sequence, and that sequence length is not an integral power of two, we have two options."
    ],

    isTacticsQuote: function(sentence) {
        return (quotes.tactics.indexOf(sentence) > -1);
    },
    isFourierQuote: function(sentence) {
        return (quotes.fourier.indexOf(sentence) > -1);
    },
    isCorrect: function(isTactics, sentence) {
        return isTactics && quotes.isTacticsQuote(sentence) ||
               !isTactics && quotes.isFourierQuote(sentence)
    },

    randomQuote: function() {
        var types = ["tactics", "fourier"];
        var typeIndex = randomInt(0, 1);
        var quotesSubset = quotes[types[typeIndex]];
        var quoteIndex = randomInt(0, quotesSubset.length - 1);
        return quotesSubset[quoteIndex];
    }
};

function setRandomQuote() {
    sentenceNode.text(quotes.randomQuote());
};

function hidePopovers() {
    quoteNode.popover("hide");
    sentenceNode.popover("hide");
};

function populateScreen(animate) {
    if (animate) {
        var fadeDuration = 400;
        sentenceNode.fadeOut(fadeDuration, setRandomQuote)
                    .fadeIn(fadeDuration, hidePopovers);
    } else {
        setRandomQuote();
    }
};

function tacticsOrFourier(isTactics) {
    if (quotes.isCorrect(isTactics, sentenceNode.text())) {
        sentenceNode.popover("show");
    } else {
        quoteNode.popover("show");
    }

    populateScreen(true);
};

$("#tactics").click(function() {
    tacticsOrFourier(true);
    this.blur();
});
$("#fourier").click(function() {
    tacticsOrFourier(false);
    this.blur();
});

populateScreen(false);

