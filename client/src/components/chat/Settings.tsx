import ThemeSwitch from "../ThemeSwitch";
import UserProfile from "./UserProfile";

const Settings = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    
    return ( 
        <UserProfile 
            img={user.profileImage}
            username={user.name}
            publicId={user.publicId}
            email={user.email}
        >
            <ThemeSwitch/>
        </UserProfile> 
     );
}
 
export default Settings;