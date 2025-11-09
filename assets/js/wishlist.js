let wishlist = [];
async function getwishlist() {
  let tmpw = JSON.parse(await localStorage.getItem("wishlist")) || [];
  wishlist = tmpw;
  return tmpw;
  console.log(wishlist);
}
getwishlist();

async function setWishlist(item) {
  await getwishlist();
  const existing = wishlist.find((c) => c.title === item.title);
  if (!existing) {
    wishlist.push(item);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    console.log(wishlist);
    return 1;
  }
  return 0;
}
