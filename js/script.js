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
  optArticleAuthorSelector = ".post-author";

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
    }

    articleTagsList.innerHTML = html;
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    console.log(tagLink);
    tagLink.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let linkToTag of linksToTags) {
    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
    const articleAuthorsList = article.querySelector(optArticleAuthorSelector);
    let html = "";
    const articleAuthors = article.getAttribute("data-author");
    // const articleAuthorsArray = articleAuthors.split(" ");
    console.log(articleAuthors);

    const linkHTML =
      '<a href="#author-' +
      articleAuthors +
      '">' +
      articleAuthors +
      "</a>&nbsp;";
    html = html + linkHTML;

    // for (let author of articleAuthorsArray) {
    //   const linkHTML =
    //     '<a href="#author-' + author + '">' + author + "</a>&nbsp;";
    //   html = html + linkHTML;
    // }

    articleAuthorsList.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace("#author-", "");
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );
  console.log(activeAuthorLinks.length);
  /* START LOOP: for each active tag link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLink = document.querySelector('a[href="' + href + '"]');
  console.log(authorLink);

  /* START LOOP: for each found tag link */
  // for (let tagLink of tagLinks) {
  // /* add class active */
  // console.log(tagLink)
  //   tagLink.classList.add("active");
  // /* END LOOP: for each found tag link */
  // }

  authorLink.classList.add("active");

  console.log(author);
  /* execute function "generateTitleLinks" with article selector as argument */
  // generateTitleLinks('[data-tags~="' + tag + '"]');
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const linksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let linkToAuthor of linksToAuthors) {
    /* add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener("click", authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
