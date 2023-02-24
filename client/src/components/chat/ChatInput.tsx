const ChatInput = () => {
    return ( 
        <div className="flex justify-center w-full py-4 bg-secondary border-t">
            <input 
                placeholder="Add a comment..."
                className="w-11/12 shadow-sm text-sm outline-none rounded-full bg-slate-100 px-4 py-2"/>
        </div>
     );
}
 
export default ChatInput;