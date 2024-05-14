describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('https://elaine-ch.github.io/Lab6_Part1_Starter/');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });
    console.log(`Checking product item 1/${prodItemsData.length}`);
    // Make sure the title, price, and image are populated in the JSON
    firstValue = prodItemsData[0];
    if (firstValue.title.length == 0) { allArePopulated = false; }
    if (firstValue.price.length == 0) { allArePopulated = false; }
    if (firstValue.image.length == 0) { allArePopulated = false; }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
    
    // TODO - Step 1
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found
    let itemNum = 0; //helper var for indexing
    for(const item in prodItemsData) {
      // logging what Item we are checking
      console.log(`Checking product item ${itemNum+1}/${prodItemsData.length}`);
      // Make sure the title, price, and image are populated in the JSON (for each item in the array)
      itemNum++;
      //same check as prodItem 1
      if (prodItemsData[item].title.length == 0) { allArePopulated = false; }
      if (prodItemsData[item].price.length == 0) { allArePopulated = false; }
      if (prodItemsData[item].image.length == 0) { allArePopulated = false; }
    }
    //expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

  }, 10000);

  it('Make sure <product-item> elements are populated', async () => {
    const allArePopulated = await page.$$eval('product-item', prodItems => {
      return prodItems.every(item => {
        const data = item.data;
        return data && data.title && data.title.length > 0 && 
               data.price && data.price > 0 && 
               data.image && data.image.length > 0;
      });
    });
    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2 -- Done
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    const page_productItem = await page.$('product-item');

    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    const page_shadowRoot = await page_productItem.getProperty('shadowRoot');
    const button = await page_shadowRoot.$('button');
    // Once you have the button, you can click it and check the innerText property of the button.
    await button.click();
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
    const innerText = await button.evaluate(button => button.innerText);

    // Check to make sure that the innerText is "Remove from Cart"
    expect(innerText).toBe('Remove from Cart');
    await button.click(); //second click to reset the button since we click all buttons in the next test
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    const allProductItems = await page.$$('product-item');

    // get the shadowRoot and query select the button inside, and click on it.
    for (let i = 0; i < allProductItems.length; i++) {
      const shadowRoot = await allProductItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      await button.click();
    }

    //now checking for the cart count
    const cartCount = await page.$('#cart-count');
    const cartCountValue = await cartCount.evaluate(cartCout => cartCout.innerText);
    // Check to see if the innerText of #cart-count is 20
    expect(cartCountValue).toBe('20');
  }, 30000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    await page.reload();
    // element to make sure that all of their buttons say "Remove from Cart".
    const allProductItems = await page.$$('product-item');

    let buttonCorrect = true;
    for (let i = 0; i < allProductItems.length; i++) {
      const shadowRoot = await allProductItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await button.evaluate(button => button.innerText);
      if (innerText !== 'Remove from Cart') {
        buttonCorrect = false;
      }
    }
    expect(buttonCorrect).toBe(true);
    // Also check to make sure that #cart-count is still 20
    const cartCount = await page.$('#cart-count');
    const cartCountValue = await cartCount.evaluate(cartCout => cartCout.innerText);
    expect(cartCountValue).toBe('20');
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    const cart_Expected = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const cart = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cart'));
    });
    //could also import storage.js and use storage.getItems() to get the cart
    expect(cart).toEqual(cart_Expected);

  }, 10000);

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    const Items = await page.$$('product-item');
    
    for (let i = 0; i < Items.length; i++) {
      const shadowRoot = await Items[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      await button.click();
    }
    // Once you have, check to make sure that #cart-count is now 0
    const cartCount = await page.$('#cart-count');
    const cartCountValue = await cartCount.evaluate(cartCout => cartCout.innerText);
    expect(cartCountValue).toBe('0');
  }, 30000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    await page.reload();
    const Items = await page.$$('product-item');
    let buttonCorrect = true;
    for (let i = 0; i < Items.length; i++) {
      const shadowRoot = await Items[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await button.evaluate(button => button.innerText);
      if (innerText !== 'Add to Cart') {
        buttonCorrect = false;
      }
    }
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    expect(buttonCorrect).toBe(true);
    // Also check to make sure that #cart-count is still 0
    const cartCount = await page.$('#cart-count');
    const cartCountValue = await cartCount.evaluate(cartCout => cartCout.innerText);
    expect(cartCountValue).toBe('0');
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    const currCart = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cart'));
    })
    expect(currCart).toEqual([]);
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
  });
});
