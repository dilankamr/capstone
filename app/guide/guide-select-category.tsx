import React from "react";
import { Table, TableColumn, TableHeader, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Checkbox } from "@nextui-org/checkbox";
import { Category } from "@/service/category.service";

interface SelectCategoryProps {
    rows: Category[];
    columns: Column[];
}



const GuideSelectCategory: React.FC<SelectCategoryProps> = ({ rows, columns ,guideSelectedCategories, setGuideSelectedCategories}) => {
    const handleCheckboxChange = (id, checked) => {
        setGuideSelectedCategories((prevSelected) => {
            if (checked) {
                return [...prevSelected, id];
            } else {
                return prevSelected.filter((techId) => techId !== id);
            }
        });
    };


    function checkSelected(id): boolean {
        return guideSelectedCategories.includes(id);
    }
    const getKeyValue = (item: Category, columnKey: string) => {
        return item[columnKey as keyof Category]; // Ensure type safety
    };

    return (
        <>
            <h1>Select Category</h1>
            <Table aria-label="Category table">
                <TableHeader columns={columns}>
                    {(column: Column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={rows}>
                    {(item: Category) => (
                        <TableRow key={item.id}>
                            {(columnKey: string) => (
                                <TableCell>
                                    {columnKey === "categoryName" ? (
                                        <Checkbox
                                            isChecked={guideSelectedCategories.includes(item.id)}
                                            //value={getKeyValue(item, columnKey)}
                                            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}>
                                            {getKeyValue(item, columnKey)}
                                        </Checkbox>
                                    ) : (
                                        getKeyValue(item, columnKey)
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default GuideSelectCategory;
