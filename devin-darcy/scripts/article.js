'use strict';

let blogArticles = [];

function Article (rawDataObject) {
  for (let key in rawDataObject) {
    this[key] = rawDataObject[key];
  }
};

Article.prototype.toHtml = function() {
  // TODONE: Use Handlebars to render your articles. Get your template from the DOM and "compile" your template with Handlebars.
  let template = $('#article-template').html();
  let templateRender = Handlebars.compile(template);

  // REVIEW: If your template will use properties that aren't on the object yet, add them.
  // Since your template can't hold any JS logic, we need to execute the logic here.
  // The result is added to the object as a new property, which can then be referenced by key in the template.
  // For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);


  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  // REVIEW: The ternary operator above accomplishes this same logic.
  // if(this.publishedOn) {
  //   this.publishStatus = `published ${this.daysAgo} days ago`;
  // } else {
  //   this.publishStatus = '(draft)';
  // }

  // TODONE: Use the method that Handlebars gave you to return your filled-in html template for THIS article.
  return templateRender(this);

};

// COMMENT: Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?
// PUT YOUR RESPONSE HERE
// Because we are passing in 2 parameters to be sorted in this function. The forEach functions loop through arrays so they are not taking in 2 separate parameters.
rawData.sort((a,b) => {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
  blogArticles.push(new Article(articleObject));
});

blogArticles.forEach(article => {
  $('#articles').append(article.toHtml());
});
