/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
const projectName = "random-quote-machine";
let quotesData;

/*
    Code by Gabriel Nunes
    Modified by Todd Chaffee to use Camper gist for JSON Quote data.
*/

// https://medium.com/@developerstoday99/create-animated-hearts-87b3271ae774

var colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857"
];
var currentQuote = "",
    currentAuthor = "";

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: "application/json"
        },
        url:
            "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === "string") {
                quotesData = JSON.parse(jsonQuotes);
                console.log("quotesData");
                console.log(quotesData);
            }
        }
    });
}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $("#tweet-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $(".quote-text").animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $("#text").text(randomQuote.quote);
    });

    $(".quote-author").animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $("#author").html(randomQuote.author);
    });

    var color = Math.floor(Math.random() * colors.length);
    $("html body").animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        1000
    );
    $(".button").animate(
        {
            backgroundColor: colors[color]
        },
        1000
    );
}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });

    $("#new-quote").on("click", getQuote);
});

// Define a function that creates a heart element with random properties
function createHeart() {
    const heart = document.createElement("div");
    var color = Math.floor(Math.random() * colors.length);
    heart.classList.add("heart");
    heart.style.width = `${Math.floor(Math.random() * 65) + 10}px`;
    heart.style.height = heart.style.width;
    heart.style.left = `${Math.floor(Math.random() * 100) + 1}%`;
    heart.style.background = $(".heart").animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        1000
    );
    const duration = Math.floor(Math.random() * 5) + 5;
    heart.style.animation = `love ${duration}s ease`;
    return heart;
}

// Get the container element where the hearts will be added
const container = document.querySelector(".bg_heart");

// Define a function that removes hearts that have gone off screen
function removeHearts() {
    const hearts = container.querySelectorAll(".heart");
    hearts.forEach((heart) => {
        const top = parseFloat(getComputedStyle(heart).getPropertyValue("top"));
        const width = parseFloat(getComputedStyle(heart).getPropertyValue("width"));
        if (top <= -100 || width >= 150) {
            heart.remove();
        }
    });
}

// Define a function that repeatedly adds hearts to the container
function addHeart() {
    const heart1 = createHeart();
    const heart2 = createHeart();
    container.appendChild(heart1);
    container.appendChild(heart2);
    setTimeout(removeHearts, 1000);
}

// Start the animation loop
const love = setInterval(addHeart, 500);
