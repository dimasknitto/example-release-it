"use client";

import { InputCustome } from "@/components";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

export default function AddTodo() {
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const show = () => {
    toast.current?.show({
      severity: "success",
      summary: "Form Submitted",
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
    },
    validate: (data) => {
      let errors: any = {};
      if (!data.title) errors.title = "Title is required";
      if (!data.description) errors.description = "Description is required";
      if (!data.status) errors.status = "Status is required";

      return errors;
    },
    onSubmit: (data) => {
      data && show();
      formik.resetForm();
    },
  });
  return (
    <div className="col-2 col-offset-8">
      <Button label="Add" className="w-full" onClick={() => setVisible(true)} />
      <Toast ref={toast} />
      <Dialog
        header="Add Todo"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-column gap-2 py-2"
        >
          <InputCustome
            label="Title"
            id="title"
            error={formik.errors["title"]}
            isError={!!(formik.touched["title"] && formik.errors["title"])}
            setValue={(e) => formik.setFieldValue("title", e)}
            value={formik.values.title}
          />

          <InputCustome
            type="textarea"
            label="Description"
            id="description"
            error={formik.errors["description"]}
            isError={
              !!(formik.touched["description"] && formik.errors["description"])
            }
            setValue={(e) => formik.setFieldValue("description", e)}
            value={formik.values.description}
          />

          <InputCustome
            type="dropdown"
            label="Status"
            id="status"
            error={formik.errors["status"]}
            isError={!!(formik.touched["status"] && formik.errors["status"])}
            setValue={(e) => formik.setFieldValue("status", e)}
            value={formik.values.status}
            data={[
              { code: "pending", name: "Pending" },
              { code: "done", name: "Done" },
            ]}
          />

          <Button type="submit" label="Save" className="mt-4" />
        </form>
      </Dialog>
    </div>
  );
}
