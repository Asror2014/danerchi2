// =====================================
// DANARCI
// =====================================


// =====================================
// SAYT PAROLI
// =====================================

const SITE_PASSWORD = "1111";

const passwordScreen =
    document.getElementById("passwordScreen");

const passwordInput =
    document.getElementById("sitePassword");

const passwordButton =
    document.getElementById("passwordBtn");

const passwordError =
    document.getElementById("passwordError");


function checkPassword() {

    if (
        passwordInput.value === SITE_PASSWORD
    ) {

        passwordScreen.classList.add("hidden");

        sessionStorage.setItem(
            "danarci_access",
            "true"
        );

        passwordError.style.display = "none";

    }

    else {

        passwordError.style.display =
            "block";

        passwordInput.value = "";

        passwordInput.focus();

    }

}


passwordButton.addEventListener(
    "click",
    checkPassword
);


passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            checkPassword();

        }

    }
);


if (
    sessionStorage.getItem(
        "danarci_access"
    ) === "true"
) {

    passwordScreen.classList.add(
        "hidden"
    );

}


// =====================================
// MAHSULOTLAR
// =====================================

const products = [

    {
        id: 1,
        name: "Max Doner",
        category: "doner",
        price: 35000,
        emoji: "🌯",
        description:
            "Mol go‘shti, sabzavotlar va maxsus sous"
    },

    {
        id: 2,
        name: "Chicken Doner",
        category: "doner",
        price: 30000,
        emoji: "🌯",
        description:
            "Yumshoq tovuq go‘shti va yangi sabzavotlar"
    },

    {
        id: 3,
        name: "Max Lavash",
        category: "lavash",
        price: 32000,
        emoji: "🥙",
        description:
            "Tovuq go‘shti, fri va maxsus sous"
    },

    {
        id: 4,
        name: "Cheese Lavash",
        category: "lavash",
        price: 36000,
        emoji: "🥙",
        description:
            "Pishloqli maxsus lavash"
    },

    {
        id: 5,
        name: "DANARCI Burger",
        category: "burger",
        price: 38000,
        emoji: "🍔",
        description:
            "Go‘shtli kotlet, pishloq va maxsus sous"
    },

    {
        id: 6,
        name: "Double Burger",
        category: "burger",
        price: 48000,
        emoji: "🍔",
        description:
            "Ikki dona go‘shtli kotlet va pishloq"
    },

    {
        id: 7,
        name: "Fri",
        category: "potato",
        price: 15000,
        emoji: "🍟",
        description:
            "Qarsildoq kartoshka fri"
    },

    {
        id: 8,
        name: "Cheese Fri",
        category: "potato",
        price: 22000,
        emoji: "🍟",
        description:
            "Fri va eritilgan pishloq"
    },

    {
        id: 9,
        name: "Cola",
        category: "drink",
        price: 10000,
        emoji: "🥤",
        description:
            "Sovutilgan gazli ichimlik"
    },

    {
        id: 10,
        name: "Fanta",
        category: "drink",
        price: 10000,
        emoji: "🥤",
        description:
            "Sovutilgan apelsinli ichimlik"
    },

    {
        id: 11,
        name: "Burger Combo",
        category: "burger",
        price: 55000,
        emoji: "🍔",
        description:
            "Burger + fri + ichimlik"
    },

    {
        id: 12,
        name: "Doner Combo",
        category: "doner",
        price: 50000,
        emoji: "🌯",
        description:
            "Doner + fri + ichimlik"
    }

];


// =====================================
// SAVAT
// =====================================

let cart = [];


// =====================================
// ELEMENTLAR
// =====================================

const productsContainer =
    document.getElementById("products");

const cartPanel =
    document.getElementById("cartPanel");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const overlay =
    document.getElementById("overlay");

const orderModal =
    document.getElementById("orderModal");

const receiptModal =
    document.getElementById("receiptModal");


// =====================================
// NARX
// =====================================

function formatPrice(price) {

    return (
        price.toLocaleString("uz-UZ")
        + " so‘m"
    );

}


// =====================================
// KATEGORIYA NOMI
// =====================================

function getCategoryName(category) {

    const names = {

        doner: "Doner",

        lavash: "Lavash",

        burger: "Burger",

        potato: "Kartoshka",

        drink: "Ichimlik"

    };

    return names[category] || "Taom";

}


