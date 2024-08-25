"use client";

import React, { useEffect, useState } from "react";

import CategoryTable from "@/app/category/category-table";
import { getAllCategory, Category } from "@/service/category.service";
import { CategoryAddPopup } from "@/app/category/category-add-popup";
import SelectCategory from "@/app/category/select-category";

export default function CategoryPage() {
  const columns: Column[] = [
    // {
    //   key: "id",
    //   label: "ID",
    // },
    {
      key: "categoryName",
      label: "CATEGORYNAME",
    },
    // {
    //   key: "action",
    //   label: "Action",
    // },
  ];

  const [rows, setRows]: [Category[], React.Dispatch<(prevRows: Category[]) => Category[]>]= useState([]);

  useEffect(() => {
    getAllCategory().then(
        (        res: Category[]) => {
            console.log("fetch response: ", res);
            setRows((prevRows: Category[]) => res);
        }
    )
  }, []);

  useEffect(() => {
    console.log("useEffect: ", rows);
  }, [rows]);

  const handleSave = (category: Category) => {
    console.log("Trying to save: ", category);
    setRows((prevRows: Category[]) => [...prevRows, category]);
  };


  return (
    <>
      {/*<CategoryAddPopup onSave={handleSave} />*/}
      {/*<CategoryTable*/}
      {/*  // columns={columns}*/}
      {/*  rows={rows}*/}
      {/*/>*/}
        <SelectCategory  rows={rows}
        columns={columns}/>
    </>
  );
}
