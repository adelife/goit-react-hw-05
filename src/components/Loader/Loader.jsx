import { MutatingDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <MutatingDots
      visible={true}
      height='100'
      width='100'
      color='#fa03b4'
      secondaryColor='#fa03b4'
      radius='12.5'
      ariaLabel='mutating-dots-loading'
      wrapperStyle={{}}
      wrapperClass=''
    />
  );
};

export default Loader;