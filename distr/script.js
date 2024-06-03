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

onLoad();

function onLoad() {
  displayProducts();
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
              <form >
                <p class="flex mt-2 gap-x-5">
                  <span class="border border-black p-1"
                    ><input
                      type="text"
                      value="XS"
                      class="inputStyleMan"
                      readonly
                      name="size"
                  /></span>
                  <span class="border border-black p-1"
                    ><input
                      value="S"
                      type="text"
                     class="inputStyleMan"
                      readonly
                      name="size"
                  /></span>
                  <span class="border border-black p-1"
                    ><input
                      value="MD"
                      type="text"
                       class="inputStyleMan"
                      readonly
                      name="size"
                  /></span>
                  <span class="border border-black p-1"
                    ><input
                      value="LG"
                      type="text"
                     class="inputStyleMan"
                      readonly
                      name="size"
                  /></span>
                  <span class="border border-black p-1"
                    ><input
                      value="XL"
                      type="text"
                     class="inputStyleMan"
                      readonly
                      name="size"
                  /></span>
                </p>
      <div class="mt-3">
        <button
          class="uppercase bg-blue-600 text-white px-6 py-2 rounded-md"
          onclick="addToBag( ${product.id})"
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
