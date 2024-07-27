import { m } from "framer-motion";
import PropTypes from "prop-types";
const variants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: 15,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
export const ChatIcon2 = () => {
  return (
    <m.svg
      key="TranslateIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} color="currentColor"><path d="M14.17 20.89c4.184-.277 7.516-3.657 7.79-7.9c.053-.83.053-1.69 0-2.52c-.274-4.242-3.606-7.62-7.79-7.899a33 33 0 0 0-4.34 0c-4.184.278-7.516 3.657-7.79 7.9a20 20 0 0 0 0 2.52c.1 1.545.783 2.976 1.588 4.184c.467.845.159 1.9-.328 2.823c-.35.665-.526.997-.385 1.237c.14.24.455.248 1.084.263c1.245.03 2.084-.322 2.75-.813c.377-.279.566-.418.696-.434s.387.09.899.3c.46.19.995.307 1.485.34c1.425.094 2.914.094 4.342 0"></path><path d="m7.5 15l1.842-5.526a.694.694 0 0 1 1.316 0L12.5 15m3-6v6m-7-2h3"></path></g></m.svg>
  )
}
export const ChatIcon = () => {
  return (
    <m.svg
      key="chatIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 29 24"
    >
      <path fill="currentColor" d="m13.792 21.319l-.597 1.008c-.531.897-1.859.897-2.39 0l-.597-1.008c-.462-.781-.693-1.172-1.065-1.388c-.371-.216-.84-.224-1.774-.24c-1.381-.024-2.247-.109-2.974-.41a5.5 5.5 0 0 1-2.976-2.976C1 15.294 1 14.013 1 11.45v-1.1c0-3.6 0-5.401.81-6.724A5.5 5.5 0 0 1 3.626 1.81C4.95 1 6.75 1 10.35 1h3.3c3.6 0 5.401 0 6.724.81a5.5 5.5 0 0 1 1.816 1.816C23 4.95 23 6.75 23 10.35v1.1c0 2.563 0 3.844-.419 4.855a5.5 5.5 0 0 1-2.976 2.976c-.727.301-1.593.386-2.974.41c-.935.016-1.403.024-1.774.24c-.372.216-.603.607-1.065 1.388" opacity={0.30}></path>
      <path fill="currentColor" fillRule="evenodd" d="M15.267 6.83a.825.825 0 0 1 1.167 0l.188.188l.04.04c.7.7 1.283 1.282 1.683 1.807c.423.554.72 1.14.72 1.848c0 .708-.297 1.294-.72 1.848c-.4.524-.983 1.107-1.682 1.806l-.23.23a.825.825 0 0 1-1.166-1.167l.189-.19c.75-.749 1.252-1.254 1.577-1.68c.31-.407.381-.644.381-.847c0-.203-.07-.44-.38-.847c-.326-.426-.828-.931-1.578-1.681l-.189-.189a.825.825 0 0 1 0-1.166m-1.63-2.226c.44.118.701.57.583 1.01L11.373 16.24a.825.825 0 1 1-1.594-.427l2.847-10.625a.825.825 0 0 1 1.01-.584M8.733 6.83a.825.825 0 0 0-1.167 0l-.188.188l-.04.04c-.7.7-1.283 1.282-1.683 1.807c-.423.554-.72 1.14-.72 1.848c0 .708.297 1.294.72 1.848c.4.524.983 1.107 1.682 1.806l.23.23a.825.825 0 0 0 1.166-1.167l-.189-.19c-.75-.749-1.252-1.254-1.577-1.68c-.31-.407-.381-.644-.381-.847c0-.203.07-.44.38-.847c.326-.426.828-.931 1.578-1.681l.189-.189a.825.825 0 0 0 0-1.166" clipRule="evenodd"></path>
    </m.svg >
  );
};
export const GeminiIcon = () => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={`w-6 h-6 group-hover:rotate-180 group-hover:scale-110  transition-all duration-700 ease-in-out`}
    >
      <path
        d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
        fill="url(#prefix_paint0_radial_980_20147)"
      />
      <defs>
        <radialGradient
          id="prefix_paint0_radial_980_20147"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
        >
          <stop offset=".067" stopColor="#9168C0" />
          <stop offset=".343" stopColor="#5684D1" />
          <stop offset=".672" stopColor="#1BA1E3" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const TranslateIcon = () => {
  return (
    <m.svg
      key="TranslateIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path fill="currentColor" d="M3.385 5.997a6.07 6.07 0 0 1 4.576-.467h.001c1.232.362 1.906 1.11 2.237 1.94c.3.754.3 1.536.3 1.99v5.79a.75.75 0 0 1-1.5 0v-.3a9 9 0 0 1-.396.222c-.952.505-2.327 1.018-3.757.761c-1.584-.285-2.576-1.595-2.8-2.952c-.229-1.38.316-2.937 1.902-3.697c1.44-.69 2.99-.628 4.122-.427c.342.061.653.136.923.211c-.013-.351-.055-.71-.188-1.042c-.166-.417-.491-.83-1.264-1.056a4.57 4.57 0 0 0-3.431.34a.75.75 0 0 1-.725-1.313m4.423 4.337c-.986-.175-2.175-.194-3.212.303c-.891.427-1.208 1.27-1.07 2.1c.141.854.741 1.568 1.586 1.72c.938.169 1.947-.164 2.788-.61a8 8 0 0 0 1.098-.702v-2.507a8.4 8.4 0 0 0-1.19-.304m8.677-3.296a.75.75 0 0 1 .476.948c-.09.27-.185.61-.271.94c.948-.088 1.87-.226 2.638-.406a.75.75 0 1 1 .343 1.46c-.973.229-2.152.392-3.336.481q-.164.818-.257 1.5a6 6 0 0 1 1.672-.238a.75.75 0 0 1 1.5.027l-.003.222a4.04 4.04 0 0 1 2.504 2.423a3.98 3.98 0 0 1-.154 3.128c-.496 1.025-1.44 1.894-2.827 2.427a.75.75 0 0 1-.538-1.4c1.083-.416 1.708-1.046 2.015-1.68a2.48 2.48 0 0 0 .097-1.954a2.55 2.55 0 0 0-1.278-1.399a7.63 7.63 0 0 1-2.285 4.047q.086.197.17.424a.75.75 0 1 1-1.423.478a4.7 4.7 0 0 1-1.24.474c-.72.155-1.557.099-2.13-.486c-.865-.886-.818-2.277-.204-3.442c.477-.908 1.323-1.77 2.538-2.413c.06-.614.157-1.298.3-2.064c-.654.014-1.28.002-1.844-.037a.75.75 0 0 1 .102-1.496c.622.042 1.331.05 2.067.024c.116-.472.272-1.067.42-1.512a.75.75 0 0 1 .948-.476m-2.058 7.372c-.546.413-.92.87-1.146 1.3c-.444.843-.289 1.45-.05 1.695c.055.057.258.172.742.068c.345-.074.672-.202.977-.373a8 8 0 0 1-.386-1.373a9 9 0 0 1-.137-1.317m1.755 1.66a6.65 6.65 0 0 0 1.413-2.848a4.7 4.7 0 0 0-1.328.25a8 8 0 0 0-.34.12a8.6 8.6 0 0 0 .113 1.867q.062.338.142.611"></path>
    </m.svg>
  );
};
export const GrammarCheckIcon = () => {
  return (
    <m.svg
      key="GrammarCheckIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.35}
        d="M14 9a3 3 0 1 0 6 0a3 3 0 0 0-6 0M4 12V7a3 3 0 1 1 6 0v5M4 9h6m10-3v6M4 16h12M4 20h6m4 0l2 2l5-5"
      ></path>
    </m.svg>
  );
};

