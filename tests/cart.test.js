const { calculateCartTotal } = require("../js/cart");

test("calculates the total of cart items", () => {
    const items = [
        { price: 100, quantity: 2 },
        { price: 50, quantity: 1 }
    ];

    expect(calculateCartTotal(items)).toBe(250);
});

test("returns zero for an empty cart", () => {
    expect(calculateCartTotal([])).toBe(0);
});
// Test improvements
