import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/atoms/Spinner'
import BackButton from '../components/atoms/BackButton'
import TicketItem from '../components/organisms/TicketItem'

function Tickets() {
  const { tickets, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  )
  const dispatch = useDispatch()

  // Clearing state on unmount
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
