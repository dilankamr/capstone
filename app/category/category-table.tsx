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

import { useRouter } from 'next/navigation'
import { Category, deleteCategory } from "@/service/category.service";

export default function CategoryTable({ rows, columns, onDelete}) {

    const router = useRouter();

    // const getKeyValue = (item, columnKey) => {
    //     if (columnKey === "action") {
    //         return (
    //             <div className={"flex"}>
    //                 <Button
    //                     isIconOnly
    //                     className={"mx-1"}
    //                     onClick={() => handleDelete(item)}
    //                 >
    //                     <DeleteIcon />
    //                 </Button>
    //                 <Button
    //                     isIconOnly
    //                     className={"mx-1"}
    //                     onClick={() => handleEdit(item)}
    //                 >
    //                     <EditIcon />
    //                 </Button>
    //             </div>
    //         );
    //     }
    //     else {
    //         return item[columnKey];
    //     }
    // };
    const getKeyValue = (item, columnKey) => {
        return item[columnKey];
    }

    const handleDelete = async (category: Category) => {
        const res = await deleteCategory(category.id);
        onDelete(category.id);
    };

    const handleEdit = (category: Category) => {
        router.push(`/category/${category.id}`);
    };

    return (
        <>
            <Table aria-label="Category table">
                <TableHeader columns={columns}>
                    {(column: Column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={rows}>
                    {(item: Category) => (
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
