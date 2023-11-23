'use client'

import { Button } from "primereact/button";
import React from "react";
import AddTodo from "./AddTodo";
import { InputText } from "primereact/inputtext";
import ListTodo from "./ListTodo";
import { useRouter } from "next/navigation";


export default function Todo() {
const router = useRouter();
  function logout() {
    router.push('/')
  }

  return (
    <div className="flex flex-row flex-1 min-h-screen">
      <div className="w-13rem p-2 flex flex-column row-gap-2 bg-bluegray-600">
        <Button label="Create Todo" icon="pi pi-plus" severity="info" onClick={() => router.push('/todo')} />
        <Button label="Logout" icon="pi pi-power-off" severity="info" onClick={logout} />
      </div>
      <div className="w-full p-2 flex flex-column">
        <div className="grid">
          <div className="col-2">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText placeholder="Search" className="p-inputtext-sm" />
            </span>
          </div>
          <AddTodo />
        </div>
        <ListTodo />
      </div>
    </div>
  );
}
