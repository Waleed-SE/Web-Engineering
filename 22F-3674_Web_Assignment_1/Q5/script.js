const products = [];
let cart = new Map();
let discountPercentage = 0;

const addDefaultProducts = () => {
    addProduct("Laptop", 100000);
    addProduct("Smartphone", 50000);
    addProduct("Headphones", 8000);
    addProduct("Smartwatch", 12000);
    addProduct("Tablet", 35000);
};

const addProduct = (name, price) => {
    products.push({ id: products.length + 1, name, price });
    updateProductDropdown();
};

const updateProductDropdown = () => {
    const dropdown = document.getElementById("product-dropdown");
    dropdown.innerHTML = "";

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = `${product.name} - ${product.price} PKR`;
        dropdown.appendChild(option);
    });
};

const addToCart = () => {
    const productId = parseInt(document.getElementById("product-dropdown").value);
    const quantity = parseInt(document.getElementById("product-quantity").value);

    if (quantity < 1) {
        alert("Quantity must be at least 1.");
        return;
    }

    const product = products.find(p => p.id === productId);

    if (cart.has(product.id)) {
        cart.get(product.id).quantity += quantity;
    } else {
        cart.set(product.id, { ...product, quantity });
    }

    updateCartDisplay();
    updateTotalPrice();
};

const calculateDiscount = () => {
    const rollNumber = document.getElementById("roll-number").value.trim();
    const match = rollNumber.match(/(\d+)$/);

    if (!match) {
        alert("Invalid roll number format!");
        return;
    }

    const digits = match[0];
    if (digits.length < 4) {
        alert("Roll number should have at least 4 digits.");
        return;
    }

    discountPercentage = parseInt(digits.slice(1, 3));
    discountPercentage = Math.min(discountPercentage, 50);

    document.getElementById("discount-info").textContent = `Discount: ${discountPercentage}%`;
    updateTotalPrice();
};

const updateCartDisplay = () => {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.quantity} x ${item.price} PKR`;
        cartList.appendChild(li);
    });
};

const updateTotalPrice = () => {
    const totalBeforeDiscount = [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = (totalBeforeDiscount * discountPercentage) / 100;
    const finalPrice = totalBeforeDiscount - discountAmount;

    document.getElementById("total-price").textContent = `${finalPrice.toFixed(2)} PKR`;
};

addDefaultProducts();
