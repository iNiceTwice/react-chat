import Skeleton from '@mui/material/Skeleton'

const ContactSkeleton = () => {
    return ( 
        <div className="flex w-full gap-2">
            <Skeleton variant="circular" width={60} height={50} />
            <div className="flex-col w-full items-center justify-center">
                <Skeleton width={'30%'} height={20} variant="text"/>
                <Skeleton width={'100%'} height={20} variant="text" />
            </div>
        </div>
     );
}

export default ContactSkeleton