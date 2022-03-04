import React from 'react';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';

const PublishQuiz = () => (
    <div className="py-6 px-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-semibold">Publish Quiz</h1>
            <CrossIcon />
        </div>
        <div>
            <p className="mt-1">Are you sure you want to publish quiz? </p>
        </div>
        <div className="flex justify-end mt-10">
            <div className="w-24">
                <SecondaryCTA text="Cancel" />
            </div>
            <div className="w-24 ml-4">
                <PrimaryCTA text="Publish Quiz" />
            </div>
        </div>
    </div>
);

export default PublishQuiz;
