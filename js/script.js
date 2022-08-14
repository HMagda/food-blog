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
  optTitleListSelector = ".titles";

function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  const articles = document.querySelectorAll(optArticleSelector);
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
  console.log(links);

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();
