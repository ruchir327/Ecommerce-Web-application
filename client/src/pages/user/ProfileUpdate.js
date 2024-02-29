import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";
import { useDispatch } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";

const ProfileUpdate = ({ handleCancel, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setName(currentUser.displayName || "");
          setEmail(currentUser.email || "");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // await auth.currentUser.updateEmail(email);
      if (password) {
        await auth.currentUser.updatePassword(password);
      }
      await auth.currentUser.updateProfile({
        displayName: name,
        email,
      });

      const updatedUser = auth.currentUser;
      console.log("updatedUser" + updatedUser.displayName);
      localStorage.setItem("displayName", updatedUser.displayName)
      const idTokenResult = await updatedUser.getIdTokenResult();
      // console.log("idTokenResult" + JSON.stringify(idTokenResult));
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          // console.log(res.data);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch((err) => console.log(err));

      setLoading(false);
      // console.log(auth.currentUser);
      toast.success("Profile updated successfully");
      handleCancel(); // Close the modal
      if (typeof onSubmit === "function") {
        onSubmit(); // Call the onSubmit function if it's provided
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleOk = () => {
    handleSubmit();
  };

  const handleCancelClick = () => {
    handleCancel();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter your name"
                value={name}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter new password"
                value={password}
                required
              />
            </div>
            <Button
              style={{ marginBottom: "-100px", marginLeft: "415px" }}
              className="btn btn-primary"
              disabled={!name || !email || !password || loading}
              onClick={handleOk}
            >
              {loading ? "Updating..." : "Ok"}
            </Button>
            <Button
              style={{
                marginBottom: "-55px",
                marginLeft: "330px",
                textTransform: "none",
              }}
              className="btn btn-secondary"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
