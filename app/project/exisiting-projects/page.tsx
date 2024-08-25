"use client";
import React, { useEffect, useState } from 'react';
import {
    acceptRequest, getAcceptedGuideIdByProjectId,
    getFinalStatusOfProject, getRejectedGuideIdsByProjectId,
    getRequestsByGuide,
    rejectRequest
} from "@/service/project.request.service";
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import {Button} from "@nextui-org/button";
import Typography from '@mui/material/Typography';
import { useDisclosure} from "@nextui-org/modal";
import {Modal, ModalContent, ModalBody} from "@nextui-org/modal";
import {findByID, findByStudentId} from "@/service/project.service";
import {Link} from "@nextui-org/link";
import { Chip} from '@nextui-org/chip';
import {useMultiStepContext} from "@/app/step-context";
import Nav from '@/app/components/nav3';

const CustomNoRowsOverlay = () => {
    console.log('CustomNoRowsOverlay rendered');
    return (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ padding: 2 }}>
            No Requests
        </Typography>
    );
};


const HandleStatusButton =  ({response}) => {

    const [status, setStatus] = useState(null);
    const [guideId, setGuideId] = useState(null);
    // const [rejectedGuideIds, setRejectedGuideIds] = useState(null);
    useEffect(() => {
        const fetchStatus = async () => {
            if (response.id) {
                // const response=await findByID(r.r.toString());
                // setProjectResponse(response);
                // console.log("response:",response);
                const result = await getFinalStatusOfProject(response.id.toString()); // Call the async function
                setStatus(result); // Set the status state
            }
        };

        fetchStatus();
    }, [response]);


    switch (status) {
        case 'accepted':
            const fetchGuideId = async () => {
                const result = await getAcceptedGuideIdByProjectId(response.id.toString());
                setGuideId(result);
            }
            fetchGuideId()
            return (

                <>
                    <Button className={"w-80"}
                            size="small"
                            color="success">
                        Accepted
                    </Button>

                    <Link href={`/profile2?id=${guideId}`} underline="always" color="success">View Guide Profile</Link>
                </>
            )
        case 'rejected':
            return(

                <>
                    <Button className={"w-80"}
                            size="small"
                            color="danger"
                    >
                        All Requests Rejected
                    </Button>

                    <Link href={`/project/filtering-system-for-existing-project-page?id=${response.id}`} underline="always" color="danger">Find a Guide</Link>
                </>
            )
        case 'noRequests':
            return (
                <>
                    <Button className={"w-80"}
                            size="small"
                            color="primary"
                    >
                        Still  Not Requested
                    </Button>

                    <Link href={`/project/filtering-system-for-existing-project-page?id=${response.id}`} underline="always" color="primary">Find a Guide</Link>
                </>
            )

        default:
            return (
                <>
                    <Button className={"w-80"}
                            size="small"
                            color="warning"
                    >
                        Pending
                    </Button>

                    <Link href={`/project/filtering-system-for-existing-project-page?id=${response.id}`} underline="always" color="warning">Find a Guide</Link>
                </>
            )
    }


};


