console.log("javascript connected")
let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(items));
console.log('local storage' + localStorage)
data = JSON.parse(localStorage.getItem('items'));;

data.forEach(function (item) {
    $(".emptydiv").first().after(newItemCreator(item))
})

$("input[type=checkbox]").on('click', hello)
$("span.lol").on('click', remove)
$("input[type=text]").focus()

$("input[type=text]").on("keypress", function (e) {
    if (e.which === 13) {
        var newTodoItem = $(this).val();
        console.log(newTodoItem);
        items.push(newTodoItem)
        localStorage.setItem('items', JSON.stringify(items));
        $(".emptydiv").first().after(newItemCreator(newTodoItem))
        $(this).val('')
        $("input[type=checkbox]").first().on('click', function () { $(this).next().toggleClass("done"); })
        $("span.lol").first().on('click', remove)
    }
})
$(".fa-plus").on("click", function () {
    $("input[type=text]").fadeToggle("fast", "linear")
})

function newItemCreator(newTodoItem) {
    return '<div class = "inside effect effect-2"><input type="checkbox"><span class = "text">' + newTodoItem + '</span><span class = "lol">&nbsp&nbsp&nbsp</span></div>'
}
function hello() {
    $(this).next().toggleClass("done");

}

function remove() {
    var textval = $(this).closest("div")[0].innerText.trim()
    items.remove(textval)
    localStorage.setItem('items', JSON.stringify(items));
    $(this).closest("div").fadeOut(300, function () {
        $(this).remove()
    })

}

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
