import React, { useEffect, useState } from "react";

import { getAllTechnology, Technology } from "../../service/technology.service";

 import TechnologySet from "@/app/project/technologySet";

export default function ParentTechnologySet({
  selectedTechnologies,
  setSelectedTechnologies,
}) {
  // const [selectedTechnologies, setSelectedTechnologies] = useState([]);

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

  return (
    <>
      <TechnologySet
        data={rows}
        selectedTechnologies={selectedTechnologies}
        setSelectedTechnologies={setSelectedTechnologies}
      />
    </>
  );
}
