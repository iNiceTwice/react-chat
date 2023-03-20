import Logo from "./Logo";

interface Props {
    children?: JSX.Element | JSX.Element[]
}

const DefaultScreen = ({ children }:Props) => (
    <div className="flex flex-col">
        <Logo />
        <div>
            { children }
        </div>
    </div>
)
 
export default DefaultScreen;