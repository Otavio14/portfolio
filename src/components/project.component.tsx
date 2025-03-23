import { CardComponent } from "./card.component";

interface Props {
  Id: string;
  Repository: string;
}

export const ProjectComponent = ({ Id, Repository }: Props) => {
  return (
    <CardComponent Id={Id}>
      Projeto {Repository.split("/").pop() || ""}
    </CardComponent>
  );
};
