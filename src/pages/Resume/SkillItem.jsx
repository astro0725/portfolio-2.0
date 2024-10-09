const SkillItem = ({ title, icon: Icon, description }) => {
  return (
    <li className='relative p-2 m-5 bg-body rounded-lg shadow-sm z-1'>
      <div className='flex justify-center items-center text-tertiary'>
      <Icon size={30} />
      </div>
      <div className='text-center text-white'>
        <h4 className='text-lg font-medium'>{title}</h4>
        <p className='text-xs'>{description}</p>
      </div>
    </li>
  );
}

export default SkillItem;