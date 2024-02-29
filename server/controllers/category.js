import Category from "../models/category";
import slugify from "slugify";
import Sub from "../models/sub";
import Product from "../models/product";
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
export const read = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    let products = await Product.find({ category }).populate("category").exec();

  res.json({
    category,
    products,
  });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Create delete failed");
  }
};

export const getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
