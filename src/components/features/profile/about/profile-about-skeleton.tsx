export default function ProfileAboutListSkeleton() {
  return (
    <ul className="flex flex-col gap-2">
      <ProfileAboutListSkeletonItem />
      <ProfileAboutListSkeletonItem />
      <ProfileAboutListSkeletonItem />
    </ul>
  )
}

const ProfileAboutListSkeletonItem = () => {
  return (
    <li className="flex flex-col gap-5">
      <div className="w-[118px] h-6 bg-gray-200 animate-pulse"></div>
      <div className="w-full h-12 bg-gray-200 animate-pulse"></div>
    </li>
  )
}
