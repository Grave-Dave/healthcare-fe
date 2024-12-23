import {Skeleton} from "@mui/material";

const VisitSkeleton = () => {

    const renderVisitSkeleton = (times: number) => {
        return new Array(times).fill(1).map((_, i) => (
            <Skeleton key={`skeleton-${i}`} variant="rectangular" height={200} sx={{borderRadius: 2}}/>
        ))
    }

    return (
        <>
            {renderVisitSkeleton(3)}
        </>
    )
}

export default VisitSkeleton
