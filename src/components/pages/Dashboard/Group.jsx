import React from 'react';
import PropTypes from 'prop-types';

const Group = ({ group }) => (
    <div className="">
        {group.description}
    </div>
  );
Group.propTypes = {
	group: PropTypes.shape({ description: PropTypes.string.isRequired }),
};

Group.defaultProps = {
	group: PropTypes.shape({ description: PropTypes.string.isRequired }),
};
export default Group;
