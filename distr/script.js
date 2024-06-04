function extendedMenu() {
  document.querySelector("#extendMenu").classList.toggle("hidden");
}
function userProfileExpand() {
  document.querySelector("#userProfile").classList.toggle("hidden");
}
function menSectionExp() {
  document.querySelector("#menSection").classList.toggle("hidden");
}
function womenSectionExp() {
  document.querySelector("#womenSection").classList.toggle("hidden");
}
function searchSpanExp() {
  document.querySelector("#SearchSpan").classList.toggle("hidden");
}

//to make size category button visible and hide in men
let imgElements = document.querySelectorAll("img");
imgElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const formId = element.getAttribute("aria-controls");
    const formElement = document.getElementById(formId);
    if (!formElement) {
      return;
    }
    formElement.classList.toggle("hidden");
  });
});
imgElements.forEach((element) => {
  element.addEventListener("mouseleave", () => {
    const formId = element.getAttribute("aria-controls");
    const formElement = document.getElementById(formId);
    if (!formElement) {
      return;
    }
    formElement.classList.toggle("hidden");
  });
});

let productInBag;
onLoad();

//function to render the things on page load.
function onLoad() {
  displayProducts();
  displayItemsInBag();
  displayPriceSummary();
  bagCountDisplay();
  let productStr = localStorage.getItem("itemsInBag");
  productInBag = productStr ? JSON.parse(productStr) : [];
}

//to added the product in to the bag, from the products list
function productAddedToBag(event, id) {
  event.preventDefault();
  let selectedSize = event.target.size.value;
  let productsGoingToBag = products.filter((products) => products.id == id);
  productsGoingToBag.forEach((bagProduct) => {
    productInBag.push({
      id: bagProduct.id,
      size: selectedSize,
      image: bagProduct.image,
      company: bagProduct.company,
      item_name: bagProduct.item_name,
      original_price: bagProduct.original_price,
      current_price: bagProduct.current_price,
      discount_percentage: bagProduct.discount_percentage,
    });
  });
  localStorage.setItem("itemsInBag", JSON.stringify(productInBag));
  bagCountDisplay();
}

//to delete the product from the bag
function removeItem(id) {
  let productInBag = JSON.parse(localStorage.getItem("itemsInBag"));
  productInBag = productInBag.filter((item) => item.id != id);
  localStorage.setItem("itemsInBag", JSON.stringify(productInBag));
  displayItemsInBag();
  displayPriceSummary();
  bagCountDisplay();
}

//to display products on the checkout page
function displayItemsInBag() {
  let innerHTML = "";
  let displayContent = document.querySelector("#bagProductSummary");
  if (!displayContent) {
    return;
  }
  let bagItemObjects = JSON.parse(localStorage.getItem("itemsInBag"));
  bagItemObjects.forEach((bagItem) => {
    innerHTML += htmlGenerator(bagItem);
  });
  displayContent.innerHTML = innerHTML;
}

//it will paint the html for display items on checkout page
function htmlGenerator(product) {
  return ` <div class="flex justify-end items-center">
              <p class="uppercase text-xs text-slate-600">
                <span class="hover:cursor-pointer" onclick="removeItem(${product.id})"
                  >remove</span
                ><span class="mx-4 text-slate-400 text-xl">|</span
                ><span class="hover:cursor-pointer">move to wishlist</span>
              </p>
            </div>
            <div class="flex gap-3">
              <div class="w-[20%] flex items-center">
                <img
                  src="${product.image}"
                />
              </div>
              <div class="w-[80%] flex flex-col gap-y-1">
                <div class="flex justify-between">
                  <p class="font-semibold text-md">${product.company}</p>
                </div>
                <p class="text-xs text-slate-500">${product.item_name}</p>
                <p class="text-xs font-semibold text-slate-500">
                  Size: ${product.size}
                </p>
                <p class="text-md">
                  <span class="font-semibold">${product.current_price}</span
                  ><span class="mx-2 text-gray-500 line-through"
                    >${product.original_price}</span
                  ><span class="text-pink-500"
                    >${product.discount_percentage} %</span
                  >
                </p>
                <p class="text-sm"><b>7 days</b> return available</p>
              </div>
            </div>  `;
}

