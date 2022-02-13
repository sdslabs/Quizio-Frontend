import React from 'react';
import PropTypes from 'prop-types';

const QuizCard = ({
  title,
  creator,
  imageURL,
  description,
  date,
  checked,
  rank,
  totalAttempted,
}) => (
    <div className="relative w-full h-40 my-2 rounded border border-solid border-purple-V1 border-opacity-60">
        <div className="flex flex-row">
            <div className="p-4 flex flex-col justify-center">
                <img
                  src={imageURL}
                  className="h-28 w-28 object-cover rounded"
                  alt="QuizImage"
                />
            </div>
            <div className="flex flex-grow flex-col p-4">
                <div className="align-middle pb-2">
                    <div className="float-left text-sm font-semibold">{title}</div>
                    <div className="float-left text-xs text-black-1"> | Created By: </div>
                    <div className="float-left text-xs text-purple-V6">{creator}</div>
                </div>

                <div className="pb-1 text-grey-N6 text-ellipsis">{description}</div>
                <div className="pb-3">
                    <div className="float-left text-grey-N6">Scheduled: </div>
                    <div className="float-left text-black-1">{date}</div>
                </div>
                <div>
                    <>
                        {checked === true ? (
                            <a href="www.google.com">
                                <button
                                  type="button"
                                  className="bg-purple text-white px-4 py-2 rounded text-sm"
                                >
                                    View Report
                                </button>
                            </a>
            ) : (
                <div className="pt-2 text-purple-V6 font-semibold text-sm">
                    Unchecked
                </div>
            )}
                    </>
                </div>
            </div>
            <>
                {rank !== '' ? (
                    <div className="flex flex-col justify-center items-center px-9">
                        <div className="text-purple-V6 text-xl">Rank</div>
                        <div className="text-purple-V6 font-semibold text-4xl">{rank}</div>
                        <div className="text-purple-V6 text-sm">
                            (Out of
                            {totalAttempted}
                            )
                        </div>
                    </div>
        ) : (
            <></>
        )}
            </>
        </div>
    </div>
);

QuizCard.propTypes = {
  title: PropTypes.string,
  creator: PropTypes.string,
  imageURL: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  checked: PropTypes.bool,
  rank: PropTypes.string,
  totalAttempted: PropTypes.string,
};

QuizCard.defaultProps = {
  title: '',
  creator: '',
  imageURL: '',
  description: '',
  date: '',
  checked: false,
  rank: '',
  totalAttempted: '',
};

export default QuizCard;
