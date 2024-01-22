const article = document.querySelector("article");

const colors = ["#FAEDCB","#C9E4DE","#C6DEF1","#DBCDF0","#F2C6DE","#F7D9C4"]

if (article) {
  const paragraphs = article.querySelectorAll("p");
  paragraphs.forEach((paragraph, i) => {
    paragraph.style.backgroundColor = colors[i%colors.length];
 })
}