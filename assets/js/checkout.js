// let cart = [];

// //  Load cart from localStorage
// async function getCart() {
//   cart = JSON.parse(localStorage.getItem("cart")) || [];
//   return cart;
// }

async function renderCart() {
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
            <a href="product-details.html">
              <img class="w-[75px] h-[75px] object-cover rounded-md"
                   src="${cart[i].img}"
                   alt="${cart[i].name}"
                   onerror="this.onerror=null;this.src='https://placehold.co/75x75/EAEAEA/999?text=Image+Error';" />
            </a>
          </div>
          <div class="cart-content text-left space-y-1">
            <h5 class="text-sm font-medium">
              <a href="product-details.html"
                 class="text-gray-700 hover:text-[#8a8f6a] transition">${cart[i].name}</a>
            </h5>
            <div class="cart-price text-sm font-normal text-gray-500">
              <span class="ammount mr-1 text-gray-500">${cart[i].quantity} <i class="fas fa-times text-xs"></i></span>
              <span class="price text-[#323232] font-semibold">${cart[i].price}</span>
            </div>
          </div>
        </div>
        <div class="del-icon pt-1">
          <button class="deleteItem text-gray-400 hover:text-red-500 transition"
                  data-img="${cart[i].img}" data-price="${cart[i].price}">
            ❌
          </button>
        </div>
      </li>
    `;
    cartBox.innerHTML += t;
  }

  let pricebox = document.getElementById("subtotal_header");
  pricebox.innerText = "$" + toalPrice;
  document.getElementById("cart-count").innerText = `( ${cart.length} )`;
}

async function checkoutRender() {
  let itemCheckout = document.getElementById("itemCheckout");
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

    const t = `
    
         <tr class="cart_item">
                                                <td class="product-name py-3 pr-4">
                                                    ${cart[i].name} <strong
                                                        class="product-quantity font-normal text-bc8246 ml-1"> ×
                                                        ${
                                                          cart[i].quantity
                                                        }</strong>
                                                </td>
                                                <td class="product-total text-right py-3 pl-4">
                                                    <span class="amount font-semibold text-323232">${parseFloat(
                                                      cart[i].price
                                                        .replace("$", "")
                                                        .replace(" ", "")
                                                    )} * ${parseInt(
      cart[i].quantity
    )}</span>
                                                </td>
                                            </tr>
    `;

    itemCheckout.innerHTML += t;
  }
  document.getElementById("balance2").innerText = "$" + balance;
  document.getElementById("checkoutAmmount").innerText = "$" + totalPrice;

  let shippingPrice = document.getElementById("flat_rate").checked
    ? totalPrice + 7
    : totalPrice;
  document.getElementById("orderTotal").innerText = "$" + shippingPrice;
  document.getElementById("flat_rate").addEventListener("change", function () {
    if (this.checked == true) {
      shippingPrice = totalPrice + 7;
    }

    document.getElementById("orderTotal").innerText = "$" + shippingPrice;
  });
  document
    .getElementById("free_shipping")
    .addEventListener("change", function () {
      if (this.checked == true) {
        shippingPrice = totalPrice;
      }

      document.getElementById("orderTotal").innerText = "$" + shippingPrice;
    });

  let hasCoupon = false;
  document.getElementById("coupons").addEventListener("click", (e) => {
    e.preventDefault();
    let val = document.getElementById("coupontext").value;
    if (!hasCoupon) {
      if (val.length > 4) {
        hasCoupon = true;
        renderAlert(
          "🎉 Coupon applied successfully! You got a 10% discount + Free shipping. "
        );
        document.getElementById("coupon-applied").classList.remove("hidden");
        document
          .getElementById("coupon-applied")
          .querySelector(".amount").innerText = totalPrice - totalPrice * 0.1;
      } else {
        renderAlert("❌ Invalid coupon code. Please try again.", "bg-red-600");
      }
    } else {
      renderAlert("Coupon already claimed.");
    }
  });
  document.getElementById("orderbtn").addEventListener("click", (e) => {
    event.preventDefault();
    let totalF = 0;
    let item = document
      .querySelector(".checkbox-form")
      .getElementsByTagName("input");
    for (let i = 0; i < item.length; i++) {
      if (!(item[i].value == "")) totalF++;
    }

    if (parseFloat(balance) - totalPrice < 0) {
      renderAlert(
        `⚠️ Insufficient balance 💸\n Your balance is $${balance}, but the order total is $${totalPrice}`,
        "bg-red-600"
      );
    } else if (cart.length < 1) renderAlert(" Cart is Empty.🛒", "bg-red-600");
    else if (totalF < 12) {
      renderAlert("Please fill all required fields", "bg-red-600");
    } else {
      totalPrice = totalPrice - totalPrice * 0.1;
      cart = [];
      localStorage.removeItem("cart");
      setBal(parseFloat(balance) - totalPrice);
      getBal();
      renderCart();
      document.getElementById("cart-count").innerText = "( 0 )";
      document.getElementById("balance2").innerText = "$" + balance;
      document.getElementById("itemCheckout").innerHTML = "";
      renderAlert(
        `✅ Order placed successfully! New balance: $${balance} ${
          hasCoupon ? " + 10% discount." : ""
        }`
      );
    }
  });
  toatlPriceGlobal = totalPrice;
}

checkoutRender();
let isAlertVisible = false;
let timer;

function renderAlert(text, bg = "bg-[#040714ab]") {
  // If an alert already exists, remove it
  if (isAlertVisible) {
    document.getElementById("alert").classList.add("hidden");
    document.getElementById("alert").innerHTML = "";
    clearTimeout(timer);
  } else {
    isAlertVisible = true;
  }

  // HTML structure (same format you used)
  let al = `
    
        <div class=" rounded-xl text-[1rem] py-5 text-white ${bg} w-1/2 text-center ">
            <span>
                ${text}
            </span>
        </div>
  `;
  document.getElementById("alert").classList.remove("hidden");
  document.getElementById("alert").classList.add("visible");

  document.getElementById("alert").innerHTML = al;

  // Remove the alert after 3 seconds
  timer = setTimeout(() => {
    isAlertVisible = false;
    document.getElementById("alert").classList.add("hidden");
    document.getElementById("alert").innerHTML = "";
  }, 3000);
}

getProfile();

let storedProfile = userCredentials;
const userData = {
  fname: storedProfile.fname || "",
  lname: storedProfile.lname || "",
  email: storedProfile.email || "",
  //password: storedProfile.password || "",
  phone: storedProfile.phone || "",
  address: storedProfile.address || "",
  city: storedProfile.city || "",
  postal: storedProfile.postal || "",
  country: storedProfile.country || "",
};

document.getElementById("country").querySelector("option").innerText =
  userData.country;
document.getElementById("fname").value = userData.fname;
document.getElementById("lname").value = userData.lname;
document.getElementById("address").value = userData.address;
document.getElementById("city").value = userData.city;
document.getElementById("state").value = userData.country;
document.getElementById("number").value = userData.phone;
document.getElementById("zip").value = userData.postal;
document.getElementById("email").value = userData.email;
