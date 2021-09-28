import React from "react";
import {loginAction} from '../requests';

import { Formik, Form, Field } from "formik";
export function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-4 bg-white shadow-lg">
        <p className="text-center">Login</p>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.username) {
              errors.username = "Email is required";
            }
            if (!values.password) {
              errors.password = "Password is required";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            let result = await loginAction({
              "username": values.username, 
              "password": values.password
            })
            if(result){
              window.location.href = "/dashboard";
            }
            else{
              alert('Login failed. Please check username and password')
            }
          }}
          render={(formikBag) => {
            console.log(formikBag);

            return (
              <Form>
                <div className="px-4 py-2">
                  <label className="block">
                    <span className="text-gray-700">Username</span>
                    <Field
                      name="username"
                      className="block w-full mt-1 form-input"
                      css={`
                        padding-left: 3rem !important;
                        padding-right: 3rem !important;
                      `}
                      placeholder="username"
                    />
                  </label>
                </div>

                <div className="px-4 py-2">
                  <label className="block">
                    <span className="text-gray-700">Username</span>
                    <Field
                      name="password"
                      className="block w-full mt-1 form-input"
                      css={`
                        padding-left: 3rem !important;
                        padding-right: 3rem !important;
                      `}
                      placeholder="password"
                      type="password"
                    />
                  </label>
                </div>
                <button
                  disabled={formikBag.isSubmitting}
                  type="submit"
                  className="flex items-center justify-center mx-auto bg-blue-700  py-2 px-8 mt-6 rounded-sm text-white h-full align-middle"
                >
                  LOG IN{" "}
                </button>
              </Form>
            );
          }}
        />
      </div>
    </div>
  );
}

