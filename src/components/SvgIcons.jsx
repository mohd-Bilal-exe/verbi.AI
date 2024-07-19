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
      <g fill="none">
        <path
          fill="currentColor"
          d="m13.087 21.388l.645.382zm.542-.916l-.646-.382zm-3.258 0l-.645.382zm.542.916l.646-.382zm-8.532-5.475l.693-.287zm5.409 3.078l-.013.75zm-2.703-.372l-.287.693zm16.532-2.706l.693.287zm-5.409 3.078l-.012-.75zm2.703-.372l.287.693zm.7-15.882l-.392.64zm1.65 1.65l.64-.391zM4.388 2.738l-.392-.64zm-1.651 1.65l-.64-.391zM9.403 19.21l.377-.649zm4.33 2.56l.541-.916l-1.29-.764l-.543.916zm-4.007-.916l.542.916l1.29-.764l-.541-.916zm2.715.152a.52.52 0 0 1-.882 0l-1.291.764c.773 1.307 2.69 1.307 3.464 0zM10.5 2.75h3v-1.5h-3zm10.75 7.75v1h1.5v-1zm-18.5 1v-1h-1.5v1zm-1.5 0c0 1.155 0 2.058.05 2.787c.05.735.153 1.347.388 1.913l1.386-.574c-.147-.352-.233-.782-.278-1.441c-.046-.666-.046-1.51-.046-2.685zm6.553 6.742c-1.256-.022-1.914-.102-2.43-.316L4.8 19.313c.805.334 1.721.408 2.977.43zM1.688 16.2A5.75 5.75 0 0 0 4.8 19.312l.574-1.386a4.25 4.25 0 0 1-2.3-2.3zm19.562-4.7c0 1.175 0 2.019-.046 2.685c-.045.659-.131 1.089-.277 1.441l1.385.574c.235-.566.338-1.178.389-1.913c.05-.729.049-1.632.049-2.787zm-5.027 8.241c1.256-.021 2.172-.095 2.977-.429l-.574-1.386c-.515.214-1.173.294-2.428.316zm4.704-4.115a4.25 4.25 0 0 1-2.3 2.3l.573 1.386a5.75 5.75 0 0 0 3.112-3.112zM13.5 2.75c1.651 0 2.837 0 3.762.089c.914.087 1.495.253 1.959.537l.783-1.279c-.739-.452-1.577-.654-2.6-.752c-1.012-.096-2.282-.095-3.904-.095zm9.25 7.75c0-1.622 0-2.891-.096-3.904c-.097-1.023-.299-1.862-.751-2.6l-1.28.783c.285.464.451 1.045.538 1.96c.088.924.089 2.11.089 3.761zm-3.53-7.124a4.25 4.25 0 0 1 1.404 1.403l1.279-.783a5.75 5.75 0 0 0-1.899-1.899zM10.5 1.25c-1.622 0-2.891 0-3.904.095c-1.023.098-1.862.3-2.6.752l.783 1.28c.464-.285 1.045-.451 1.96-.538c.924-.088 2.11-.089 3.761-.089zM2.75 10.5c0-1.651 0-2.837.089-3.762c.087-.914.253-1.495.537-1.959l-1.279-.783c-.452.738-.654 1.577-.752 2.6C1.25 7.61 1.25 8.878 1.25 10.5zm1.246-8.403a5.75 5.75 0 0 0-1.899 1.899l1.28.783a4.25 4.25 0 0 1 1.402-1.403zm7.02 17.993c-.202-.343-.38-.646-.554-.884a2.229 2.229 0 0 0-.682-.645l-.754 1.297c.047.028.112.078.224.232c.121.166.258.396.476.764zm-3.24-.349c.44.008.718.014.93.037c.198.022.275.054.32.08l.754-1.297a2.244 2.244 0 0 0-.909-.274c-.298-.033-.657-.038-1.069-.045zm6.498 1.113c.218-.367.355-.598.476-.764c.112-.154.177-.204.224-.232l-.754-1.297c-.29.17-.5.395-.682.645c-.173.238-.352.54-.555.884zm1.924-2.612c-.412.007-.771.012-1.069.045c-.311.035-.616.104-.909.274l.754 1.297c.045-.026.122-.058.32-.08c.212-.023.49-.03.93-.037z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={1.15}
          d="M8 9h8m-8 3.5h5.5"
        ></path>
      </g>
    </m.svg>
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
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3.385 5.997a6.07 6.07 0 0 1 4.576-.467h.001c1.232.362 1.906 1.11 2.237 1.94c.3.754.3 1.536.3 1.99v5.79a.75.75 0 0 1-1.5 0v-.3a9 9 0 0 1-.396.222c-.952.505-2.327 1.018-3.757.761c-1.584-.285-2.576-1.595-2.8-2.952c-.229-1.38.316-2.937 1.902-3.697c1.44-.69 2.99-.628 4.122-.427c.342.061.653.136.923.211c-.013-.351-.055-.71-.188-1.042c-.166-.417-.491-.83-1.264-1.056a4.57 4.57 0 0 0-3.431.34a.75.75 0 0 1-.725-1.313m4.423 4.337c-.986-.175-2.175-.194-3.212.303c-.891.427-1.208 1.27-1.07 2.1c.141.854.741 1.568 1.586 1.72c.938.169 1.947-.164 2.788-.61a8 8 0 0 0 1.098-.702v-2.507a8.4 8.4 0 0 0-1.19-.304m8.677-3.296a.75.75 0 0 1 .476.948c-.09.27-.185.61-.271.94c.948-.088 1.87-.226 2.638-.406a.75.75 0 1 1 .343 1.46c-.973.229-2.152.392-3.336.481q-.164.818-.257 1.5a6 6 0 0 1 1.672-.238a.75.75 0 0 1 1.5.027l-.003.222a4.04 4.04 0 0 1 2.504 2.423a3.98 3.98 0 0 1-.154 3.128c-.496 1.025-1.44 1.894-2.827 2.427a.75.75 0 0 1-.538-1.4c1.083-.416 1.708-1.046 2.015-1.68a2.48 2.48 0 0 0 .097-1.954a2.55 2.55 0 0 0-1.278-1.399a7.63 7.63 0 0 1-2.285 4.047q.086.197.17.424a.75.75 0 1 1-1.423.478a4.7 4.7 0 0 1-1.24.474c-.72.155-1.557.099-2.13-.486c-.865-.886-.818-2.277-.204-3.442c.477-.908 1.323-1.77 2.538-2.413c.06-.614.157-1.298.3-2.064c-.654.014-1.28.002-1.844-.037a.75.75 0 0 1 .102-1.496c.622.042 1.331.05 2.067.024c.116-.472.272-1.067.42-1.512a.75.75 0 0 1 .948-.476m-2.058 7.372c-.546.413-.92.87-1.146 1.3c-.444.843-.289 1.45-.05 1.695c.055.057.258.172.742.068c.345-.074.672-.202.977-.373a8 8 0 0 1-.386-1.373a9 9 0 0 1-.137-1.317m1.755 1.66a6.65 6.65 0 0 0 1.413-2.848a4.7 4.7 0 0 0-1.328.25a8 8 0 0 0-.34.12a8.6 8.6 0 0 0 .113 1.867q.062.338.142.611"
      ></path>
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
export const GrammarCheckIcon2 = () => {
  return (
    <m.svg
      key="GrammarCheckIcon2"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M2.5 5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h6.883a1.5 1.5 0 0 1-.373-.99V11zm0 3h6.377l-1 1H2.5a.5.5 0 0 1 0-1M14 7a.5.5 0 0 1 .496.439l.098.791a2.5 2.5 0 0 0 2.176 2.176l.791.098a.5.5 0 0 1 0 .992l-.791.098a2.5 2.5 0 0 0-2.176 2.176l-.098.791a.5.5 0 0 1-.992 0l-.098-.791a2.5 2.5 0 0 0-2.176-2.176l-.791-.098a.5.5 0 0 1 0-.992l.791-.098a2.5 2.5 0 0 0 2.176-2.176l.098-.791A.5.5 0 0 1 14 7m0 2.597A3.5 3.5 0 0 1 12.597 11c.593.322 1.08.81 1.403 1.403c.322-.593.81-1.08 1.403-1.403A3.5 3.5 0 0 1 14 9.597m-2.147 3.55a.5.5 0 0 1 0 .707l-4 3.996a.5.5 0 0 1-.706-.707l3.999-3.997a.5.5 0 0 1 .707 0"
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
export const TranslateIcon2 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12.807 1.53a.75.75 0 1 0-.114 1.496A8.94 8.94 0 0 1 16.977 4.5h-.727a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-1.5 0v.632a10.45 10.45 0 0 0-5.193-1.852M7.75 19.5h-.727a8.95 8.95 0 0 0 4.287 1.474a.75.75 0 1 1-.113 1.496A10.45 10.45 0 0 1 6 20.618v.632a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5m.21-13.97a6.07 6.07 0 0 0-4.575.467a.75.75 0 1 0 .725 1.313a4.57 4.57 0 0 1 3.431-.34c.773.227 1.098.639 1.264 1.056c.133.332.175.69.188 1.042a10 10 0 0 0-.923-.21c-1.132-.202-2.682-.263-4.122.426c-1.586.76-2.13 2.317-1.902 3.697c.224 1.357 1.216 2.667 2.8 2.952c1.43.257 2.805-.256 3.757-.761A9 9 0 0 0 9 14.949v.3a.75.75 0 0 0 1.5 0V9.46c0-.454 0-1.236-.3-1.99c-.331-.83-1.005-1.578-2.237-1.94zM9 10.639v2.506l-.106.078a8 8 0 0 1-.993.624c-.84.446-1.85.779-2.788.61c-.845-.152-1.445-.866-1.586-1.72c-.138-.83.179-1.673 1.07-2.1c1.037-.497 2.226-.478 3.212-.303a8 8 0 0 1 1.19.305m7.962-2.653a.75.75 0 0 0-1.424-.472c-.148.445-.304 1.04-.42 1.512c-.736.025-1.445.018-2.067-.024a.75.75 0 0 0-.102 1.496c.563.039 1.19.05 1.844.037c-.143.766-.24 1.45-.3 2.064c-1.215.643-2.061 1.505-2.538 2.413c-.614 1.165-.661 2.556.205 3.442c.572.585 1.408.64 2.13.486a4.7 4.7 0 0 0 1.24-.474l.007.02l.01.026a.75.75 0 1 0 1.405-.524a10 10 0 0 0-.17-.424a7.63 7.63 0 0 0 2.285-4.047c.638.312 1.07.836 1.278 1.4a2.48 2.48 0 0 1-.097 1.952c-.307.635-.932 1.265-2.015 1.68a.75.75 0 0 0 .538 1.401c1.387-.533 2.331-1.402 2.827-2.427a3.98 3.98 0 0 0 .154-3.128a4.04 4.04 0 0 0-2.504-2.423q.003-.111.002-.222a.75.75 0 0 0-1.5-.027a6 6 0 0 0-1.671.238q.093-.682.257-1.5c1.184-.09 2.363-.252 3.336-.481a.75.75 0 1 0-.343-1.46c-.768.18-1.69.318-2.638.406c.086-.33.181-.67.27-.94m-3.68 7.724c.226-.43.6-.887 1.146-1.3c.017.491.066.925.137 1.317c.094.519.236.974.386 1.373c-.305.17-.631.3-.977.373c-.485.105-.687-.011-.742-.068c-.239-.244-.393-.852.05-1.695m4.314-2.488a6.65 6.65 0 0 1-1.413 2.848a6 6 0 0 1-.142-.611a8.6 8.6 0 0 1-.112-1.866q.164-.064.339-.121a4.7 4.7 0 0 1 1.328-.25"
      ></path>
    </svg>
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
