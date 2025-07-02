// import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'

const Calendar = () => {
  const events = [
    { 
      start: '2025-06-08', 
      end: '2024-12-15', 
      display: 'background',
      color: '#ef9a9a',
      className: 'unavailable-period'
    },
    { 
      start: '2024-12-18', 
      end: '2024-12-28', 
      display: 'background',
      color: '#ef9a9a',
      className: 'unavailable-period'
    },
    { 
      start: '2024-12-29', 
      end: '2024-12-31', 
      display: 'background',
      color: '#ef9a9a',
      className: 'unavailable-period'
    }
  ]

  return (
    <div className='bg-gray-100 rounded-lg shadow p-4'>
      <FullCalendar 
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: ""
        }}
        events={events}
        height="auto"
      />
    </div>
  )
}

export default Calendar
