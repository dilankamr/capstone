"use client";

import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "@/app/components/icons";
import {
  deleteGuide,
  Guide,
} from "@/service/guide.service";
import { useRouter } from 'next/navigation'

export default function GuideTable({ rows, columns, onDelete}) {

  const router = useRouter();

  const getKeyValue = (item, columnKey) => {
    if (columnKey === "action") {
      return (
        <div className={"flex"}>
          <Button
            isIconOnly
            className={"mx-1"}
            onClick={() => handleDelete(item)}
          >
            <DeleteIcon />
          </Button>
          <Button
            isIconOnly
            className={"mx-1"}
            onClick={() => handleEdit(item)}
          >
            <EditIcon />
          </Button>
        </div>
      );
    }
    else {
      return item[columnKey];
    }
  };

  const handleDelete = async (guide: Guide) => {
    const res = await deleteGuide(guide.id);
    onDelete(guide.id);
  };

  const handleEdit = (guide: Guide) => {
    router.push(`/guide/${guide.id}`);
  };

  return (
    <>
      <Table aria-label="Guide table">
        <TableHeader columns={columns}>
          {(column: Column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item: Guide) => (
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
