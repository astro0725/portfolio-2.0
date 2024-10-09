import React from 'react';
import { FaBookReader, FaBookmark, FaStar, FaDownload, FaCode, FaHtml5, FaTools} from 'react-icons/fa';
import { PiCertificateFill } from 'react-icons/pi';
import TimelineItem from './TimelineItem';
import SkillItem from './SkillItem';

const skillsData = [
  {
    icon: FaCode,
    title: 'Front End',
    description: 'HTML, CSS, SASS/SCSS, React, JavaScript, TypeScript, Redux, TailwindCSS'
  },
  {
    icon: FaHtml5,
    title: 'Back End',
    description: 'NodeJS, ExpressJS, MySQL, Sequelize, NoSQL, MongoDB, Mongoose, GraphQL'
  },
  {
    icon: FaTools,
    title: 'Other',
    description: 'GitHub, Render, Heroku, Netlify, Webpack, Apollo, Websocket, Firebase, AWS'
  }
];

const Resume = () => {
  return (
    <section>
      <div>
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative bg-tertiary text-white w-7 h-7 flex justify-center items-center text-sm shadow-sm rounded-lg'>
            <FaStar />
          </div>
          <h3 className='text-white text-lg font-semibold'>Skills</h3>
        </div>
        <ul className='grid space-between grid-cols-1 sm:grid-cols-3'>
        {skillsData.map((service, index) => (
          <SkillItem
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
        </ul>
      </div>

      <div className='mt-5 mb-7'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative bg-tertiary text-white w-7 h-7 flex justify-center items-center text-sm shadow-sm rounded-lg'>
            <FaBookReader />
          </div>
          <h3 className='text-white text-lg font-semibold'>Education</h3>
        </div>
        <ol className='text-sm'>
          <TimelineItem
            title='University of the People —  Pasadena, California'
            date='2024 — Current'
            description='Bachelor of Science in Computer Science'
          />
          <TimelineItem
            title='University of California —  Berkeley, California'
            date='2023 — 2024'
            description='Full Stack Development Certification'
          />
          <TimelineItem
            title='Menlo College —  Atherton, California'
            date='2019 — 2022'
            description='Dual Major in International Management and Finance'
          />
          <TimelineItem
            title='San Mateo College —  San Mateo, California'
            date='2018 — 2019'
            description='Junior College High School Program for General Studies'
          />
          <TimelineItem
            title='Canada College —  Redwood City, California'
            date='2017 — 2018'
            description='Junior College High School Program for General Studies'
          />
        </ol>
      </div>

      <div className='mb-7'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative bg-tertiary text-white w-7 h-7 flex justify-center items-center text-sm shadow-sm rounded-lg'>
            <FaBookmark />
          </div>
          <h3 className='text-white text-lg font-semibold'>Experience</h3>
        </div>
        <ol className='text-sm'>
          <TimelineItem
            title='Administrative Assistant'
            date='2018 — Contract'
            description='Patient charting, marketing, customer support, consulting, transcription, project coordination, manage file systems.'
          />
          <TimelineItem
            title='Tutor'
            date='2024 — Contract'
            description='Tutoring in all mathematics (Pre-Algebra, Algebra 1, Algebra 2, Geometry,  Pre-Calculus, Calculus, Calculus 2, Trigonometry, Statistics).'
          />
          <TimelineItem
            title='Administrative Assistant'
            date='2024 — Contract'
            description='Licensing management, web development/management, consultation.'
          />
        </ol>
      </div>

      <div>
        <div className='flex items-center gap-4 mt-6 mb-6'>
          <div className='relative bg-tertiary text-white w-7 h-7 flex justify-center items-center text-sm shadow-sm rounded-lg'>
            <PiCertificateFill />
          </div>
          <h3 className='text-white text-lg font-semibold'>Certification</h3>
        </div>
        <div className='flex items-center justify-center'>
          <div className='relative p-2 mb-5 bg-body rounded-lg shadow-sm z-1'>
            <div className='text-center text-white'>
              <h4 className='text-lg font-medium'>Full Stack Development</h4>
              <iframe 
                title='Full Stack Development Certification' 
                src='/UCBCERT.pdf' 
                height='200'
                style={{border: 'none', maxWidth: '100%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center gap-4 mt-6 mb-6'>
          <div className='relative bg-tertiary text-white w-7 h-7 flex justify-center items-center text-sm shadow-sm rounded-lg'>
            <FaDownload />
          </div>
          <h3 className='text-white text-lg font-semibold'>Download</h3>
        </div>
        <div className='flex items-center justify-center'>
          <p className='text-white font-light text-sm'>Want to have a copy of my resume? Click the button below!</p>
        </div>
        <div className='m-5 flex items-center justify-center'>
          <a
            href={'/resume.pdf'}
            download
            className='bg-secondary font-medium text-sm text-white py-2 px-4 rounded-lg shadow-sm flex items-center justify-center'
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;