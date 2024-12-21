import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SessionType } from 'utils/handleSession';
import { getSession } from 'utils/handleSession';
import { useGetUserPoint } from 'services/user';

const MyPoint = () => {
  const [session, setSession] = useState<SessionType | undefined>(undefined);
  useEffect(() => {
    const session = getSession();
    if (session) {
      setSession(session);
    }
  }, []);

  const { id } = useParams();
  const { data: userPoint } = useGetUserPoint(Number(id));
  const totalPoint = userPoint?.reduce((acc, curr) => acc + curr.point, 0);

  return (
    <section className='my-20 rounded-10 bg-grey-7 px-20 py-16'>
      <h4 className='text-18 font-700'>
        {session?.name} 님
        <span className='mx-12 text-14 font-500'>잔여 포인트</span>
      </h4>
      <div className='py-16 text-24 font-700 text-green'>{totalPoint} p</div>
      <ul>
        {userPoint?.map((point) => (
          <MyPointItem point={point.point} expiredAt={point.expiration} />
        ))}
      </ul>
    </section>
  );
};

export default MyPoint;

interface MyPointItemProps {
  point: number;
  expiredAt: string;
}

const MyPointItem = ({ point, expiredAt }: MyPointItemProps) => {
  const parsedExpiredAt = expiredAt.split(' ')?.[0].replace(/-/g, '.');
  return (
    <li className='flex items-center justify-between'>
      <span className='text-16 font-500'>{point.toLocaleString()} p</span>
      <span className='text-12 font-500'>{parsedExpiredAt} 까지</span>
    </li>
  );
};
