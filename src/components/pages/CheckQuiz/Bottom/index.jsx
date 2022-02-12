import React, { useEffect, useState } from 'react';
import '@pagestyles/check_quiz/bottom.scss';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import { useGetRegistrants } from '@api/register/useRegister';
import CheckingTable from './CheckingTable';

const Bottom = () => {
    const search = new URLSearchParams(window.location.search);
    const quizID = search.get('quizID');
    const [tableData, setTableData] = useState([]);
    const { data: registrantsData, isLoading: isRegistrantsLoading, isSuccess: isRegistrantsSuccess } = useGetRegistrants(quizID);
    useEffect(() => {
        if (isRegistrantsSuccess) {
            setTableData(registrantsData.data.data.users.map((val, index) => ({
                sr_num: index,
                name: val,
                rank: Math.floor(Math.random() * 50),
                marks: Math.floor(Math.random() * 50),
                progress: Math.floor(Math.random() * 100),
            })));
        }
      }, [isRegistrantsSuccess]);

    if (isRegistrantsLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="dashboard-bottom">
            <div className="actionables">
                <div>
                    Sort by :
                    {' '}
                    <select className="dropdown">
                        <option>Checked (0 - 100%)</option>
                        <option>B</option>
                    </select>
                </div>
                <div className="cta-flex">
                    <SecondaryCTA text="Autocheck" />
                    <PrimaryCTA text="Publish Results" additionalClassName="quiz-check-button" />
                </div>
            </div>
            <CheckingTable data={tableData} />
        </div>
  );
};

export default Bottom;
