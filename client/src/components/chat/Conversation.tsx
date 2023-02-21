import Message from "./Message";

const Conversation = () => {
    return ( 
        <div className="flex flex-col h-full justify-end">
            <Message own={true}/>
            <Message own={false}/>
            <Message own={true}/>
            <Message own={true}/>
        </div>
     );
}
 
export default Conversation;