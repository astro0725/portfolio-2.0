import Service from './Service';
import { MdDesignServices, MdWeb } from 'react-icons/md';

const servicesData = [
  {
    icon: MdDesignServices,
    title: 'Web design',
    description: 'Modern and seamless user experiences.'
  },
  {
    icon: MdWeb,
    title: 'Web development',
    description: 'Scalable backends for any web needs.'
  },
];


const About = () => {
  return (
    <article data-page='about'>
      <header>
        <h2 className='text-highlight text-xl font-bold'>About me</h2>
      </header>
      <section className='pb-5 leading-6 text-white'>
        <p>
        I am a creative developer with a strong background in team collaboration and on-the-fly problem solving. I have a strong passion for developing seamless user experiences and have keen eye for observing problems. While my knowledge is solely built around coding fundamentals, I am always eager to learn new technologies and further advance my skills.
        </p>
        <p>
          I aim to build seamless experiences that is visually appealing, functional, and user-friendly. I am always looking for new opportunities to work with other developers and designers to create amazing products.
        </p>
      </section>

      <section>
        <h3 className='text-highlight text-xl font-bold mb-2'>What I'm doing</h3>
        <ul className='grid space-between grid-cols-2'>
        {servicesData.map((service, index) => (
          <Service
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
        </ul>
      </section>

    </article>
  )
}

export default About