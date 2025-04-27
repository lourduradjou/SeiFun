import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletanCard({ count }) {
    return Array(count)
        .fill(0)
        .map((_, index) => {
            return (
                <div
                    key={index} // Adding a unique key for list rendering
                    className={`w-full max-w-[276px] bg-[#111114] animate-pulse rounded-xl`}
                >
                    <div className="md:hidden flex flex-row sm:flex-col h-full rounded-lg pb-1 px-1">
                        <div className="w-1/3 sm:w-full">
                            <Skeleton
                                height={160}
                                className=" object-cover rounded-lg"
                            />
                        </div>

                        <div className="px-2">
                            <h5 className="my-2">
                                <Skeleton width={160} className="" height={16} inline />
                            </h5>
                            <div className="flex mb-3 gap-3 items-center flex-wrap">
                                <Skeleton width={110} className="w-2/3 md:w-full" height={24} />
                                <Skeleton width={40} className="w-2/3 md:w-full" height={24} />
                            </div>
                            <Skeleton count={2} width={160} className="" height={12} />

                            <Skeleton width={160} className="w-1/3 md:w-full" height={12} inline />
                        </div>
                    </div>

                    <div className="hidden md:flex flex-row sm:flex-col h-full rounded-lg pb-1 px-1">
                        <div className="w-1/3 sm:w-full">
                            <Skeleton
                                height={160}
                                className=" object-cover rounded-lg"
                            />
                        </div>

                        <div className="px-2">
                            <h5 className="my-2">
                                <Skeleton width={250} className="" height={16} inline />
                            </h5>
                            <div className="flex mb-3 gap-3 items-center flex-wrap">
                                <Skeleton width={170} className="w-2/3 md:w-full" height={24} />
                                <Skeleton width={70} className="w-2/3 md:w-full" height={24} />
                            </div>
                            <Skeleton count={2} width={250} className="" height={12} />

                            <Skeleton width={250} className="w-1/3 md:w-full" height={12} inline />
                        </div>
                    </div>
                </div>
            )
        })
}
