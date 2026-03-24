let dataProducts = [
    {
        "id": 99,
        "title": "Classic Red Pullover Hoodie",
        "slug": "classic-red-pullover-hoodie",
        "price": 10,
        "description": "Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.",
        "category": {
            "id": 13,
            "name": "Clothes",
            "slug": "clothes",
            "image": "https://i.imgur.com/QkIa5tT.jpeg",
            "creationAt": "2026-03-02T20:06:40.000Z",
            "updatedAt": "2026-03-02T20:06:40.000Z"
        },
        "images": [
            "https://i.imgur.com/1twoaDy.jpeg",
            "https://i.imgur.com/FDwQgLy.jpeg",
            "https://i.imgur.com/kg1ZhhH.jpeg"
        ],
        "creationAt": "2026-03-02T20:06:44.000Z",
        "updatedAt": "2026-03-02T20:06:44.000Z"
    },
    {
        "id": 100,
        "title": "Majestic Mountain Graphic T-Shirt",
        "slug": "majestic-mountain-graphic-t-shirt",
        "price": 44,
        "description": "Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.",
        "category": {
            "id": 13,
            "name": "Clothes",
            "slug": "clothes",
            "image": "https://i.imgur.com/QkIa5tT.jpeg",
            "creationAt": "2026-03-02T20:06:40.000Z",
            "updatedAt": "2026-03-02T20:06:40.000Z"
        },
        "images": [
            "https://i.imgur.com/QkIa5tT.jpeg",
            "https://i.imgur.com/jb5Yu0h.jpeg",
            "https://i.imgur.com/UlxxXyG.jpeg"
        ],
        "creationAt": "2026-03-02T20:06:44.000Z",
        "updatedAt": "2026-03-02T20:06:44.000Z"
    },
    {
        "id": 102,
        "title": "Classic Black Hooded Sweatshirt",
        "slug": "classic-black-hooded-sweatshirt",
        "price": 79,
        "description": "Elevate your casual wardrobe with our Classic Black Hooded Sweatshirt. Made from high-quality, soft fabric that ensures comfort and durability, this hoodie features a spacious kangaroo pocket and an adjustable drawstring hood. Its versatile design makes it perfect for a relaxed day at home or a casual outing.",
        "category": {
            "id": 13,
            "name": "Clothes",
            "slug": "clothes",
            "image": "https://i.imgur.com/QkIa5tT.jpeg",
            "creationAt": "2026-03-02T20:06:40.000Z",
            "updatedAt": "2026-03-02T20:06:40.000Z"
        },
        "images": [
            "https://i.imgur.com/cSytoSD.jpeg",
            "https://i.imgur.com/WwKucXb.jpeg",
            "https://i.imgur.com/cE2Dxh9.jpeg"
        ],
        "creationAt": "2026-03-02T20:06:44.000Z",
        "updatedAt": "2026-03-02T20:06:44.000Z"
    },
    {
        "id": 103,
        "title": "Classic Grey Hooded Sweatshirt",
        "slug": "classic-grey-hooded-sweatshirt",
        "price": 90,
        "description": "Elevate your casual wear with our Classic Grey Hooded Sweatshirt. Made from a soft cotton blend, this hoodie features a front kangaroo pocket, an adjustable drawstring hood, and ribbed cuffs for a snug fit. Perfect for those chilly evenings or lazy weekends, it pairs effortlessly with your favorite jeans or joggers.",
        "category": {
            "id": 13,
            "name": "Clothes",
            "slug": "clothes",
            "image": "https://i.imgur.com/QkIa5tT.jpeg",
            "creationAt": "2026-03-02T20:06:40.000Z",
            "updatedAt": "2026-03-02T20:06:40.000Z"
        },
        "images": [
            "https://i.imgur.com/R2PN9Wq.jpeg",
            "https://i.imgur.com/IvxMPFr.jpeg",
            "https://i.imgur.com/7eW9nXP.jpeg"
        ],
        "creationAt": "2026-03-02T20:06:44.000Z",
        "updatedAt": "2026-03-02T20:06:44.000Z"
    }
]
let dataCategories = [
    {
        "id": 13,
        "name": "Clothes",
        "slug": "clothes",
        "image": "https://i.imgur.com/QkIa5tT.jpeg",
        "creationAt": "2026-03-02T20:06:40.000Z",
        "updatedAt": "2026-03-02T20:06:40.000Z"
    },
    {
        "id": 14,
        "name": "Electronics",
        "slug": "electronics",
        "image": "https://i.imgur.com/ZANVnHE.jpeg",
        "creationAt": "2026-03-02T20:06:41.000Z",
        "updatedAt": "2026-03-02T20:06:41.000Z"
    },
    {
        "id": 15,
        "name": "Furniture",
        "slug": "furniture",
        "image": "https://i.imgur.com/Qphac99.jpeg",
        "creationAt": "2026-03-02T20:06:41.000Z",
        "updatedAt": "2026-03-02T20:06:41.000Z"
    },
    {
        "id": 16,
        "name": "Shoes",
        "slug": "shoes",
        "image": "https://i.imgur.com/qNOjJje.jpeg",
        "creationAt": "2026-03-02T20:06:42.000Z",
        "updatedAt": "2026-03-02T20:06:42.000Z"
    },
    {
        "id": 17,
        "name": "Miscellaneous",
        "slug": "miscellaneous",
        "image": "https://i.imgur.com/BG8J0Fj.jpg",
        "creationAt": "2026-03-02T20:06:42.000Z",
        "updatedAt": "2026-03-02T20:06:42.000Z"
    },
    {
        "id": 19,
        "name": "Categoria test-01",
        "slug": "categoria-test-01",
        "image": "https://picsum.photos/200",
        "creationAt": "2026-03-02T20:52:03.000Z",
        "updatedAt": "2026-03-02T20:52:03.000Z"
    },
    {
        "id": 20,
        "name": "category_B",
        "slug": "category-b",
        "image": "https://pravatar.cc/",
        "creationAt": "2026-03-02T22:01:31.000Z",
        "updatedAt": "2026-03-02T22:01:31.000Z"
    },
    {
        "id": 21,
        "name": "string",
        "slug": "string",
        "image": "https://pravatar.cc/",
        "creationAt": "2026-03-02T22:01:32.000Z",
        "updatedAt": "2026-03-02T22:01:32.000Z"
    },
    {
        "id": 22,
        "name": "nueva categoria",
        "slug": "nueva-categoria",
        "image": "https://terebimagazine.es/wp-content/uploads/2017/10/Banner-SotC-1024x630.jpg",
        "creationAt": "2026-03-02T23:48:34.000Z",
        "updatedAt": "2026-03-02T23:55:29.000Z"
    }
]
module.exports = {
    dataProducts: dataProducts,
    dataCategories: dataCategories
}