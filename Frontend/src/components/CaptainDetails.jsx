import React, { useContext, useEffect, useRef } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import gsap from 'gsap'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  const detailsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Add animation for captain details
    gsap.from(detailsRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: "power4.out"
    });

    // Add staggered animation for stats section
    gsap.from(statsRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power4.out",
      delay: 0.5,
      stagger: 0.2
    });
  }, []);

  return (
    <div>
      <div ref={detailsRef} className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img className="h-10 w-10 rounded-full object-cover" src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww" alt="car" />
          <h4 className="text-lg font-medium">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-lg font-medium">₹10.22</h4>
          <p className="text-sm  text-gray-600">Earned</p>
        </div>
      </div>
      <div ref={statsRef} className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center ">
          <i className="text-3xl  font-thin ri-history-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl  font-thin  ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl  font-thin  ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
