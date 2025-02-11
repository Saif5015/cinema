import React from 'react';
import { Link } from 'react-router-dom';

interface ActorCardProps {
  id: number;  // Use id for reliable routing
  name: string;
  image: string;
}

const ActorCard: React.FC<ActorCardProps> = ({ id, name, image }) => {
  return (
    <Link
      to={`/actor/${id}`}  // Use actor ID in the URL
      className="actor-card bg-gray-800 text-white dark:bg-white dark:text-black rounded-lg shadow-lg p-2 transition-transform w-[150%]"
    >
      <img src={image} alt={name} className="w-full h-48 rounded-lg mb-2 object-cover" />
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-center mb-1">{name}</h3>
      </div>
    </Link>
  );
};

export default ActorCard;