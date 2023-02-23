interface Error {
    message:string
}

const ErrorMessage = ({ message }:Error) => {
    return ( 
        <>
              <div className="p-1 border border-red-300 bg-red-100 w-full rounded-full text-red-600 text-sm text-center">
                { message }
              </div>
        </>
     );
}
 
export default ErrorMessage;