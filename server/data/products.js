const products = [
  {
    name: "Fresh Whole Milk (1 Liter)",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Pure, pasteurized cow milk, rich in calcium and vitamins. Perfect for daily consumption. Farm fresh and delivered daily.",
    brand: "DairyFarm",
    category: "Milk",
    price: 65,
    countInStock: 100,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Organic Raw Honey (500g)",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "100% pure and natural organic honey, collected from wildflowers. Great for health and taste. No artificial additives.",
    brand: "BeeSweet",
    category: "Honey",
    price: 350,
    countInStock: 50,
    rating: 4.8,
    numReviews: 8,
  },
  {
    name: "Farm Fresh Paneer (250g)",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Fresh homemade paneer made from pure milk. Soft, creamy texture perfect for curries and snacks.",
    brand: "DairyFarm",
    category: "Cheese",
    price: 120,
    countInStock: 25,
    rating: 4.3,
    numReviews: 15,
  },
  {
    name: "Greek Yogurt (400g)",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Thick, creamy Greek yogurt packed with probiotics. High in protein and perfect for breakfast.",
    brand: "HealthyLife",
    category: "Yogurt",
    price: 180,
    countInStock: 30,
    rating: 4.6,
    numReviews: 22,
  },
  {
    name: "Salted Butter (500g)",
    image:
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Creamy salted butter made from fresh cream. Perfect for cooking, baking, and spreading.",
    brand: "DairyFarm",
    category: "Butter",
    price: 250,
    countInStock: 40,
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: "Organic Ghee (500ml)",
    image:
      "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Pure organic ghee made from grass-fed cow milk. Rich in flavor and nutrition.",
    brand: "PureGhee",
    category: "Ghee",
    price: 450,
    countInStock: 20,
    rating: 4.9,
    numReviews: 35,
  },
  {
    name: "Mozzarella Cheese (200g)",
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Fresh mozzarella cheese with a creamy texture. Perfect for pizzas, sandwiches, and salads.",
    brand: "CheeseWorld",
    category: "Cheese",
    price: 280,
    countInStock: 15,
    rating: 4.2,
    numReviews: 9,
  },
  {
    name: "Low Fat Milk (1 Liter)",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Low-fat milk with reduced calories but all the essential nutrients. Great for health-conscious individuals.",
    brand: "DairyFarm",
    category: "Milk",
    price: 70,
    countInStock: 80,
    rating: 4.1,
    numReviews: 14,
  },
  {
    name: "Strawberry Yogurt (200g)",
    image:
      "https://images.unsplash.com/photo-1571212515416-6b8d3d30a8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Delicious strawberry-flavored yogurt made with real fruit pieces. A healthy and tasty snack.",
    brand: "FruitYo",
    category: "Yogurt",
    price: 85,
    countInStock: 60,
    rating: 4.0,
    numReviews: 11,
  },
  {
    name: "Unsalted Butter (500g)",
    image:
      "https://images.unsplash.com/photo-1589985270842-8d0c9b9cb6d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Pure unsalted butter perfect for baking and cooking. Made from fresh cream with no additives.",
    brand: "DairyFarm",
    category: "Butter",
    price: 240,
    countInStock: 35,
    rating: 4.3,
    numReviews: 7,
  },
  {
    name: "Cheddar Cheese (300g)",
    image:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Aged cheddar cheese with a sharp, tangy flavor. Perfect for sandwiches and cooking.",
    brand: "CheeseWorld",
    category: "Cheese",
    price: 320,
    countInStock: 18,
    rating: 4.7,
    numReviews: 13,
  },
  {
    name: "Chocolate Milk (500ml)",
    image:
      "https://images.unsplash.com/photo-1608988681254-df1e8b8fa53c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    description:
      "Rich and creamy chocolate milk made with real cocoa. A perfect treat for kids and adults.",
    brand: "ChocoMilk",
    category: "Milk",
    price: 45,
    countInStock: 90,
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: "Almond Milk (1 Liter)",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Dairy-free almond milk, unsweetened and rich in vitamin E. Great for vegans and lactose intolerant individuals.",
    brand: "NutriMilk",
    category: "Milk",
    price: 120,
    countInStock: 40,
    rating: 4.4,
    numReviews: 10,
  },
  {
    name: "Probiotic Lassi (200ml)",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Refreshing probiotic lassi, lightly sweetened and packed with live cultures for gut health.",
    brand: "HealthyLife",
    category: "Yogurt",
    price: 35,
    countInStock: 70,
    rating: 4.2,
    numReviews: 6,
  },
  {
    name: "Goat Milk (1 Liter)",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Fresh goat milk, easier to digest and rich in nutrients. Delivered directly from local farms.",
    brand: "FarmFresh",
    category: "Milk",
    price: 110,
    countInStock: 20,
    rating: 4.6,
    numReviews: 5,
  },
  {
    name: "Mango Shrikhand (200g)",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Traditional Indian dessert made with strained yogurt and real mango pulp. Sweet and creamy.",
    brand: "SweetTreats",
    category: "Yogurt",
    price: 90,
    countInStock: 30,
    rating: 4.7,
    numReviews: 12,
  },
  {
    name: "Herbed Cheese Spread (150g)",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Soft cheese spread blended with fresh herbs. Perfect for sandwiches and crackers.",
    brand: "CheeseWorld",
    category: "Cheese",
    price: 150,
    countInStock: 22,
    rating: 4.5,
    numReviews: 8,
  },
  {
    name: "Desi Cow Ghee (1 Liter)",
    image:
      "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Traditional ghee made from A2 desi cow milk. Rich aroma and golden color.",
    brand: "PureGhee",
    category: "Ghee",
    price: 900,
    countInStock: 12,
    rating: 4.9,
    numReviews: 20,
  },
  {
    name: "Flavored Yogurt Pack (4x100g)",
    image:
      "https://images.unsplash.com/photo-1571212515416-6b8d3d30a8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Assorted pack of flavored yogurts: mango, strawberry, blueberry, and vanilla.",
    brand: "FruitYo",
    category: "Yogurt",
    price: 160,
    countInStock: 25,
    rating: 4.3,
    numReviews: 9,
  },
  {
    name: "Cottage Cheese Cubes (200g)",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Ready-to-cook cottage cheese cubes, soft and fresh. Ideal for salads and curries.",
    brand: "DairyFarm",
    category: "Cheese",
    price: 110,
    countInStock: 18,
    rating: 4.2,
    numReviews: 7,
  },
];

module.exports = products;
