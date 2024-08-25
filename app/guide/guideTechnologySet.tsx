import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Checkbox } from "@nextui-org/checkbox";

const TechnologySet = ({
  data,
  guideSelectedTechnologies,
  setGuideSelectedTechnologies,
}) => {
  const [column1, setColumn1] = useState([]);
  const [column2, setColumn2] = useState([]);
  const [column3, setColumn3] = useState([]);
  // const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  useEffect(() => {
    console.log("Received data:", data);
    if (!data || data.length === 0) return;

    const column1Data = [];
    const column2Data = [];
    const column3Data = [];

    data.forEach((item) => {
      if (item.technologyType == "0") {
        column1Data.push(item);
      } else if (item.technologyType == "1") {
        column2Data.push(item);
      } else if (item.technologyType == "2") {
        column3Data.push(item);
      }
    });

    setColumn1(column1Data);
    setColumn2(column2Data);
    setColumn3(column3Data);
  }, [data]);

  // useEffect(() => {
  //   console.log("selected technologies : ", selectedTechnologies);
  // }, [selectedTechnologies]);

  const handleCheckboxChange = (id, checked) => {
    setGuideSelectedTechnologies((prevSelected) => {
      if (checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((techId) => techId !== id);
      }
    });
  };


  const cellStyles = {
    verticalAlign: "top",
  };

  const maxRows = Math.max(column1.length, column2.length, column3.length);

  function checkSelected(id): boolean {
    return guideSelectedTechnologies.includes(id);
  }

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
                    isSelected={checkSelected(column1[rowIndex].id)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        column1[rowIndex].id,
                        e.target.checked,
                      )
                    }
                  >
                    {/*<Checkbox*/}
                    {/*    value={column1[rowIndex].technologyName}*/}
                    {/*    checked={selectedTechnologies.includes(column1[rowIndex].id)}*/}
                    {/*    onChange={(e) => handleCheckboxChange(column1[rowIndex].id, e.target.checked)}*/}
                    {/*>*/}
                    {column1[rowIndex].technologyName}
                  </Checkbox>
                )}
              </TableCell>
              <TableCell css={cellStyles}>
                {column2[rowIndex] && (
                  <Checkbox
                    isSelected={checkSelected(column2[rowIndex].id)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        column2[rowIndex].id,
                        e.target.checked,
                      )
                    }
                  >
                    {/*<Checkbox*/}
                    {/*    value={column2[rowIndex].technologyName}*/}
                    {/*    checked={selectedTechnologies.includes(column2[rowIndex].id)}*/}
                    {/*    onChange={(e) => handleCheckboxChange(column2[rowIndex].id, e.target.checked)}*/}
                    {/*>*/}
                    {column2[rowIndex].technologyName}
                  </Checkbox>
                )}
              </TableCell>
              <TableCell css={cellStyles}>
                {column3[rowIndex] && (
                  <Checkbox
                    isSelected={checkSelected(column3[rowIndex].id)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        column3[rowIndex].id,
                        e.target.checked,
                      )
                    }
                  >
                    {/*<Checkbox*/}
                    {/*//       value={column3[rowIndex].technologyName}*/}
                    {/*//       checked={selectedTechnologies.includes(column3[rowIndex].id)}*/}
                    {/*//       onChange={(e) => handleCheckboxChange(column3[rowIndex].id, e.target.checked)}*/}
                    {/*//   >*/}
                    {column3[rowIndex].technologyName}
                  </Checkbox>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*<Button onClick={handleSubmit}>Submit</Button>*/}
    </>
  );
};

export default TechnologySet;
