// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
// } from "@nextui-org/react";
// import { Checkbox } from "@nextui-org/react";
//
// const CategorizeObjects = ({ data, selectedTechnologies, setSelectedTechnologies }) => {
//   const [column1, setColumn1] = useState([]);
//   const [column2, setColumn2] = useState([]);
//   const [column3, setColumn3] = useState([]);
//   // const [selectedTechnologies, setSelectedTechnologies] = useState([]);
//
//   useEffect(() => {
//     console.log("Received data:", data);
//     if (!data || data.length === 0) return;
//
//     const column1Data = [];
//     const column2Data = [];
//     const column3Data = [];
//
//     data.forEach((item) => {
//       if (item.technologyType == "0") {
//         column1Data.push(item);
//       } else if (item.technologyType == "1") {
//         column2Data.push(item);
//       } else if (item.technologyType == "2") {
//         column3Data.push(item);
//       }
//     });
//
//     setColumn1(column1Data);
//     setColumn2(column2Data);
//     setColumn3(column3Data);
//   }, [data]);
//
//   // useEffect(() => {
//   //   console.log("selected technologies : ", selectedTechnologies);
//   // }, [selectedTechnologies]);
//
//   const handleCheckboxChange = (id, checked) => {
//     setSelectedTechnologies((prevSelected) => {
//       if (checked) {
//         return [...prevSelected, id];
//       } else {
//         return prevSelected.filter((techId) => techId !== id);
//       }
//     });
//   };
//   const handleSubmit = () => {
//     console.log("Selected technologies on submit:", selectedTechnologies);
//   };
//
//   const cellStyles = {
//     verticalAlign: "top",
//   };
//
//   const maxRows = Math.max(column1.length, column2.length, column3.length);
//
//   return (
//     <>
//       <Table aria-label="Example static collection table">
//         <TableHeader>
//           <TableColumn>LANGUAGE</TableColumn>
//           <TableColumn>FRAMEWORKS</TableColumn>
//           <TableColumn>DATABASES</TableColumn>
//         </TableHeader>
//         <TableBody>
//           {[...Array(maxRows)].map((_, rowIndex) => (
//             <TableRow key={rowIndex}>
//               <TableCell css={cellStyles}>
//                 {column1[rowIndex] && (
//                   <Checkbox
//                     value={column1[rowIndex].technologyName}
//                     onChange={(e) =>
//                       handleCheckboxChange(column1[rowIndex].id, e.target.checked)
//                     }
//                   >
//                     {column1[rowIndex].technologyName}
//                   </Checkbox>
//                 )}
//               </TableCell>
//               <TableCell css={cellStyles}>
//                 {column2[rowIndex] && (
//                   <Checkbox
//                     value={column2[rowIndex].technologyName}
//                     onChange={(e) =>
//                       handleCheckboxChange(column2[rowIndex].id, e.target.checked)
//                     }
//                   >
//                     {column2[rowIndex].technologyName}
//                   </Checkbox>
//
//                 )}
//
//               </TableCell>
//               <TableCell css={cellStyles}>
//                 {column3[rowIndex] && (
//                   <Checkbox
//                     value={column3[rowIndex].technologyName}
//                     onChange={(e) =>
//                       handleCheckboxChange(column3[rowIndex].id, e.target.checked)
//                     }
//                   >
//                     {column3[rowIndex].technologyName}
//                   </Checkbox>
//                 )}
//
//               </TableCell>
//             </TableRow>
//           ))}
//
//         </TableBody>
//
//       </Table>
//       <Button onClick={handleSubmit}>Submit</Button>
//     </>
//   );
// };
//
// export default CategorizeObjects;



import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";

const CategorizeObjects = ({ data, selectedTechnologies, setSelectedTechnologies }) => {
  const [column1, setColumn1] = useState([]);
  const [column2, setColumn2] = useState([]);
  const [column3, setColumn3] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const column1Data = [];
    const column2Data = [];
    const column3Data = [];

    data.forEach((item) => {
      if (item.technologyType === "0") {
        column1Data.push(item);
      } else if (item.technologyType === "1") {
        column2Data.push(item);
      } else if (item.technologyType === "2") {
        column3Data.push(item);
      }
    });

    setColumn1(column1Data);
    setColumn2(column2Data);
    setColumn3(column3Data);
  }, [data]);

  const handleCheckboxChange = (id, checked) => {
    setSelectedTechnologies((prevSelected) => {
      if (checked) {
        return [...new Set([...prevSelected, id])];
      } else {
        return prevSelected.filter((techId) => techId !== id);
      }
    });
  };

  const handleSubmit = () => {
    console.log("Selected technologies on submit:", selectedTechnologies);
  };

  const cellStyles = {
    verticalAlign: "top",
  };

  const maxRows = Math.max(column1.length, column2.length, column3.length);

  return (
      <>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>LANGUAGE</TableColumn>
            <TableColumn>FRAMEWORKS</TableColumn>
            <TableColumn>DATABASES</TableColumn>
          </TableHeader>
          <TableBody>
            {[...Array(maxRows)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell css={cellStyles}>
                    {column1[rowIndex] && (
                        <Checkbox
                            isChecked={selectedTechnologies.includes(column1[rowIndex].id)}
                            value={column1[rowIndex].technologyName}
                            onChange={(e) => handleCheckboxChange(column1[rowIndex].id, e.target.checked)}
                        >
                          {column1[rowIndex].technologyName}
                        </Checkbox>
                    )}
                  </TableCell>
                  <TableCell css={cellStyles}>
                    {column2[rowIndex] && (
                        <Checkbox
                            isChecked={selectedTechnologies.includes(column2[rowIndex].id)}
                            value={column2[rowIndex].technologyName}
                            onChange={(e) => handleCheckboxChange(column2[rowIndex].id, e.target.checked)}
                        >
                          {column2[rowIndex].technologyName}
                        </Checkbox>
                    )}
                  </TableCell>
                  <TableCell css={cellStyles}>
                    {column3[rowIndex] && (
                        <Checkbox
                            isChecked={selectedTechnologies.includes(column3[rowIndex].id)}
                            value={column3[rowIndex].technologyName}
                            onChange={(e) => handleCheckboxChange(column3[rowIndex].id, e.target.checked)}
                        >
                          {column3[rowIndex].technologyName}
                        </Checkbox>
                    )}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleSubmit}>Submit</Button>
      </>
  );
};

export default CategorizeObjects;
