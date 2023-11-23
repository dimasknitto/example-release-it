"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { InputCustome } from "@/components";
import { useRouter } from "next/navigation";

export default function Login() {
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const show = () => {
    toast.current?.show({
      severity: "success",
      summary: "Form Submitted",
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      gender: "",
    },
    validate: (data) => {
      let errors: any = {};
      if (!data.name) errors.name = "Name is required";
      if (!data.username) errors.username = "Username is required";
      if (!data.password) errors.password = "Password is required";
      if (!data.gender) errors.gender = "Gender is required";

      return errors;
    },
    onSubmit: (data) => {
      data && show();
      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-1 min-h-screen justify-content-center align-items-center">
      <div className="border-1 border-gray-500 p-2 border-round-sm ">
        <h1 className="mb-5">Register</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
          <Toast ref={toast} />

          <InputCustome
            label="Name"
            id="name"
            error={formik.errors["name"]}
            isError={!!(formik.touched["name"] && formik.errors["name"])}
            setValue={(e) => formik.setFieldValue("name", e)}
            value={formik.values.name}
          />

          <InputCustome
            label="Username"
            id="username"
            error={formik.errors["username"]}
            isError={
              !!(formik.touched["username"] && formik.errors["username"])
            }
            setValue={(e) => formik.setFieldValue("username", e)}
            value={formik.values.username}
          />

          <InputCustome
            type="password"
            label="Password"
            id="password"
            error={formik.errors["password"]}
            isError={
              !!(formik.touched["password"] && formik.errors["password"])
            }
            setValue={(e) => formik.setFieldValue("password", e)}
            value={formik.values.password}
          />

          <InputCustome
            type="dropdown"
            label="Gender"
            id="gender"
            error={formik.errors["gender"]}
            isError={!!(formik.touched["gender"] && formik.errors["gender"])}
            setValue={(e) => formik.setFieldValue("gender", e)}
            value={formik.values.gender}
            data={[
              { code: "male", name: "Male" },
              { code: "female", name: "Female" },
            ]}
          />

          <Button type="submit" label="Register" className="mt-4" />

          <Button
            type="button"
            label="Back"
            severity="danger"
            icon="pi pi-arrow-left"
            className="mt-2"
            onClick={() => router.push('/')}
          />
        </form>
      </div>
    </div>
  );
}
