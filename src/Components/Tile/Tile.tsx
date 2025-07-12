import React from 'react';

interface Props {
    title: string;
    subTitle: string | null;
}

const Tile = ({title, subTitle}: Props) => {

    const renderSubTitle = () => {
        if (!subTitle || subTitle === 'null') {
            return "N/A";
        }

        return (
            <span 
                className="font-bold md:text-xl" 
                dangerouslySetInnerHTML={{ __html: subTitle }} />
        );
    };

    return (
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h5 className="text-gray-800 uppercase font-bold text-sm m-2">
                                {title}
                            </h5>
                            {renderSubTitle()}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Tile;
