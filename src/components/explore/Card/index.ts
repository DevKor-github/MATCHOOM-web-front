import PrimaryCard from './PrimaryCard';
import RectangleCard from './RectangleCard';
import SquareCard from './SquareCard';

export interface CardType {
  title: string;
  description: string;
  guide: string;
  imageSrc: string;
}

export const Card = Object.assign(PrimaryCard, {
  Rectangle: RectangleCard,
  Square: SquareCard,
});
