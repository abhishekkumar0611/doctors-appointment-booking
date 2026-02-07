<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/my-appointments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setAppointments([...data.appointments].reverse());
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/user/cancel-appointment/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token) getMyAppointments();
  }, [token]);

  return (
    <div className="p-4">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}

      {!loading && appointments.length === 0 && (
        <p className="text-gray-500 mt-4">No appointments found</p>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {appointments.map((item) => {
          const doctor = item.docId; 
          if (!doctor) return null;

          const address = doctor.address
            ? [
                doctor.address.line1,
                doctor.address.line2,
                doctor.address.city,
              ]
                .filter(Boolean)
                .join(", ")
            : "Address not available";

          return (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
            >
              <img
                src={doctor.image?.trim() ? doctor.image : "/default-doctor.png"}
                alt={doctor.name}
                className="w-32 h-32 object-cover bg-indigo-50 rounded"
              />

              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {doctor.name}
                </p>

                <p>{doctor.speciality}</p>

                <p className="text-zinc-700 font-medium mt-1">Address</p>
                <p className="text-xs">{address}</p>

                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {item.slotDate} | {item.slotTime}
                </p>

                <p className="mt-1 text-xs">
                  Status:{" "}
                  <span className="font-medium">
                    {item.cancelled ? "Cancelled" : "Booked"}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.payment && !item.cancelled && (
                  <button className="text-sm py-2 border rounded hover:bg-primary hover:text-white">
                    Pay Online
                  </button>
                )}

                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm py-2 border rounded hover:bg-red-500 hover:text-white"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
=======
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  const { doctors } = useContext(AppContext)
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {doctors.slice(0,3).map((item,index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.image} alt="" />
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semobold'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Adress</p>
                <p className='text-xs'>{item.adress}</p>
                <p className='text-xs'>{item.adress}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700font-medium'>Date & Time :</span> 25, July, 2024 | 8:30 PM</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Cancel Appointment</button>
              </div>
            </div>

          </div>

        ))}

      </div>
      
    </div>
  )
}

export default MyAppointments
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
