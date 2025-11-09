let cart = [];
let balance;
//  Load cart from localStorage
async function getCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

//  Save cart to localStorage
async function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
async function setBal(newBal, u = 0) {
  let userCredentials = JSON.parse(localStorage.getItem("userProfile"));
  userCredentials.balance = newBal;
  localStorage.setItem("userProfile", JSON.stringify(userCredentials));
  balance = parseFloat(newBal);
  return balance;
}

async function getBal() {
    let userCredentials = JSON.parse(localStorage.getItem("userProfile"));
    
    // Set a default balance of 1000 for non-logged-in users.
    const defaultBalance = 1000;

    let bal = (userCredentials && userCredentials.balance) ? userCredentials.balance : defaultBalance;
    
    balance = parseFloat(bal);
    
    // Update the DOM
    document.getElementById("balance").innerText = "$" + balance.toFixed(2); // Using toFixed(2) for currency format
    
    return balance;
}

// Add new item (no duplicates)
async function setItem(item, up = 0) {
  const existing = cart.find((c) => c.name === item.name);
  if (existing) {
    if (up == 0) {
      existing.quantity += 1;
    } else {
      existing.quantity = up;
    }
  } else {
    cart.push(item);
  }
  await saveCart();
  await renderCart();
}

//  Remove item from cart
async function removeItem(tittle, price) {
  cart = cart.filter((item) => item.name !== tittle);
  let totalPrice = parseFloat(price.replace("$", "").trim()) || 0;
  let pricebox = document.getElementById("subtotal_header");
  totalPrice =
    parseFloat(pricebox.textContent.replace("$", "").replace(" ", "")) -
    totalPrice;
  pricebox.innerText = "$" + totalPrice == NaN ? "00.00" : totalPrice;
  document.getElementById("cart-count").innerText = `( ${cart.length} )`;
  await saveCart();
  await renderCart();
}

//  Render all cart items
async function renderCart(disableBtn = 0) {
  let toalPrice = 0;
  const cartBox = document.getElementById("cart");
  if (!cartBox) return;

  await getCart();
  cartBox.innerHTML = "";

  if (cart.length === 0) {
    cartBox.innerHTML = `<li class="text-center text-gray-500 py-4">Your cart is empty 🛒</li>`;
    return;
  }

  // Add each item
  for (let i = 0; i < cart.length; i++) {
    toalPrice +=
      parseFloat(cart[i].price.split("$")[1]) * parseInt(cart[i].quantity);
    const t = `
      <li class="flex items-start justify-between pb-2 border-b border-gray-200">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0">
            <a href="#">
              <img class="w-[75px] h-[75px] object-cover rounded-md"
                   src="${cart[i].img}"
                   alt="${cart[i].name}"
                   onerror="this.onerror=null;this.src='https://placehold.co/75x75/EAEAEA/999?text=Image+Error';" />
            </a>
          </div>
          <div class="cart-content text-left space-y-1">
            <h5 class="text-sm font-medium">
              <a href="#"
                 class="text-gray-700 hover:text-[#8a8f6a] transition">${
                   cart[i].name
                 }</a>
            </h5>
            <div class="cart-price text-sm font-normal text-gray-500">
              <span class="ammount mr-1 text-gray-500">${
                cart[i].quantity
              } <i class="fas fa-times text-xs"></i></span>
              <span class="price text-[#323232] font-semibold">${
                cart[i].price
              }</span>
            </div>
          </div>
        </div>
        <div class="del-icon pt-1">
          <button ${
            disableBtn ? "disabled" : undefined
          } class="deleteItem text-gray-400 hover:text-red-500 transition"
                data-title="${cart[i].name}"  data-img="${
      cart[i].img
    }" data-price="${cart[i].price}">
            ❌
          </button>
        </div>
      </li>
    `;
    cartBox.innerHTML += t;
  }

  let pricebox = document.getElementById("subtotal_header");
  pricebox.innerText = "$" + toalPrice;
  toatlPriceGlobal = toalPrice;
  document.getElementById("cart-count").innerText = `( ${cart.length} )`;
  deleteItems();
}

async function deleteItems() {
  document.querySelectorAll(".deleteItem").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const title = e.target.dataset.title;
      removeItem(title, e.target.dataset.price);
      return;
    });
  });
}

