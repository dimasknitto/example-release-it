"use client";

import React from "react";
import { useRouter } from "next/navigation";
export default function ListTodo() {
  const router = useRouter();

  const array = [1, 2];
  return (
    <div className="p-2">
      {array.map((val, key) => (
        <div key={key} className="flex flex-row p-2 border-1 border-gray-500 border-round mb-3 cursor-pointer hover:bg-blue-300">
          <div className="flex flex-column row-gap-2" style={{ flex: 1 }}>
            <div className="font-bold">Title {val}</div>
            <div className="">Titles</div>
          </div>
          <div className="flex flex-column row-gap-2" style={{ flex: 3 }}>
            <div className="font-bold">Description</div>
            <div className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              impedit aut. Repellat error culpa debitis beatae, hic numquam odit
              qui et vel tempore, commodi, nobis quo dolorem officia voluptates
              id.
            </div>
          </div>
          <div
            className="flex flex-column row-gap-2 text-center"
            style={{ flex: 1 }}
          >
            <div className="font-bold">Status</div>
            <div className="">Pending</div>
          </div>
        </div>
      ))}
    </div>
  );
}
