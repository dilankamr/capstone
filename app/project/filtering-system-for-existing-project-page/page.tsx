"use client";


import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Filtering from "@/app/project/filtering-system/filtering";
import ViewALLGuides from "@/app/project/filtering-system/view-all-guides";
import {useSearchParams} from "next/navigation";
import FilteringForExistingProjectPage from "@/app/project/filtering-system-for-existing-project-page/filtering";
import Newnav from "@/app/components/nav2";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    console.log("projectId=======================",id);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="View Best Guides for Your Project" {...a11yProps(0)} />
                        <Tab label="View All Guides" {...a11yProps(1)} />

                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <FilteringForExistingProjectPage projectId={id}/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ViewALLGuides/>
                </CustomTabPanel>

            </Box>
        </>

    );
}
