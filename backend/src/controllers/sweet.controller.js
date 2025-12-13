const Sweet = require("../models/Sweet");

exports.addSweet = async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.status(201).json(sweet);
};

exports.getSweets = async (req, res) => {
  res.json(await Sweet.find());
};

exports.purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (sweet.quantity <= 0)
    return res.status(400).json({ message: "Out of stock" });

  sweet.quantity -= 1;
  await sweet.save();

  res.json(sweet);
};
exports.searchSweets = async (req, res) => {
  try {
    const {
      name,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 5,
    } = req.query;

    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // ✅ SORTING
    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;

    const sweets = await Sweet.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Sweet.countDocuments(query);

    res.json({
      data: sweets,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

// UPDATE sweet (admin only)
exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.json(sweet);
};

// DELETE sweet (admin only)
exports.deleteSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  await sweet.deleteOne();
  res.json({ message: "Sweet deleted successfully" });
};
