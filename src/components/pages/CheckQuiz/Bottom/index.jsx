import React, { useEffect, useState } from 'react';
import '@pagestyles/check_quiz/bottom.scss';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import { useGetRegistrants } from '@api/register/useRegister';
import { useParams } from 'react-router-dom';
import CheckingTable from './CheckingTable';

const SORT_TYPES = {
    CHECKED_ASC: 'Checked (0 - 100%)',
    CHECKED_DES: 'Checked (100 - 0%)',
    ALPHA_ASC: 'Alphabetic (A - Z)',
    ALPHA_DES: 'Alphabetic (Z - A)',
    RANKLIST: 'Ranklist',
};
const Bottom = () => {
    const { quizID } = useParams();
    const [tableData, setTableData] = useState([]);
    const [sortBy, setSortBy] = useState(0);
    const {
        data: registrantsData,
        isLoading: isRegistrantsLoading,
        isSuccess: isRegistrantsSuccess,
    } = useGetRegistrants(quizID);
    useEffect(() => {
        if (isRegistrantsSuccess) {
            setTableData(
                registrantsData.data.data.users
                    .map((val, index) => ({
                        sr_num: index + 1,
                        name: val,
                        rank: Math.floor(Math.random() * 50),
                        marks: Math.floor(Math.random() * 50),
                        progress: Math.floor(Math.random() * 100),
                    }))
                    .sort((val1, val2) => val1.progress - val2.progress)
                    .map((val, index) => ({ ...val, sr_num: index + 1 })),
            );
        }
    }, [isRegistrantsSuccess]);
    const handleDropdownChange = (e) => {
        const sortByval = e.target.value;
        console.log(sortByval);
        if (sortByval === SORT_TYPES.CHECKED_ASC) {
            setTableData(
                tableData
                    .sort((val1, val2) => val1.progress - val2.progress)
                    .map((val, index) => ({ ...val, sr_num: index + 1 })),
            );
        } else if (sortByval === SORT_TYPES.CHECKED_DES) {
            setTableData(
                tableData
                    .sort((val1, val2) => val2.progress - val1.progress)
                    .map((val, index) => ({ ...val, sr_num: index + 1 })),
            );
        } else if (sortByval === SORT_TYPES.ALPHA_ASC) {
            setTableData(
                tableData
                    .sort((val1, val2) => val1.name.localeCompare(val2.name))
                    .map((val, index) => ({ ...val, sr_num: index + 1 })),
            );
        } else if (sortByval === SORT_TYPES.ALPHA_DES) {
            setTableData(
                tableData
                    .sort((val1, val2) => -val1.name.localeCompare(val2.name))
                    .map((val, index) => ({ ...val, sr_num: index + 1 })),
            );
        } else if (sortByval === SORT_TYPES.RANKLIST) {
            setTableData(
                tableData
                    .sort((val1, val2) => val1.rank - val2.rank)
                    .map((val, index) => ({ ...val, sr_num: index + 1 })),
            );
        }
        setSortBy(sortByval);
    };
    if (isRegistrantsLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="dashboard-bottom">
            <div className="actionables">
                <div>
                    Sort by :
                    {' '}
                    <select
                      className="dropdown"
                      onChange={handleDropdownChange}
                      value={sortBy}
                    >
                        {Object.values(SORT_TYPES).map((val) => (<option key={val}>{val}</option>))}
                    </select>
                </div>
                <div className="cta-flex">
                    <SecondaryCTA text="Autocheck" />
                    <PrimaryCTA
                      text="Publish Results"
                      additionalClassName="quiz-check-button"
                    />
                </div>
            </div>
            <CheckingTable data={tableData} />
        </div>
    );
};

export default Bottom;
