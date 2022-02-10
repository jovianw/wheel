const items = document.getElementsByClassName('item'); 
const viewHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
var itemCount = 5;
// var bodyHeight = itemCount * 100;
var scrolledHeight = 0;
// var scrolledFraction = 0;
var scrollTarget = 0;
var itemSpaceDeg = 30;

// On scroll
function onScroll() {
    scrolledHeight = window.pageYOffset.toString();
    // scrolledFraction = scrolledHeight / viewHeight;
    // scrollTarget = Math.ceil(scrolledFraction);
    // document.getElementById('scroll_tracker').innerHTML = scrolledHeight;
    // document.getElementById('vh_tracker').innerHTML = viewHeight.toString();
    scrollTarget += scrolledHeight - 1;
    if (scrollTarget < 0) scrollTarget = 0;
    if (scrollTarget >= itemCount) scrollTarget = 0;
    window.scrollTo(0, 1);
    document.body.style.overflow = "hidden";
    setTimeout(function() {document.body.style.overflow = "";}, 500);
    // document.getElementById('res_tracker').innerHTML = scrollTarget;
    for(item of items) {
        item.fixedRotation = item.rotation + (scrollTarget * itemSpaceDeg);
        item.style.transform = 'rotate(' + (item.fixedRotation).toString() + 'deg)';
        if (item.fixedRotation > 180 || item.fixedRotation < -180) {
            item.style.display = 'none'
        } else {
            item.style.display = 'block';
        }
    }
}


// Setup
function setUp() {
    // document.body.style.height = bodyHeight.toString() + 'vh';
    // Scroll to a detectable height
    for(item of items) {
        item.remove();
    }
    window.scrollTo(0, 1);
    // Add items
    for(var i = 0; i < itemCount; i++) {
        const temp1 = document.createElement('div');
        temp1.className = 'item';
        temp1.style.transform = 'rotate(' + (-itemSpaceDeg * i).toString() + 'deg)';
        temp1.rotation = -itemSpaceDeg * i;
        document.getElementById('item_container').appendChild(temp1);
        temp1.fixedRotation = temp1.rotation + (scrollTarget * itemSpaceDeg);
        temp1.style.transform = 'rotate(' + (temp1.fixedRotation).toString() + 'deg)';
        if (temp1.fixedRotation > 180 || temp1.fixedRotation < -180) {
            temp1.style.display = 'none'
        } else {
            temp1.style.display = 'block';
        }
        const temp2 = document.createElement('p');
        temp2.innerText = 'Item ' + i.toString();
        temp1.appendChild(temp2);
    }
}

window.onload = setUp;

window.onbeforeunload = function () {
    window.scrollTo(0, 1);
}

// Scroll listener
document.addEventListener('scroll', onScroll);


// Add/Remove item buttons
function addItem() {
    itemCount++;
    document.getElementById('item_tracker').innerText = 'There are ' + itemCount.toString() + ' items.';
    setUp();
}

document.getElementById('add').addEventListener("click", addItem);
