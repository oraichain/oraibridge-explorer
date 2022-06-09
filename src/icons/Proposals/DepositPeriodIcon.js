import React from "react";
import PropTypes from "prop-types";

const DepositPeriodIcon = ({className}) => {
	return (
		<svg className={className} width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M5.145 7.645C5.09814 7.69148 5.06094 7.74678 5.03555 7.80771C5.01017 7.86864 4.9971 7.93399 4.9971 8C4.9971 8.06601 5.01017 8.13136 5.03555 8.19229C5.06094 8.25322 5.09814 8.30852 5.145 8.355L6.645 9.855C6.69148 9.90186 6.74678 9.93906 6.80771 9.96445C6.86864 9.98983 6.93399 10.0029 7 10.0029C7.06601 10.0029 7.13136 9.98983 7.19229 9.96445C7.25322 9.93906 7.30852 9.90186 7.355 9.855L8.855 8.355C8.94915 8.26085 9.00205 8.13315 9.00205 8C9.00205 7.86685 8.94915 7.73915 8.855 7.645C8.76085 7.55085 8.63315 7.49795 8.5 7.49795C8.36685 7.49795 8.23915 7.55085 8.145 7.645L7.5 8.295V2.5C7.5 2.36739 7.44732 2.24021 7.35355 2.14645C7.25979 2.05268 7.13261 2 7 2C6.86739 2 6.74021 2.05268 6.64645 2.14645C6.55268 2.24021 6.5 2.36739 6.5 2.5V8.295L5.855 7.645C5.80852 7.59814 5.75322 7.56094 5.69229 7.53555C5.63136 7.51017 5.56601 7.4971 5.5 7.4971C5.43399 7.4971 5.36864 7.51017 5.30771 7.53555C5.24678 7.56094 5.19148 7.59814 5.145 7.645ZM10 5.5H9C8.86739 5.5 8.74021 5.55268 8.64645 5.64645C8.55268 5.74022 8.5 5.86739 8.5 6C8.5 6.13261 8.55268 6.25979 8.64645 6.35355C8.74021 6.44732 8.86739 6.5 9 6.5H10C10.1326 6.5 10.2598 6.55268 10.3536 6.64645C10.4473 6.74022 10.5 6.86739 10.5 7V10.5C10.5 10.6326 10.4473 10.7598 10.3536 10.8536C10.2598 10.9473 10.1326 11 10 11H4C3.86739 11 3.74021 10.9473 3.64645 10.8536C3.55268 10.7598 3.5 10.6326 3.5 10.5V7C3.5 6.86739 3.55268 6.74022 3.64645 6.64645C3.74021 6.55268 3.86739 6.5 4 6.5H5C5.13261 6.5 5.25979 6.44732 5.35355 6.35355C5.44732 6.25979 5.5 6.13261 5.5 6C5.5 5.86739 5.44732 5.74022 5.35355 5.64645C5.25979 5.55268 5.13261 5.5 5 5.5H4C3.60218 5.5 3.22064 5.65804 2.93934 5.93934C2.65804 6.22064 2.5 6.60218 2.5 7V10.5C2.5 10.8978 2.65804 11.2794 2.93934 11.5607C3.22064 11.842 3.60218 12 4 12H10C10.3978 12 10.7794 11.842 11.0607 11.5607C11.342 11.2794 11.5 10.8978 11.5 10.5V7C11.5 6.60218 11.342 6.22064 11.0607 5.93934C10.7794 5.65804 10.3978 5.5 10 5.5Z'
				fill='currentColor'
			/>
		</svg>
	);
};

DepositPeriodIcon.propTypes = {
	className: PropTypes.string,
};

DepositPeriodIcon.defaultProps = {
	className: "",
};
export default DepositPeriodIcon;
