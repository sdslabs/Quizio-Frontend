import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import ModalWrapper from '@components/Modals/ModalWrapper';
// import UserQuizRegistration from '@pages/Register/UserQuizRegistration';
import StartQuizModal from '@pages/Register/StartQuizModal';
import log from '@utils/log';
import useSampleStore from '../../../redux/store/zustand/sample';

const QuizLanding = () => {
    const { quizId } = useParams();
    const sampleStore = useSampleStore();

    log({ sampleStore, quizId });

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <h1 className="text-3xl font-bold">Quiz Name</h1>
            <p className="text-grey-N6 mt-6">
                There were two papers in JEE Advanced 2020 exam
                which are Paper 1 and Paper 2. Aspirants must attempt
                both the papers to qualify for the exam.
            </p>
            <h2 className="mt-8 text-2xl font-semibold">Instructions</h2>
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
                The shifts are different for each paper like  Paper 1 will be conducted from 9:00 am-12:00 pm
                and paper 2 will be conducted from 2:30 pm-5:30 pm.
                Negative Marking: There is negative marking in JEE Advanced and it is not
                same for all the papers it differs from paper to paper. Details of the marking
                scheme will be mentioned at the instructions page at the beginning of the examination.
                The number of questions: Paper consists of three sections and each section contains its own questions.
                Section 1 consists of 4 multiple choice questions where each question will be provided with four options to choose from.
                Section 2 consists of 8 multiple choice questions. One or more options will be correct for each question.
                Section 3 consists of 6 questions and the answer to each question will be in numerical format.
            </p>
            <div className="ml-auto mt-16 w-28">
                <PrimaryCTA text="Continue" onClick={() => setShowModal(true)} />
            </div>
            <ModalWrapper showModal={showModal} hideOnOverlayClick setShowModal={setShowModal}><StartQuizModal /></ModalWrapper>
        </>
    );
};

export default QuizLanding;
