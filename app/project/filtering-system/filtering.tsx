"use client";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { getAllMatchingGuide } from "@/service/guide.service";
import { useMultiStepContext } from "@/app/step-context";
import { Button } from "@nextui-org/button";
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/navigation';
import { createRequest, deleteRequest } from "@/service/project.request.service";
import emailjs from 'emailjs-com';
import Newnav from '@/app/components/nav2';

export default function Filtering() {
    const { projectResponse } = useMultiStepContext();
    const [rows, setRows] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const router = useRouter();
    const [requestedGuides, setRequestedGuides] = useState(new Map());

    const handleViewGuide = (params) => {
        const guideId = params.row.id;
        router.push(`/profile2?id=${guideId}`);
        console.log("Viewing guide profile for:", guideId);
    };

    const handleRequestGuide = async (params) => {
        const guideId = params.row.id;
        const requestId = requestedGuides.get(guideId);

        if (requestId) {
            // If the guide is already requested, delete the request
            try {
                await deleteRequest(requestId);
                setRequestedGuides((prev) => {
                    const newMap = new Map(prev);
                    newMap.delete(guideId);
                    return newMap;
                });
                setSnackbarMessage('Request canceled successfully.');
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
            } catch (error) {
                setSnackbarMessage('Failed to cancel request. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            // If the guide is not requested, create the request
            try {
                const res = await createRequest({
                    guideId: guideId,
                    projectId: projectResponse.id,
                    status: "pending",
                });
                setRequestedGuides((prev) => {
                    const newMap = new Map(prev);
                    newMap.set(guideId, res.id);
                    return newMap;
                });

                // Send the email (same as before)
                const { guideEmail, studentEmail, projectTitle, projectSummary } = res;

                emailjs.send(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                    {
                        to_email: guideEmail,
                        from_email: studentEmail,
                        message: `
                            Dear Guide,
                            You have a new project request from ${studentEmail}. Please review the details below:
                            Project Title: ${projectTitle}
                            Project Summary: ${projectSummary}
                            Best regards, Guidely Team
                        `,
                    },
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                ).then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setSnackbarMessage('Request sent successfully! Thank you for using our service.');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                }).catch((err) => {
                    console.error('FAILED...', err);
                    setSnackbarMessage('Failed to send request. Please try again.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });

            } catch (error) {
                console.error("Error in handleRequestGuide (create):", error);
                setSnackbarMessage('Failed to send request. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'fullName',
            headerName: 'Name',
            width: 200,
            editable: false,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 150,
            editable: false,
            resizable: false,
            renderCell: (params) => (
                <Rating value={params.value} readOnly precision={0.5} />
            ),
        },
        {
            field: 'reviewCount',
            headerName: 'Review Count',
            type: 'number',
            width: 150,
            editable: false,
            resizable: false,
        },
        {
            field: 'actions',
            headerName: '',
            width: 400,
            sortable: false,
            disableClickEventBubbling: true,
            resizable: false,
            renderCell: (params) => {
                const isRequested = requestedGuides.has(params.row.id);

                return (
                    <div>
                        <Button
                            className={"w-1/2"}
                            variant="solid"
                            color="primary"
                            style={{ marginRight: 8 }}
                            onClick={() => handleViewGuide(params)}
                        >
                            View Guide Profile
                        </Button>
                        <Button
                            className={"w-1/2"}
                            variant={isRequested ? 'faded' : 'solid'}
                            color={isRequested ? 'default' : 'success'}
                            onClick={() => handleRequestGuide(params)}
                        >
                            {isRequested ? 'Cancel Request' : 'Request Guide'}
                        </Button>
                    </div>
                );
            }
        },
    ];

    useEffect(() => {
        if (projectResponse?.id) {
            getAllMatchingGuide(projectResponse.id.toString()).then((res) => {
                setRows(res);
            });
        }
    }, [projectResponse]);

    return (
         <>
         <div className='absolute inset-x-0'>
         <Newnav/>
         </div>
        <Box sx={{ height: '100%', width: '100%', marginTop:'40px' }} >
            <DataGrid
                rowHeight={60}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                disableColumnSelector
                slots={{
                    toolbar: GridToolbar,
                }}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  // Updated position
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>

        </>
    );
}
