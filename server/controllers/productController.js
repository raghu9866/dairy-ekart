
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Fetch all products with dynamic filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  console.log('Fetching products with query:', req.query);
  
  // Extract query parameters
  const {
    keyword = '',
    category = '',
    brand = '',
    minPrice = 0,
    maxPrice = 999999,
    minRating = 0,
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    limit = 12,
    inStock = ''
  } = req.query;

  try {
    // Build dynamic filter object
    const filter = {};
    
    // Search by keyword in name or description
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { brand: { $regex: keyword, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    // Filter by brand
    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' };
    }
    
    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice)
      };
    }
    
    // Filter by rating
    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }
    
    // Filter by stock availability
    if (inStock === 'true') {
      filter.countInStock = { $gt: 0 };
    } else if (inStock === 'false') {
      filter.countInStock = { $lte: 0 };
    }

    // Build sort object
    const sort = {};
    const validSortFields = ['name', 'price', 'rating', 'createdAt', 'countInStock'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
    const sortDirection = sortOrder === 'desc' ? -1 : 1;
    sort[sortField] = sortDirection;

    // Calculate pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit))); // Max 50 items per page
    const skip = (pageNum - 1) * limitNum;

    // Execute query with aggregation for better performance
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(); // Use lean for better performance

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitNum);

    // Get unique categories and brands for frontend filters
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    
    // Get price range
    const priceRange = await Product.aggregate([
      { $group: { 
          _id: null, 
          minPrice: { $min: '$price' }, 
          maxPrice: { $max: '$price' } 
        }
      }
    ]);

    console.log(`Products fetched: ${products.length}/${totalProducts}`);
    
    res.json({
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalProducts,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum
      },
      filters: {
        categories: categories.sort(),
        brands: brands.sort(),
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 1000 }
      },
      appliedFilters: {
        keyword,
        category,
        brand,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        minRating: Number(minRating),
        sortBy: sortField,
        sortOrder,
        inStock
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  console.log(`Fetching product with ID: ${req.params.id}`);
  const product = await Product.findById(req.params.id);
  if (product) {
    console.log('Product found:', product.name);
    res.json(product);
  } else {
    console.log('Product not found for ID:', req.params.id);
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name ' + Date.now(),
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
