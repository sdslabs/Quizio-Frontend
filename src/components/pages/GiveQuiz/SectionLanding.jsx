import React from 'react';
import { useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import ModalWrapper from '@components/Modals/ModalWrapper';
import SubmitQuiz from '@components/Modals/SubmitQuiz';
import log from '@utils/log';

const SectionLanding = () => {
    const { sectionId } = useParams();
    log({ sectionId });
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <h1 className="text-3xl font-bold">Section Name</h1>
            <h2 className="mt-8 text-2xl font-semibold">Section Instructions</h2>
            <p className="text-grey-N6 mt-6">
                Paper: There were two papers in JEE Advanced 2020 exam which are Paper
                1 and Paper 2. Aspirants must attempt both the papers to qualify for the exam.
                Duration of Exam: The exam will be conducted for 3 hours for each paper.
                Type of questions: The JEE Advanced 2020 question paper has both multiple-choice
                questions and numerical type questions.
                Language: Based on the aspirants preference, they can choose the
                language either English or Hindi anytime during the exam.
                Subjects: The exam is conducted for three subjects which are Physics, Chemistry and Mathematics.
                Shifts: Both the papers will be conducted on the same day which is 17th May 2020.
            </p>
            <div className="ml-auto mt-16 w-40">
                <PrimaryCTA text="Start Answering" onClick={() => setShowModal(true)} />
            </div>
            <ModalWrapper showModal={showModal} setShowModal={setShowModal} hideOnOverlayClick><SubmitQuiz /></ModalWrapper>
        </>
    );
};

export default SectionLanding;
