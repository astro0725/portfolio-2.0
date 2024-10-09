const TimelineItem = ({ title, date, description }) => {
  return (
    <li className='relative'>
      <h4 className='text-sm font-medium leading-5 text-white'>{title}</h4>
      <span className='text-secondary'>{date}</span>
      <p className='text-white font-light text-sm'>{description}</p>
    </li>
  );
}

export default TimelineItem;