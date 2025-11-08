async function fetchData() {
  try {
    const response = await fetch(
      "https://product-api.battleshipnb.workers.dev/"
    );
    if (!response.ok) throw new Error("Status Code " + response.status);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
let myContent;

function fillTrendingProd(prod) {
  let trendingProducts = document.querySelector("#trendingProducts");
  trendingProducts.innerHTML = "";
  for (let i = 0; i < prod.length; i++) {
    const p = prod[i];

    let tmpHtml = `

             <div class="sale__item">
                                <div class="product__wrapper mb-16">
                                    <div class="product__thumb">
                                        <a href="product-details.html" class="w-img block">
                                            <img src="${prod[i]["image1"]}"
                                                alt="product-img" draggable="false">
                                            <img class="product__thumb-2"
                                                src="${prod[i]["image2_hover"]}"
                                                alt="product-img" draggable="false">
                                        </a>
                                        <div class="product__action transition-3">
                                            <a href="#" data-bs-toggle="tooltip" data-placement="top"
                                                title="Add to Wishlist">
                                                <i class="fal fa-heart"></i>
                                            </a>
                                            <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Compare">
                                                <i class="fal fa-sliders-h"></i>
                                            </a>
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#productModalId">
                                                <i class="fal fa-search"></i>
                                            </a>
                                        </div>
                                         <div class="product__sale">
                                            <span class="new">${
                                              prod[i]["saleInfo"]["new"]
                                            }</span>
                                            <span class="percent">${
                                              prod[i]["saleInfo"]["percent"]
                                            }</span>
                                        </div>
                                    </div>
                                    <div class="product__content relative">
                                        <div class="product__content-inner">
                                            <h4><a href="product-details.html">${
                                              prod[i]["title"]
                                            }</a></h4>
                                            <div class="product__price transition-3">
                                                <span>${prod[i]["price"]}</span>
                                                <span class="old-price">${
                                                  prod[i]["oldPrice"]
                                                }</span>
                                            </div>
                                        </div>
                                        <div class="add-cart absolute transition-3">
                                            <button class="addCartBtn" data-product='${JSON.stringify(
                                              p
                                            ).replace(/'/g, "&apos;")}'
>+ Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
      `;

    trendingProducts.innerHTML += tmpHtml;
  }
}

async function fillDatas() {
  myContent = await await fetchData();
  let blgoPosts = document.querySelector("#blgoPosts");
  let saleOFF = document.querySelector("#scroll-container");

  //Trending PRODUCTs
  fillTrendingProd(myContent.trendingProducts);
  //   saleOFF
  for (let i = 0; i < myContent.saleOffProducts.length; i++) {
    const p = myContent.saleOffProducts[i];

    let tmpHtml = `
 <div class="sale__item flex-shrink-0 ">
                                <div class="product__wrapper mb-16">
                                    <div class="product__thumb">
                                        <a href="product-details.html" class="w-img block">
                                            <img src="${
                                              myContent["saleOffProducts"][i][
                                                "image1"
                                              ]
                                            }"
                                                alt="product-img" draggable="false">
                                            <img class="product__thumb-2"
                                                src="${
                                                  myContent["saleOffProducts"][
                                                    i
                                                  ]["image2_hover"]
                                                }"
                                                alt="product-img" draggable="false">
                                        </a>
                                        <div class="product__action transition-3">
                                            <a href="#" data-bs-toggle="tooltip" data-placement="top"
                                                title="Add to Wishlist">
                                                <i class="fal fa-heart"></i>
                                            </a>
                                            <a href="#" data-bs-toggle="tooltip" data-placement="top" title="Compare">
                                                <i class="fal fa-sliders-h"></i>
                                            </a>
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#productModalId">
                                                <i class="fal fa-search"></i>
                                            </a>
                                        </div>
                                        <div class="product__sale ">
                                            <span class="new">${
                                              myContent["saleOffProducts"][i][
                                                "saleInfo"
                                              ]["new"] ?? ""
                                            }</span>
                                            <span class="percent">${
                                              myContent["saleOffProducts"][i][
                                                "saleInfo"
                                              ]["percent"] ?? ""
                                            }</span>
                                        </div>
                                    </div>
                                    <div class="product__content relative">
                                        <div class="product__content-inner">
                                            <h4><a href="shop-details.html">${
                                              myContent["saleOffProducts"][i][
                                                "title"
                                              ]
                                            }</a></h4>
                                            <div class="product__price transition-3">
                                                <span>${
                                                  myContent["saleOffProducts"][
                                                    i
                                                  ]["price"]
                                                }</span>
                                                <span class="old-price">${
                                                  myContent["saleOffProducts"][
                                                    i
                                                  ]["oldPrice"]
                                                }</span>
                                            </div>
                                        </div>
                                        <div class="add-cart absolute transition-3">
                                            <button class="addCartBtn" data-product='${JSON.stringify(
                                              p
                                            ).replace(/'/g, "&apos;")}'
>+ Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
      `;

    saleOFF.innerHTML += tmpHtml;
  }

  //BLOG ITEMS
  for (let i = 0; i < myContent.blogPosts.length; i++) {
    let tmpHtml = `

            <div class="swiper-slide blog__item h-auto">
                              <div class="blog__thumb overflow-hidden w-full h-auto">
                                  <a href="blog-details.html" class="w-img ">
                                      <img src="${myContent["blogPosts"][i]["image"]}" alt="${myContent["blogPosts"][i]["title"]}" draggable="false"
                                          class="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.05]">
                                  </a>
                              </div>
                              <div class="blog__content p-4 text-left">
                                  <h4 class="text-lg font-semibold mb-2"><a href="blog-details.html"
                                          class="text-gray-900 hover:text-bc8246 transition-colors">${myContent["blogPosts"][i]["title"]}</a></h4>
                                  <div class="blog__meta text-xs text-gray-500 mb-3">
                                      <span>By <a href="#" class="hover:text-bc8246">${myContent["blogPosts"][i]["author"]}</a></span>
                                      <span class="ml-3">${myContent["blogPosts"][i]["date"]}</span>
                                  </div>
                                  <p class="text-sm text-gray-600 mb-5">${myContent["blogPosts"][i]["excerpt"]}</p>
                                  <a href="blog-details.html"
                                      class="os-btn !w-auto bg-transparent border-gray-300 text-gray-900 hover:text-white hover:bg-bc8246 hover:border-bc8246">read
                                      more</a>
                              </div>
                          </div>

      `;

    blgoPosts.innerHTML += tmpHtml;
  }
  const scrollContainer = document.querySelector("#scroll-container");
  // Wrap your existing items into Swiper wrapper and slides dynamically
  const wrapper = document.createElement("div");
  wrapper.classList.add("swiper-wrapper");

  // Convert each sale__item to a swiper-slide
  const items = Array.from(scrollContainer.children);
  items.forEach((item) => {
    item.classList.add("swiper-slide");
    wrapper.appendChild(item);
  });

  scrollContainer.innerHTML = ""; // clear existing
  scrollContainer.classList.add("swiper"); // make container swiper
  scrollContainer.appendChild(wrapper);

  // Optional pagination & navigation
  const pagination = document.createElement("div");
  pagination.classList.add("swiper-pagination");
  const next = document.createElement("div");
  next.classList.add("swiper-button-next");
  const prev = document.createElement("div");
  prev.classList.add("swiper-button-prev");

  scrollContainer.appendChild(pagination);
  scrollContainer.appendChild(next);
  scrollContainer.appendChild(prev);

  // Initialize Swiper
  new Swiper("#scroll-container", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });
}
fillDatas();

document.getElementById("sortSelect").addEventListener("change", (e) => {
  console.log(e.target.value);
  currentFilter = e.target.value;
  filterTrending(e.target.value);
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  const v = e.target.value.trim().toLowerCase();
  console.log(v);
  if (v === "") {
    // If input is cleared → show all products
    tmpProduction = [...myContent.trendingProducts];
  } else {
    // Filter by title text
    tmpProduction = myContent.trendingProducts.filter((p) =>
      p.title.toLowerCase().includes(v)
    );
  }

  // ✅ Always re-render (for both typing and deleting)
  filterTrending(currentFilter);
});

let tmpProduction;
let currentFilter = "default";
//priceLowHigh
//priceHighLow
//default
//nameAZ
//nameZA

function filterTrending(val) {
  let tmpProd = [...tmpProduction];
  if (val === "priceLowHigh") {
    tmpProd.sort((a, b) => {
      return (
        parseFloat(a.price.replace("$", "")) -
        parseFloat(b.price.replace("$", ""))
      );
    });
  } else if (val === "priceHighLow") {
    tmpProd.sort((a, b) => {
      return (
        parseFloat(b.price.replace("$", "")) -
        parseFloat(a.price.replace("$", ""))
      );
    });
  } else if (val === "nameAZ") {
    tmpProd.sort((a, b) => a.title.localeCompare(b.title));
  } else if (val === "nameZA") {
    tmpProd.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    fillTrendingProd(tmpProduction);
    return;
  }

  fillTrendingProd(tmpProd);
}