//no of items in the bag, shown with the bag icon
function bagCountDisplay() {
  let itemsInBag = JSON.parse(localStorage.getItem("itemsInBag"));
  let length = itemsInBag.length > 0 ? itemsInBag.length : " ";
  if (!document.querySelector("#bagCount")) {
    return;
  } else {
    document.querySelector("#bagCount").innerHTML = length;
  }
  if (!document.querySelector("#bagCountSmall")) {
    return;
  } else {
    document.querySelector("#bagCountSmall").innerHTML = length;
  }
}

//to display the prices on the checkout page
function displayPriceSummary() {
  let priceSummaryDiv = document.querySelector("#priceSummary");
  if (!priceSummaryDiv) {
    return;
  }
  let itemsInBag = JSON.parse(localStorage.getItem("itemsInBag"));
  let totalItems = itemsInBag.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPrice = 0;
  let couponDiscount = 0;

  itemsInBag.forEach((bagItems) => {
    totalMRP += bagItems.original_price;
    totalDiscount += Math.ceil(
      (bagItems.discount_percentage * bagItems.original_price) / 100
    );
    finalPrice = totalMRP - totalDiscount;
    if (finalPrice > 3500) {
      document.querySelector(
        "#couponCode"
      ).innerHTML = `<p class="text-sm text-slate-500">"Coupon Applied: SBI10"</p>`;
      document.querySelector("#couponButton").style.visibility = "hidden";
      couponDiscount = Math.ceil((finalPrice * 10) / 100);
    } else {
      document.querySelector(
        "#couponCode"
      ).innerHTML = `<i class="fa-solid fa-tag"></i> Apply Coupons`;
      document.querySelector("#couponButton").style.visibility = "block";
    }

    finalPrice = Math.ceil(finalPrice - couponDiscount);
  });

  priceSummaryDiv.innerHTML = `<div>
              <p class="uppercase text-sm font-semibold">Price details (${totalItems}) items</p>
              <p class="text-sm text-slate-500 my-1">Total MRP</p>
              <p class="text-sm text-slate-500 my-1">Discount on MRP</p>
              <p class="text-sm text-slate-500 my-1">Coupon Discount</p>
              <p class="text-sm font-semibold my-1">Total Amount</p>
            </div>
            <div>
             <p class="uppercase text-sm font-semibold invisible">0</p>
              <p class="text-sm text-slate-500 my-1"> ₹ ${totalMRP}</p>
              <p class="text-sm text-green-500 my-1">₹ ${totalDiscount}</p>
              <p class="text-sm text-green-500 my-1">₹ ${couponDiscount} </p>
              <p class="text-sm font-semibold my-1">₹ ${finalPrice}</p>
            </div>`;
}

//to display products on women page using js
function displayProducts() {
  let productContainer = document.querySelector("#productContainer");
  //if we don't find the container, then we will return immediately from here
  if (!productContainer) {
    return;
  }
  let innerHtml = "";
  products.forEach((product) => {
    innerHtml += `
<div class="bg-slate-300 px-10 py-4 rounded-xl">
  <img
    src="${product.image}"
    class="h-[400px] w-[300px] drop-shadow-2xl rounded-xl"
  />
  <div>
    <span class="bg-white py-1 border border-black absolute -translate-y-9 rounded-lg px-1 ms-2 text-sm opacity-70">
      ${product.rating.stars} <i class="fa-solid fa-star" style="color: #74c0fc"></i> | ${product.rating.count}
    </span>

    <h5 class="uppercase font-semibold text-lg">${product.company}</h5>

    <p class="capitalize text-sm text-slate-600">
      ${product.item_name}
    </p>

    <p class="space-x-1">
      <span class="font-semibold">Rs. ${product.current_price}</span>
      <span class="text-slate-500 text-sm line-through">Rs. ${product.original_price}</span>
      <span class="text-orange-600 text-sm"> (${product.discount_percentage}% OFF)</span>
    </p>
     <!-- size cart -->
              <form onsubmit ="productAddedToBag(event,${product.id})">
                <p class="flex mt-2 gap-x-5">
                <select name="size" required class=" text-white px-2 py-1 rounded-md bg-black" >
                <option value='' selected disabled hidden >Please select your size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
                </p>
      <div class="mt-3">
        <button type="submit"
          class="uppercase bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Add to Bag
        </button>
      </div>
    </form>
  </div>
</div> `;
  });
  productContainer.innerHTML = innerHtml;
}
