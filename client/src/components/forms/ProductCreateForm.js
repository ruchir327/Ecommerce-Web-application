import React from "react";
import { Input, Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCatagoryChange,
  subOptions,
  showSub,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text">Title</label>
        <Input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="text">Description</label>
        <Input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="text">Price</label>
        <Input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="text">Shipping</label>
        <Select
          value={shipping}
          className="text-dark form-control"
          onChange={(value) => handleChange("shipping", value)}
        >
          <Option>Please select</Option>
          <Option value="No">No</Option>
          <Option value="Yes">Yes</Option>
        </Select>
      </div>

      <div className="form-group">
        <label className="text">Quantity</label>
        <Input
          type="number"
          name="quantity"
          className="text-dark dark form-control"
          value={quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="text">Color</label>
        <Select
          value={color}
          className="form-control"
          onChange={(e) => handleChange("quantity", e.target.value)}
        >
          <Option>Please select</Option>
          {colors.map((c) => (
            <Option key={c} value={c}>
              <span className="text-dark">{c}</span>
            </Option>
          ))}
        </Select>
      </div>

      <div className="form-group">
        <label className="text">Brand</label>
        <Select
          value={brand}
          className="text form-control"
          onChange={(value) => handleChange("brand", value)}
        >
          <Option>Please select</Option>
          {brands.map((b) => (
            <Option key={b} value={b}>
              <span className="text-dark">{b}</span>
            </Option>
          ))}
        </Select>
      </div>

      <div className="form-group">
        <label className="text">Category</label>
        <Select
          name="category"
          className="form-control"
          value={category}
          onChange={(value) => handleCatagoryChange(value)}
        >
          <Option>Please select</Option>
          {categories.length > 0 &&
            categories.map((c) => (
              <Option key={c._id} value={c._id}>
                <span className="text-dark">{c.name}</span>
              </Option>
            ))}
        </Select>
      </div>

      {showSub && (
        <div>
          <label className="text">Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option className="text-dark" key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductCreateForm;
