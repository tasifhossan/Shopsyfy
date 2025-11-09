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
                                        <a href="#" class="w-img block">
                                            <img src="${prod[i]["image1"]}"
                                                alt="product-img" draggable="false">
                                            <img class="product__thumb-2"
                                                src="${prod[i]["image2_hover"]}"
                                                alt="product-img" draggable="false">
                                        </a>
                                        <div class="product__action transition-3">
                                             <button href="#" data-bs-toggle="tooltip" data-placement="top" class='addtowishlist' data-product='${JSON.stringify(
                                               p
                                             ).replace(/'/g, "&apos;")}'
                                                title="Add to Wishlist">
                                                <i class="fal fa-heart"></i>
                                            </button>
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
                                            <h4><a href="#">${
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
                                        <a href="#" class="w-img block">
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
                                            <button href="#" data-bs-toggle="tooltip" data-placement="top" class='addtowishlist' data-product='${JSON.stringify(
                                              p
                                            ).replace(/'/g, "&apos;")}'
                                                title="Add to Wishlist">
                                                <i class="fal fa-heart"></i>
                                            </button>
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
                                            <h4><a href="#">${
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
                                  <a href="#" class="w-img ">
                                      <img src="${myContent["blogPosts"][i]["image"]}" alt="${myContent["blogPosts"][i]["title"]}" draggable="false"
                                          class="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.05]">
                                  </a>
                              </div>
                              <div class="blog__content p-4 text-left">
                                  <h4 class="text-lg font-semibold mb-2"><a href="#"
                                          class="text-gray-900 hover:text-bc8246 transition-colors">${myContent["blogPosts"][i]["title"]}</a></h4>
                                  <div class="blog__meta text-xs text-gray-500 mb-3">
                                      <span>By <a href="#" class="hover:text-bc8246">${myContent["blogPosts"][i]["author"]}</a></span>
                                      <span class="ml-3">${myContent["blogPosts"][i]["date"]}</span>
                                  </div>
                                  <p class="text-sm text-gray-600 mb-5">${myContent["blogPosts"][i]["excerpt"]}</p>
                                  <a href="#"
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
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });

  document.addEventListener("click", async (e) => {
    // ADD to cart
    const btn = e.target.closest(".addtowishlist");
    if (btn) {
      e.preventDefault();
      const productData = btn.dataset.product;
      if (!productData) return;

      const product = JSON.parse(productData);

      await getwishlist();
      await setWishlist({
        title: product.title,
        image: product.image1,

        price: product.price,
      });

      btn.textContent = "✓ Added";

      return;
    }
  });

  //Sorting Trending Producuts
  const allTrendingProducts = [...myContent.trendingProducts];
  let currentFilter = "default";
  let currentSearch = "";

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    currentFilter = e.target.value;
    updateProductDisplay();
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    updateProductDisplay();
  });

  function updateProductDisplay() {
    // Start with the full, original product list
    let processedProducts = [...allTrendingProducts];

    // 1. Apply Search Filter (if any)
    if (currentSearch !== "") {
      processedProducts = processedProducts.filter((p) =>
        p.title.toLowerCase().includes(currentSearch)
      );
    }

    // 2. Apply Sorting (to the already-filtered list)
    if (currentFilter === "priceLowHigh") {
      processedProducts.sort((a, b) => {
        return (
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
        );
      });
    } else if (currentFilter === "priceHighLow") {
      processedProducts.sort((a, b) => {
        return (
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
        );
      });
    } else if (currentFilter === "nameAZ") {
      processedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (currentFilter === "nameZA") {
      processedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    fillTrendingProd(processedProducts);
  }
}
fillDatas();
