export interface Author {
  id: string;
  name: string;
  yearOfBirth: number | null;
  yearOfDeath: number | null;
  nationality: string | null;
  imageUrl: string | null;
  biography: string | null;
  createdTimestamp: string;
}
