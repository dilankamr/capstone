"use client";

import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import React from "react";
import { useRouter } from "next/navigation";

import { Technology } from "@/service/technology.service";

// import { DeleteIcon, EditIcon } from "@/app/components/icons";
// import { deleteProject, Project } from "@/service/project.service";

export default function TechnologyTable({ rows, columns, onDelete }) {
  const router = useRouter();


  const getKeyValue = (item, columnKey) => {
    {
      // console.log("item: "+item+" "+"colomnkey: "+columnKey);
      return (

        //     <div className={"flex"}>
        //       <Button
        //         isIconOnly
        //         className={"mx-1"}
        //         onClick={() => handleDelete(item)}
        //       >
        //         <DeleteIcon />
        //       </Button>
        //       <Button
        //         isIconOnly
        //         className={"mx-1"}
        //         onClick={() => handleEdit(item)}
        //       >
        //         <EditIcon />
        //       </Button>
        //     </div>
        //   );
        // } else {
        item[columnKey]
      );

    }
  };



  // const handleDelete = async (project: Project) => {
  //   const res = await deleteProject(project.id);
  //
  //   onDelete(project.id);
  // };

  // const handleEdit = (project: Project) => {
  //   router.push(`/project/${project.id}`);
  // };

  return (
    <>

      <Table aria-label="Technology table">
        <TableHeader columns={columns}>
          {(column: Column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item: Technology) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
