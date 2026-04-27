interface LogoProps {
  textSize?: 'text-4xl' | 'text-3xl' | 'text-2xl' | 'text-xl';
  textSizeSm?: 'text-4xl' | 'text-3xl' | 'text-2xl' | 'text-xl';
}

const Logo = ({ textSize, textSizeSm }: LogoProps) => {
  return (
    <>
      <h1 className={`text-center font-bold ${textSize} sm:${textSizeSm}`}>
        Sujeito<span className="text-brand-primary">Pizza</span>
      </h1>
    </>
  );
};

export default Logo;
