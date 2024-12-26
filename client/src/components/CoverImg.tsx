
const CoverImg = ({src,className,Click}:{src:string,className:string,Click:(e:string)=>void}) => {
    return (
        <img className={`${className} cursor-pointer` } onClick={()=>Click(src)} src={src} alt="" />
    );
};

export default CoverImg;