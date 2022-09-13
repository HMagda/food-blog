"use strict";

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  articleAuthor: Handlebars.compile(
    document.querySelector("#template-article-author").innerHTML
  ),
  articleTag: Handlebars.compile(
    document.querySelector("#template-article-tag").innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector("#template-tag-cloud-link").innerHTML
  ),
  allArticleAuthors: Handlebars.compile(
    document.querySelector("#template-all-article-authors").innerHTML
  ),
};

function titleClickHandler(event) {
  const clickedElement = this;
  event.preventDefault();
  const activeLink = document.querySelector(".titles a.active");
  if (activeLink) activeLink.classList.remove("active");
  clickedElement.classList.add("active");
  const activeArticle = document.querySelector(".posts article.active");
  if (activeArticle) activeArticle.classList.remove("active");
  const articleSelector = clickedElement.getAttribute("href");
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add("active");
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optTagsListSelector = ".tags.list",
  optCloudClassMin = 1,
  optCloudClassMax = 5,
  optCloudClassPrefix = "tag-size-",
  optAuthorsListSelector = ".list.authors";

function generateTitleLinks(customSelector = "") {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  let html = "";

  for (const article of articles) {
    const articleId = article.getAttribute("id");
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const classNumber =
    Math.floor(
      ((count - params.min) / (params.max - params.min + 1)) * optCloudClassMax
    ) + optCloudClassMin;
  return classNumber;
}

function generateTags() {
  const allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const articleTagsList = article.querySelector(optArticleTagsSelector);
    let html = "";
    const articleTags = article.getAttribute("data-tags");
    const articleTagsArray = articleTags.split(" ");

    for (let tag of articleTagsArray) {
      const linkHTMLData = { id: tag, tag: tag };
      const linkHTML = templates.articleTag(linkHTMLData);
      html = html + linkHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    articleTagsList.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  const allTagsData = { tags: [] };

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const tag = href.replace("#tag-", "");
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove("active");
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let tagLink of tagLinks) {
    tagLink.classList.add("active");
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');

  for (let linkToTag of linksToTags) {
    linkToTag.addEventListener("click", tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {
  const allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const articleAuthorsList = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute("data-author");

    const linkHTMLData = { id: articleAuthor, name: articleAuthor };
    const linkHTML = templates.articleAuthor(linkHTMLData);

    articleAuthorsList.innerHTML = linkHTML;

    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }

  const allAuthorsList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = { authors: [] };

  for (const author in allAuthors) {
    allAuthorsData.authors.push({
      id: author,
      count: allAuthors[author],
    });
  }

  allAuthorsList.innerHTML = templates.allArticleAuthors(allAuthorsData);
  console.log(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const author = href.replace("#author-", "");
  const activeAuthorLinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );

  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove("active");
  }

  const authorLink = document.querySelector('a[href="' + href + '"]');
  authorLink.classList.add("active");
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const linksToAuthors = document.querySelectorAll('a[href^="#author-"]');

  for (let linkToAuthor of linksToAuthors) {
    linkToAuthor.addEventListener("click", authorClickHandler);
  }
}

addClickListenersToAuthors();
