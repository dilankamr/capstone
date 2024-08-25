"use client";

import React, { useEffect, useState } from "react";

import GuideTable from "@/app/guide/guide-table";
import { getAllGuide, Guide } from "@/service/guide.service";
import { GuideAddPopup } from "@/app/guide/guide-add-popup";
import GuideLoginPopup from "@/app/guide/login-popup";

export default function GuidePage() {
  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "firstName",
      label: "FirstNAme",
    },
    {
      key: "lastName",
      label: "LastName",
    },
    {
        key: "email",
        label: "Email",
      },
      {
        key: "password",
        label: "Password",
      },

      {
        key: "profilePic",
        label: "ProfilePic",
      },
      {
        key: "job",
        label: "Job",
      },
      {
        key: "about",
        label: "About",
      },
      {
        key: "milestones",
        label: "Milestones",
      },
      {
        key: "socialMediaLinks",
        label: "SocialMediaLinks",
      },
    {
      key: "action",
      label: "Action",
    },
  ];

  const [rows, setRows]: [Guide[], React.Dispatch<(prevRows: Guide[]) => Guide[]>]= useState([]);

  useEffect(() => {
    getAllGuide().then(
        res => {
            console.log("fetch response: ", res);
            setRows((prevRows: Guide[]) => res);
        }
    )
  }, []);

  useEffect(() => {
    console.log("useEffect: ", rows);
  }, [rows]);

  const handleSave = (guide: Guide) => {
    console.log("Trying to save: ", guide);
    setRows((prevRows: Guide[]) => [...prevRows, guide]);
  };

  const handleDelete = (id: string) => {
    console.log("Trying to delete: ", id);
    setRows((prevRows: Guide[]) => prevRows.filter((item) => item.id !== id));
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

      </section>
      {/*<GuideAddPopup onSave={handleSave} />*/}
      {/*<GuideTable*/}
      {/*  columns={columns}*/}
      {/*  rows={rows}*/}
      {/*  onDelete={handleDelete}*/}
      {/*/>*/}

    </>
  );
}
