import { IIconProps } from './interfaces';

const Icon: React.FC<IIconProps> = ({ className, fill }) => {
  return (
    <svg
      viewBox="0 0 14 14"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4168 7.91668H7.91683V13.4167H6.0835V7.91668H0.583496V6.08334H6.0835V0.583344H7.91683V6.08334H13.4168V7.91668Z"
        className={fill}
      />
    </svg>
  );
};

export default Icon;
