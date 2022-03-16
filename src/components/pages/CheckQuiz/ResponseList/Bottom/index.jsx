import React, { useEffect, useState } from 'react'
import '@pagestyles/check_quiz/bottom.scss'
import PrimaryCTA from '@components/Buttons/PrimaryCTA'
import SecondaryCTA from '@components/Buttons/SecondaryCTA'
// import { useGetRegistrants } from '@api/register/useRegister';
import { useParams } from 'react-router-dom'
import CheckingTable from '@components/pages/CheckQuiz/ResponseList/Bottom/CheckingTable'
import ModalWrapper from '@components/Modals/ModalWrapper'
import AutoCheckModal from '@components/Modals/AutoCheck'
import PublishResultsModal from '@components/Modals/PublishResults'
import { useGetRankList } from '@api/quizzes/useQuizzes'

const SORT_TYPES = {
  CHECKED_ASC: 'Checked (0 - 100%)',
  CHECKED_DES: 'Checked (100 - 0%)',
  ALPHA_ASC: 'Alphabetic (A - Z)',
  ALPHA_DES: 'Alphabetic (Z - A)',
  RANKLIST: 'Ranklist',
}
const Bottom = () => {
  const { quizID } = useParams()
  const [tableData, setTableData] = useState([])
  const [sortBy, setSortBy] = useState(0)
  const [showAutoCheckModal, setShowAutoCheckModal] = useState(false)
  const [showPublishQuizModal, setShowPublishQuizModal] = useState(false)

  const {
    data: registrantsData,
    isLoading: isRegistrantsLoading,
    isSuccess: isRegistrantsSuccess,
  } = useGetRankList(quizID)

  useEffect(() => {
    if (isRegistrantsSuccess) {
      console.log(registrantsData)
      setTableData(
        registrantsData.data.data.rankList.rankList
          .map((val, index) => ({
            sr_num: index + 1,
            name: val.name,
            rank: index + 1,
            marks: val.quizScore,
            progress: val.checkingProgress,
            participantID: val.registrantID,
          }))
          .sort((val1, val2) => val1.progress - val2.progress)
          .map((val, index) => ({ ...val, sr_num: index + 1 })),
      )
    }
  }, [isRegistrantsSuccess])
  const sortTableData = (sortByval) => {
    switch (sortByval) {
      case SORT_TYPES.CHECKED_ASC:
        setTableData(
          tableData
            .sort((val1, val2) => val1.progress - val2.progress)
            .map((val, index) => ({ ...val, sr_num: index + 1 })),
        )
        break
      case SORT_TYPES.CHECKED_DES:
        setTableData(
          tableData
            .sort((val1, val2) => val2.progress - val1.progress)
            .map((val, index) => ({ ...val, sr_num: index + 1 })),
        )
        break
      case SORT_TYPES.ALPHA_ASC:
        setTableData(
          tableData
            .sort((val1, val2) => val1.name.localeCompare(val2.name))
            .map((val, index) => ({ ...val, sr_num: index + 1 })),
        )
        break
      case SORT_TYPES.ALPHA_DES:
        setTableData(
          tableData
            .sort((val1, val2) => -val1.name.localeCompare(val2.name))
            .map((val, index) => ({ ...val, sr_num: index + 1 })),
        )
        break
      case SORT_TYPES.RANKLIST:
        setTableData(
          tableData
            .sort((val1, val2) => val1.rank - val2.rank)
            .map((val, index) => ({ ...val, sr_num: index + 1 })),
        )
        break
      default:
      // do nothing
    }
    setSortBy(sortByval)
  }
  const handleDropdownChange = (e) => {
    const sortByval = e.target.value
    sortTableData(sortByval)
  }

  const handleAutoCheck = () => {
    setShowAutoCheckModal(true)
  }
  const handlePublish = () => {
    setShowPublishQuizModal(true)
  }
  if (isRegistrantsLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="dashboard-bottom">
      <div className="actionables">
        <div>
          Sort by :{' '}
          <select
            className="dropdown"
            onChange={handleDropdownChange}
            value={sortBy}
          >
            {Object.values(SORT_TYPES).map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>
        </div>
        <div className="cta-flex">
          <SecondaryCTA text="Autocheck" onClick={handleAutoCheck} />
          <PrimaryCTA
            text="Publish Results"
            additionalClassName="quiz-check-button"
          />
        </div>
      </div>
      <CheckingTable data={tableData} quizID={quizID} />
      <ModalWrapper
        showModal={showAutoCheckModal}
        hideOnOverlayClick
        setShowModal={setShowAutoCheckModal}
      >
        <AutoCheckModal quizID={quizID} setShowModal={setShowAutoCheckModal} />
      </ModalWrapper>
      <ModalWrapper
        showModal={showPublishQuizModal}
        hideOnOverlayClick
        setShowModal={setShowPublishQuizModal}
      >
        <PublishResultsModal
          quizID={quizID}
          setShowModal={setShowPublishQuizModal}
          data={tableData}
        />
      </ModalWrapper>
    </div>
  )
}

export default Bottom
