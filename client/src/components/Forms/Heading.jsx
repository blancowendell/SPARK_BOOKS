const Heading = ({ level = 3, children, className = "" }) => {
  const Tag = `h${level}`;
  const baseStyles = "font-semibold";
  const sizeMap = {
    1: "text-2xl",
    2: "text-xl",
    3: "text-lg",
  };

  return <Tag className={`${baseStyles} ${sizeMap[level]} ${className}`}>{children}</Tag>;
};

export default Heading;
