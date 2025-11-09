let userCredentials = {};
async function getProfile() {
  userCredentials = JSON.parse(localStorage.getItem("userProfile")) || {};
  return userCredentials;
}
getProfile();

function profileRender() {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const sections = document.querySelectorAll('[id^="section-"]');

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebarLinks.forEach((l) => l.classList.remove("active-link"));
      link.classList.add("active-link");
      const sectionId = link.dataset.section;
      sections.forEach((sec) => sec.classList.add("hidden"));
      document
        .getElementById(`section-${sectionId}`)
        .classList.remove("hidden");
    });
  });
  const profileAvatar = document.getElementById("profileAvatar");
  const uploadAvatar = document.getElementById("uploadAvatar");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const zip = document.getElementById("zip");
  const country = document.getElementById("country");
  const password = document.getElementById("password");
  const saveChangesBtn = document.getElementById("saveChanges");
  const balance = document.getElementById("balance");
  //   const paymentMethod = document.getElementById("paymentMethod");
  //   const cardNumber = document.getElementById("cardNumber");
  //   const expiryDate = document.getElementById("expiryDate");
  //   const cvv = document.getElementById("cvv");
  //   const savePaymentInfo = document.getElementById("savePaymentInfo");
  //   const orderList = document.getElementById("orderList");
  const alertBox = document.createElement("p");
  alertBox.id = "alertBox";
  alertBox.className = "text-center mt-6 text-sm hidden";
  document.querySelector("#section-account").appendChild(alertBox);

  function showAlert(msg, success = false) {
    alertBox.textContent = msg;
    alertBox.classList.remove("hidden", "text-red-500", "text-green-600");
    alertBox.classList.add(success ? "text-green-600" : "text-red-500");
    setTimeout(() => alertBox.classList.add("hidden"), 2500);
  }
  const storedProfile = userCredentials;

  const userData = {
    fname: storedProfile.fname || "",
    lname: storedProfile.lname || "",
    email: storedProfile.email || "",
    password: storedProfile.password || "",
    phone: storedProfile.phone || "",
    address: storedProfile.address || "",
    city: storedProfile.city || "",
    postal: storedProfile.postal || "",
    country: storedProfile.country || "",
    balance: storedProfile.balance || "",
  };

  if (userData.email == "" && userData.password == "") {
    showAlert("INVALID CREDENTIAL, REDIRECTING....");
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 3000);
  }
  firstName.value = userData.fname;
  lastName.value = userData.lname;
  email.value = userData.email;
  phone.value = userData.phone;
  address.value = userData.address;
  city.value = userData.city;
  zip.value = userData.postal;
  password.value = userData.password;
  country.value = userData.country;
  balance.value = userData.balance;
  document.getElementById("profileNameText").innerText = `${
    userData.fname || "John"
  } ${userData.lname || "Doe"}`;
  document.getElementById("profileEmailText").innerText =
    userData.email || "johndoe@gmail.com";
  saveChangesBtn.addEventListener("click", () => {
    const updatedData = {
      fname: firstName.value.trim(),
      lname: lastName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      address: address.value.trim(),
      city: city.value.trim(),
      postal: zip.value.trim(),
      country: country.value.trim(),
      password: password.value.trim(),
      balance: balance.value.trim(),
    };
    localStorage.setItem("userProfile", JSON.stringify(updatedData));
    showAlert("✅ Profile updated successfully!", true);
    document.getElementById(
      "profileNameText"
    ).innerText = `${updatedData.fname} ${updatedData.lname}`;
    document.getElementById("profileEmailText").innerText = updatedData.email;
  });

  document.getElementById("logout").addEventListener("click", (e) => {
    logout();
  });
  renderwishlist();
}

function logout() {
  userCredentials = {};
  localStorage.setItem("userProfile", JSON.stringify({}));

  window.location.href = "./login.html";
}

// Render wishlist
async function renderwishlist() {
  getwishlist();

  let w = document.getElementById("wishlistItems");
  w.innerHTML = "";
  wishlist.map((item) => {
    let t = `<div class="wishlist-card flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
  <!-- Product Info -->
  <div class="flex items-center gap-4">
    <img src="${item.image}" alt="Product Image" 
         class="w-20 h-20 rounded-lg object-cover border border-gray-100">
    <div>
      <h4 class="text-[#323232] font-semibold text-sm md:text-base">${
        item.title
      }</h4>
      <p class="text-[#bc8246] font-semibold mt-1">${item.price}</p>
    </div>
  </div>

  <!-- Actions -->
  <div class="flex flex-col items-end gap-2">
    <button class="addCartBtn os-btn bg-[#bc8246] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#a96d38] transition" data-product='${JSON.stringify(
      item
    ).replace(/'/g, "&apos;")}'>
      Add to Cart
    </button>
    <button data-title='${
      item.title
    }' class="removewishlist text-gray-400 hover:text-red-500 transition">
      <i class="fa-solid fa-trash text-lg"></i>
    </button>
  </div>
</div>
`;
    w.innerHTML += t;
  });

  document.querySelectorAll(".removewishlist").forEach((btn) => {
    getwishlist();
    btn.addEventListener("click", (e) => {
      const title = e.currentTarget.dataset.title;
      wishlist = wishlist.filter((item) => {
        return item.title != title;
      });

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderwishlist();
    });
  });
}
