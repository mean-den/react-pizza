import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="132" cy="132" r="125" /> 
    <rect x="0" y="285" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="337" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="455" rx="15" ry="15" width="95" height="30" /> 
    <rect x="125" y="447" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

