//-----------------------------
//  EQUAL HEIGHT COLUMN SORTED
//-----------------------------

//create constructor for objects
function targetedRow(item, groupSizeLg, groupSizeSm, breakpoint, children) {
    this.item = item;
    this.groupSizeLg = groupSizeLg;
    this.groupSizeSm = groupSizeSm;
    this.breakpoint = breakpoint;
    this.children = children;
}
//SET ELEMENTS TO RESIZE
/*insert inside targetedRow 'item' is the targetet element in css string form, 'groupSizeLg' is the biggest group size, 
'groupSizeSm' is the smallest, 'breakpoint' is the screen width in pixels where the ordering changes, if you need to target child
selectors add 'children'*/
var targetRow = [
    new targetedRow('ELEMENT', 2, 1, 375)
]
//SET GROUP CLASSNAME
var groupClassName = 'CLASSNAME';

//regular expression to be used with group classname
var classNameRegex = new RegExp('/(^|\s)' + groupClassName + '\S+/g');

//number of groups
var matchHeightRows = [];
var origItem;
//column sorter-------------------------------
function columnSorter(item, groupSize) {
    //item should be what you want to sort, in jQuery format
    //groupSize is how many items should each group include
    var groups = item.length / groupSize; //get how many groups we need;
    groups = Math.ceil(groups); //round up all numbers

    var limiter = [];
    //use variables to populate limiter array
    for (var i = 1; i <= groups; i++) {
        limiter.push(i * groupSize);
    }
    item.each(function () {
        //remove class columnsourte
        if ($(this).hasClass('columnsorted')) {
            $(this).removeClass('columnsorted')
                .removeClass(function (index, className) {
                    return (className.match(classNameRegex) || []).join(' ');
                });
        }
        //remove 
    });
    for (var i = 0; i <= item.length; i++) {
        //loop the limiter
        for (l = 0; l < limiter.length; l++) {
            var limitValue = limiter[l];
            //test this item [i] with each limiter [limitValue]
            if ($(item[i]).hasClass('columnsorted') === false) {
                var itemOrder = parseInt([i]) + 1;
                if (itemOrder > limitValue) {

                } else if (itemOrder <= limitValue) {
                    //add group class and columnsorted
                    $(item[i]).addClass('columnsorted ' + groupClassName + (parseInt([l]) + 1));
                }
            }
        }
    }
    // populate matchHeightRows
    for (var i = 1; i <= groups; i++) {
        matchHeightRows.push(origItem + '.' + groupClassName + i);
    }
}
// execute column sorter with breakpoint

function simpleResponsiveColumnSorter(item, groupSizeLg, groupSizeSm, breakpoint) {
    origItem = item;
    item = $(item);
    var winW = $(window).width();
    if (winW >= breakpoint) {
        columnSorter(item, groupSizeLg);
    } else {
        columnSorter(item, groupSizeSm);
    }
}

// function to loop the array and apply simpleResponsiveColumnSorter to each of the contents
function sortColumn() {
    //reset matchHeightRows
    matchHeightRows = [];
    for (var i = 0; i < targetRow.length; i++) {
        simpleResponsiveColumnSorter(targetRow[i].item, targetRow[i].groupSizeLg, targetRow[i].groupSizeSm, targetRow[i].breakpoint);
    }
}



//Equal Height function------------------
equalheight = function (container) {

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function () {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
};

//execute on load
$(window).load(function () {
    // run the Column Sorting
    sortColumn();
    //loop the array and execute for each
    for (var i = 0; i < matchHeightRows.length; i++) {
        equalheight(matchHeightRows[i]);
    }
});

//execute on resize
$(window).resize(function () {
    // run the Column Sorting
    sortColumn();
    //loop the array and execute for each
    for (var i = 0; i < matchHeightRows.length; i++) {
        equalheight(matchHeightRows[i]);
    }
});