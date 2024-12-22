import { useGetStudioTicket } from 'services/studio';
import PointCard from 'components/common/PointCard';

interface Props {
  studioName: string;
  studioId: number;
  selectedTicketId: number | null;
  setSelectedTicketId: (id: number | null) => void;
}

const TicketList = ({
  studioName,
  studioId,
  selectedTicketId,
  setSelectedTicketId,
}: Props) => {
  const { data: studioTicket } = useGetStudioTicket(studioId);
  return (
    <section className='grow'>
      <h3 className='px-20 pb-[10px] text-20 font-700'>충전</h3>
      <ul className='flex grow flex-col'>
        {studioTicket?.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => setSelectedTicketId(ticket.id)}
            className={`rounded-10 border-2 px-20 py-[10px] ${
              selectedTicketId === ticket.id
                ? 'border-green bg-green/20'
                : 'border-transparent'
            }`}
          >
            <PointCard
              point={ticket.point}
              price={ticket.price}
              studioName={studioName}
            />
          </div>
        ))}
      </ul>
    </section>
  );
};

export default TicketList;