// =====================================
// MAHSULOTLARNI CHIQARISH
// =====================================

function renderProducts(
    list = products
) {

    productsContainer.innerHTML = "";


    if (list.length === 0) {

        productsContainer.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
                color:#777;
            ">

                <div style="font-size:50px;">
                    🔎
                </div>

                <h3>
                    Taom topilmadi
                </h3>

                <p>
                    Boshqa nom bilan qidirib ko‘ring.
                </p>

            </div>

        `;

        return;
    }


    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product";


        card.innerHTML = `

            <div class="product-image">
                ${product.emoji}
            </div>


            <div class="product-info">

                <div class="product-category">
                    ${getCategoryName(
                        product.category
                    )}
                </div>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong class="price">
                        ${formatPrice(
                            product.price
                        )}
                    </strong>


                    <button
                        class="add-btn"
                        onclick="
                            addToCart(
                                ${product.id}
                            )
                        "
                    >
                        +
                    </button>

                </div>

            </div>

        `;


        productsContainer.appendChild(card);

    });

}


// =====================================
// SAVATGA QO‘SHISH
// =====================================

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


// =====================================
// SAVATNI YANGILASH
// =====================================

function updateCart() {

    const totalQuantity =
        cart.reduce(

            (sum, item) =>
                sum + item.quantity,

            0

        );


    cartCount.textContent =
        totalQuantity;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div style="font-size:50px;">
                    🛒
                </div>

                <h3>
                    Savatcha bo‘sh
                </h3>

                <p>
                    Yoqtirgan taomingizni tanlang.
                </p>

            </div>

        `;

        cartTotal.textContent =
            "0 so‘m";

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-item-image">
                ${item.emoji}
            </div>


            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${formatPrice(
                        item.price
                    )}
                </p>


                <div class="quantity">

                    <button
                        onclick="
                            changeQuantity(
                                ${item.id},
                                -1
                            )
                        "
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="
                            changeQuantity(
                                ${item.id},
                                1
                            )
                        "
                    >
                        +
                    </button>

                </div>

            </div>


            <strong>
                ${formatPrice(
                    item.price *
                    item.quantity
                )}
            </strong>

        `;


        cartItems.appendChild(element);

    });


    const total =
        cart.reduce(

            (sum, item) =>
                sum +
                item.price *
                item.quantity,

            0

        );


    cartTotal.textContent =
        formatPrice(total);

}


// =====================================
// MIQDOR
// =====================================

function changeQuantity(
    id,
    amount
) {

    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    updateCart();

}


// =====================================
// CART OCHISH
// =====================================

function openCart() {

    cartPanel.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

}


document
    .getElementById("cartOpen")
    .addEventListener(
        "click",
        openCart
    );


// =====================================
// CART YOPISH
// =====================================

function closeCart() {

    cartPanel.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

}


document
    .getElementById("cartClose")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


// =====================================
// KATEGORIYA
// =====================================

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".category"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.category;


                if (
                    category === "all"
                ) {

                    renderProducts();

                }

                else {

                    renderProducts(

                        products.filter(
                            product =>
                                product.category ===
                                category
                        )

                    );

                }

            }
        );

    });


// =====================================
// QIDIRUV
// =====================================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const value =
                this.value
                    .toLowerCase()
                    .trim();


            const result =
                products.filter(
                    product =>

                        product.name
                            .toLowerCase()
                            .includes(value)

                );


            renderProducts(result);

        }
    );


// =====================================
// BUYURTMA OCHISH
// =====================================

function openOrderModal() {

    if (cart.length === 0) {

        alert(
            "Avval savatga kamida bitta taom qo‘shing."
        );

        return;

    }


    closeCart();

    orderModal.classList.add(
        "active"
    );

}


document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        openOrderModal
    );


document
    .getElementById("heroOrder")
    .addEventListener(
        "click",
        openOrderModal
    );


// =====================================
// ORDER YOPISH
// =====================================

document
    .getElementById("orderClose")
    .addEventListener(
        "click",
        () => {

            orderModal.classList.remove(
                "active"
            );

        }
    );


// =====================================
// KARTA RAQAMINI FORMATLASH
// =====================================

document
    .getElementById("cardNumber")
    .addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(
                    /\D/g,
                    ""
                );


            value =
                value.substring(
                    0,
                    16
                );


            let formatted =
                value.match(
                    /.{1,4}/g
                );


            this.value =
                formatted
                    ? formatted.join(" ")
                    : "";

        }
    );


// =====================================
// BUYURTMA TASDIQLASH
// =====================================

document
    .getElementById("orderForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "customerName"
                    )
                    .value
                    .trim();


            const surname =
                document
                    .getElementById(
                        "customerSurname"
                    )
                    .value
                    .trim();


            const card =
                document
                    .getElementById(
                        "cardNumber"
                    )
                    .value
                    .trim();


            const digits =
                card.replace(
                    /\s/g,
                    ""
                );


            if (
                digits.length !== 16
            ) {

                alert(
                    "Karta raqami 16 ta raqamdan iborat bo‘lishi kerak."
                );

                return;

            }


            generateReceipt(
                name,
                surname,
                card
            );


            orderModal.classList.remove(
                "active"
            );


            receiptModal.classList.add(
                "active"
            );

        }
    );


// =====================================
// CHEK YARATISH
// =====================================

function generateReceipt(
    name,
    surname,
    card
) {

    const receiptItems =
        document.getElementById(
            "receiptItems"
        );


    receiptItems.innerHTML = "";


    cart.forEach(item => {

        const row =
            document.createElement(
                "div"
            );


        row.className =
            "receipt-product";


        row.innerHTML = `

            <span>
                ${item.name}
                ×
                ${item.quantity}
            </span>


            <strong>
                ${formatPrice(
                    item.price *
                    item.quantity
                )}
            </strong>

        `;


        receiptItems.appendChild(row);

    });


    const total =
        cart.reduce(

            (sum, item) =>
                sum +
                item.price *
                item.quantity,

            0

        );


    document
        .getElementById(
            "receiptTotal"
        )
        .textContent =
            formatPrice(total);


    document
        .getElementById(
            "receiptName"
        )
        .textContent =
            name;


    document
        .getElementById(
            "receiptSurname"
        )
        .textContent =
            surname;


    const digits =
        card.replace(
            /\s/g,
            ""
        );


    document
        .getElementById(
            "receiptCard"
        )
        .textContent =
            "**** **** **** " +
            digits.slice(-4);

}


// =====================================
// CHEKNI YOPISH
// =====================================

document
    .getElementById("receiptClose")
    .addEventListener(
        "click",
        () => {

            receiptModal.classList.remove(
                "active"
            );


            cart = [];


            updateCart();


            document
                .getElementById(
                    "orderForm"
                )
                .reset();

        }
    );


// =====================================
// TIL
// =====================================

let currentLanguage =
    "UZ";


document
    .getElementById("languageBtn")
    .addEventListener(
        "click",
        () => {

            currentLanguage =
                currentLanguage === "UZ"
                    ? "RU"
                    : "UZ";


            document
                .getElementById(
                    "languageText"
                )
                .textContent =
                    currentLanguage;


            document
                .querySelectorAll(
                    "[data-uz]"
                )
                .forEach(element => {

                    element.textContent =
                        element.dataset[
                            currentLanguage === "UZ"
                                ? "uz"
                                : "ru"
                        ];

                });

        }
    );


// =====================================
// MOBIL MENYU
// =====================================

document
    .getElementById(
        "mobileMenuBtn"
    )
    .addEventListener(
        "click",
        () => {

            const menu =
                document.querySelector(
                    ".menu"
                );


            if (
                getComputedStyle(menu)
                    .display === "none"
            ) {

                menu.style.display =
                    "flex";

                menu.style.position =
                    "absolute";

                menu.style.top =
                    "68px";

                menu.style.left =
                    "0";

                menu.style.width =
                    "100%";

                menu.style.padding =
                    "20px";

                menu.style.background =
                    "white";

                menu.style.flexDirection =
                    "column";

                menu.style.boxShadow =
                    "0 15px 30px rgba(0,0,0,.1)";

            }

            else {

                menu.style.display =
                    "none";

            }

        }
    );


// =====================================
// BOSHLASH
// =====================================

renderProducts();

updateCart();