import { CardComponent } from "./card.component";

interface Props {
  Id: string;
}

export const DetailsComponent = ({ Id }: Props) => {
  return <CardComponent Id={Id}>Details</CardComponent>;
};
