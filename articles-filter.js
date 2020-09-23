<script type="text/javascript">
/***
*   @author Victor Chimenti, MSCS-SE '20
*   @file article-filter.js
*
*   jQuery
*   This script searches the Career Engagement Article content items for matches to the
*   user selected search parameters in the filter field dropdown menus
*
*   @version 2.3
*/






$(function () {
    // After the DOM is ready, Wait until the window loads
    $(window).load(function () {
        // Once window loads set a timeout delay
        setTimeout(function () {




            //** global array holds list of content items that will render after filter selection **//
            var visibleItems = [];
            var parseItems = {};



            
            //   ***   Process and Parse Visible Items   ***   //
            $(function () {
                let parseItemsToDisplay = function() {
                    // assign array of currently visible content items
                    visibleItems = $('.newsItemWrapper').not('.hideByText, .hideByType');
                    // check to see if array is empty
                    if (visibleItems.length == 0) {
                        // when array is empty show the results message
                        $('.noResultsToShow').removeClass('hideResultsMessage');
                    } else {
                        // when array has content items suppress the results message
                        $('.noResultsToShow').addClass('hideResultsMessage');
                    }
                };
                parseItems.process = parseItemsToDisplay;
            });
            
            
            
            
            //   ***   Keyword Search   ***   //
            $(function () {
                // scan the keyword each character the user inputs
                $('#keystroke_filter').on('keyup', function () {
                    // Assign Search Key
                    let keyword = $(this).val().toLowerCase();
                    // filter the education abroad items for the input key
                    $(function () {
                        $('.newsItemWrapper').filter(function () {
                            // when the search key is not present in the item then hide the item
                            $(this).toggleClass('hideByText', !($(this).text().toLowerCase().indexOf(keyword) > -1));
                        });
                    });
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });



						

            //   ***   Type Filter   ***   //
            $(function () {
                // When the Multi-Select Checkbox Selector for Article Topics Changes - Execute change function 
                $('#SelectBox-ByType').change(function () {
                    // initialize an array of keys to hold each check box selected
                    let typeKeys = [];
                    typeKeys[0] = -1;
                    $('input[name=SelectBox-ByType]:checked').each(function (item) {
                        typeKeys[item] = $(this).val();
                    });
                    // If Search Key array has at least one valid value then Compare to the Each Content Item in term
                    if (typeKeys[0] != -1) {
                        $('.topics').filter(function (i, e) {
                            let typeValue = $(this).text();
                            // set state to hidden for all items
                            $(this).parents('.newsItemWrapper').addClass('hideByType');
                            // Check to see if any Key is included in the current Value
                            for (let index = 0; index < typeKeys.length; index++) {
                                if (typeValue.includes(typeKeys[index])) {
                                    // make current item visible when we validate a match
                                    $(this).parents('.newsItemWrapper').removeClass('hideByType');
                                }
                            }
                        });
                        // Else the Search Key is Null so Reset all Content Items to Visible
                    } else {
                        $('.newsItemWrapper').removeClass('hideByType');
                    }
                    // parse out unselected content items and limit display to user selected items
                    parseItems.process();
                });
            });




        }, 10);
    });
});
</script>


// //   ***   Term Filter   ***   //
// $(function () {
//     // When the Multi-Select Checkbox Selector for Academic Terms Changes - Execute change function 
//     $('#SelectBox-ByTerm').change(function () {
//         // initialize an array of keys to hold each check box selected
//         let termKeys = [];
//         termKeys[0] = -1;
//         $('input[name=SelectBox-ByTerm]:checked').each(function (item) {
//             termKeys[item] = $(this).val();
//         });
//         // If Search Key array has at least one valid value then Compare to the Each Content Item in term
//         if (termKeys[0] != -1) {
//             $('.term').filter(function (i, e) {
//                 let termValue = $(this).text();
//                 // set state to hidden for all items
//                 $(this).parents('.courseItemWrapper').addClass('hideByTerm');
//                 // Check to see if any Key is a match with the current Value
//                 for (let index = 0; index < termKeys.length; index++) {
//                     if (termValue.match(termKeys[index])) {
//                         // make current item visible when we validate a match
//                         $(this).parents('.courseItemWrapper').removeClass('hideByTerm');
//                     }
//                 }
//             });
//             // Else the Search Key is Null so Reset all Content Items to Visible
//         } else {
//             $('.courseItemWrapper').removeClass('hideByTerm');
//         }
//         // parse out unselected content items and limit display to user selected items
//         parseItems.process();
//     });
// });


// $(function () {
//     // When the Dropdown Menu Selector Course Types Change - Execute change function
//     $('#SelectBox-ByType').change(function () {
//         // Assign Search Key
//         let typeKeys = [];
//         typeKeys[0] = -1;
//         $('input[name=SelectBox-ByTerm]:checked').each(function (item) {
//             typeKeys[item] = $(this).val();
//         });

//         // let typeKey = $(this).val();

//         console.log("typeKey: " + typeKeys[0]);

//         // If Search Key is Not Null then Compare to the Type List Items in Each Content Item
//         if (typeKeys[0] != -1) {
//             $('.topics').filter(function (i, e) {
//                 var typeValue = $(this).text();

//                 console.log("typeValue: " + typeValue);
//                 $(this).parents('.newsItemWrapper').addClass('hideByType');

//                 // Check to see if the Key and Value are a Match
//                 if (typeValue.contains(typeKey)) {
//                     $(this).parents('.newsItemWrapper').removeClass('hideByType');
//                 } else {
//                     $(this).parents('.newsItemWrapper').addClass('hideByType');
//                 }
//             });
//             // Else the Search Key is Null so Reset all Content Items to Visible
//         } else {
//             $('.newsItemWrapper').removeClass('hideByType');
//         }
//         // parse out unselected content items and limit display to user selected items
//         parseItems.process();
//     });
// });