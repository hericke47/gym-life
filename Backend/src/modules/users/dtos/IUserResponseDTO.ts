export default interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  active: boolean;
  isAdmin: boolean;
  createdAt: Date;
}