export default function Notification() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [rows, setRows] = useState([]);
    const [response, setResponse] = useState(null);
    const { data: session } = useSession();
    const id = session?.user?.id;

    const columns: GridColDef[] = [
        {
            field: 'order',
            headerName: '',
            width: 60,
            editable: false,
            renderCell: (params) => (


                <Typography variant="body2" sx={{ marginTop: '42px ',marginLeft:'20px',paddingBottom: '10px',fontSize: '18px', fontWeight: 600 }}>
                    {params.value+"."}
                </Typography>

            ),
        },
        {
            field: 'title',
            headerName: '', // Empty header name
            flex: 1,
            editable: false,
            hideable: false, // Prevent hiding from the toolbar
            renderCell: (params) => (

                <Box
                    display="flex"
                    flexDirection="row" // Arrange items horizontally
                    justifyContent="space-between" // Distribute space between title and button
                    alignItems="flex-start" // Align items at the top of the row
                    sx={{ marginTop: '20px',marginLeft: '5px', padding: '20px', border: 0, borderColor: 'transparent',marginRight: '50px' }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}

                    >
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, fontSize: '20px',marginLeft: '3px' }}
                        >
                            {params.row.title} {/* Project Title */}
                        </Typography>
                        <Box
                            sx={{ width:"100%"  }}
                            display="flex"
                            flexDirection="column" // Arrange items horizontally
                            justifyContent="space-between" // Distribute space between title and button
                            alignItems="flex-start"
                            gap={2}>
                            <HandleStatusButton  response={params.row}/>
                        </Box>


                    </Box>
                    <Box >

                        <Button
                            className={"bg-white/20"}
                            variant="flat"
                            size="lg"

                            onClick={() => handleViewMoreDetails(params.row)}
                        >
                            See More Info
                        </Button>
                    </Box>

                </Box>
            ),
        }

    ];

    const handleViewMoreDetails = (row) => {

        setResponse(row);
        console.log("More Info clicked for row: ", row);

        {onOpen()}


    };


    const handleAcceptRequest = async () => {
        if (response?.id) {
            try {
                const res= await acceptRequest(response.id); // Call acceptRequest with the ID
                onOpenChange(false); // Close the modal
                console.log("accepted request's response:",res)
                // Update the UI or refresh data if needed
            } catch (error) {
                console.error("Failed to accept the request:", error);
            }
        }
    };



    const handleRejectRequest = async () => {
        if (response?.id) {
            try {
                const res =await rejectRequest(response.id); // Call rejectRequest with the ID
                onOpenChange(false); // Close the modal
                console.log("rejected request's response:",res)
                // Update the UI or refresh data if needed
            } catch (error) {
                console.error("Failed to reject the request:", error);
            }
        }
    };

    useEffect(() => {
        if (id) {
            console.log("StudentID-------", id);
            findByStudentId(id.toString()).then((res) => {
                console.log("fetch response: ", res);

                // Add order number to each row
                const rowsWithOrder = res.map((row, index) => ({
                    ...row,
                    order: index + 1,
                }));

                setRows(rowsWithOrder);
            });
        }
    }, [id]);


    return (

        <>
        <div className='absolute inset-x-0'>
            <Nav/>
        </div>

        <Modal className={"max-w-2xl h-4/5 p-5 pt-3 "} classNames={{
            body: "py-6",
            base: "border-[#52525B] bg-[#18181B] dark:bg-[#18181B]" ,
            backdrop: "bg-[#09090b]/90 backdrop-opacity-40",

        }} isOpen={isOpen} onOpenChange={onOpenChange}  style={{ zIndex: 1300 }}
        >
            <ModalContent >
                {(onClose) => (

                    <>

                        <ModalBody
                        >
                            {console.log("sfsdf",response.projectTitle)}
                            <div className={"text-3xl font-bold mb-3"}>{response.title}
                            </div>
                            <div className={"h-1/2"}>

                                <h1>Project Summary:</h1>
                                <div className={"border-1 rounded-lg border-slate-600 h-5/6 pt-1 pl-3 mt-2 "}>
                                    <p>
                                        {response.summary}
                                    </p>
                                </div>
                            </div>
                            <h1>Technologies:</h1>
                            <div className=' grid grid-cols-8  gap-2'>


                                {response.technologies?.map((tech, index) => (
                                    <Chip
                                        key={index}
                                        className="flex justify-center items-center text-white  rounded-lg px-6  border border-transparent hover:border-gray-400 min-w-[50px] h-[40px]"
                                    >
                                        {tech.technologyName}
                                    </Chip>
                                ))}
                            </div>
                            <h1>Categories:</h1>
                            <div className=' grid grid-cols-4'>


                                {response.category?.map((cat, index) => (

                                    <Chip
                                        key={index}
                                        className="flex justify-center items-center text-white rounded-lg px-2 border border-transparent hover:border-gray-400 h-[40px]"
                                    >
                                        {cat.categoryName}
                                    </Chip>
                                ))}
                            </div>

                        </ModalBody>

                    </>
                )}
            </ModalContent>
        </Modal>
            <Box
                sx={{
                    height: '100vh', // Full viewport height
                    width: 'full',  // Full viewport width
                    display: 'flex', // Use flexbox for centering
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                }}
            >
                <Box sx={{ height: '100%', width: '80%', marginTop:'100px'}}>
                    <DataGrid


                        sx={{
                            borderColor:'transparent',
                            background: 'linear-gradient(320deg,#18181b, #030712,#27272a )',
                            '& .MuiDataGrid-root': {
                                borderColor:'transparent'// Outer border of the DataGrid

                            },

                            '& .MuiDataGrid-columnHeaders': {
                                borderColor: 'transparent',
                                border:0,
                            },
                            '& .MuiDataGrid-columnsContainer': {
                                borderColor: 'transparent', // Columns container border color
                            },
                            '& .MuiDataGrid-columnSeparator': {
                                color: 'transparent', // Separator line color between columns
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: 'transparent', // Disables background color on hover
                            },

                            '& .MuiDataGrid-columnHeaders': {
                                display: 'none', // Ensures that the column header row is not displayed
                            },


                        }}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        rowHeight={190}
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                        disableColumnSelector
                        hideFooter  // Hides the footer if present
                        hideHeader ={true} // Hides the header if present
                    />
                </Box>
            </Box></>

    );
}
