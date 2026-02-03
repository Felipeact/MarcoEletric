'use client'

import Image from 'next/image'
import { HTMLMotionProps, motion, Variants } from 'framer-motion'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { Services } from '../components/Services'
import { Suspense } from 'react'
import { Awards } from '../components/Awards'
import FAQ from '../components/FAQ'
import { ShowCase } from '../components/ShowCase'


// Motion Variants
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}


// Fade In animation configuration
const fadeInProps: HTMLMotionProps<'div'> = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1, ease: 'easeInOut' },
};


export default function Hero() {
  return (
    <section className="w-full bg-white dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 md:flex md:items-center md:justify-between gap-12 mb-16">
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-blue-600 mb-4">
            Soluções Elétricas
          </h1>
          <p className="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed md:text-xl md:font-medium md:line-height-7">
            Seja bem-vindo! <br />
            Aqui na Marc Elétrica, contamos com uma equipe totalmente preparada e qualificada para prestar serviços em residências, comércios e indústrias. Atuamos com instalações elétricas, manutenção preventiva e corretiva, projetos elétricos, automação residencial e muito mais.
            Nossa missão é garantir a segurança e a eficiência dos sistemas elétricos dos nossos clientes, sempre prezando pela qualidade e excelência em cada serviço prestado.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center md:justify-start">
            <WhatsAppButton bgColor='bg-blue-500' hoverBgColor='bg-blue-600' textColor='text-white' />
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="md:w-1/2 relative flex justify-center md:justify-end mt-12 md:mt-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInRight}
        >
          <div
            className="relative w-96 h-full"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: 'cover',
              WebkitMaskSize: 'cover',
            }}
          >
            <Image
              src="/service.svg"
              alt="Eletricista profissional"
              width={600}
              height={600}
              className="relative z-0 ml-4"
            />
          </div>
        </motion.div>

      </div>

      {/* Awards */}
      <motion.div {...fadeInProps}>
        <Suspense fallback={<div className="text-center">Loading Latest Projects...</div>}>

          <div className='w-full md:w-[50%] mx-auto mt-32 mb-24'>
            <Awards />
          </div>
        </Suspense>
      </motion.div>

      {/* Latest Projects */}
      <motion.div {...fadeInProps}>
        <Suspense fallback={<div className="text-center">Loading Latest Projects...</div>}>
          <Services />
        </Suspense>
      </motion.div>

      {/*  FAQ */}
      <motion.div {...fadeInProps}>
        <Suspense fallback={<div className="text-center">Loading Latest Projects...</div>}>
          <div className='w-[70%] h-full mx-auto mt-24'>
            <FAQ />
          </div>
        </Suspense>
      </motion.div>

      <motion.div {...fadeInProps}>
        <Suspense fallback={<div className="text-center">Loading Latest Projects...</div>}>
          <div className="text-center mt-24">
            <h2 className="text-4xl font-bold text-blue-500">
              Galeria
            </h2>
          </div>

          <div className='bg-black p-8  mt-24 mb-24'>
            <div className='w-[70%] h-full mx-auto'>
              <ShowCase />
            </div>
          </div>
        </Suspense>
      </motion.div>

      <WhatsAppButton bgColor='bg-blue-500' hoverBgColor='bg-blue-600' textColor='text-white' />

    </section>
  )
}
