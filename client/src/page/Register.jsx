import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    role: "",
    company: "",
    position: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint =
        formData.role === "user"
          ? `${import.meta.env.VITE_BASE_URL}/user/register`
          : `${import.meta.env.VITE_BASE_URL}/recruter/register`;

      const response = await axios.post(endpoint, {
        name: formData.Name,
        email: formData.email,
        password: formData.password,
        ...(formData.role === "recruiter" && {
          company: formData.company,
          position: formData.position,
          phone: formData.phone,
        }),
      });

      if (response.data.success) {
        toast.success("Registration successful! You can now log in.");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
      toast.error(err.response?.data?.message || "An error occurred");
      console.error("Registration error:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className=" bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Register as
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="user"
                    name="role"
                    type="radio"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="user"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    User
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="recruiter"
                    name="role"
                    type="radio"
                    value="recruiter"
                    checked={formData.role === "recruiter"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="recruiter"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Recruiter
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.Name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {formData.role === "recruiter" && (
              <>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Position
                  </label>
                  <div className="mt-1">
                    <input
                      id="position"
                      name="position"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
