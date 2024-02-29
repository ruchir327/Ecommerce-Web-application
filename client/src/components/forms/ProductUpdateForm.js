import React from "react";
import { Select, Input } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  // destructure
  const {
    title,
    description,
    price,
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
          className="text-dark form-control"
          value={title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="text">Description</label>
        <Input
          type="text"
          name=" description"
          className="text-dark form-control"
          value={description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="text">Price</label>
        <Input
          type="number"
          name="price"
          className="text-dark form-control"
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
          className="text-dark form-control"
          value={quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="text">Color</label>
        <Select
          value={color}
          className="text form-control"
          onChange={(value) => handleChange("color", value)}
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
          className="text-dark form-control"
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
          className="text-dark form-control"
          value={selectedCategory ? selectedCategory : category._id}
          onChange={(value) => handleCategoryChange(value)}
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

      <div>
        <label className="text">Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                <span className="text-dark">{s.name}</span>
              </Option>
            ))}
        </Select>
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;

// import React from "react";
// import { Select } from "antd";

// const { Option } = Select;

// const ProductUpdateForm = ({
//   handleSubmit,
//   handleChange,
//   setValues,
//   values,
//   handleCategoryChange,
//   categories,
//   subOptions,
//   arrayOfSubs,
//   setArrayOfSubs,
//   selectedCategory,
// }) => {
//   // destructure
//   const {
//     title,
//     description,
//     price,
//     category,
//     subs,
//     shipping,
//     quantity,
//     images,
//     colors,
//     brands,
//     color,
//     brand,
//   } = values;

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Title</label>
//         <input
//           type="text"
//           name="title"
//           className="form-control"
//           value={title}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Description</label>
//         <input
//           type="text"
//           name="description"
//           className="form-control"
//           value={description}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Price</label>
//         <input
//           type="number"
//           name="price"
//           className="form-control"
//           value={price}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Shipping</label>
//         <select
//           value={shipping === "Yes" ? "Yes" : "No"}
//           name="shipping"
//           className="form-control"
//           onChange={handleChange}
//         >
//           <option value="No">No</option>
//           <option value="Yes">Yes</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Quantity</label>
//         <input
//           type="number"
//           name="quantity"
//           className="form-control"
//           value={quantity}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <label>Color</label>
//         <select
//           value={color}
//           name="color"
//           className="form-control"
//           onChange={handleChange}
//         >
//           {colors.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Brand</label>
//         <select
//           value={brand}
//           name="brand"
//           className="form-control"
//           onChange={handleChange}
//         >
//           {brands.map((b) => (
//             <option key={b} value={b}>
//               {b}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="form-group">
//         <label>Category</label>
//         <select
//           name="category"
//           className="form-control"
//           onChange={handleCategoryChange}
//           value={selectedCategory ? selectedCategory : category._id}
//         >
//           {categories.length > 0 &&
//             categories.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//         </select>
//       </div>

//       <div>
//         <label>Sub Categories</label>
//         <Select
//           mode="multiple"
//           style={{ width: "100%" }}
//           placeholder="Please select"
//           value={arrayOfSubs}
//           onChange={(value) => setArrayOfSubs(value)}
//         >
//           {subOptions.length &&
//             subOptions.map((s) => (
//               <Option key={s._id} value={s._id}>
//                 {s.name}
//               </Option>
//             ))}
//         </Select>
//       </div>

//       <br />
//       <button className="btn btn-outline-info">Save</button>
//     </form>
//   );
// };

// export default ProductUpdateForm;
