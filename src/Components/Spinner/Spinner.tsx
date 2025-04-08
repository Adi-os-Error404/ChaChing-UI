import React from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
    isLoading?: boolean;
}

const Spinner = ({ isLoading=true }: Props) => {
    return (
        <>
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <ClipLoader
                    color= "#51a2ff"
                    loading= {isLoading}
                    size= {35}
                    aria-label= "Loading Spinnerr"
                    data-testid= "loader"
                />
            </div>
        </>
    )
}

export default Spinner