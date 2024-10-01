import { Alert, Button, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../Redux/Auth/Action";

const Signin = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const {auth} = useSelector(store=>store);
  const token = localStorage.getItem("token");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    setOpenSnackbar(true);
    dispatch(login(inputData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if(token)dispatch(currentUser(token))
  },[token])

  useEffect(() => {
    if(auth.reqUser?.full_name){
      navigate("/")
    }
  },[auth.reqUser])

  return (
    <div>
      <div className="flex justify-center h-screen items-center ">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                placeholder="Enter Your Email"
                onChange={handleChange}
                value={inputData.email}
                type="text"
                className="py-2 outline outline-green-600 w-full rounded-md border"
                name="email"
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                placeholder="Enter Your Password"
                onChange={handleChange}
                value={inputData.password}
                type="text"
                className="py-2 outline outline-green-600 w-full rounded-md border"
                name="password"
              />
            </div>

            <div>
              <Button
                type="submit"
                sx={{ bgcolor: green[700], padding: ".5rem 0rem" }}
                className="w-full bg-green-600"
                variant="contained"
              >
                Sign In
              </Button>
            </div>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Create New Account</p>
            <Button variant="text" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login Successfull
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
