var categories = [ "age", "alone", "amazing", "anger" ,"architecture" ,"art" ,"attitude", "beauty", "best", "birthday","business","car","change","communications","computers","cool","courage","dad","dating","death", "design","dreams","education","environmental","equality","experience","failure","faith","family","famous","fear","fitness","food","forgiveness","freedom","friendship","funny","future","god","good","government","graduation","great","happiness","health","history","home","hope","humor","imagination","inspirational","intelligence","jealousy","knowledge","leadership","learning","legal","life","love","marriage","medical","men","mom","money","morning","movies","success"];
var videos = [
    {
        name: 'beach',
        path: 'beach.mp4'
    },
    {
        name: 'clouds',
        path: 'clouds.mp4'
    },
    {
        name: 'mountains',
        path: 'mountains.mp4'
    },
    {
        name: 'sunset',
        path: 'sunset.mp4'
    },
]

$(document).ready(function() {
    makeCategoriesDdl(categories)
    makeBackgroundDdl(videos)

    var localCategory = sessionStorage.getItem("category") ? sessionStorage.getItem("category") : "random";
    $("#ddlCategories").val(localCategory)
    var localBackground = sessionStorage.getItem("background") ? sessionStorage.getItem("background") : "beach.mp4";

    $("#ddlCategories").val(localCategory)
    var category = getChosenDdlOption('#ddlCategories')

    $("#ddlBg").val(localBackground)
    changeBackground(localBackground)
    changeTheme(localBackground)

    
    callApi(category)

    $(document).on("click", "#generateQuoteBtn", function(){
        callApi(category)
    })
})

function callApi(category){
    var apikey = "FU250o719AHtRwidB8GTLw==fCxMQWdNSKZx0fVk";
    var url = category == "random" ? 'https://api.api-ninjas.com/v1/quotes' : 'https://api.api-ninjas.com/v1/quotes?category=' + category;

    $.ajax({
        method: 'GET',
        url: url,
        headers: { 'X-Api-Key': apikey},
        contentType: 'application/json',
        success: function(result) {
            generateQuote(result)
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR);
        }
    });
}
function generateQuote(quoteObj){
    var html = `
    <figure>
        <blockquote class="blockquote">
            <p>${quoteObj[0].quote}</p>
        </blockquote>
        <figcaption class="blockquote-footer">
            <cite title="Author">${quoteObj[0].author}</cite>
        </figcaption>
        <button class="btn btn-primary" id='generateQuoteBtn'>Get new quote</button>
    </figure>`;

    $("#quoteDiv").html(html)
}
function makeCategoriesDdl(catArr){
    var html = `<label class="w-auto text-end">Choose a category:</label><select id="ddlCategories" class="ms-3 form-select form-select-sm w-auto">
    <option value="random">random</option>`

    for(let i = 0; i<catArr.length; i++){
        html += `<option value="${catArr[i]}">${catArr[i]}</option>`
    }
    html += `<select/>`
    $("#catDdl").html(html)
}
function makeBackgroundDdl(bgArr){
    var html = `<label class="w-auto text-end">Change background:</label><select id="ddlBg" class="ms-3 form-select form-select-sm w-auto">`

    for(let i = 0; i<bgArr.length; i++){
        html += `<option value="${bgArr[i].path}">${bgArr[i].name}</option>`
    }
    html += `<select/>`
    $("#videoDdl").html(html)
}
function getChosenDdlOption(id){
    var chosenCat = $(id + " option:selected").val();
    return chosenCat;
}
function changeBackground(newBackgroundSrc){
    var video = document.getElementsByTagName("source")[0];
    video.src = "assets/videos/" + newBackgroundSrc
    $("#videoBackground").load()
}

$(document).on("change", "#ddlCategories", function(){
    var category = getChosenDdlOption('#ddlCategories')
    sessionStorage.setItem("category", category)
    callApi(category)
})

$(document).on("change", "#ddlBg", function(){
    var background = getChosenDdlOption('#ddlBg')
    sessionStorage.setItem("background", background)
    changeBackground(background)
    changeTheme(background)
})

function changeTheme(chosenTheme){
    var theme = chosenTheme.split(".")[0]
    $('body').attr("data-bs-theme", theme)
}