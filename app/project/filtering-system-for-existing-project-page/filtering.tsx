"use client";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { getAllMatchingGuide } from "@/service/guide.service";
import { Button } from "@nextui-org/button";
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/navigation';
import {
    createRequest,
    deleteRequest,
    getAcceptedGuideIdByProjectId,
    getRequestsByProject, ProjectRequest
} from "@/service/project.request.service"; // Assume deleteRequest is the API for deleting a request
import emailjs from 'emailjs-com';

export default function FilteringForExistingProjectPage({projectId}) {
    const [rows, setRows] = useState([]);
    const router = useRouter();


    const fetchRejectedGuideIds = async () => {
        const result: ProjectRequest[] = await getRequestsByProject(projectId);
        return result
            .filter(r => r.status === "rejected")
            .map(r => r.guideId);
    };

    const fetchPendingGuideIds = async () => {
        const result: ProjectRequest[] = await getRequestsByProject(projectId);
        return result
            .filter(r => r.status === "pending")
            .map(r => r.guideId);
    };

    const fetchPendingRequests = async () => {
        const result: ProjectRequest[] = await getRequestsByProject(projectId);
        return result.filter(r => r.status === "pending");
    };


    const [rejectedGuideIds, setRejectedGuideIds] = useState<Set<number>>(new Set());
    const [pendingGuideIds, setPendingGuideIds] = useState<Set<number>>(new Set());


    useEffect(() => {
        const loadPendingGuideIds = async () => {
            const ids = await fetchPendingGuideIds();
            setPendingGuideIds(new Set(ids));


        };

        loadPendingGuideIds();
    }, [projectId]);


    useEffect(() => {
        const loadPendingRequests = async () => {
            const pendingRequests = await fetchPendingRequests();

            setPendingGuideIds(new Set(pendingRequests.map(r => r.guideId)));

            // Populate the requestedGuides map with pending requests
            const pendingGuidesMap = new Map();
            pendingRequests.forEach((request) => {
                pendingGuidesMap.set(request.guideId, request.id);
            });

            setRequestedGuides(pendingGuidesMap);
        };

        loadPendingRequests();
    }, [projectId]);



    useEffect(() => {
        const loadRejectedGuideIds = async () => {
            const ids = await fetchRejectedGuideIds();
            setRejectedGuideIds(new Set(ids));
        };

        loadRejectedGuideIds();
    }, [projectId]);

    const [requestedGuides, setRequestedGuides] = useState(new Map());

    const handleViewGuide = (params) => {
        const guideId = params.row.id;
        router.push(`/profile2?id=${guideId}`);
        console.log("Viewing guide profile for:", guideId);
        // Implement the logic to navigate to the guide's profile page or open a modal
    };



// Add the email sending functionality inside the handleRequestGuide function
const handleRequestGuide = async (params) => {
    const guideId = params.row.id;
    const requestId = requestedGuides.get(guideId); // Get the request ID if it exists


    if (requestId) {
        // If the guide is already requested, delete the request
        console.log("Deleting request for guide:", guideId);

        try {
            const res = await deleteRequest(requestId);
            console.log("Response from deleteRequest:", res);

            // Remove the guideId from the requestedGuides state
            setRequestedGuides((prev) => {
                const newMap = new Map(prev);
                newMap.delete(guideId);
                return newMap;
            });
        } catch (error) {
            console.error("Error in handleRequestGuide (delete):", error);
        }
    } else {
        // If the guide is not requested, create the request
        console.log("Requesting guide for:", guideId);

        try {
            const res = await createRequest({
                guideId: guideId,
                projectId: projectId,
                status: "pending",
            });
            console.log("Response from createRequest:", res);

            // Add the guideId and requestId to the requestedGuides state
            setRequestedGuides((prev) => {
                const newMap = new Map(prev);
                newMap.set(guideId, res.id);
                return newMap;
            });

            // Extract the required details for email
            const { guideEmail, studentEmail, projectTitle, projectSummary } = res;

            // Send the email
            emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    to_email: guideEmail,
                    from_email: studentEmail,
                    message: `
                        Dear Guide,
                        You have a new project request from ${studentEmail}. Please review the details below:
                        Project Title:${projectTitle}
                      Project Summary: ${projectSummary}
                       Best regards,Guidely Team
                    `,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            ).then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Request sent successfully!');
            }).catch((err) => {
                console.error('FAILED...', err);
                alert('Failed to send request. Please try again.');
            });

        } catch (error) {
            console.error("Error in handleRequestGuide (create):", error);
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
                const isRejected = rejectedGuideIds.has(params.row.id);
                const isPending = pendingGuideIds.has(params.row.id);
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
                        {isRejected ? (
                            <Button
                                className={"w-1/3"}
                                variant="faded"
                                color="danger"
                            >
                                Rejected
                            </Button>
                        ) :isPending ? (
                            <Button
                                className={"w-1/3"}
                                variant={isRequested ? 'faded' : 'solid'}
                                color={isRequested ? 'default' : 'success'}
                                onClick={() => handleRequestGuide(params)}
                            >
                                {isRequested ? 'Cancel Request' : 'Request Guide'}
                            </Button>
                        ):(<Button
                            className={"w-1/3"}
                            variant={isRequested ? 'faded' : 'solid'}
                            color={isRequested ? 'default' : 'success'}
                            onClick={() => handleRequestGuide(params)}
                        >
                            {isRequested ? 'Cancel Request' : 'Request Guide'}
                        </Button>)}
                    </div>
                );
            }
        },
    ];

    useEffect(() => {
        if (projectId) {
            console.log("projectResponseID-------", projectId);
            getAllMatchingGuide(projectId).then((res) => {
                console.log("fetch response: ", res);
                setRows(res);
            });
        }
    }, [projectId]);

    return (
        <Box sx={{ height: '100%', width: '100%',}}>
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
        </Box>
    );
}
