var rest = require('./rest.js');
var utils = require('./utils');


/*********************
 * Initialise ratings
 *********************/
function init() {
    var ratingActions = document.querySelectorAll(".star-ratings-rate-action"),
        i;

    // Add click events to stars
    for (i = 0; i < ratingActions.length; i += 1) {
        ratingActions[i].addEventListener("click", ratingClick);

        ratingActions[i].onmouseenter = function () {
            var maxRating = getMaxRating(this);
            var score = this.getAttribute('data-score');
            var parent = utils.findParent(this, "star-ratings");
            parent.querySelector(".star-ratings-rating-foreground").style.width = 100 / maxRating * score + "%";
        };

        ratingActions[i].onmouseleave = function () {
            var avgRating = getAvgRating(this);
            var maxRating = getMaxRating(this);
            var score = this.getAttribute('data-score');
            var parent = utils.findParent(this, "star-ratings");
            var percentage = 100 / maxRating * avgRating + "%";
            parent.querySelector(".star-ratings-rating-foreground").style.width = percentage;
        };
    }
}


/*********************
 * Rating click event
 *********************/
function ratingClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    var score = this.getAttribute('data-score');
    var ratingId = this.getAttribute('data-for');
    rate(ratingId, score, this);
}


/*********************
 * Rate instance
 *********************/
function rate(id, score, sender) {
    var url = '/ratings/' + id + '/' + score + '/';

    rest.post(url, {}, function (rating) {
        updateRating(rating, sender);
    }, function (errors) {
        showError(errors, sender);
    });
}


function getMaxRating(el) {
    var parent = utils.findParent(el, "star-ratings");
    if (parent) {
        return parseInt(parent.getAttribute('data-max-rating'));
    }

    return -1;
}


function getAvgRating(el) {
    var parent = utils.findParent(el, "star-ratings");
    if (parent) {
        return parent.getAttribute('data-avg-rating');
    }

    return -1;
}


/*********************
 * Update rating
 *********************/
function updateRating(rating, sender) {
    var parent = utils.findParent(sender, "star-ratings");
    if (parent === undefined || parent === null) {
        return;
    }

    parent.setAttribute("data-avg-rating", rating.rating_average);
    parent.querySelector(".star-ratings-rating-foreground").style.width = 100 / rating.max_value * rating.rating_average + "%";
}


function showError (errors, sender) {
    var parent = utils.findParent(sender, "star-ratings");
    if (parent === undefined || parent === null) {
        return;
    }
    parent.querySelector(".star-ratings-errors").innerHTML = errors.error;
    setTimeout(function () {
        parent.querySelector(".star-ratings-errors").innerHTML = "";
    }, 2500);
}

/*********************
 * Only initialise ratings
 * if there is something to rate
 *********************/
if (document.querySelector(".star-ratings")) {
    init();
}