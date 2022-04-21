import { Breadcrumbs } from '../../components'

const About = () => {
  return (
    <>
      <div className='max-w-7xl mx-auto px-10 md:px-5'>
        <Breadcrumbs />
      </div>

      <section className='w-full max-w-7xl flex flex-col items-center min-h-screen mx-auto my-10 px-2.5 md:px-0 text-base-300'>
        <div className='bg-gradient-to-r from-base-content to-slate-500 space-y-2.5 p-10 rounded-lg max-w-2xl w-full'>
          <div className='flex space-x-5'>
            <h2 className='text-4xl font-semibold'>OnlyFoods</h2>
            <p className='text-sm self-end'>Version 1.0.0</p>
          </div>
          <p>Get top recipes made by people around the world.</p>
        </div>
      </section>
    </>
  )
}

export default About
