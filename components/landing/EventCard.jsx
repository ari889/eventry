import Image from "next/image";
import Link from "next/link";
import ActionButtons from "../ActionButtons";

const EventCard = ({ event }) => {
  return (
    <div className="overflow-hidden rounded-md bg-[#242526]">
      <Image
        width={500}
        height={500}
        src={event?.imageUrl}
        alt={event?.name}
        className="w-full"
      />

      <div className="p-3">
        <Link href={`/details/${event?.id}`} className="font-bold text-lg">
          Google I/O Extended
        </Link>
        <p className="text-[#9C9C9C] text-sm mt-1">
          Rangpur, Dhaka, Bangladesh, Rangpur, Bangladesh
        </p>
        <div className="text-[#737373] text-sm mt-1">
          <span>{event?.interested_ids?.length} Interested</span>
          <span>|</span>
          <span>{event?.going_ids?.length} Going</span>
        </div>
        <ActionButtons formDetails={false} />
      </div>
    </div>
  );
};
export default EventCard;