//  Main handler: attach button listeners
async function addCartHandler() {
  await renderCart();

  // Event delegation for dynamically created buttons
  document.addEventListener("click", async (e) => {
    // ADD to cart
    const btn = e.target.closest(".addCartBtn");
    if (btn) {
      const productData = btn.dataset.product;
      if (!productData) return;

      const product = JSON.parse(productData);

      await getCart();
      await setItem({
        name: product.title,
        img: product.image1,
        quantity: 1,
        price: product.price,
      });

      btn.textContent = "✓ Added";
      setTimeout(() => (btn.textContent = "+ Add to Cart"), 1000);
      return;
    }
  });

  // DELETE from cart
}

addCartHandler();

//  Cart Page

//Cart Page Item Remover
async function deleteItemsCartPage() {
  document.querySelectorAll(".deleteItems").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tittle = e.target.dataset.tittle;
      removeItemCartPage(
        tittle,
        e.target.dataset.price,
        e.target.dataset.quantity
      );
      return;
    });
  });
}

async function removeItemCartPage(tittle, price, quantity) {
  cart = cart.filter((item) => item.name !== tittle);
  let totalPrice = parseFloat(
    document.getElementById("subtotals").innerText.split("$")[1]
  );

  totalPrice =
    totalPrice -
    parseFloat(
      document
        .getElementById("subtotals")
        .textContent.replace("$", "")
        .replace(" ", "")
    ) *
      parseInt(quantity);
  document.getElementById("subtotals").innerText =
    "$" + totalPrice == NaN ? "00.00" : totalPrice;
  document.getElementById("total").innerText =
    "$" + totalPrice == NaN ? "00.00" : totalPrice;
  removeItem(tittle, price);
  cartPageRender();
}

let toatlPriceGlobal = 0;

async function cartPageRender() {
  let cartITEM = document.getElementById("cart-items-container");
  cartITEM.innerHTML = " ";
  let totalPrice = 0;
  // Add each item
  for (let i = 0; i < cart.length; i++) {
    totalPrice +=
      parseFloat(cart[i].price.replace("$", "").replace(" ", "")) *
      parseInt(cart[i].quantity);
    const productData = {
      name: cart[i].name,
      price: cart[i].price,
      img: cart[i].img,
      quantity: cart[i].quantity,
    };

    const tt = `
    <tr>
      <td class="product-thumbnail">
        <a href="#">
          <img class="w-16 h-16 object-cover rounded-md"
            src="${cart[i].img}"
            alt="${cart[i].name}">
        </a>
      </td>
      <td class="cart-product-name">
        <a href="#">${cart[i].name}</a>
      </td>
      <td class="product-price">
        <span class="amount">${cart[i].price}</span>
      </td>
      <td class="product-quantity">
        <div class="cart-plus-minus mx-auto"
          data-product='${JSON.stringify(productData)}'>
          <span class="qty-btn minus-btn">-</span>
          <input type="text" value="${parseInt(
            cart[i].quantity
          )}" readonly class="text-center" />
          <span class="qty-btn plus-btn">+</span>
        </div>
      </td>
      <td class="product-subtotal">
        <span class="amount">$${
          parseFloat(cart[i].price.replace("$", "").trim()) *
          parseInt(cart[i].quantity)
        }</span>
      </td>
      <td class="product-remove text-center">
        <button class="deleteItems text-gray-400 hover:text-red-500 transition"
          data-img="${cart[i].img}" data-price="${
      cart[i].price
    }" data-tittle="${cart[i].name}" 
          data-quantity="${cart[i].quantity}">
          ❌
        </button>
      </td>
    </tr>`;
    cartITEM.innerHTML += tt;
  }

  document.getElementById("subtotals").innerText = "$" + totalPrice;
  document.getElementById("total").innerText = "$" + totalPrice;
  document.getElementById("subtotal_header").innerText = "$" + toatlPriceGlobal;
  toatlPriceGlobal = totalPrice;
  deleteItemsCartPage();
}

