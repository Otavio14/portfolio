import { CardComponent } from "./card.component";

interface Props {
  Id: string;
}

export const HomeComponent = ({ Id }: Props) => {
  return <CardComponent Id={Id}>Home</CardComponent>;
};
