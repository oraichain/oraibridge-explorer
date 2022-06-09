import React from "react";
import PropTypes from "prop-types";

const PredictedPriceIcon = ({className}) => {
	return (
		<svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M7.16872 47.1723L9.99669 44.3434L13.6797 40.6617C11.4139 36.4816 11.4276 31.4368 13.7159 27.2694C16.0042 23.1016 20.2534 20.3821 24.9962 20.0503V15.9997H20.9964C20.4439 15.9997 19.9962 15.5515 19.9962 14.9995C19.9962 14.4474 20.4439 13.9993 20.9964 13.9993H24.9962V10.9997H20.9964C20.4439 10.9997 19.9962 10.552 19.9962 9.9995C19.9962 9.44746 20.4439 8.99978 20.9964 8.99978H24.9962C24.9962 6.79069 26.7869 4.99998 28.996 4.99998V1.00018C28.996 0.447677 29.4436 0 29.9962 0C30.5482 0 30.9959 0.447677 30.9959 1.00018V4.99998H33.996V1.00018C33.996 0.447677 34.4436 0 34.9957 0C35.5482 0 35.9959 0.447677 35.9959 1.00018V4.99998H38.9959V1.00018C38.9959 0.447677 39.4436 0 39.9957 0C40.5482 0 40.9958 0.447677 40.9958 1.00018V4.99998H43.9955V1.00018C43.9955 0.447677 44.4431 0 44.9956 0C45.5477 0 45.9954 0.447677 45.9954 1.00018V4.99998H48.9954V1.00018C48.9954 0.447677 49.4431 0 49.9952 0C50.5477 0 50.9953 0.447677 50.9953 1.00018V4.99998C53.2044 4.99998 54.9951 6.79069 54.9951 8.99978H58.9949C59.5474 8.99978 59.9951 9.44746 59.9951 9.9995C59.9951 10.552 59.5474 10.9997 58.9949 10.9997H54.9951V13.9993H58.9949C59.5474 13.9993 59.9951 14.4474 59.9951 14.9995C59.9951 15.5515 59.5474 15.9997 58.9949 15.9997H54.9951V18.9993H58.9949C59.5474 18.9993 59.9951 19.447 59.9951 19.9995C59.9951 20.5515 59.5474 20.9992 58.9949 20.9992H54.9951V23.9993H58.9949C59.5474 23.9993 59.9951 24.4469 59.9951 24.999C59.9951 25.5515 59.5474 25.9992 58.9949 25.9992H54.9951V28.9988H58.9949C59.5474 28.9988 59.9951 29.4469 59.9951 29.999C59.9951 30.551 59.5474 30.9991 58.9949 30.9991H54.9951C54.9951 33.2078 53.2044 34.9989 50.9953 34.9989V38.9987C50.9953 39.5508 50.5477 39.9985 49.9952 39.9985C49.4431 39.9985 48.9954 39.5508 48.9954 38.9987V34.9989H45.9954V38.9987C45.9954 39.5508 45.5477 39.9985 44.9956 39.9985C44.4431 39.9985 43.9955 39.5508 43.9955 38.9987V34.9989H39.9448C39.6107 39.7394 36.8912 43.9859 32.7248 46.2728C28.5588 48.5597 23.5163 48.5739 19.3375 46.3104L15.6554 49.9984L6.83274 58.8211C6.08432 59.5745 5.06629 59.9988 4.00431 60.0002C2.94188 60.0011 1.92293 59.5791 1.17314 58.827C-0.387325 57.2652 -0.387325 54.7347 1.17314 53.1734L7.16872 47.1723ZM13.5328 49.2885L10.7067 46.4623L9.29084 47.8781L12.1165 50.7043L13.5328 49.2885ZM52.9952 30.9991V8.99978C52.9952 7.89524 52.0999 6.99988 50.9953 6.99988H28.996C27.8914 6.99988 26.9961 7.89524 26.9961 8.99978V20.0503C28.3661 20.1464 29.7142 20.4458 30.9959 20.9383V13.9993C30.9959 12.3427 32.3389 10.9997 33.996 10.9997H45.9954C47.6524 10.9997 48.9954 12.3427 48.9954 13.9993V25.9992C48.9954 27.6558 47.6524 28.9988 45.9954 28.9988H39.0568C39.5494 30.2809 39.8483 31.629 39.9448 32.999H50.9953C52.0999 32.999 52.9952 32.1037 52.9952 30.9991ZM38.102 26.9989H45.9954C46.5479 26.9989 46.9955 26.5512 46.9955 25.9992V13.9993C46.9955 13.4473 46.5479 12.9996 45.9954 12.9996H33.996C33.4435 12.9996 32.9958 13.4473 32.9958 13.9993V21.8932C35.1124 23.1227 36.872 24.8827 38.102 26.9989ZM37.9958 33.9988C37.9958 27.3715 32.6232 21.9994 25.9964 21.9994C19.3691 21.9994 13.9965 27.3715 13.9965 33.9988C13.9965 40.626 19.3691 45.9986 25.9964 45.9986C32.6204 45.9913 37.9884 40.6228 37.9958 33.9988ZM14.7966 42.3687L12.1165 45.0483L14.9468 47.8745L17.6264 45.1985C16.5535 44.3942 15.6009 43.4417 14.7966 42.3687ZM2.58987 57.4171C3.37949 58.1711 4.62365 58.1683 5.41006 57.4112L10.7025 52.1183L7.87686 49.2921L2.58392 54.5851C2.20856 54.9613 1.99846 55.4708 1.99938 56.0023C2.00075 56.5337 2.21314 57.0427 2.58987 57.4171Z'
				fill='url(#paint0_linear)'
			/>
			<path
				d='M33.3969 29.0764C33.2756 29.0256 33.1461 28.9995 33.0147 28.999H30.0151C29.4626 28.999 29.0149 29.4472 29.0149 29.9992C29.0149 30.5512 29.4626 30.9994 30.0151 30.9994H30.601L27.015 34.5849L25.076 32.645C24.7949 32.3635 24.4132 32.2055 24.0149 32.2055C23.6171 32.2055 23.2354 32.3635 22.9543 32.645L18.3082 37.292C18.0482 37.5429 17.9443 37.9146 18.0354 38.2643C18.1269 38.614 18.4002 38.8873 18.7499 38.9784C19.0992 39.0699 19.4713 38.966 19.7222 38.706L24.0149 34.4133L25.9539 36.3532C26.2355 36.6343 26.6168 36.7926 27.015 36.7926C27.4128 36.7926 27.7945 36.6343 28.0761 36.3532L32.015 32.4129V32.9993C32.015 33.5513 32.4627 33.999 33.0147 33.999C33.5672 33.999 34.0149 33.5513 34.0149 32.9993V29.9992C34.0144 29.595 33.7704 29.2306 33.3969 29.0764Z'
				fill='url(#paint1_linear)'
			/>
			<defs>
				<linearGradient id='paint0_linear' x1='29.999' y1='0' x2='29.999' y2='60.0002' gradientUnits='userSpaceOnUse'>
					<stop stop-color='#FA2498' />
					<stop offset='1' stop-color='#E97E1B' />
				</linearGradient>
				<linearGradient id='paint1_linear' x1='26.0089' y1='28.999' x2='26.0089' y2='39.0111' gradientUnits='userSpaceOnUse'>
					<stop stop-color='#FA2498' />
					<stop offset='1' stop-color='#E97E1B' />
				</linearGradient>
			</defs>
		</svg>
	);
};

PredictedPriceIcon.propTypes = {
	className: PropTypes.string,
};

PredictedPriceIcon.defaultProps = {
	className: "",
};
export default PredictedPriceIcon;
