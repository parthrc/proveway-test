document.addEventListener("DOMContentLoaded", function () {
  // lsit of items
  const itemsList = [
    {
      id: 1,
      discount: "30% Off",
      offer: "Buy 1 Get 2",
      price: "$18.00 USD",
      popular: false,
      strikedPrice: "$10.00 USD",
    },
    {
      id: 2,
      discount: "30% Off",
      offer: "Buy 2 Get 4",
      price: "$24.00 USD",
      popular: true,
      strikedPrice: "$15.00 USD",
    },
    {
      id: 3,
      discount: "10% Off",
      offer: "Buy 3 Get 6",
      price: "$36.00 USD",
      popular: false,
      strikedPrice: "$30.00 USD",
    },
  ];

  // the main container where we will display the list of items
  const itemsContainer = document.querySelector(".items-container");
  // to track currently expanded item
  let currentlyExpandedItem = null;
  let currentlyExpandedItemElement = null;

  // this function renders the list of items
  function renderItems() {
    itemsContainer.innerHTML = "";

    itemsList.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item-container");
      itemElement.innerHTML = `
          <div class="discount-container">
            <span>${item.discount}</span>
          </div>
          <div class="description-container">
            <div class="radio-container">
              <input type="radio" name="item" ${
                item.checked ? "checked" : ""
              } />
              <span class="custom-radio"></span>
            </div>
            <div class="description-text-container">
              <div>
                <div>${item.offer}</div>
                <div style="font-weight: 600">${item.price}</div>
              </div>
               ${
                 item.popular
                   ? '<div id="most-popular-text">Most Popular</div>'
                   : ""
               }
             
            </div>
          </div>
        `;
      // add event listener to expand on click
      itemElement.addEventListener("click", () =>
        expandItem(item, itemElement)
      );
      itemsContainer.appendChild(itemElement);

      // we will expand the first item by default when page laods
      if (index === 0) {
        expandItem(item, itemElement, false);
      }
    });
  }

  // handles the expansion of the item
  // hides the collapsed item and shows the expanded div
  function expandItem(item, itemElement) {
    // collapse the currently expanded item
    if (currentlyExpandedItem) {
      currentlyExpandedItem.classList.remove("hidden");
      currentlyExpandedItemElement.remove();
    }

    // hide the item
    itemElement.classList.add("hidden");

    // mark this item as checked & uncheck others
    itemsList.forEach((i) => (i.checked = false));
    item.checked = true;

    // create the expanded item
    const expandedElement = document.createElement("div");
    expandedElement.classList.add("item-expanded-container");
    expandedElement.innerHTML = `
        <div class="item-expanded-inner-container">
          <div class="item-expanded-description-container">
            <div class="radio-container">
              <input type="radio" name="item" checked />
              <span class="custom-radio"></span>
            </div>
            <div class="description-text-container">
              <div>
                <div class="description-text-offer">
                  <span>${item.offer}</span>
                  <span id="expanded-discount-label">${item.discount}</span>
                </div>
                <div class="description-text-price">
                  <span>${item.price}</span>
                  <span id="striked-price">${item.strikedPrice}</span>
                </div>
                
              </div>
           
            </div>
                 ${
                   item.popular
                     ? '<div id="most-popular-text">Most Popular</div>'
                     : ""
                 }
          </div>
          <div class="expanded-items-table">
            <div></div>
            <label for="size-dropdown">Size</label>
            <label for="colour-dropdown">Colour</label>
            <label>#1</label>
            <div>
              <select id="size-dropdown">
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">XL</option>
              </select>
            </div>
            <div>
              <select id="colour-dropdown">
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="red">Red</option>
              </select>
            </div>
            <label>#2</label>
            <div>
              <select id="size-dropdown">
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">XL</option>
              </select>
            </div>
            <div>
              <select id="colour-dropdown">
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="red">Red</option>
              </select>
            </div>
          </div>
        </div>
      `;

    // sometimes we are getting null erorrs on first load
    // so we check if itemElement is still in the DOM
    if (itemElement && itemElement.parentNode) {
      itemElement.parentNode.insertBefore(
        expandedElement,
        itemElement.nextSibling
      );

      // set the current expanded item
      currentlyExpandedItem = itemElement;
      currentlyExpandedItemElement = expandedElement;
    } else {
      console.error("Item element or parent node is null");
    }
  }

  renderItems();
});
