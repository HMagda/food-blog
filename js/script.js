"use strict";

function titleClickHandler(event) {
  event.preventDefault();
  const activeLink = document.querySelector(".titles a.active");
  if (activeLink) activeLink.classList.remove("active");
  const clickedElement = this;
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
  optTagsListSelector = ".tags.list";

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
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();


function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const articleTagsList = article.querySelector(optArticleTagsSelector);
    let html = "";
    const articleTags = article.getAttribute("data-tags");
    const articleTagsArray = articleTags.split(" ");

    for (let tag of articleTagsArray) {
      const linkHTML =
        '<li><a href="#tag-' + tag + '">' + tag + "</a>&nbsp;</li>";
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

  // const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);

  let allTagsHTML = "";

  for (let tag in allTags) {
    const linkHTML =
      '<li><a href="#tag-' +
      tag +
      '">' +
      tag +
      "</a>" +
      " " +
      "(" +
      allTags[tag] +
      ")" +
      "</li>";
    allTagsHTML = allTagsHTML + linkHTML;
  }

  tagList.innerHTML = allTagsHTML;
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
    console.log(tagLink);
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
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const articleAuthorsList = article.querySelector(optArticleAuthorSelector);
    let html = "";
    const articleAuthors = article.getAttribute("data-author");

    const linkHTML =
      '<a href="#author-' +
      articleAuthors +
      '">' +
      articleAuthors +
      "</a>&nbsp;";
    html = html + linkHTML;
    articleAuthorsList.innerHTML = html;
  }
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
