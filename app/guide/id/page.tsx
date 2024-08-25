'use client';
export const dynamic = 'force-dynamic'

import { useRouter, useParams } from 'next/navigation'
import {getOneGuide, Guide,updateGuide} from "@/service/guide.service";
import React, {useEffect, useState} from "react";
import {Input, Textarea} from "@nextui-org/input";
import {title} from "@/app/components/primitives";
import {Button} from "@nextui-org/button";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [profilePicValue, setProfilePicValue] = useState("");
    const [jobValue, setJobValue] = useState("");
    const [aboutValue, setAboutValue] = useState("");
    const [milestonesValue, setMilestonesValue] = useState("");
    const [socialMediaLinksValue, setSocialMediaLinksValue] = useState("");
    const [guide, setGuide]: [Guide, React.Dispatch<Guide>] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetchItem();
        }
    }, [id]);

    const fetchItem = async () => {
        try {
            const guide: Guide = await getOneGuide(id?.toString());
            console.log(guide);
            setFirstNameValue(guide.firstName);
            setLastNameValue(guide.lastName);
            setEmailValue(guide.email);
            setPasswordValue(guide.password);
            setProfilePicValue(guide.profilePic);
            setJobValue(guide.job);
            setAboutValue(guide.about);
            setMilestonesValue(guide.milestones);
            setSocialMediaLinksValue(guide.socialMediaLinks);
            setGuide(guide);
            setLoading(false);
        } catch (error) {
            setError('Error fetching item');
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let updatedGuide = guide;
            updatedGuide.firstName = firstNameValue;
            updatedGuide.lastName = lastNameValue;
            updatedGuide.email = emailValue;
            updatedGuide.password = passwordValue;
            updatedGuide.profilePic = profilePicValue;
            updatedGuide.job = jobValue;
            updatedGuide.about = aboutValue;
            updatedGuide.milestones = milestonesValue;
            updatedGuide.socialMediaLinks = socialMediaLinksValue;
           
            console.log("trying to update...", updatedGuide);
            const res = await updateGuide(updatedGuide);
            router.push('/guide');
        } catch (error) {
            setError('Error updating item');
        }
    };

    const resetForm = () => {
        setFirstNameValue(guide.firstName);
        setLastNameValue(guide.lastName);
        setEmailValue(guide.email);
        setPasswordValue(guide.password);
        setProfilePicValue(guide.profilePic);
        setJobValue(guide.job);
        setAboutValue(guide.about);
        setMilestonesValue(guide.milestones);
        setSocialMediaLinksValue(guide.socialMediaLinks);
        
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className={title()}>Edit Guide ID: {id}</h2>
            <form onSubmit={handleSubmit} className='my-2'>
                <Input
                    label="firstName"
                    placeholder="Enter firstName"
                    type="text"
                    value={firstNameValue}
                    variant="bordered"
                    onValueChange={setFirstNameValue}
                    isRequired={true}
                />
                <Textarea
                    label="lastName"
                    placeholder="Enter lastName"
                    type="text"
                    value={lastNameValue}
                    variant="bordered"
                    onValueChange={setLastNameValue}
                    isRequired={true}
                />
                <Textarea
                    label="email"
                    placeholder="Enter email"
                    type="text"
                    value={emailValue}
                    variant="bordered"
                    onValueChange={setEmailValue}
                    isRequired={true}
                />
                <Textarea
                    label="password"
                    placeholder="Enter password"
                    type="text"
                    value={passwordValue}
                    variant="bordered"
                    onValueChange={setPasswordValue}
                    isRequired={true}
                />
                <Textarea
                    label="profilePic"
                    placeholder="Enter profilePic"
                    type="text"
                    value={profilePicValue}
                    variant="bordered"
                    onValueChange={setProfilePicValue}
                    isRequired={true}
                />
                <Textarea
                    label="job"
                    placeholder="Enter job"
                    type="text"
                    value={jobValue}
                    variant="bordered"
                    onValueChange={setJobValue}
                    isRequired={true}
                />
                <Textarea
                    label="about"
                    placeholder="Enter about"
                    type="text"
                    value={aboutValue}
                    variant="bordered"
                    onValueChange={setAboutValue}
                    isRequired={true}
                />
                <Textarea
                    label="milestones"
                    placeholder="Enter milestones"
                    type="text"
                    value={milestonesValue}
                    variant="bordered"
                    onValueChange={setMilestonesValue}
                    isRequired={true}
                />
                <Textarea
                    label="socialMediaLinks"
                    placeholder="Enter socialMediaLinks"
                    type="text"
                    value={socialMediaLinksValue}
                    variant="bordered"
                    onValueChange={setSocialMediaLinksValue}
                    isRequired={true}
                />
                <div className='flex my-2'>
                    <Button color="default" variant="flat" className='flex-1' onClick={resetForm}>
                        Reset
                    </Button>
                    <Button color="primary" className='flex-1' type='submit'>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}