async function cartPageInit() {
  await cartPageRender(); // your function to render the cart

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;
    const container = btn.closest(".cart-plus-minus");
    const product = JSON.parse(container.dataset.product);
    const price = parseFloat(product.price.replace("$", "").trim());
    toatlPriceGlobal = toatlPriceGlobal - price * product.quantity;
    const input = container.querySelector("input");
    let qty = parseInt(input.value);

    // 1️⃣ Update quantity
    // if (btn.classList.contains("plus-btn")) qty++;
    // if (btn.classList.contains("minus-btn") && qty > 1) qty--;

    input.value = qty;
    product.quantity = qty;

    // 2️⃣ Update dataset so it’s always fresh
    container.dataset.product = JSON.stringify(product);

    // 3️⃣ Update subtotal cell
    const row = btn.closest("tr");

    const subtotalCell = row.querySelector(".product-subtotal .amount");
    subtotalCell.textContent = `$${(price * qty).toFixed(2)}`;
    toatlPriceGlobal = toatlPriceGlobal + price * qty;
    // 4️⃣ Update global subtotal

    document.getElementById("subtotals").innerText = "$" + toatlPriceGlobal;
    document.getElementById("total").innerText = "$" + toatlPriceGlobal;
    document.getElementById("subtotal_header").innerText =
      "$" + toatlPriceGlobal;
    // 5️⃣ Save updated cart in localStorage
    await setItem(
      {
        name: product.name,
        img: product.img,
        quantity: qty,
        price: product.price,
      },
      qty
    );
    updateCartSubtotal();
  });
}

// Helper to calculate & update subtotal
function updateCartSubtotal() {
  const cartRows = document.querySelectorAll("tr");
  let total = 0;

  cartRows.forEach((row) => {
    const subtotalCell = row.querySelector(".product-subtotal .amount");
    if (subtotalCell) {
      const val = parseFloat(subtotalCell.textContent.replace("$", ""));
      if (!isNaN(val)) total += val;
    }
  });

  const subtotalBox = document.getElementById("subtotal");
  if (subtotalBox) subtotalBox.textContent = `$${total.toFixed(2)}`;
}
getBal();

getProfile();

let authArea = document.getElementById("auth-area");
if (userCredentials.email && userCredentials.password) {
  renderAuthArea();
} else {
  authArea.innerHTML = `
            <a href="login.html" class="os-btn border border-[#bc8246] text-[#bc8246] px-4 py-2 rounded hover:text-white hover:bg-[#bc8246] transition-all duration-300">
                Login
            </a>
        `;
  document.body.innerHTML += `<div id="loginpopup" class="fixed z-[9999999] top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md 
            bg-white border border-gray-200 rounded-2xl shadow-lg 
            flex items-center justify-between gap-4 px-5 py-4
            text-gray-700">

        <!-- Icon + Text -->
        <div class="flex items-center gap-3">
            <div class="p-2 bg-[#bc8246]/10 text-[#bc8246] rounded-full">
                <i class="fa-solid fa-circle-exclamation"></i>
            </div>
            <p class="text-sm">
                You need to <span class="font-semibold text-[#323232]">log in</span> to continue.
            </p>
        </div>

        <!-- Login Button -->
        <button onclick="window.location.href='./login.html'" class="bg-[#bc8246] text-white text-sm px-4 py-2 rounded-lg font-medium 
            hover:bg-[#a96d38] transition">
            Login
        </button>
    </div>`;
}

function renderAuthArea() {
  const authArea = document.getElementById("auth-area");
  authArea.innerHTML = "";

  // Logged in → show profile icon + dropdown
  authArea.innerHTML = `
            <div class="relative group">
                <button id='profilebtn' class="flex items-center space-x-2 pt-[27px] pb-[30px] hover:text-[#bc8246]">
                        <i class="fal fa-user-circle"></i>
                  <span class="hidden md:inline">${
                    userCredentials.fname || userCredentials.lname
                      ? userCredentials.fname + " " + userCredentials.lname
                      : userCredentials.email
                  }</span>
                </button>
                <ul class="absolute right-0 mt-1 hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-md w-32 text-left z-[10020]">
                    <li><a href="./profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a></li>
                    <li><button id="logout-btn" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button></li>
                </ul>
            </div>
        `;

  document.getElementById("profilebtn").addEventListener("click", () => {
    window.location.href = "./profile.html";
  });
  document.getElementById("logout-btn").addEventListener("click", () => {
    logout();
    renderAuthArea();
  });

  // Not logged in → show login button
}
