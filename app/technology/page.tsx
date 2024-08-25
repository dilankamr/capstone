"use client";

import React, { useEffect, useState } from "react";
import { getAllTechnology, Technology } from "@/service/technology.service";
import { TechnologyAddPopup } from "@/app/technology/technology-add-popup";
import TechnologyTable from "@/app/technology/technology-table";
import CategorizeObjects from "@/app/technology/CategorizeObjects";
import ParentCategorizeObjects from "@/app/technology/parentCategorizeObjects";


export default function Page() {
  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "technologyType",
      label: "Technology Type",
    },
    {
      key: "technologyName",
      label: "Technology Name",
    },
  ];

  const [rows, setRows]: [
    Technology[],
    React.Dispatch<(prevRows: Technology[]) => Technology[]>,
  ] = useState([]);

  useEffect(() => {
    getAllTechnology().then((res) => {
      console.log("fetch response: ", res);
      setRows((prevRows: Technology[]) => res);
    });
  }, []);

  useEffect(() => {
    console.log("useEffect: ", rows);
  }, [rows]);

  const handleSave = (technology: Technology) => {
    console.log("Trying to save: ", technology);
    setRows((prevRows: Technology[]) => [...prevRows, technology]);
  };

  return (
      <>
      <ParentCategorizeObjects data={rows}/>
        <TechnologyAddPopup onSave={handleSave} />
        {/*<CategorizeObjects data={rows} />*/}
         {/*<TechnologyTable columns={columns} rows={rows} />*/}
      </>
  );
}