export const HomeIcon = () => {
  return (
    <m.svg
      key="HomeIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillOpacity={0.25}
        d="M5 14.059c0-1.01 0-1.514.222-1.945c.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601c.32 0 .601.2 1.162.601l4.163 2.973c.821.587 1.232.88 1.453 1.311c.222.43.222.935.222 1.944V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19z"
      ></path>
      <path
        fill="currentColor"
        d="M3 12.387c0 .266 0 .4.084.441c.084.041.19-.04.4-.205l7.288-5.668c.59-.459.885-.688 1.228-.688c.343 0 .638.23 1.228.688l7.288 5.668c.21.164.316.246.4.205c.084-.041.084-.175.084-.441v-.409c0-.48 0-.72-.102-.928c-.101-.208-.291-.356-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688c-.343 0-.638.23-1.228.688l-7 5.445c-.379.294-.569.442-.67.65c-.102.208-.102.448-.102.928zM12.5 15h-1a2 2 0 0 0-2 2v3.85c0 .083.067.15.15.15h4.7a.15.15 0 0 0 .15-.15V17a2 2 0 0 0-2-2"
      ></path>
      <rect
        width={2}
        height={4}
        x={16}
        y={5}
        fill="currentColor"
        rx={0.5}
      ></rect>
    </m.svg>
  );
};
export const ProfileIcon = () => {
  return (
    <m.svg
      key="ProfileIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path
          fill="currentColor"
          d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2"
          opacity={0.25}
        ></path>
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
        ></path>
        <circle
          cx={12}
          cy={7}
          r={3}
          stroke="currentColor"
          strokeWidth={2}
        ></circle>
      </g>
    </m.svg>
  );
};
export const EverythingIcon = ({ isDarkMode }) => {
  return (
    <m.svg
      key="EverythingIcon"
      variants={variants}
      initial="initial"
      animate={{ y: -5, opacity: 1 }}
      exit="exit"
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      xmlns="http://www.w3.org/2000/svg"
      className={` translate-y- ${isDarkMode ? "text-copy" : "text-copyLight"}`}
      viewBox="0 0 256 256"
    >
      <g fill="currentColor">
        <path
          d="M112 80a32 32 0 1 1-32-32a32 32 0 0 1 32 32m64-32a32 32 0 1 0 32 32a32 32 0 0 0-32-32m-96 96a32 32 0 1 0 32 32a32 32 0 0 0-32-32"
          opacity={0.2}
        ></path>
        <path d="M80 40a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m96 16a40 40 0 1 0-40-40a40 40 0 0 0 40 40m0-64a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-96 80a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m136-24a8 8 0 0 1-8 8h-24v24a8 8 0 0 1-16 0v-24h-24a8 8 0 0 1 0-16h24v-24a8 8 0 0 1 16 0v24h24a8 8 0 0 1 8 8"></path>
      </g>
    </m.svg>
  );
};
EverythingIcon.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};
export const ClearIcon = () => {
  return (
    <m.svg
      key="ClearIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      className={`w-4 h-4 group-hover:scale-110 mx-1`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <defs>
        <mask id="ipTClearFormat0">
          <g fill="none" stroke="#fff">
            <path
              fill="#262626"
              strokeLinejoin="round"
              strokeWidth={3.05}
              d="M44.782 24.17L31.918 7.1L14.135 20.5L27.5 37l3.356-2.336z"
            ></path>
            <path
              strokeLinejoin="round"
              strokeWidth={3.05}
              d="m27.5 37l-3.839 3.075l-10.563-.001l-2.6-3.45l-6.433-8.536L14.5 20.225"
            ></path>
            <path
              strokeLinecap="round"
              strokeWidth={2.35}
              d="M13.206 40.072h31.36"
            ></path>
          </g>
        </mask>
      </defs>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#ipTClearFormat0)"
      ></path>
    </m.svg>
  );
};
export const CollapseIcon = () => {
  return (
    <m.svg
      key="CollapseIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      className={`w-4 h-4 group-hover:scale-110 mx-1 group-hover:text-blue-200 transition-all duration-300`}
    >
      <rect
        width={32}
        height={8}
        x={2}
        y={22}
        fill="currentColor"
        className="clr-i-solid clr-i-solid-path-1"
        rx={1}
        ry={1}
      ></rect>
      <path
        fill="currentColor"
        d="m18 20.7l-5.79-5.79a1 1 0 0 1 0-1.41a1 1 0 0 1 1.41 0L18 17.87l4.38-4.37a1 1 0 0 1 1.41 0a1 1 0 0 1 0 1.41Z"
        className="clr-i-solid clr-i-solid-path-2"
      ></path>
      <path
        fill="currentColor"
        d="m18 14.5l-5.79-5.79a1 1 0 0 1 0-1.42a1 1 0 0 1 1.41 0L18 11.67l4.38-4.38a1 1 0 0 1 1.41 0a1 1 0 0 1 0 1.42Z"
        className="clr-i-solid clr-i-solid-path-3"
      ></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </m.svg>
  );
};
export const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={` group-hover:scale-110 transition-all`}
    >
      <g fill="none">
        <circle
          cx={12}
          cy={12}
          r={9}
          fill="currentColor"
          fillOpacity={0.35}
        ></circle>
        <path
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="round"
          strokeWidth={1.35}
          d="M12 8v8m4-4H8"
        ></path>
      </g>
    </svg>
  );
};
export const ExpandSidebarIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.45}
        color="currentColor"
      >
        <path d="M22 12c0-3.75 0-5.625-.955-6.939a5 5 0 0 0-1.106-1.106C18.625 3 16.749 3 13 3h-2c-3.75 0-5.625 0-6.939.955A5 5 0 0 0 2.955 5.06C2 6.375 2 8.251 2 12s0 5.625.955 6.939a5 5 0 0 0 1.106 1.106C5.375 21 7.251 21 11 21h2c3.75 0 5.625 0 6.939-.955a5 5 0 0 0 1.106-1.106C22 17.625 22 15.749 22 12m-7.5-8.5v17M19 7h-1.5m1.5 4h-1.5"></path>
        <path d="m8 10l1.227 1.057c.515.445.773.667.773.943s-.258.498-.773.943L8 14"></path>
      </g>
    </svg>
  );
};
export const ExpandIcon = () => {
  return (
    <m.svg
      key="ExpandIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
    >
      <path
        fill="currentColor"
        d="M28 18.672c1.008 0 1.875-.82 1.875-1.805V9.11l-.164-3.914l2.016 2.086l3.046 3.07c.375.352.82.563 1.29.563c.984 0 1.71-.703 1.71-1.664c0-.54-.21-.96-.609-1.312L29.36.672C28.868.227 28.493.1 28 .1c-.469 0-.867.127-1.36.572l-7.78 7.265c-.422.352-.633.774-.633 1.313c0 .96.703 1.664 1.71 1.664c.47 0 .938-.21 1.29-.562l3.046-3.07l2.016-2.087l-.14 3.914v7.758c0 .985.843 1.805 1.851 1.805M8.266 43.727h7.664v-3.54H8.758c-2.11 0-3.398-1.406-3.398-3.328V19.141c0-1.922 1.289-3.305 3.398-3.305h7.172v-3.54H8.266c-3.89 0-6.633 2.65-6.633 6.259v18.914c0 3.586 2.742 6.258 6.633 6.258m39.468 0c3.914 0 6.633-2.672 6.633-6.258V18.555c0-3.61-2.719-6.258-6.633-6.258H40.07v3.539h7.172c2.11 0 3.399 1.383 3.399 3.305v17.718c0 1.922-1.29 3.328-3.399 3.328H40.07v3.54ZM28 55.96c.492 0 .867-.188 1.36-.633l7.804-7.266c.399-.351.61-.773.61-1.312c0-.961-.704-1.64-1.688-1.64c-.469 0-.937.187-1.312.538l-3.047 3.07l-2.016 2.087l.164-3.914v-7.735c0-1.008-.867-1.828-1.875-1.828s-1.852.82-1.852 1.828v7.735l.141 3.914l-2.016-2.086l-3.046-3.07a1.777 1.777 0 0 0-1.266-.54c-1.008 0-1.734.68-1.734 1.641c0 .539.21.96.633 1.313l7.78 7.265c.493.445.891.633 1.36.633"
      ></path>
    </m.svg>
  );
};

export const EditIcon = () => {
  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      key="EditIcon"
      variants={variants}
      initial="initial"
      animate="animate"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.3}
        d="m14.304 4.844l2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565l6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
      ></path>
    </m.svg>
  );
};
export const ArrowDown = () => {
  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5`}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.15}
        d="m10 17l5-5l-5-5"
      ></path>
    </m.svg>
  );
};
export const DeleteIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
      <path
        fill="currentColor"
        fillOpacity={0.35}
        d="M292.7 840h438.6l24.2-512h-487z"
      ></path>
      <path
        fill="currentColor"
        d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-504-72h304v72H360zm371.3 656H292.7l-24.2-512h487z"
      ></path>
    </svg>
  );
};
