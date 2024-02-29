import { Input } from "antd";
import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="text">Name</label>
      <Input
        style={{ height: "50px" }}
        type="text"
        className="mt-1 mb-3"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />

      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
);

export default CategoryForm;
