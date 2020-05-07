<script type="text/javascript">
$(function () {
	$('input#id_search').quicksearch('div.knowledgeBaseItemWrapper', {
		'delay': 200,
		'selector': '.knowledgeBaseItem',
		'stripeRows': ['odd', 'even'],
		'noResults': '.noResultsToShow',
		'bind': 'keyup click',
		'minValLength': 16,
		'prepareQuery': function (val) {
			return new RegExp(val, "i");
		},
		'testQuery': function (query, txt, _row) {
			return query.test(txt);
		},
		'show': function() {
			$(this).removeClass('hideByTextbox');
		},
		'hide': function() {
			$(this).addClass('hideByTextbox');
		}
	});			
});

$(function () {
	$('#selectbox').quicksearch('div.knowledgeBaseItemWrapper', {
		'delay': 200,
		'selector': 'ul',
		'bind': 'change',
		'prepareQuery': function (val) {
			return new RegExp(val, "i");
		},
		'testQuery': function (query, txt, _row) {
			return query.test(txt);
		},
		'show': function() {
			$(this).removeClass('hideByDropdown');
		},
		'hide': function() {
			$(this).addClass('hideByDropdown');
		}
	});			
});

</script>