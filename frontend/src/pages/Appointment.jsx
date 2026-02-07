<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
=======
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useParams , useNavigate, Navigate} from 'react-router-dom';
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
<<<<<<< HEAD
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // Fetch doctor info from doctors list
  const fetchDocInfo = () => {
    const doc = doctors.find((d) => d._id === docId);
    setDocInfo(doc);
  };

  // Generate 7-day time slots
  const getAvailableSlots = () => {
    if (!docInfo) return;
    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.error('Select a time slot first');
      return;
    }

    try {
      const dateObj = docSlots[slotIndex][0].datetime;
      const slotDate =
        dateObj.getFullYear() +
        '-' +
        (dateObj.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        dateObj.getDate().toString().padStart(2, '0');

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return docInfo ? (
    <div className='p-4'>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <img className='w-full sm:w-72 rounded-lg' src={docInfo.image} alt='' />

        <div className='flex-1 border p-6 rounded-lg bg-white'>
          <p className='text-2xl font-medium flex items-center gap-2'>
            {docInfo.name} <img className='w-4' src={assets.verified_icon} alt='' />
          </p>
          <p className='text-sm text-gray-600 mt-1'>
            {docInfo.degree} - {docInfo.speciality} | {docInfo.experience} yrs
          </p>
          <p className='mt-2'>{docInfo.about}</p>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment Fee: {currencySymbol}
            {docInfo.fees}
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='mt-6'>
        <p className='font-medium text-gray-700 mb-2'>Booking Slots</p>
        <div className='flex gap-2 overflow-x-scroll'>
          {docSlots.map((daySlots, idx) => (
            <div
              key={idx}
              className={`text-center p-2 min-w-[60px] cursor-pointer rounded-full ${
                slotIndex === idx ? 'bg-primary text-white' : 'border border-gray-300'
              }`}
              onClick={() => setSlotIndex(idx)}
            >
              <p>{daysOfWeek[daySlots[0].datetime.getDay()]}</p>
              <p>{daySlots[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex gap-2 mt-2 overflow-x-scroll'>
          {docSlots[slotIndex] &&
            docSlots[slotIndex].map((slot, idx) => (
              <div
                key={idx}
                onClick={() => setSlotTime(slot.time)}
                className={`px-4 py-2 rounded-full cursor-pointer border ${
                  slotTime === slot.time ? 'bg-primary text-white' : 'text-gray-700'
                }`}
              >
                {slot.time}
              </div>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className='mt-4 px-6 py-2 bg-primary text-white rounded-full'
        >
          Book Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Appointment;
=======

  const { docId } = useParams();
  const { doctors, currencySymbol ,backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU' ,'FRI', 'SAT']

  const naviagate = useNavigate()

  const [ docInfo, setDocInfo ] = useState(null);
  const [docSlots, setDocSlots ] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo  = async() => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    //console.log(docInfo);
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i=0; i<7 ; i++) {

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+ i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if(today.getDate() === currentDate.getDate()) {
         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30: 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }

  }

  const bookAppointment = async(req, res) => {
    if (!token) {
      toast.alert('Login to book appointment')
      return naviagate('/login')
    }

    try {

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()

    const slotDate = day + "" + month + "" + year

    
    const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {headers:{token}})
      if (data.success) {
      toast.success(data.message)
      getDoctorsData()
      naviagate('/my-appointment')

    } else {
    toast.error(data.message)
     } 
     } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect( () => {
  fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()

  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])


  return docInfo && (
    <div >
      { /* Doctor Details */ }
      <div className='flex flex-col-4 sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className=' flex items-center gap-2 text-2xl font-medium  text-gray-900' >
            {docInfo.name} <img className='w-4' src={assets.verified_icon} alt=""/>
          </p>

          <div className='flex items-centre gap-2  text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p>About <img src={assets.info_icon} alt="" /></p>
            <p>{docInfo.about}</p>
            
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment-fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      { /*   Booking Slots    */}
      <div className='sm: ml-72 sm: pl-4 mt-4  font-medium text-gray-700'>
         <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white': 'border border-gray-200'}`} key={index}>
                <p> {item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p> {item[0] && item[0].datetime.getDate()}</p>

              </div>
              

              
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow x-scroll mt-4'>
          { docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white': 'text-gray-400 border border-gray-400'}`} key = {index}>
              { item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book Appointment</button>
      </div>
      { /*   Related Doctors Listing   */}
      <RelatedDoctors docId ={docId} speciality={docInfo.speciality}  />
    </div>
  )
}

export default Appointment
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
