import React from "react";
import PropTypes from "prop-types";

const MoonIcon = ({className}) => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M15.2368 14.1997C15.7955 14.1609 16.2178 14.7637 15.8461 15.1826C14.4149 16.7958 12.3262 17.8125 10 17.8125C5.68528 17.8125 2.1875 14.3147 2.1875 10C2.1875 6.93808 3.94895 4.28758 6.51381 3.00654C7.01481 2.75632 7.48589 3.32093 7.30273 3.85015C7.02556 4.65105 6.875 5.51107 6.875 6.40626C6.875 10.721 10.3728 14.2188 14.6875 14.2188C14.8722 14.2188 15.0553 14.2124 15.2368 14.1997Z'
				fill='#DAE4F2'
			/>
			<path
				d='M10.9366 8.02772C11.0313 7.98335 11.1084 7.9086 11.1557 7.81535L11.7369 6.66968C11.9163 6.31594 12.4266 6.33107 12.5848 6.69482L13.0609 7.78991C13.1083 7.89872 13.1951 7.98555 13.3039 8.03286L14.3239 8.4764C14.6997 8.63979 14.6997 9.17274 14.3239 9.33613L13.3039 9.77965C13.1951 9.82697 13.1083 9.91379 13.0609 10.0226L12.5848 11.1177C12.4266 11.4814 11.9163 11.4966 11.7369 11.1428L11.1557 9.99716C11.1084 9.90393 11.0313 9.82918 10.9366 9.7848L9.96791 9.33069C9.60819 9.16207 9.60819 8.65046 9.96791 8.48183L10.9366 8.02772Z'
				fill='#DAE4F2'
			/>
		</svg>
	);
};

MoonIcon.propTypes = {
	className: PropTypes.string,
};

MoonIcon.defaultProps = {
	className: "",
};
export default MoonIcon;
