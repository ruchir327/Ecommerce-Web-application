import Sub from "../models/sub";
import slugify from "slugify";
import Product from "../models/product";
export const create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingsubcategory = await Sub.findOne({ name });
    if (existingsubcategory) {
      return res.json({ error: "Already exists" });
    }
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Sub.find({}).sort({ createdAt: -1 }).exec();
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    let sub = await Sub.findOne({ slug: req.params.slug }).exec();
    let products = await Product.find({ subs: sub }).populate("category").exec();

  res.json({
    sub,
    products,
  });

  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub update failed");
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub delete failed");
  }
};
