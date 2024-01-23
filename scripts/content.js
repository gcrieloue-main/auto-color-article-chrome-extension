chrome.storage.local.get(["auto_article_extension_enabled"]).then((result) => {
  auto_article_extension_enabled = result.auto_article_extension_enabled;
  chrome.storage.local.set({
    auto_article_extension_enabled: !auto_article_extension_enabled,
  });
  if (!auto_article_extension_enabled) {
    refresh();
  } else {
    colorize();
  }
});

function colorize() {
  const article = document.querySelector("article");

  const colors = [
    "#FAEDCB",
    "#C9E4DE",
    "#C6DEF1",
    "#DBCDF0",
    "#F2C6DE",
    "#F7D9C4",
  ];

  if (article) {
    const p = article.querySelectorAll("p");
    const ul = article.querySelectorAll("ul li");
    const ol = article.querySelectorAll("ol li");
    const items = [...p, ...ul, ...ol];
    items.forEach((item, i) => {
      item.style.backgroundColor = colors[i % colors.length];
      item.style.color = "rgb(36, 36, 36)";
    });
  }
}

function refresh() {
  chrome.runtime.sendMessage({ message: "refresh" }, function (response) {
    console.log(response.message);
  });
}
