try {
  /* -- Store all the things -- */
  var fieldArticleTitle = content.get("Article Title");
  var fieldSummary = content.get("Summary");
  var fieldArticle = content.get("Article");
  var fieldSectionLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(
    dbStatement,
    publishCache,
    section,
    content,
    language,
    isPreview,
    "<t4 type='content' name='Section Link' output='linkurl' />"
  );
  var fullTextLink = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(
    dbStatement,
    publishCache,
    section,
    content,
    language,
    isPreview,
    "<t4 type='content' name='Name' output='fulltext' use-element='true' filename-element='Name' modifiers='striptags,htmlentities' />"
  );
  var titleLink = "";
  var fieldSummary = content.get("Summary");
  var lastModified =
    '<div class="lastModified" style="display:inline-block">Last modified: <t4 type="meta" meta="last_modified" format="MMMM d, yyyy" /></div>';
  var fieldKeywords = content.get("Keywords");
  var fieldTags = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(
    dbStatement,
    publishCache,
    section,
    content,
    language,
    isPreview,
    "<t4 type='content' name='Tags' output='normal' display_field='value' />"
  );
  var listOfTags = "";

  /* -- Prepare all the things -- */
  var beginningHTML =
    '<div class="knowledgeBaseItemWrapper" id="id<t4 type=\'meta\' meta=\'content_id\' />"><div class="knowledgeBaseItem standardContent">';
  var endingHTML = "</div></div>";

  /* parse the list of tags, add <li> tags*/

  if (fieldTags != "") {
    var arrayOfTags = fieldTags.split(",");
    for (i = 0; i < arrayOfTags.length; i++) {
      listOfTags += '<li class="tag">' + arrayOfTags[i] + "</li>";
    }
    listOfTags = "<ul>" + listOfTags + "</ul>";
  }

  /* determine which link, if any, goes in the title */
  if (fieldSectionLink == "" && fieldArticle == "") {
    titleLink = "<h4>" + fieldArticleTitle + "</h4>";
  } else if (fieldSectionLink == "") {
    titleLink =
      '<h4><a href="' + fullTextLink + '">' + fieldArticleTitle + "</a></h4>";
  } else {
    titleLink =
      '<h4><a href="' +
      fieldSectionLink +
      '">' +
      fieldArticleTitle +
      "</a></h4>";
  }

  /* -- Write all the things -- */
  document.write(
    com.terminalfour.publish.utils.BrokerUtils.processT4Tags(
      dbStatement,
      publishCache,
      section,
      content,
      language,
      isPreview,
      beginningHTML
    )
  );
  document.write(
    com.terminalfour.publish.utils.BrokerUtils.processT4Tags(
      dbStatement,
      publishCache,
      section,
      content,
      language,
      isPreview,
      titleLink
    )
  );
  document.write('<div class="summary">' + fieldSummary + "</div>");
  document.write(listOfTags);
  document.write(
    com.terminalfour.publish.utils.BrokerUtils.processT4Tags(
      dbStatement,
      publishCache,
      section,
      content,
      language,
      isPreview,
      lastModified
    )
  );
  document.write(
    '<div class="keywords" style="display:none;" aria-hidden="true">' +
      fieldKeywords +
      "</div>"
  );
  document.write(endingHTML);
} catch (err) {
  document.write(err.message);
}
